import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ArtistListSongDetail from './ArtistListSongDetail';
import * as playlistActions from '../../actions/playlistActions';

class ArtistListAlbumDetail extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
        };
        this.addSongsToListTop = this.addSongsToListTop.bind(this);
        this.addSongsToListEnd = this.addSongsToListEnd.bind(this);
        this.addEntireAlbum = this.addEntireAlbum.bind(this);
    }
    addSongsToListTop(songs){
        this.props.playlistActions.addPlaylistNext({
            songs: songs.map( s => {
                 return Object.assign({}, s, {
                    title : this.props.album.title,
                    artist : this.props.artistName,
                    albKey : this.props.album.albKey
                 });
            })
        });
        /*let newSongs = [];
        // add suplimentary info for the player
        songs.forEach(s=>{
            let newSong = Object.assign({}, s);
            
            newSong.title = this.props.album.title;
            newSong.artist = this.props.artistName;
            newSong.albKey = this.props.album.albKey;
            
            newSongs.push(newSong);
        });
        this.props.playlistActions.addPlaylistNext({
            songs: newSongs
        });*/
    }
    addSongsToListEnd(songs){
        let newSongs = [];
        // add suplimentary info for the player
        songs.forEach(s=>{
            let newSong = Object.assign({}, s);
            
            newSong.title = this.props.album.title;
            newSong.artist = this.props.artistName;
            newSong.albKey = this.props.album.albKey;
            
            newSongs.push(newSong);
        });
        this.props.playlistActions.pushPlaylist({
            songs: newSongs
        });
    }
    addEntireAlbum()
    {
        this.addSongsToListEnd(this.props.album.songs);
    }
    render(){
    const album = this.props.album;
    return(<div>
                
                <div className="tooltip"><span className="tooltiptext">Move all songs to playlist (end)</span>
                <a href="#" onClick={this.addEntireAlbum}><i className="fas fa-plus-circle"></i></a></div>
                <span className="artistListAlbumTitle">{'   ' + album.title}</span> (Released {album.releaseYear}, purchased {album.aquisitionYear})
                <ul className="artistListSongList">
                {album.songs.map(s =>{
                    return(<ArtistListSongDetail key={"song" + s.songPk} song={s} addSongsEndFunction={this.addSongsToListEnd} addSongsTopFunction={this.addSongsToListTop} />);
                })}
                </ul>
           </div>);
    }
}


ArtistListAlbumDetail.propTypes = {
    album: PropTypes.object.isRequired,
    artistName: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(ArtistListAlbumDetail);



