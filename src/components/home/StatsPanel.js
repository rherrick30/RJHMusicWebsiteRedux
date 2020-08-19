import React, {useState, useEffect} from 'react';
import apiHelper from '../../api/apiHelper'

const StatsPanel = () =>  { 

    const albumFormat = (a) => {
        let result = [];
        result.push(<div><span className="homeAlbumTitle">{a.title}</span> by <span className="homeAlbumArtist">{a.artist}</span></div>);
        return result[0];
    };
   
    const [stats, setStats] = useState({artistCount:0, albumCount:0, songCount:0, sizeInMb:0, randomAlbums:[],newestAlbums:[] });
    const getStats = () =>{
        apiHelper.getstats().then(stats=> setStats(stats));
    }

    useEffect(()=>{
        getStats();
    },[])
   
    return(<div className="statsPanel">
                    <h1>{"Rob's Music Collection"}</h1>

        <div className="statsItem">{`${stats.artistCount.toLocaleString()} artists, ${stats.albumCount.toLocaleString()} albums, ${stats.songCount.toLocaleString()} songs, ${(stats.sizeInMb).toLocaleString()} Gb total size`}</div>
        <div className="StatsItem">{`Here are ${stats.randomAlbums.length} albums to chose from :`}
        <ul>{stats.randomAlbums.map( a=>{
            return(<li key={"rand-"+a._id}>{albumFormat(a)}</li>);
        })}</ul>
        </div>
        <div className="StatsItem">{`Here are the last ${stats.newestAlbums.length} albums:`}
        <ul>{stats.newestAlbums.map( a=>{
            return(<li key={"newest-"+a._id}>{albumFormat(a)}</li>);
        })}</ul>
        </div>
    </div>);
}

export default StatsPanel;

