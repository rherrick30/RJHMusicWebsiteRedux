import React from "react";
import PropTypes from "prop-types";


const ArtistTile = ({artist, selectFunction}) => {

    return(
        <div className={`artistTile`} href="#" onClick={()=>selectFunction(artist)}>
            <p className="artistTileTitle">{artist.artist}</p>
            <p className="artistTileMinorText">{`${artist.songCount} song${(artist.songCount>1)?'s' : ''} on ${artist.albumCount} album${(artist.albumCount>1)?'s' : ''}`}</p>
        </div>
        )
}

ArtistTile.propTypes = {
    artist : PropTypes.object,
    selectFunction : PropTypes.func,
}

export default ArtistTile