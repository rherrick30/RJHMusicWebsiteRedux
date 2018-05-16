import React, {PropTypes} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {render} from 'react-dom';
import SongTile from './SongTile';

const SortableSongList = SortableContainer((props) => {
    return (
      <div>
        {props.songs.map((a, ndx) => (
          <SongTile key={ndx + ":" + props.keyName} index={ndx} parentKey={ndx  + ":" + props.keyName} song={a} actionButtons={props.actionButtons} />
        ))}
      </div>
    );
});


SortableSongList.propTypes = {
    actionButtons : PropTypes.array.isRequired,
    keyName : PropTypes.string.isRequired
};

export default SortableSongList;