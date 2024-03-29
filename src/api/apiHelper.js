import {getFunction, postFunction, putFunction, deleteFunction} from './apiExecutor'

//const baseUrl = '/api/' 
const baseUrl = process.env.API_URL;

const apiHelper = {
 
    randomAlbum(){
        return getFunction(baseUrl + 'randomAlbum?includeArtist=true&includeSongs=true');
    },
    randomArtist(){
        return getFunction(baseUrl + 'randomArtist');
    },
    randomSong(item){
        if(item === undefined)
            return getFunction(baseUrl + 'randomSong');
        else     
            return getFunction(baseUrl + 'randomSong/'+item);
    },
    artistSearch(searchPattern){
        return getFunction( baseUrl + 'artistSearch/'+ searchPattern);
    },
    albumSearch(searchPattern){
        return getFunction( baseUrl + 'albumquery/' + searchPattern);
    },
    songSearch(searchPattern){
        return getFunction(baseUrl + 'songquery/' + searchPattern);
    },
    albums(){
        return getFunction(baseUrl + 'albums');
    },
    album(id){
        return getFunction(baseUrl + `album/${id}?includeSongs=true&includeArtist=true`);
    },
    artists(randomize){
        return getFunction(baseUrl + `artists?includeAlbums=false&includeSongs=false&randomize=${(randomize)? "true" : "false"}`);
    },
    artist(id){
        return getFunction(baseUrl + 'artist/' + id + '?includeAlbums=true&includeSongs=true');
    },
    addArtist(artist){
        return postFunction(baseUrl + 'artist', artist );
    },
    updateArtist(artist){
        return putFunction( baseUrl + 'artist', artist);
    },
    deleteArtist(id){
        return deleteFunction(baseUrl + 'artist/' + id );
    },
    addAlbum(album){
        return postFunction( baseUrl + 'album', album );
    },
    updateAlbum(album){
        return putFunction( baseUrl + 'album', album );
    },
    deleteAlbum( id ){
        return deleteFunction(baseUrl + 'album/' + id );
    },
    albumQuery(queryOptions, updateFuntion, errorFunction){
        return postFunction(baseUrl + 'albumQuery', queryOptions, updateFuntion, errorFunction);
    },
    artistQuery(queryOptions){
        return postFunction(baseUrl + 'artistQuery', queryOptions);
    },
    albumAggQuery(queryOptions){
        return postFunction(baseUrl + 'albumAggQuery', queryOptions);
    },
    artistAggQuery(queryOptions){
        return postFunction(baseUrl + 'artistAggQuery', queryOptions);
    },
    savePlayList(playlist){
        return postFunction(baseUrl + 'playlist', playlist);
    },
    getPlayLists(){
        return getFunction(baseUrl + 'playlists');
    },
    getPlaylist(name){
        return getFunction(baseUrl + 'playlist/' + name);
    },
    playlistsongs(item){
        return getFunction(baseUrl + 'playlistsongs/' + item);
    },
    playlistCopyFile(playlist){
        return postFunction(baseUrl + 'writePlaylist', playlist);
    },
    getstats(){
        return getFunction(baseUrl + 'collectionstats')
    },
    getSummary(category){
        return postFunction(baseUrl + 'summary', {category})
    }

};


export default apiHelper;