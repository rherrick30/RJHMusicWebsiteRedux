import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playlistActions from '../../actions/playlistActions';
import * as songhistActions from '../../actions/songhistActions';


class AboutPage extends  React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {

        };
        this.clearPlaylist = this.clearPlaylist.bind(this);
        this.shufflePlaylist = this.shufflePlaylist.bind(this);
    }
    clearPlaylist(){
        this.props.playlistActions.clearPlaylist({});
    }
    shufflePlaylist(){
        this.props.playlistActions.shufflePlaylist(this.props.playlist);
    }
    render(){
        return(
            <div className="about">
                <h1>Player Status</h1>
                <input type="button" className="playlistButton" value="Clear Playlist" onClick={this.clearPlaylist}/>
                <input type="button" className="playlistButton" value="Shuffle Playlist" onClick={this.shufflePlaylist}/>
                <div className="aboutCurrentlyPlaying" >
                <h5>Current Queue:</h5>
                {this.props.playlist.map((a,ndx) =>{
                return(<div key={ndx + ":playlist"} className="aboutMusicTile">{a.songName} <span className="aboutMusicTileSource">(from {a.title} by {a.artist})</span></div>);
                })} 
                </div>
                <div className="aboutSongHistory" >
                <h5>Play History:</h5>
                {this.props.songhist.map((s,ndx) =>{
                return(<div key={ndx + ":history"} className="aboutMusicTile">{s.songName} <span className="aboutMusicTileSource">(from {s.title} by {s.artist})</span></div>);
                })}
                </div>
                <div className="footer">
                        Background photo By Martin Falbisoner - <span className="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/3.0" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=30697623">Link</a>
                </div>
            </div>
        );
    }
}


AboutPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);

