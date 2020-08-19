import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import apiHelper from '../../api/apiHelper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playlistActions from '../../actions/playlistActions';
import * as songhistActions from '../../actions/songhistActions';
import _ from 'lodash';

const Player = (props) => {

    const [song, setSong] = useState({
        songTitle: "",
        title: "",
        artist: "",
        albKey: -1,
        _id: -1
    });
        
    const [currentSongPosition, setCurrentSongPosition] = useState(0);
    const [totalSongLength, setTotalSongLength] = useState(0)
    const [playBtnClass , setPlayBtnClass ] = useState("fas fa-pause")
    const [volBtnClass , setVolBtnClass ] = useState("fas fa-volume-up")
    const [playNext, setPlayNext] = useState(false)
    const [autoplay, setAutoplay] = useState(false)
    const [playlists, setPlaylists] = useState([])
    const [selectedPlaylist , setSelectedPlaylist ] = useState("(none)")
    const [autoRandomize, setAutoRandomize] = useState(false)

    useEffect(()=>{
        apiHelper.getPlayLists().then(
            result => { setPlaylists(result); },
        );
    },[])

    useEffect(()=>{
        if(playNext){
            if(props.playlist.length>0){
                let ndx=0
                if(autoRandomize){ndx = _.random(0,props.playlist.length-1);}
                setNextSong([props.playlist[ndx]]);
            }
            else{
                if(selectedPlaylist == "(none)"){
                    apiHelper.randomSong().then(setNextSong);
                }else{
                    apiHelper.randomSong(selectedPlaylist).then(setNextSong);
                }
            }
        }
        setPlayNext(false)
    },[props.playlist])

    const selectPlaylist = (event) =>{
        let newTag = (event.target.value == "(None)") ? "" : event.target.value;
        apiHelper.getPlayLists().then(
            result => { 
                setPlaylists(result);
                props.playlistActions.setTag(newTag);
                setSelectedPlaylist(newTag);
            }
        );
    }

    const setNextSong = (data) =>{
        if( data.length > 0){
            setSong(data[0]);
            setAutoplay(true);
        }
    }
    const nextFile = () => {
        setPlayNext(true)
        let newSongs = [];
        const justPlayed = Object.assign({}, song);
        if (justPlayed._id > 0){
            newSongs.push(justPlayed);
            props.songhistActions.pushSonghist({
                songs: newSongs
            });
        }

        props.playlistActions.removePlaylist(justPlayed).then(() => {
        
/*            
            if(props.playlist.length>0){
                //let ndx = (props.playlist[0]._id == justPlayed._id && ) ? 1 : 0;
                let ndx=0
                if(autoRandomize){ndx = _.random(0,props.playlist.length-1);}
                setNextSong([props.playlist[ndx]]);
            }
            else{
                if(selectedPlaylist == "(none)"){
                    apiHelper.randomSong().then(setNextSong);
                }else{
                    apiHelper.randomSong(selectedPlaylist).then(setNextSong);
                }
            }
*/            
        });
    }
    const playAudio = () => {
        const audio = document.getElementById("audioPlayer");
        if( playBtnClass == "fas fa-pause"){
            audio.pause();
            setPlayBtnClass("fas fa-play");
        }else{
            audio.play();
            setPlayBtnClass("fas fa-pause");
        }
    }
    const reloadSong = () => {
        const audio = document.getElementById("audioPlayer");
        audio.currentTime = 0;
    }

    const muteAudio = () => {
        const audio = document.getElementById("audioPlayer");
        let volBtnClass = "fas fa-volume-up";
        if (audio.volume==0) {
            audio.volume =  1;
        }else{
            audio.volume = 0;
            volBtnClass = "fas fa-volume-off";
        }
        setVolBtnClass(volBtnClass);
    }

    const timeUpdateHandler = () => {
        const audio = document.getElementById("audioPlayer");
        const progressBar = document.getElementById("songProgress");
        if( audio.duration && audio.currentTime){
            progressBar.value = (audio.duration==0) ? 0 : audio.currentTime  / audio.duration * 100;
            setCurrentSongPosition(new Date(1000 * audio.currentTime).toISOString().substr(14, 5))
            setTotalSongLength(new Date(1000 * audio.duration).toISOString().substr(14, 5))
        }
    }
    
    const volumeAdjust = () => {
        const volume = document.getElementById("volumeControl");
        const audio = document.getElementById("audioPlayer");
        const newVolume = volume.value / 100;
        audio.volume = newVolume;
    }
    const songScan = () => {
        const progressBarPos = document.getElementById("songProgress").value;
        const audio = document.getElementById("audioPlayer");
        audio.currentTime = audio.duration * progressBarPos / 100;
    }
    const setAutoRandom = (event) => {
        const isChecked = event.target.checked;
        setAutoRandomize(isChecked);
    }


    return(
          <div className="player">
          <p><span className="grandSongTitle">{song.songName}</span>{(song._id === -1) ? "" : " by "}
          <span className="grandArtist">{song.artist}</span> {(song._id === -1) ? "" : " (from the album " + song.title + ")"}</p>
          <audio id="audioPlayer" 
              src={(song._id === -1) ? undefined :  `${process.env.API_URL}playsong/${song._id}`}  
              type="audio/mp3" 
              autoPlay={autoplay}
              onTimeUpdate={timeUpdateHandler}
              onEnded={nextFile} 
              onLoad={nextFile}>
          </audio><p />
          <div className="playerControlStrip">
              <a className="playerControl" onClick={reloadSong}><i className="fas fa-step-backward playerbutton"></i></a>
              <a className="playerControl" onClick={nextFile}><i className="fas fa-step-forward playerbutton"></i></a>
              <a className="playerControl" onClick={playAudio}><i className={playBtnClass}></i></a>
              <div className="playerControl" ><a onClick={muteAudio}><i className={volBtnClass}></i></a></div>
              <input className="playerVolumeControl" type="range" id="volumeControl" min="0" max="100" onChange={volumeAdjust} />
              <span className="playerTimeDisplay">{currentSongPosition}</span>
              /
              <span className="playerTimeDisplay">{totalSongLength}</span>
              <input className="playerSongProgress" type="range" id="songProgress" min="0" max="100" onChange={songScan} />
          </div>
          <div>
          there are {(props.playlist && Array.isArray(props.playlist)) ? props.playlist.filter(a=>a).length : '0'} entries in the playlist. 
          Current Tag:<span>   </span><select onChange={selectPlaylist}>
              <option value={`(None)`}>(None)</option>
              {playlists.map(e=>{
                 return(<option key={e._id} value={e._id}>{e.name}</option>);
              })}
              </select>
              <input type="checkbox" value={autoRandomize} onChange={setAutoRandom}/> Auto Random?
          </div>
          </div>
   );

}

Player.propTypes = {
    songhist : PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    playlist: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    playlistActions: PropTypes.object.isRequired,
    songhistActions: PropTypes.object.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(Player);

