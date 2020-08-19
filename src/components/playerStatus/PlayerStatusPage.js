import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playlistActions from '../../actions/playlistActions';
import * as songhistActions from '../../actions/songhistActions';
import SongTile from './SongTile';
import SortableSongList from './SortableSongList';
import apiHelper from '../../api/apiHelper';


const PlayerStatusPage = (props) => {

    const [playlistName, setPlaylistName] = useState("");

    const clearPlaylist = () => {
        props.playlistActions.clearPlaylist({});
    }
    const shufflePlaylist = () =>{
        props.playlistActions.shufflePlaylist(props.playlist);
    }
    const savePlaylist = () => {
        const newPaylist = {
            name: playlistName,
            entries: props.playlist.map( s=>{
                return{
                    type: "song",
                    key: s._id,
                    title:  `${s.songName} (from ${s.title} by ${s.artist})`
                };
            })
        };
        apiHelper.savePlayList(newPaylist)
    }
    const onPlaylistNameChange = (sender) => {
        const playListName = sender.target.value;
        setPlaylistName(playListName);
    }
    const addSongToEnd = (song) => {
        props.playlistActions.pushPlaylist({ songs : [song]});
    }
    const addSongToTop = (song) => {
        props.playlistActions.addPlaylistNext({ songs : [song]});
    }
    const removeSong = (song) => {
        props.playlistActions.removePlaylist(song);
    }
    const onSortEnd = ({oldIndex, newIndex}) => {
        props.playlistActions.swapTwoItems(props.playlist,oldIndex,newIndex);
    }
    
    const queueButtons = [
        {iconClass: "fas fa-times-circle", actionFx : removeSong}
    ];
    const historyButtons = [
        {iconClass: "fas fa-arrow-alt-circle-up", actionFx : addSongToTop},
        {iconClass: "fas fa-arrow-alt-circle-down", actionFx : addSongToEnd}
    ];

    return(
        <div className="about">
            <h1>Player Status</h1>
            <input type="button" className="playlistButton" value="Clear Playlist" onClick={clearPlaylist}/>
            <input type="button" className="playlistButton" value="Shuffle Playlist" onClick={shufflePlaylist}/>
            <div >
                <input type="text" onChange={onPlaylistNameChange}  />
                <input type="button" className="playlistButton" value="Save Playlist" onClick={savePlaylist}/>
            </div>
            <div className="aboutCurrentlyPlaying" >
            <h5>Current Queue:</h5>
            </div>
            <SortableSongList 
                pressDelay={200}
                songs={(Array.isArray(props.playlist)) ? props.playlist : []} 
                actionButtons={queueButtons} 
                keyName="playlist" 
                onSortEnd={onSortEnd}
            />
            <div className="aboutSongHistory" >
            <h5>Play History:</h5>
            
            {(Array.isArray(props.songhist)) ?  props.songhist.map((s,ndx) =>{
            return(<SongTile key={ndx + ":history"} parentKey={ndx + ":history"} song={s} actionButtons={historyButtons}/>);
            }): (<div />)}
            </div>
            <div className="footer">
            By <a href="//commons.wikimedia.org/wiki/User:Basile_Morin" title="User:Basile Morin">Basile Morin</a> - <span className="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/4.0" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=86948782">Link</a>  
            </div>
        </div>
    );
}



PlayerStatusPage.propTypes = {
    songhist : PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    playlist: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    playlistActions: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>{
    return {
        playlist: state.playlist,
        songhist: state.songhist
    };
};

const mapDispatchToProps = (dispatch) => {
    return { 
        playlistActions: bindActionCreators(playlistActions, dispatch),
        songhistActions: bindActionCreators(songhistActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerStatusPage);

