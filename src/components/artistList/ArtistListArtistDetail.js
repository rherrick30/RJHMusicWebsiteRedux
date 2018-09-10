import React, {PropTypes} from 'react';
import ArtistListAlbumDetail from './ArtistListAlbumDetail';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playlistActions from '../../actions/playlistActions';

class ArtistListArtistDetail extends React.Component {
    constructor(props, context){
        super(props, context);
        this.addAllSongsForArtist = this.addAllSongsForArtist.bind(this);
    }
    addAllSongsForArtist(){
        let newSongs = [];
        this.props.artist.albums.forEach( alb =>{
            alb.songs.forEach(s=>{
                let newSong = Object.assign({}, s);
                newSong.title = alb.title;
                newSong.artist = this.props.artist.artist;
                newSong.albKey = alb.albumpk;
                newSongs.push(newSong);
            });
        });
        this.props.playlistActions.pushPlaylist({
            songs: newSongs
        });
    }
    render(){
    const item = this.props.artist;
    if(item.artist === undefined) {
        return (<div className="artistListArtistDetail">Please select an artist</div>); 
    }
    else{
        return(<div className="artistListArtistDetail">
                    <h3>{item.artist}</h3>
                    <p>
                        from {item.nationality}.  I've been a fan since {item.dateOfInterest}  <a href="#" onClick={this.addAllSongsForArtist}><i className="fas fa-plus-circle"></i></a>(add all songs)
                    </p>
                    {item.albums.map(a => {
                    return (<ArtistListAlbumDetail key={a.albumpk} album={a} artistName={item.artist}  />);
                })}
                </div>);
    }
    }
}

ArtistListArtistDetail.propTypes = {
    artist: PropTypes.object.isRequired,
    playlistActions: PropTypes.object.isRequired
};


const mapStateToProps = (state, ownProps) =>{
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