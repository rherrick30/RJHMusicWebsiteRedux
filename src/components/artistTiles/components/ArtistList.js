import React from 'react';
import PropTypes from 'prop-types';
import ArtistTile from './ArtistTile';

const ArtistList = (props) => {
    const artists = props.artists;
    return(<div className="artistTileArea">
                {artists.map(a=>{
                    return(<ArtistTile key={a.artist} artist={a} selectFunction={props.selectFunction} />);
                })}
          </div>);
};

ArtistList.propTypes = {
    artists: PropTypes.array.isRequired,
    selectFunction: PropTypes.func
};

export default ArtistList;