import React, {PropTypes} from 'react';
import PlaylistSelectionBase from './PlaylistSelectionBase';
import { isArray } from 'util';
import PlaylistSourceItem from './PlaylistSourceItem';

class PlaySelectSong extends PlaylistSelectionBase {
    constructor(props){
        super(props);
        this.state = {
            filteredArtists: this.props.artists,
            selectedArtist : {
                albums:[]
            },
            selectedAlbum : {
                songs: []
            }
        };
        this.selectSong = this.selectSong.bind(this);
        this.selectAlbum = this.selectAlbum.bind(this);
        this.selectArtist = this.selectArtist.bind(this);
    }
    selectSong(song){
        const newItem = {
            type : "song",
            key : song.songPk,
            title : `${song.songName} (by ${this.state.selectedArtist.artist} from ${this.state.selectedAlbum.title})`
        };
        this.props.selectFunction(newItem);
    }
    selectAlbum(event){
        const selectedId = event.target.value;
        let newAlbum = {};
        this.state.selectedArtist.albums.forEach(a=>{
            if(a.albumpk == selectedId){ newAlbum = a;}
        });
        this.setState(prevState=>({
            selectedAlbum : newAlbum
        }));
    }
    selectArtist(event){
        const selectedId = event.target.value;
        let newArtist = {};
        this.state.filteredArtists.forEach(a => {
            if(a._id == selectedId){ newArtist = a;}
        });
        this.setState(prevState => ({
            selectedArtist: newArtist
        }));
    }
    render(){
    const localArtists = (isArray(this.state.filteredArtists)) ? this.state.filteredArtists : [];
    return(<div>
        <h3>Select an Artist {"&"} Album and then pick a Song</h3>
        <label>artist filter:</label><input type="text" onChange={this.filterTextChange}></input>
        <select className="managePlaylistsArtistSelect"  onChange={this.selectArtist}>
        <option value="-1">(Select Artist)</option>
        {localArtists.map(a=>{
            return(<option key={a.artist} value={a._id}>{a.artist}</option>);
        })}
        </select><p/>
        <label>albums:</label><select className="managePlaylistsArtistSelect"  onChange={this.selectAlbum}>
        <option value="-1">(Select Album)</option>
        {this.state.selectedArtist.albums.map(a=>{
            return(<option key={"alb:" + a.title} value={a.albumpk}>{a.title}</option>);
        })}
        </select><p />
        {this.state.selectedAlbum.songs.map(s=>{
            return(<PlaylistSourceItem key={"song:" + s.songName} oItem={s} displayText={s.songName} selectFunction={this.selectSong} />);
         })}
        </div>);
    }
}

export default PlaySelectSong;

/*
        {this.state.selectedArtist.albums.map(a=>{
            return(<PlaylistSourceItem key={"alb:" + a.title} oItem={a} displayText={a.title} selectFunction={this.selectAlbum} />);
         })}
 */