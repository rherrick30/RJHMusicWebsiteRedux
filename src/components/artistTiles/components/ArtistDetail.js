import React from 'react';
import PropTypes from 'prop-types';
import AlbumDetail from './AlbumDetail';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playlistActions from '../../../actions/playlistActions';

const ArtistDetail = (props)=> {

    // prep for adding, hey we need to get a count anyway!
    const newSongs = [];
    const addAllSongsForArtist = () =>{
        props.playlistActions.pushPlaylist({
            songs: newSongs.filter(s=> s.exists)
        });
    }

    

    const item = props.artist;
    if(item.artist === undefined) {
        return (<div className="artistTileArtistDetail">Please select an artist</div>); 
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


        return(<div className="artistTileArtistDetail">
                    <h3>{item.artist}</h3> {newSongs.length} song{(newSongs.filter.length>1)?'s' : ''} on {item.albums.length} album{(item.albums.length>1)?'s' : ''}
                    <p>
                        from {item.nationality}.  {`I've been a fan since ${item.dateOfInterest}`}  <a href="#" onClick={addAllSongsForArtist}><i className={`fas fa-plus-circle ${(newSongs.filter(s=> s.exists).length>0) ? "defaultColor" : "disabledColor"}`}></i></a>(add all songs)
                    </p>
                    {item.albums.map(a => {
                    return (<AlbumDetail key={a._id} album={a} artistName={item.artist}  />);
                })}
                </div>);
    }
   
}

ArtistDetail.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ArtistDetail);