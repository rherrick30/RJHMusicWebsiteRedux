import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playlistActions from '../../actions/playlistActions';
import apiHelper from '../../api/apiHelper';
import PlaylistDetailItem from './PlaylistDetailItem';

const PlaylistDetail = (props) => {

    const addAllSongsInPlaylist = () => {
        let newSongs = [];
        apiHelper.playlistsongs(props.selectedList._id).then((res)=>{
            newSongs = newSongs.concat(res);
            props.playlistActions.clearPlaylist({});
            props.playlistActions.pushPlaylist({
                    songs: newSongs
                });
            });
    }

    const item = props.selectedList;
    if(item.name === undefined) {
        return (<div className="artistListArtistDetail">Please select a playlist</div>); 
    }
    else{
        return(<div className="artistListArtistDetail">
                    <h3>
                    <input type="button" className="playlistButton" onClick={addAllSongsInPlaylist} value="set playlist" />
                    <span>   </span>
                    {item.name}
                    {(item.songCount) ? `  (${item.songCount} songs,` : ""}
                    {(item.listSize) ? (item.listSize>1000) ? `  ${Math.round(item.listSize/1000*100)/100} Gb)` : `  ${Math.round(item.listSize*100)/100} Mb)` : ""}
                    </h3>
                    {item.entries.map(a => {
                    return (<PlaylistDetailItem key={a.key + ":" + a.type} item={a} removeFunction={props.removeFunction} />);
                    })}
                </div>);
    }
    
}

PlaylistDetail.propTypes = {
    selectedList: PropTypes.object.isRequired,
    removeFunction : PropTypes.func.isRequired,
    playlistActions: PropTypes.object.isRequired
};


const mapStateToProps = (state) =>{
    return {
        playlist: state.playlist
    };
};

const mapDispatchToProps = (dispatch) => {
    return { 
        playlistActions: bindActionCreators(playlistActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetail);