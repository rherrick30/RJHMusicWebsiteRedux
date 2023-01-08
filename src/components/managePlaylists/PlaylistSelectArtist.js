import React from 'react';
import PlaylistSelectionBase from './PlaylistSelectionBase';
import PlaylistSourceItem from './PlaylistSourceItem';

class PlaySelectArtist extends PlaylistSelectionBase{
    constructor(props){
        super(props);
        this.selectArtist = this.selectArtist.bind(this);
    }
    selectArtist(artist){
        const newItem = {
            type : "artist",
            key : artist._id,
            title : artist.artist,
            songCount: artist.songCount,
            sizeInMb: artist.sizeInMb,
        };
        this.props.selectFunction(newItem);
    }
    render(){
    const localArtists = (Array.isArray(this.state.filteredArtists)) ? this.state.filteredArtists : [];
    return(<div>
        <h3>Select an Artist</h3>
        <label>Search for:</label><input type="text" onChange={this.filterTextChange}></input><p/>
        {localArtists.map(a=>{
                    return(<PlaylistSourceItem key={a.artist} oItem={a} displayText={a.artist} selectFunction={this.selectArtist} />);
                })}

        </div>);
    }
}

export default PlaySelectArtist;
