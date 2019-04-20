import React, {PropTypes} from 'react';
import _ from 'lodash';

const StatsPanel = (props) => { 
    const artists = props.artists;
    const artistCount = (artists.constructor === Array) ? artists.length : 0;
    const albumCount = (artists.constructor === Array) ? artists.reduce((acum, current)=> acum + parseInt(current.albumCount), 0) : 0;
    const songCount = (artists.constructor === Array) ? artists.reduce((acum, current)=> acum + parseInt(current.songCount), 0) : 0;
    const collectionSize = (artists.constructor === Array) ? artists.reduce((acum, current)=> acum + parseFloat(current.sizeInMb), 0.0) / 1024.0 : 0.0;

    const albumFormat = (a) => {
        let result = [];
        result.push(<div><span className="homeAlbumTitle">{a.title}</span> by <span className="homeAlbumArtist">{a.artist}</span></div>);
        return result;
    };

    const albumList = (artists.constructor === Array) ? artists.flatMap(a => a.albums.map(alb => {alb.artist = a.artist; return alb;})) : [];
    let topXNewest = [];
    let topXRandom = [];

    const NUMBER_NEWEST = 20;
    const NUMBER_RAND = 10;
    if(albumList.length>0){
        topXNewest = albumList.sort((a,b) => new Date(b.added) - new Date(a.added)).slice(0,NUMBER_NEWEST);
        for(let i=0; i<NUMBER_RAND;i++){
            topXRandom.push(albumList[_.random(0,albumList.length-1)]);
        }
    }
    


    return(<div className="statsPanel">
                    <h1>Rob's Music Collection</h1>

        <div className="statsItem">{`${artistCount.toLocaleString()} artists, ${albumCount.toLocaleString()} albums, ${songCount.toLocaleString()} songs, ${collectionSize.toLocaleString()} Gb total size`}</div>
        <div className="StatsItem">{`Here are ${NUMBER_RAND} albums to chose from :`}
        <ul>{topXRandom.map( a=>{
            return(<li key={a.albumpk}>{albumFormat(a)}</li>);
        })}</ul>
        </div>
        <div className="StatsItem">{`Here are the last ${NUMBER_NEWEST} albums:`}
        <ul>{topXNewest.map( a=>{
            return(<li key={a.albumpk}>{albumFormat(a)}</li>);
        })}</ul>
        </div>
    </div>);
};

StatsPanel.propTypes = {
    artists: PropTypes.array.isRequired
};

export default StatsPanel;