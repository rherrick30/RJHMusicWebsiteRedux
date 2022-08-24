import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as artistActions from '../../actions/artistActions';
import apiHelper from '../../api/apiHelper';
import ArtistList from './components/ArtistList';
import ArtistDetail from './components/ArtistDetail';
import styles from './artistTile.css'
import Modal from 'react-modal';

const ArtistTilesPage = (props) => {

    const [selectedArtist, setSelectedArtist] = useState({});
    const [filteredArtists, setFilteredArtists] = useState(props.artists);
    const [filterText, setFilterText] = useState("")
    const [modalIsOpen, setIsOpen] = useState(false);

    const filterTextChange = (sender) => {
        const filterText = sender.target.value.toLowerCase();
        setFilterText(filterText);
    }

    const selectArtist = async (sender) => {
        const artist = await apiHelper.artist(sender._id)
        setSelectedArtist(artist)
        setIsOpen(true)
    }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
        'background-color': 'slate',
        color: 'white',
      };

    function closeModal() {
        setIsOpen(false);
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
           <label>Search for:</label><input type="text" value={filterText} onChange={filterTextChange}></input>
           <input type="button" onClick={randomArtist} value="Random" />
           <ArtistList artists={(Array.isArray(filteredArtists)) ? filteredArtists : []} selectFunction={selectArtist} />
        
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
             <button className="playlistButton" onClick={closeModal}>close</button>
             <ArtistDetail artist={selectedArtist}/>         
        </Modal>

           <br />
       </div>
    );
    
}


ArtistTilesPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ArtistTilesPage);
