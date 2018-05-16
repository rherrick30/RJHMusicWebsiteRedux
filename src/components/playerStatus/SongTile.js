import React, {PropTypes} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {render} from 'react-dom';


const SongTile = SortableElement((props) => {
    const _actionClick = (sender) => {
        props.actionButtons[sender.target.value].actionFx(props.song);
    };
    //const deleteLink = (props.showDelete) ? <a href="#" className="deleteLink" onClick={_deleteClick} value="deletion"><i className="fas fa-times-circle"></i></a>  : <div />;
    let buttons = 
        props.actionButtons.map( (element,ndx) => {
          return(<a key={props.parentKey + ":btn:" + ndx} href="#" className="commandLink" onClick={_actionClick}><i className={element.iconClass} value={ndx}></i></a>);  
        });
    
    return(<div className="aboutMusicTile">{buttons}   {props.song.songName} <span className="aboutMusicTileSource">(from {props.song.title} by {props.song.artist})</span></div>);
});

SongTile.propTypes = {
    song: PropTypes.object.isRequired,
    actionButtons : PropTypes.array.isRequired,
    parentKey : PropTypes.string.isRequired
};

export default SongTile;