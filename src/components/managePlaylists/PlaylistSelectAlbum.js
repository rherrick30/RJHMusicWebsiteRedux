import React from 'react';
import PlaylistSelectionBase from './PlaylistSelectionBase';
import PlaylistSourceItem from './PlaylistSourceItem';
import apiHelper from '../../api/apiHelper'
import Selector from '../controls/Selector'


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
        const selectedId = (event) ? event.value : -1;
        if( selectedId!=-1){
            const newArtist = await apiHelper.artist(selectedId)
            this.setState(() => ({ selectedArtist: newArtist}))
        }else{
            this.setState(()=> ({selectedArtist : {
                albums:[]
            }}))
        }
    }
    render(){
    const localArtists = (Array.isArray(this.state.filteredArtists)) ? this.state.filteredArtists : [];    
    return(<div>
        <h3>Pick an Artist, then select an Album</h3>
        <Selector 
            onChange={this.selectArtist}
            options = {localArtists.map(e=>{
                return {value:e._id, label:e.artist} 
            })}
            isClearable={true}
            placeholder={`Pick an artist`}
        /><p/>
        {this.state.selectedArtist.albums.map(a=>{
            return(<PlaylistSourceItem key={"alb:" + a.title} oItem={a} displayText={a.title} selectFunction={this.selectAlbum} />);
         })}
        </div>);
    }
}

export default PlaySelectAlbum;


/**
  
 */