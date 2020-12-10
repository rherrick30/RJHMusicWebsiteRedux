import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import apiHelper from '../../api/apiHelper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playlistActions from '../../actions/playlistActions';

const StatsPanel = (props) =>  { 

    const albumFormat = (a) => {
        let result = [];
        result.push(<div>
            <a href="#" onClick={()=>{addToPlaylist(a)}}><i className="fas fa-plus-circle"></i></a>
            {'   '}
            <span className="homeAlbumTitle">{a.title}</span> by <span className="homeAlbumArtist">{a.artist}</span>
            </div>);
        return result[0];
    };
   
    const addToPlaylist = (album) => {
        props.playlistActions.pushPlaylist({
            songs: album.songs.map(s=>{
                return Object.assign({}, s, {title: album.title, artist: album.artist})
            })
        });
    }

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
            return(<li key={"newest-"+a._id}>{albumFormat(a)}</li>);

        })}</ul>
        </div>
        <div className="StatsItem">{`Here are the last ${stats.newestAlbums.length} albums:`}
        <ul>{stats.newestAlbums.map( a=>{
            return(<li key={"newest-"+a._id}>{albumFormat(a)}</li>);
        })}</ul>
        </div>
    </div>);
}


StatsPanel.propTypes = {
    playlistActions : PropTypes.object.isRequired
};

const mapStateToProps = (state ) =>{
    return {
        playlist: state.playlist
    };
};

const mapDispatchToProps = (dispatch) => {
    return { 
        playlistActions: bindActionCreators(playlistActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps) (StatsPanel);

