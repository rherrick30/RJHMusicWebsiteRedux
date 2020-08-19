import React from 'react';
import PropTypes from 'prop-types';
import ArtistListItem from './ArtistListItem';

const ArtistList = (props) => {
    const artists = props.artists;
    return(<div className="artistBrowserList">
                {artists.map(a=>{
                    return(<ArtistListItem key={a.artist} artist={a} selectFunction={props.selectFunction} />);
                })}
          </div>);
};

ArtistList.propTypes = {
    artists: PropTypes.array.isRequired,
    selectFunction: PropTypes.func
};

export default ArtistList;