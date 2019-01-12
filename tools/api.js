import _ from 'lodash';
import fs from 'fs';
require('dotenv').config();

let albums = JSON.parse(fs.readFileSync(process.env.MUSIC_CONFIGURATION_FILES + "Albums.json"));
let artists = JSON.parse(fs.readFileSync(process.env.MUSIC_CONFIGURATION_FILES + "Artists.json"));
let songs = JSON.parse(fs.readFileSync(process.env.MUSIC_CONFIGURATION_FILES + "Songs.json"));
let playlists = JSON.parse(fs.readFileSync(process.env.MUSIC_CONFIGURATION_FILES + "playlists.json"));

let fleshedOutSongs = _.flatten(albums.map( a=>{
    return a.songs.map(s=>{
        return {
            songName: s.songName,
            title: a.title,
            artist: a.artist,
            albKey: a._id,
            artistKey: a.artistfk,
            songPk: s.songPk,
            sizeInMb: s.sizeInMb
        };
    });
}));

let aggQuery = (collection, col, stats) => {
    let returnVal = [];
    collection.forEach( (item)=>{
        let aggNdx = _.findIndex(returnVal, { tag : item[col] });
        if (aggNdx == -1){
            let newItem = { tag:   item[col], count: 1 };
            if(stats != undefined){
                for(let i=0;i<stats.length;i++)
                    newItem[stats[i]] = item[stats[i]];
            }
            returnVal.push(newItem);
        }
        else{
            returnVal[aggNdx].count++;
            if(stats != undefined){
                for(let i=0;i<stats.length;i++)
                    returnVal[aggNdx][stats[i]] += item[stats[i]];
            }
        }
    });
    return returnVal.sort((a,b) => {
        if(a.tag<b.tag){return -1;}
        if(a.tag>b.tag){return 1;}
        return 0;
    });
};

let writePlaylists = () => {
    let list = playlists.map((item)=>{
        return `{ "name":"${item.name}", "entries":[${
            item.entries.map(s=>{
                return `{"type":"${s.type}", "key":"${s.key}", "title":"${s.title}"}`;
            })
        }] }\n`;
    });

    fs.writeFile(process.env.MUSIC_CONFIGURATION_FILES + "playlists.json", '[\n' + list + ']', (err)=>{
});};

let getNextId = (collection) => {
    let returnValue = 1;
    collection.forEach( (item) =>{
        if(item._id>=returnValue) {returnValue = item._id + 1;}
    });
    return returnValue;
};

let convertColumn = (obj, colName, parseFunct) =>{
    if(obj){
        if(obj[colName]){
            obj[colName] = (! isNaN(parseFunct(obj[colName])))  ? parseFunct(obj[colName]) : obj[colName];
        }
    }
    return obj;
};

let convertAlbum = (alb) => {
    if(alb){
        alb = convertColumn(alb,'_id',parseInt);
        alb = convertColumn(alb,'releaseYear',parseInt);
        alb = convertColumn(alb,'aquisitionYear',parseInt);
        alb = convertColumn(alb,'artistfk',parseInt);
        alb = convertColumn(alb,'songcount',parseInt);
        alb = convertColumn(alb,'dateOfInterest',parseInt);
        alb = convertColumn(alb,'sizeInMb',parseFloat);        
    }
    return alb;
};

let validAlbum = (alb) => {
    return (
        alb._id &&
        alb.title &&
        alb.releaseYear &&
        alb.aquisitionYear &&
        alb.downloaded &&
        alb.songcount &&
        alb.songs &&
        alb.artist &&
        alb.sizeInMb
    ); 
};

let convertArtist = (art) => {
    if( art) {
        art = convertColumn(art,'_id',parseInt);
        art = convertColumn(art,'albumCount',parseInt);
        art = convertColumn(art,'songCount',parseInt);
        art = convertColumn(art,'dateOfInterest',parseInt);
        art = convertColumn(art,'sizeInMb',parseFloat);        
    }
    return art;
};

let validArtist = (art) => {
    return (
        art.artist &&
        art.nationality &&
        art.dateOfInterest &&
        art.albumCount &&
        art.songCount &&
        art.sizeInMb &&
        art.albums 
    );
};

let validPlayList = (pl) => {
    if(pl.name===undefined || pl.entries===undefined) { return false;}
    if(!Array.isArray(pl.entries)) { return false;}
    let isValid = true;
    pl.entries.forEach( e => {
        if(e.key===undefined || e.type===undefined || e.title===undefined ) { isValid = false; return false;}
        if( e.key != parseInt(e.key,10)) { isValid = false; return false;}
        if( e.type.toLowerCase() != "song" && e.type.toLowerCase() != "album" && e.type.toLowerCase() != "artist") {isValid = false; return false;}
    });
    return isValid;
};

let songList = () => {
    return fleshedOutSongs;
    /*_.flatten(albums.map( a=>{
            return a.songs.map(s=>{
                return {
                    songName: s.songName,
                    title: a.title,
                    artist: a.artist,
                    albKey: a._id,
                    artistKey: a.artistfk,
                    songPk: s.songPk,
                    sizeInMb: s.sizeInMb
                }
            });
       }));
       */
};


/*
TO DO:

4) Tagging! 
5) Add filter to aggregated query

*/

let collectionApi = {

    /* RESTful methods */
    artistById: (id) => {
        return _.find(artists, {'_id' : id}) ;
    },
    deleteArtist: (id) => {
        let artKey = _.findIndex(artists, {'_id': id });
        if( artKey>0){
            artists[artKey].albums.forEach((a)=>{
                collectionApi.deleteAlbum(a.albumpk);
            });
            artists.splice(artKey,1);
            return 1;     
        } else
        {
            return -1;
        }
    },
    updateArtist: (artist) => {
        artist = convertArtist(artist);
        if(!validArtist(artist)){ return -2;}
        let artKey = _.findIndex(artists,{ _id: artist._id });
        if( artKey>0){
            artists[artKey].albums.forEach((a)=>{
                collectionApi.deleteAlbum(a._id);
            });
           artists.splice(artKey,1, artist);
           artist.albums.forEach( (a)=>{
                collectionApi.addAlbum(a);
           });
           return 1;
        }else{
            return -1;
        }
    },
    addArtist: (artist) => {
        artist = convertArtist(artist);
        if(!validArtist(artist)){ return -2;}
        let artKey = _.findIndex(artists, {artist: artist.artist });
        if( artKey<0){
            artist._id = getNextId(artists);
            artists.push(artist);
            artist.albums.forEach( (a)=>{
                a.artist = artist.artist;
                collectionApi.addAlbum(a);
           });
           return 1;
        } else { return -1;}
    },
    albumById: (id) => {
        return  _.find(albums, {'_id' : id}) ;
    },
    deleteAlbum: (id) => {
        let albKey = _.findIndex(albums, {'_id': id });
        if( albKey>0){
            let artKey = _.findIndex(artists, {'_id': albums[albKey].artistfk});
            if(artKey>0){
                let albInColkey = _.findIndex(artists[artKey].albums, {'albumpk': id});
                if(albInColkey>0){ artists[artKey].albums.splice(albInColkey,1);  }
            }
            albums.splice(albKey,1);    
            return 1;
        }else{
            return -1;
        }
    },
    updateAlbum: (album) => {
        if(!validAlbum(album)){ return -2;}
        let albKey = _.findIndex(albums,{artist: album.artist, title: album.title});
        if( albKey>=0){
            albums.splice(albKey,1);
            collectionApi.addAlbum(album);
            return 1;
        } else{return -1;}
    },
    addAlbum: (album) => {
        if(!validAlbum(album)){ return -2;}
        let albKey = _.findIndex(albums, {artist: album.artist, title: album.title });
        if( albKey<0){
            album._id = getNextId(albums);
            //get artist Info for consistency
            let art = collectionApi.artistQuery({artist: album.artist});
            if(art.length>0){
                album.artistfk = art[0]._id;
                album.nationality = art[0].nationality;
                album.dateOfInterest = art[0].dateOfInterest;
                albums.push(album);
                let albNdx = _.findIndex(art[0].albums, {title: album.title });
                let nestedAlbum = {
                    'albumpk': album._id,
                    'title': album.title,
                    'releaseYear': album.releaseYear,
                    'aquisitionYear': album.aquisitionYear,
                    'downloaded': album.downloaded,
                    'songcount': album.songcount,
                    'songs': album.songs
                    };
                if(albNdx>=0){art[0].albums.splice(albNdx,1,nestedAlbum);}
                else{ art[0].albums.push(nestedAlbum);
                }
                return 1;
            } else{
                return -3; // could not find the artist
            }
        } else
        {
            return -1; // album exists already
        }
    },
    getPlaylists : () =>{
        const returnVal =  _.orderBy(playlists, ["name"], ["asc"]);
        return returnVal.map(p=>{return {name : p.name};});
    },
    getPlaylist : (name) => {
        let returnVal = playlists.find( pl=> pl.name == name );
        let stats = {};
        if( returnVal != null) {
            stats = collectionApi.songlistStats(returnVal.entries);
        }
        return Object.assign({}, returnVal, stats);
    },
    songlistStats : (playlistItems) => {
        let songCount = 0;
        let listSize  = 0;
        let songs = collectionApi.reduceListItemsToSongs(playlistItems);
        songCount = songs.length;
        listSize = songs.reduce((a,c)=> a + c.sizeInMb, 0);
        return {songCount, listSize};
    },
    updatePlaylist : (playlist) => {
        try{
            if(!validPlayList(playlist)){ return -2;} else{
            let upsert = playlists.find( pl=> pl.name == playlist.name );
            if(upsert != null){
                _.remove(playlists, upsert);
            }
            playlists.push(playlist);
            writePlaylists();
            return 1;
        }
        }
        catch(e){
            return -1;
        }
    },
    playlistToSongs : (name) => {
        const list = playlists.find( pl=> pl.name == name );
        return collectionApi.reduceListItemsToSongs(list.entries);
    },
    reduceListItemsToSongs : (playlistItems) => {
        let returnVal = [];
        let songlist = songList();
        playlistItems.forEach(e =>{
            let ekey = parseInt(e.key);
            switch(e.type){
                case "song":
                    returnVal = returnVal.concat( _.filter(songlist, e => {return e.songPk == ekey;})  );
                    break;
                case "album":
                    returnVal = returnVal.concat( _.filter(songlist, e => {return e.albKey == ekey;}) );
                    break;
                case "artist":
                    returnVal = returnVal.concat( _.filter(songlist, e => {return e.artistKey == ekey;})  );
                    break;
            }
        });
        return returnVal;
    },   
    writePlaylistSongs : (playlist) => {
        try{
            if(!validPlayList(playlist)){ return -2;} else{
            const selectedSonglist =  collectionApi.reduceListItemsToSongs(playlist.entries);
            let returnVal = "SET SOURCE=\r\nSET DEST=\r\n";
            for(let i=0;i<selectedSonglist.length;i++){
                const selectedSong = collectionApi.songById(selectedSonglist[i].songPk)
                //console.log(`${JSON.stringify(selectedSong)}`)
                if(selectedSong.length>0){
                    const path = selectedSong[0].fullpath
                    returnVal = returnVal + `mkdir "%DEST%${path.substring(0,path.lastIndexOf('\\'))}"\r\ncopy "%SOURCE%${path}" "%DEST%${path}"\r\n`;
                }
            }  
            return returnVal;
        }
        }
        catch(e){
            return -1;
        }    
    },

    /* other methods */
    albumCount : albums.length,
    artistCount: artists.length,
    artistQuery: (matchingObject, sortColumns, sortOrders) => {
        return _.orderBy(_.filter(artists, convertArtist(matchingObject)),sortColumns,sortOrders);
    },
    albumQuery: (matchingObject, sortColumns, sortOrders) => {
        return _.orderBy(_.filter(albums, matchingObject),sortColumns,sortOrders);
    },
    randomArtist: () => {
        return artists[_.random(0,artists.length-1)];
    },
    randomAlbum: () => {
        return albums[_.random(0,albums.length-1)];
    },
    randomSong: (playlist) => {
        const songL = (playlist===undefined) ? songList() : collectionApi.playlistToSongs(playlist);
        return songL[_.random(0,songL.length-1)];
    },
    artistAggByQuery: (col) => {
        return aggQuery(artists, col,  ['songCount','sizeInMb', 'albumCount']);
    },
    albumAggByQuery: (col) => {
        return aggQuery(albums, col, ['songcount','sizeInMb']);
    },
    songQuery: (searchPattern) => {
        return _.filter(songList(),(e)=>{
            return e.songName.toLowerCase().indexOf(searchPattern.toLowerCase()) !== -1;
        });
    },
    albumTitleQuery: (searchPattern) => {
        return _.filter(albums,(e)=>{
            return e.title.toLowerCase().indexOf(searchPattern.toLowerCase()) !== -1;
        });
    },
    artistNameQuery: (searchPattern) => {
        return _.filter(artists,(e)=>{
            return e.artist.toLowerCase().indexOf(searchPattern.toLowerCase()) !== -1;
        });
    },
    songById: (id) => {
        return _.filter(songs,(e) => {
            return e.songPk == id;
        });
    }
};

export default collectionApi;


