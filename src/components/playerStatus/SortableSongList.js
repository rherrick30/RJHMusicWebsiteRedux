import React from 'react';
import PropTypes from 'prop-types';
import {SortableContainer} from 'react-sortable-hoc';
import SortableSongTile from './SortableSongTile';

const SortableSongList = SortableContainer((props) => {
    return (
      <div>
        {props.songs.map((a, ndx) => (
          <SortableSongTile key={ndx + ":" + props.keyName} 
            index={ndx}
            parentKey={ndx  + ":" + props.keyName} 
            song={a} 
            actionButtons={props.actionButtons} />
        ))}
      </div>
    );
});


SortableSongList.propTypes = {
    actionButtons : PropTypes.array.isRequired,
    keyName : PropTypes.string.isRequired
};

export default SortableSongList;