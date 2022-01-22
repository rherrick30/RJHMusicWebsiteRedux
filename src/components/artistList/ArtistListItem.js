import React from 'react';
import PropTypes from 'prop-types';


const ArtistListItem = (props) => {
    const _onClick = () => {
        props.selectFunction(props.artist);
    }
    return(
        <div><a className="artistBrowserListEntry defaultColor" onClick={_onClick} href="#">{props.artist.artist}</a><br/></div>
    )
}

ArtistListItem.propTypes = {
    artist: PropTypes.object.isRequired,
    selectFunction: PropTypes.func
};


export default ArtistListItem;