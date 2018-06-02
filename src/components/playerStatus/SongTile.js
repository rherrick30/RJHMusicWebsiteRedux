import React, {PropTypes} from 'react';
import {render} from 'react-dom';


const SongTile = (props) => {
    const _actionClick = (sender) => {
        console.log(`..in tile, song is ${JSON.stringify(props.song)}`)
        props.actionButtons[sender.target.value].actionFx(props.song);
    };
    let buttons = 
        props.actionButtons.map( (element,ndx) => {
          return(<a key={props.parentKey + ":btn:" + ndx} href="#" className="commandLink" onClick={_actionClick}><i className={element.iconClass} value={ndx}></i></a>);  
        });
    
    return(<div className="aboutMusicTile">{buttons}   {props.song.songName} <span className="aboutMusicTileSource">(from {props.song.title} by {props.song.artist})</span></div>);
};

SongTile.propTypes = {
    song: PropTypes.object.isRequired,
    actionButtons : PropTypes.array.isRequired,
    parentKey : PropTypes.string.isRequired
};

export default SongTile;