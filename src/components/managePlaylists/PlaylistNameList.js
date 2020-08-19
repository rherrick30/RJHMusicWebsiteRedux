import React from 'react';
import PropTypes from 'prop-types';
import PlaylistNameListItem from './PlaylistNameListItem';

const PlaylistNameList = (props) => {
    const playlists = props.playlists;
    return(<div className="artistBrowserList">
                {playlists.map(a=>{
                    return(<PlaylistNameListItem key={a.name} playlist={a} selectFunction={props.selectFunction} />);
                })}
          </div>);
};

PlaylistNameList.propTypes = {
    playlists: PropTypes.array.isRequired,
    selectFunction: PropTypes.func
};

export default PlaylistNameList;