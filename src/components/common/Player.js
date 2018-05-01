import React, { Component, PropTypes } from 'react';
import apiHelper from '../../api/apiHelper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playlistActions from '../../actions/playlistActions';
import * as songhistActions from '../../actions/songhistActions';

class Player extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            song: {
                songTitle: "",
                title: "",
                artist: "",
                albKey: -1,
                songPk: -1
            },
            currentSongPosition: 0,
            totalSongLength: 0 ,
            playBtnClass : "fas fa-pause",
            volBtnClass : "fas fa-volume-up",
            message: "Now playing:",
            autoplay: false,
            history: []
        };
        this.nextFile = this.nextFile.bind(this); 
        this.playAudio = this.playAudio.bind(this);
        this.setSong = this.setSong.bind(this);
        this.reloadSong = this.reloadSong.bind(this);
        this.muteAudio = this.muteAudio.bind(this);
        this.timeUpdateHandler = this.timeUpdateHandler.bind(this);
        this.volumeAdjust = this.volumeAdjust.bind(this);
        this.songScan = this.songScan.bind(this);
    }
    setSong(data){
        if( data.length > 0)
        this.setState({song: data[0], autoplay: true});
    }
    nextFile(){
        let newSongs = [];
        const justPlayed = Object.assign({}, this.state.song);
        if (justPlayed.songPk > 0){
            newSongs.push(justPlayed);
            this.props.songhistActions.pushSonghist({
                songs: newSongs
            });
        }

        this.props.playlistActions.removePlaylist(justPlayed).then(() => {
            if(this.props.playlist.length>0){
                this.setSong([this.props.playlist[0]]);
            }
            else{
                apiHelper.randomSong().then(this.setSong);
            }
        });
    }
    playAudio(){
        const audio = document.getElementById("audioPlayer");
        if( this.state.playBtnClass == "fas fa-pause"){
            audio.pause();
            this.setState(prevState =>({ playBtnClass:"fas fa-play"}));
        }else{
            audio.play();
            this.setState(prevState =>({ playBtnClass:"fas fa-pause"}));
        }
    }
    reloadSong(){
        const audio = document.getElementById("audioPlayer");
        audio.currentTime = 0;
       //this.setState(prevState=> ({ song: this.state.song }));
    }
    muteAudio(){
        const audio = document.getElementById("audioPlayer");
        let volBtnClass = "fas fa-volume-up";
        if (audio.volume==0) {
            audio.volume =  1;
        }else{
            audio.volume = 0;
            volBtnClass = "fas fa-volume-off";
        }
        this.setState(prevState => ({
            volBtnClass: volBtnClass
        }));
    }
    timeUpdateHandler(){
        const audio = document.getElementById("audioPlayer");
        const progressBar = document.getElementById("songProgress");
        if( audio.duration && audio.currentTime){
            progressBar.value = (audio.duration==0) ? 0 : audio.currentTime  / audio.duration * 100;
            this.setState(prevState => ({
                totalSongLength: new Date(1000 * audio.duration).toISOString().substr(14, 5),
                currentSongPosition: new Date(1000 * audio.currentTime).toISOString().substr(14, 5)
            }));
        }
    }
    volumeAdjust(){
        const volume = document.getElementById("volumeControl");
        const audio = document.getElementById("audioPlayer");
        const newVolume = volume.value / 100;
        audio.volume = newVolume;
    }
    songScan(){
        const progressBarPos = document.getElementById("songProgress").value;
        const audio = document.getElementById("audioPlayer");
        audio.currentTime = audio.duration * progressBarPos / 100;
    }
    render(){
          return(
                <div>
                <p><span className="grandSongTitle">{this.state.song.songName}</span>{(this.state.song.songPk === -1) ? "" : " by "}
                <span className="grandArtist">{this.state.song.artist}</span> {(this.state.song.songPk === -1) ? "" : " (from the album " + this.state.song.title + ")"}</p>
                <audio id="audioPlayer" 
                    ref = "rjhAudio"
                    src={(this.state.song.songPk === -1) ? undefined :  "/api/song/" + this.state.song.songPk}  
                    type="audio/mp3" 
                    autoPlay={this.state.autoplay}
                    onTimeUpdate={this.timeUpdateHandler}
                    onEnded={this.nextFile} 
                    onLoad={this.nextFile}>
                </audio><p />
                <div className="playerControlStrip">
                    <a className="playerControl" onClick={this.reloadSong}><i className="fas fa-step-backward playerbutton"></i></a>
                    <a className="playerControl" onClick={this.nextFile}><i className="fas fa-step-forward playerbutton"></i></a>
                    <a className="playerControl" onClick={this.playAudio}><i className={this.state.playBtnClass}></i></a>
                    <div className="playerControl" ><a onClick={this.muteAudio}><i className={this.state.volBtnClass}></i></a></div>
                    <input className="playerVolumeControl" type="range" id="volumeControl" min="0" max="100" onChange={this.volumeAdjust} />
                    <span className="playerTimeDisplay">{this.state.currentSongPosition}</span>
                    /
                    <span className="playerTimeDisplay">{this.state.totalSongLength}</span>
                    <input className="playerSongProgress" type="range" id="songProgress" min="0" max="100" onChange={this.songScan} />
                </div>
                <div>
                there are {(this.props.playlist) ? this.props.playlist.length : 'null'} entries in the playlist
                </div>
                </div>
        );
    }
}

Player.propTypes = {
    songhist : PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    playlist: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    playlistActions: PropTypes.object.isRequired,
    songhistActions: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);

