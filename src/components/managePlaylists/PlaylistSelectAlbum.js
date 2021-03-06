import React from 'react';
import PlaylistSelectionBase from './PlaylistSelectionBase';
import { isArray } from 'util';
import PlaylistSourceItem from './PlaylistSourceItem';
import apiHelper from '../../api/apiHelper'

class PlaySelectAlbum extends PlaylistSelectionBase {
    constructor(props){
        super(props);
        this.state = {
            filteredArtists: this.props.artists,
            selectedArtist : {
                albums:[]
            }
        };
        this.selectAlbum = this.selectAlbum.bind(this);
        this.selectArtist = this.selectArtist.bind(this);
    }
    selectAlbum(album){
        const newItem = {
            type : "album",
            key : album._id,
            title : `${album.title} (by ${this.state.selectedArtist.artist})`,
            songCount: album.songCount,
            sizeInMb: album.sizeInMb,
        };
        this.props.selectFunction(newItem);
    }
    selectArtist = async (event) => {
        const selectedId = event.target.value;
        if( selectedId!=-1){
            const newArtist = await apiHelper.artist(selectedId)
            this.setState(() => ({ selectedArtist: newArtist}))
        }
    }
    render(){
    const localArtists = (isArray(this.state.filteredArtists)) ? this.state.filteredArtists : [];    
    return(<div>
        <h3>Select an Artist, then pick an Album</h3>
        <label>artist filter:</label><input type="text" onChange={this.filterTextChange}></input><p />
        <select className="managePlaylistsArtistSelect" onChange={this.selectArtist}>
        <option value="-1">(Select an Artist)</option>
        {localArtists.map(a=>{
                    return(<option key={a.artist} value={a._id}>{a.artist}</option>);
                })}
        </select><p/>
        {this.state.selectedArtist.albums.map(a=>{
            return(<PlaylistSourceItem key={"alb:" + a.title} oItem={a} displayText={a.title} selectFunction={this.selectAlbum} />);
         })}
        </div>);
    }
}

export default PlaySelectAlbum;


/**
  
 */