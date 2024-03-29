import React from 'react';
import PropTypes from 'prop-types';
import ArtistListAlbumDetail from './ArtistListAlbumDetail';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playlistActions from '../../actions/playlistActions';

const ArtistListArtistDetail = (props)=> {

    // prep for adding, hey we need to get a count anyway!
    const newSongs = [];
    const addAllSongsForArtist = () =>{
        props.playlistActions.pushPlaylist({
            songs: newSongs
        });
    }

    

    const item = props.artist;
    if(item.artist === undefined) {
        return (<div className="artistListArtistDetail">Please select an artist</div>); 
    }
    else{

        props.artist.albums.forEach( alb =>{
            alb.songs.forEach(s=>{
                let newSong = Object.assign({}, s);
                newSong.title = alb.title;
                newSong.artist = props.artist.artist;
                newSong.albKey = alb.albumpk;
                newSongs.push(newSong);
            });
        });


        return(<div className="artistListArtistDetail">
                    <h3>{item.artist}</h3> {newSongs.length} song{(newSongs.length>1)?'s' : ''} on {item.albums.length} album{(item.albums.length>1)?'s' : ''}
                    <p>
                        from {item.nationality}.  {`I've been a fan since ${item.dateOfInterest}`}  <a href="#" onClick={addAllSongsForArtist}><i className="fas fa-plus-circle defaultColor"></i></a>(add all songs)
                    </p>
                    {item.albums.map(a => {
                    return (<ArtistListAlbumDetail key={a._id} album={a} artistName={item.artist}  />);
                })}
                </div>);
    }
   
}

ArtistListArtistDetail.propTypes = {
    artist: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(ArtistListArtistDetail);