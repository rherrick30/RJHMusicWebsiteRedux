import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import PlaylistSelectAlbum from './PlaylistSelectAlbum';
import PlaylistSelectArtist from './PlaylistSelectArtist';
import PlaylistSelectSong from './PlaylistSelectSong';

class PlaylistItemSelector extends React.Component {
    constructor(props, context){
        super(props, context);
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this._selectType = this._selectType.bind(this);
        this.state = {
            selectedType: "artist"
        };
    }
    _selectType(event){
        let selectedType = event.target.value;
        this.setState(prevState=>({
            selectedType: selectedType
        }));
    }
    addToPlaylist(type, key, title){

    }
    selectedPicker(){
        switch(this.state.selectedType){
            case "album":
            return (<PlaylistSelectAlbum artists={this.props.artists} selectFunction={this.props.selectFunction} />);
            case "song":
            return (<PlaylistSelectSong artists={this.props.artists} selectFunction={this.props.selectFunction} />);
            default:
            return (<PlaylistSelectArtist artists={this.props.artists} selectFunction={this.props.selectFunction} />);
        }
    }
    render(){
    return(<div className="artistBrowserList">
                <div className="selectPlaylistItems">
                    <a href="#" className="selectPlaylistItem" value="artist" onClick={this._selectType}>artists</a>
                    {" | "}
                    <a href="#" className="selectPlaylistItem" value="album" onClick={this._selectType}>album</a>
                    {" | "}
                    <a href="#" className="selectPlaylistItem" value="song" onClick={this._selectType}>song</a>
                </div>
                <div className="selectionArea">
                    {this.selectedPicker()}
                </div>
          </div>);
    }
}

PlaylistItemSelector.propTypes = {
    selectFunction: PropTypes.func,
    artists: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default PlaylistItemSelector;

