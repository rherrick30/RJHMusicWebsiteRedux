import React from 'react';

import PlaylistSelectionBase from './PlaylistSelectionBase';
import { isArray } from 'util';
import PlaylistSourceItem from './PlaylistSourceItem';
import apiHelper from '../../api/apiHelper'
import Selector from '../controls/Selector'


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
            },
        };
        this.selectSong = this.selectSong.bind(this);
        this.selectAlbum = this.selectAlbum.bind(this);
        this.selectArtist = this.selectArtist.bind(this);
    }
    selectSong(song){
        const newItem = {
            type : "song",
            key : song._id,
            title : `${song.songName} (by ${this.state.selectedArtist.artist} from ${this.state.selectedAlbum.title})`,
            songCount: 1,
            sizeInMb: song.sizeInMb,
        };
        this.props.selectFunction(newItem);
    }
    selectAlbum(event){
        const selectedId = (event) ? event.value : -1;
        let newAlbum = {
            songs: []
        };
        this.state.selectedArtist.albums.forEach(a=>{
            if(a._id == selectedId){ newAlbum = Object.assign({},a);}
        });
        this.setState(()=>({
            selectedAlbum : newAlbum
        }));
    }
    selectArtist = async (event) => {
        const selectedId = (event) ? event.value : -1;
        if( selectedId!=-1){
            const newArtist = await apiHelper.artist(selectedId)
            this.setState(() => ({ 
                selectedArtist: newArtist,
                selectedAlbum: {songs:[]},
            }))
        }else{
            //this.selectAlbum(null);
            this.setState(()=> ({
                selectedArtist : { albums:[] },
                selectedAlbum: {songs:[]},
            }))
           }
    }
    render(){
    const localArtists = (Array.isArray(this.state.filteredArtists)) ? this.state.filteredArtists : [];
    return(<div>
        <h3>Select an Artist {"&"} Album and then pick a Song</h3>
        <Selector 
            onChange={this.selectArtist}
            options = {localArtists.map(e=>{
                return {value:e._id, label:e.artist} 
            })}
            isClearable={true}
            placeholder={`Pick an artist`}
        />
        <p/>
        <Selector 
            key={`albumselectorfir_${this.state.selectedArtist.artist || 'none'}`}
            onChange={this.selectAlbum}
            options = {this.state.selectedArtist.albums.map(e=>{
                return {value:e._id, label:e.title} 
            })}
            isClearable={true}
            placeholder={`Pick an album`}
        />
        <div key={this.state.selectedArtist.artist || 'acun'}>
        {this.state.selectedAlbum.songs.map(s=>{
            return(<PlaylistSourceItem key={`song:${s.songName}_${this.state.selectedArtist.artist || 'acun'}`} oItem={s} displayText={s.songName} selectFunction={this.selectSong} />);
         })}
         </div>
        </div>);
    }
}

export default PlaySelectSong;

/*
        {this.state.selectedArtist.albums.map(a=>{
            return(<PlaylistSourceItem key={"alb:" + a.title} oItem={a} displayText={a.title} selectFunction={this.selectAlbum} />);
         })}
 */