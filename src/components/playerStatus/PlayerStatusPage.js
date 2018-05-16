import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playlistActions from '../../actions/playlistActions';
import * as songhistActions from '../../actions/songhistActions';
import SongTile from './SongTile';
import SortableSongList from './SortableSongList';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {render} from 'react-dom';




class PlayerStatusPage extends  React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {

        };
        this.clearPlaylist = this.clearPlaylist.bind(this);
        this.shufflePlaylist = this.shufflePlaylist.bind(this);
        this.addSongToEnd = this.addSongToEnd.bind(this);
        this.addSongToTop = this.addSongToTop.bind(this);
        this.onSortEnd = this.onSortEnd.bind(this);
    }
    clearPlaylist(){
        this.props.playlistActions.clearPlaylist({});
    }
    shufflePlaylist(){
        this.props.playlistActions.shufflePlaylist(this.props.playlist);
    }
    addSongToEnd(song){
        this.props.playlistActions.pushPlaylist({ songs : [song]});
    }
    addSongToTop(song){
        this.props.playlistActions.addPlaylistNext({ songs : [song]});
    }
    onSortEnd({oldIndex, newIndex}){
        console.log(`old index is ${oldIndex} and new index is ${newIndex}`);
        this.props.playlistActions.swapTwoItems(this.props.playlist,oldIndex,newIndex);
    }
    render(){
        const queueButtons = [
            {iconClass: "fas fa-times-circle", actionFx : this.props.playlistActions.removePlaylist}
        ];
        const historyButtons = [
            {iconClass: "fas fa-arrow-alt-circle-up", actionFx : this.addSongToTop},
            {iconClass: "fas fa-arrow-alt-circle-down", actionFx : this.addSongToEnd}
        ];

        return(
            <div className="about">
                <h1>Player Status</h1>
                <input type="button" className="playlistButton" value="Clear Playlist" onClick={this.clearPlaylist}/>
                <input type="button" className="playlistButton" value="Shuffle Playlist" onClick={this.shufflePlaylist}/>
                <div className="aboutCurrentlyPlaying" >
                <h5>Current Queue:</h5>
                </div>
                <SortableSongList songs={this.props.playlist} actionButtons={queueButtons} keyName="playlist" onSortEnd={this.onSortEnd}/>
                <div className="aboutSongHistory" >
                <h5>Play History:</h5>
                {this.props.songhist.map((s,ndx) =>{
                return(<SongTile key={ndx + ":history"} parentKey={ndx + ":history"} song={s} actionButtons={historyButtons}/>);
                })}
                </div>
                <div className="footer">
                        Background photo By Martin Falbisoner - <span className="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/3.0" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=30697623">Link</a>
                </div>
            </div>
        );
    }
}


PlayerStatusPage.propTypes = {
    songhist : PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    playlist: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    playlistActions: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) =>{
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

