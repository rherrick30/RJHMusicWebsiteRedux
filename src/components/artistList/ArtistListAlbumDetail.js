import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ArtistListSongDetail from './ArtistListSongDetail';
import * as playlistActions from '../../actions/playlistActions';

const ArtistListAlbumDetail = (props) => {
    
    const addSongsToListTop = (songs) => {
        props.playlistActions.addPlaylistNext({
            songs: songs.map( s => {
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
        songs.forEach(s=>{
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
                <a href="#" onClick={addEntireAlbum}><i className="fas fa-plus-circle"></i></a></div>
                <span className="artistListAlbumTitle">{'   ' + album.title}</span> (Released {album.releaseYear}, purchased {album.aquisitionYear})
                <ul className="artistListSongList">
                {album.songs.map(s =>{
                    return(<ArtistListSongDetail key={"song" + s._id} song={s} addSongsEndFunction={addSongsToListEnd} addSongsTopFunction={addSongsToListTop} />);
                })}
                </ul>
        </div>);
    
}


ArtistListAlbumDetail.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ArtistListAlbumDetail);



