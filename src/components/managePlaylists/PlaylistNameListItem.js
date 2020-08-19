import React from 'react';
import PropTypes from 'prop-types';


const PlayListNameListItem = (props) => {
    return(
        <div><a className="artistBrowserListEntry" onClick={()=> this.props.selectFunction(props.playlist)} href="#">{props.playlist.name}</a><br/></div>
    );
}

PlayListNameListItem.propTypes = {
    playlist: PropTypes.object.isRequired,
    selectFunction: PropTypes.func
};


export default PlayListNameListItem;