import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as artistActions from '../../actions/artistActions';
import ArtistList from './ArtistList';
import ArtistListArtistDetail from './ArtistListArtistDetail';
import apiHelper from '../../api/apiHelper';

const ArtistListPage = (props) => {

    const [selectedArtist, setSelectedArtist] = useState({});
    const [filteredArtists, setFilteredArtists] = useState(props.artists);
    const [filterText, setFilterText] = useState("")

    const filterTextChange = (sender) => {
        const filterText = sender.target.value.toLowerCase();
        setFilterText(filterText);
    }

    const selectArtist = async (sender) => {
        const artist = await apiHelper.artist(sender._id)
        setSelectedArtist(artist)
    }

    useEffect(()=>{
        if(filterText.length>0){
            const reSearchKey = new RegExp(filterText.toLowerCase())
            setFilteredArtists(Object.assign([], props.artists.filter(a => reSearchKey.test(a._sortkey.toLowerCase()))))
        }else{
            setFilteredArtists(Object.assign([], props.artists))
        }
    }, [filterText]) 
    
    const randomArtist = () =>{
        apiHelper.randomArtist().then( value=>{
            const artistName = (Array.isArray(value) && value.length>0)
            ? value[0].artist
            : "" 
            setFilterText(artistName);
        });
    }
    
    return (
       <div className="artistListMainView">
           <h1>Artist List</h1>
           <div className="artistSearchInput">
           <label>Search for:</label><input type="text" value={filterText} onChange={filterTextChange}></input>
           <input type="button" onClick={randomArtist} value="random" />
           </div>
           <ArtistList artists={(Array.isArray(filteredArtists)) ? filteredArtists : []} selectFunction={selectArtist} />
           <ArtistListArtistDetail artist={selectedArtist}/>
       </div>
    );
    
}


ArtistListPage.propTypes = {
    artists: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>{
    return {
        artists: state.artists
    };
};

const mapDispatchToProps = (dispatch) => {
    return { 
        actions: bindActionCreators(artistActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistListPage);
