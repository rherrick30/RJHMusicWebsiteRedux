import React, {PropTypes} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {render} from 'react-dom';
import SongTile from './SongTile';

const SortableSongTile = SortableElement(SongTile);

export default SortableSongTile;