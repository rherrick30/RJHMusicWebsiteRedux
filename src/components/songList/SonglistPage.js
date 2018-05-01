import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as artistActions from '../../actions/artistActions';
import {browserHistory} from 'react-router';
import apiHelper from '../../api/apiHelper';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as playlistActions from '../../actions/playlistActions';

class SongListPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            songResults : [],
            searchText : ""
        };
        this.executeSearch = this.executeSearch.bind(this);
        this.searchTextChange = this.searchTextChange.bind(this);
        this.addToPlaylist  = this.addToPlaylist.bind(this);
        this.setTdProps = this.setTdProps.bind(this);
        this.addPlaylistNext = this.addPlaylistNext.bind(this);
    }
    searchTextChange(sender){
        const searchText = sender.target.value.toLowerCase();
        this.setState( prevState => ({
            searchText: searchText
        }));
    }
    addToPlaylist(song){
        let newSong = Object.assign({}, song);
        this.props.playlistActions.pushPlaylist({
            songs: [newSong]
        });
    }
    addPlaylistNext(song){
        let newSong = Object.assign({}, song);
        this.props.playlistActions.addPlaylistNext({
            songs: [newSong]
        });
    }
    executeSearch(){
        apiHelper.songSearch(this.state.searchText).then( songs =>{
            this.setState(prevState => ({
                songResults: songs
             }));
            }
        );
    }
    setTdProps(state, rowInfo, column, instance){
        return {
            onClick: (e, handleOriginal) => {
                if( column.id === "addList"){
                    this.addToPlaylist( rowInfo.original);
                }else if( column.id === "playNext"){
                    this.addPlaylistNext( rowInfo.original);
                }
            }
        };   
    }
    
render(){

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
            Cell: props =><i className="fas fa-arrow-alt-circle-up"></i>
        },
        {
            Header: 'Add to Playlist',
            id: 'addList',
            Cell: props => <i className="fas fa-arrow-alt-circle-down"></i>
        }
        ];
        return (
            <div className="songListMainView">
                <h3>Song List</h3>
                <input type="text" onChange={this.searchTextChange}/>
                <input type="button" onClick={this.executeSearch} value="search"/>
                <ReactTable 
                    getTdProps={this.setTdProps}
                    data={this.state.songResults} 
                    columns={columns}
                 />
            </div>
        );
    }
}

SongListPage.propTypes = {
    playlistActions : PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) =>{
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