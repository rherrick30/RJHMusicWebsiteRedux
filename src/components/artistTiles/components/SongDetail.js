import React from 'react';
import PropTypes from 'prop-types';

const SongDetail = (props) => {
    const _onClickEnd = () => {
        props.addSongsEndFunction([props.song]);
    }
    return(<li className="albumListSongTitle">
                <div className="tooltip"><span className="tooltiptext">Add to end of playlist</span><a onClick={_onClickEnd} href="#"><i className="fas fa-plus-circle defaultColor"></i></a></div>
                {'   ' + props.song.songName}</li>);
}

SongDetail.propTypes = {
    song: PropTypes.object.isRequired,
    addSongsEndFunction: PropTypes.func.isRequired
};

export default SongDetail;