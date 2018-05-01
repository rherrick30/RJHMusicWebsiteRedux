import React, {PropTypes} from 'react';
import ArtistListAlbumDetail from './ArtistListAlbumDetail';

const ArtistListArtistDetail = (props) => {
    const item = props.artist;
    if(item.artist === undefined) {
        return (<div className="artistListArtistDetail">Please select an artist</div>); 
    }
    else{
        return(<div className="artistListArtistDetail">
                    <h3>{item.artist}</h3>
                    <p>from {item.nationality}.  I've been a fan since {item.dateOfInterest}</p>
                    {item.albums.map(a => {
                    return (<ArtistListAlbumDetail key={a.albumpk} album={a} artistName={item.artist}  />);
                })}
                </div>);
    }
};

ArtistListArtistDetail.propTypes = {
    artist: PropTypes.object.isRequired
};

export default ArtistListArtistDetail;