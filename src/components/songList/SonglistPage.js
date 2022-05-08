import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import apiHelper from '../../api/apiHelper';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as playlistActions from '../../actions/playlistActions';

const SongListPage = (props) => {

    const [songResults, setSongResults] = useState([]);
    const [searchText, setSearchText] = useState("");

    const searchTextChange = (sender) => {
        const searchText = sender.target.value.toLowerCase();
        setSearchText(searchText);
    }

    const addPlaylistNext = (song) => {
        let newSong = Object.assign({}, song);
        props.playlistActions.addPlaylistNext({
            songs: [newSong]
        });
    }
    const addToPlaylist = async (song) => {
        const album = await apiHelper.album(song.albumfk)
        console.log(JSON.stringify(album))
        props.playlistActions.addPlaylistNext({
            songs: album.songs.map(s=>{
                return Object.assign({}, s, {title: album.title, artist: album.artist})
            })
        });
    }
    const executeSearch = () => {
        apiHelper.songSearch(searchText).then( songs =>{
            setSongResults(songs);
        });
    }
    const setTdProps = (state, rowInfo, column) => {
        return {
            onClick: () => {
                if( column.id === "addList"){
                    addToPlaylist( rowInfo.original);
                }else if( column.id === "playNext"){
                    addPlaylistNext( rowInfo.original);
                }
            }
        };   
    }
    
    const renderUpArrow = () =>  <i className="fas fa-arrow-alt-circle-up"></i>
    const renderDownArrow = () => <i className="fas fa-arrow-alt-circle-down"></i>

    const columns = [{
        Header: 'Song Title',
        accessor : 'songName'
    },
    {
        Header: 'Album Title',
        accessor : 'title'
    },
    {
        Header: 'Artist',
        accessor : 'artist'
    },
    {
        Header: 'Play Next',
        id: 'playNext',
        Cell: renderUpArrow
    },
    {
        Header: 'Add album to playlist',
        id: 'addList',
        Cell: renderDownArrow
    }
    ];

    return (
        <div className="songListMainView">
            <h3>Song List</h3>
            <input type="text" onChange={searchTextChange}/>
            <input type="button" onClick={executeSearch} value="search"/>
            <ReactTable 
                getTdProps={setTdProps}
                data={songResults} 
                columns={columns}
             />
        </div>
    );
}

SongListPage.propTypes = {
    playlistActions : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>{
    return {
        playlist: state.playlist
    };
};

const mapDispatchToProps = (dispatch) => {
    return { 
        playlistActions: bindActionCreators(playlistActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SongListPage);