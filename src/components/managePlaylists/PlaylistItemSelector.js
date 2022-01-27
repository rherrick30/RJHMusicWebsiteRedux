import React, {useState} from 'react';
import PropTypes from 'prop-types';
import PlaylistSelectAlbum from './PlaylistSelectAlbum';
import PlaylistSelectArtist from './PlaylistSelectArtist';
import PlaylistSelectSong from './PlaylistSelectSong';

const PlaylistItemSelector = (props) => {
    const [selectedType, setSelectedType] = useState("artist");

    const selectedPicker = () => {
        switch(selectedType){
            case "album":
            return (<PlaylistSelectAlbum artists={props.artists} selectFunction={props.selectFunction} />);
            case "song":
            return (<PlaylistSelectSong artists={props.artists} selectFunction={props.selectFunction} />);
            default:
            return (<PlaylistSelectArtist artists={props.artists} selectFunction={props.selectFunction} />);
        }
    }

    const playlistItemLink = (_type) => { return (<a href="#" className="selectPlaylistItem defaultColor" 
            onClick={()=>{
                setSelectedType(_type);
            }}>{`${_type}`}</a>)  }

    return(<div className="artistBrowserList">
                <div className="selectPlaylistItems">
                    {playlistItemLink('artist')}
                    {" | "}
                    {playlistItemLink('album')}
                    {" | "}
                    {playlistItemLink('song')}
                </div>
                <div className="selectionArea">
                    {selectedPicker()}
                </div>
          </div>);
}

PlaylistItemSelector.propTypes = {
    selectFunction: PropTypes.func,
    artists: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default PlaylistItemSelector;

