import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SongDetail from './SongDetail';
import * as playlistActions from '../../../actions/playlistActions';

const AlbumDetail = (props) => {
    
    const addSongsToListTop = (songs) => {
        props.playlistActions.addPlaylistNext({
            songs: songs.filter(s=> s.exists).map( s => {
                 return Object.assign({}, s, {
                    title : props.album.title,
                    artist : props.artistName,
                    albKey : props.album.albKey
                 });
            })
        });
    }

    const addSongsToListEnd = (songs) => {
        let newSongs = [];
        // add suplimentary info for the player
        songs.filter(s=> s.exists).forEach(s=>{
            let newSong = Object.assign({}, s);
            
            newSong.title = props.album.title;
            newSong.artist = props.artistName;
            newSong.albKey = props.album.albKey;
            
            newSongs.push(newSong);
        });
        props.playlistActions.pushPlaylist({
            songs: newSongs
        });
    }
    const addEntireAlbum = () =>
    {
        addSongsToListEnd(props.album.songs);
    }
    const album = props.album;
    return(<div>
                
                <div className="tooltip"><span className="tooltiptext">Move all songs to playlist (end)</span>
                <a href="#" onClick={addEntireAlbum}><i className={`fas fa-plus-circle ${(album.songs.filter(s=> s.exists).length > 0) ? "defaultColor" : "disabledColor"}`}></i></a></div>
                <span className="artistListAlbumTitle">{'   ' + album.title}</span> (Released {album.releaseYear}, purchased {album.aquisitionYear})
                <ul className="artistListSongList">
                {album.songs.map(s =>{
                    return(<SongDetail key={"song" + s._id} song={s} addSongsEndFunction={addSongsToListEnd} addSongsTopFunction={addSongsToListTop} />);
                })}
                </ul>
        </div>);
    
}


AlbumDetail.propTypes = {
    album: PropTypes.object.isRequired,
    artistName: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetail);



