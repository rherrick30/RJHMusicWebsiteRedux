import React from 'react';
import PropTypes from 'prop-types';



const SongTile = (props) => {
    let buttons = 
        props.actionButtons.map( (element,ndx) => {
          return(<a key={props.parentKey + ":btn:" + ndx} href="#" className="commandLink defaultColor" onClick={()=>{
              element.actionFx(props.song);
          }}><i className={element.iconClass} value={ndx}></i></a>);  
        });
    
    return(<div className="aboutMusicTile">{buttons}   {props.song.songName} <span className="aboutMusicTileSource">(from {props.song.title} by {props.song.artist})</span></div>);
};

SongTile.propTypes = {
    song: PropTypes.object.isRequired,
    actionButtons : PropTypes.array.isRequired,
    parentKey : PropTypes.string.isRequired
};

export default SongTile;