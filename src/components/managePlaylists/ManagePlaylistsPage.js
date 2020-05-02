import React, {PropTypes, Component } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import apiHelper from '../../api/apiHelper';
import PlaylistNameList from './PlaylistNameList';
import PlaylistDetail from './PlaylistDetail';
import PlaylistItemSelector from './PlaylistItemSelector';
import _ from 'lodash';

class ManagePlaylistsPage extends React.Component{
    constructor(props, context){
        super(props, context);
        let allSongs = [];
        let allAlbums = [];
        this.props.artists.forEach(a=>{
            a.albums.forEach(alb=>{
                allAlbums.push({_id: alb.albumpk, songCount: alb.songcount, sizeInMb: alb.sizeInMb });
                allSongs = allSongs.concat(alb.songs.map(s=>{
                    return {_id: s.songPk, songCount: 1, sizeInMb: s.sizeInMb};
                }));
            });
        });
        this.state = {
            selectedPlaylist: {name:"", entries:[]},
            playlists: [],
            mode: "add",
            allSongs, allAlbums
        };
        this.setPlaylists = this.setPlaylists.bind(this);
        this.selectPlaylist = this.selectPlaylist.bind(this);
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.setMode = this.setMode.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.playlistNameChange = this.playlistNameChange.bind(this);
        this.removeFromPlaylist = this.removeFromPlaylist.bind(this);
        this.setSelectedPlaylist = this.setSelectedPlaylist.bind(this);
        this.calculateStatsLocal = this.calculateStatsLocal.bind(this);
        this.getReferencedItem = this.getReferencedItem.bind(this);
        this.createCopyFile = this.createCopyFile.bind(this);
        apiHelper.getPlayLists().then(
            result => { this.setPlaylists(result); },
            err => {}
        );
    }
    setPlaylists(result){
        this.setState(prevState => ({
            playlists: result
        }));
    }
    setSelectedPlaylist(result){
        this.setState(prevState => ({
            selectedPlaylist: result
        }));
    }
    updateSelectedPlaylistStats(result){
        const newSelected = Object.assign({}, this.state.selectedPlaylist, result);
        this.setSelectedPlaylist(newSelected);
    }
    selectPlaylist(event){
        let selectedItem = {};
        const selectedList = event.target.value;
        apiHelper.getPlaylist(selectedList).then(this.setSelectedPlaylist);
    }
    addToPlaylist(item){
        if(this.state.selectedPlaylist.entries.filter(o =>{
            return(o.type==item.type && o.title==item.title);
        }).length == 0){
            let newItemList = [ item, ...this.state.selectedPlaylist.entries ];
            let newPlaylist =  Object.assign({}, this.state.selectedPlaylist, {entries : newItemList}, this.calculateStatsLocal(newItemList));
            this.setState(prevState=>({
                selectedPlaylist: newPlaylist
            }));
        }
    }
    removeFromPlaylist(item){
        const revisedList = this.state.selectedPlaylist.entries.filter(o => {
            return( !( o.type==item.type && o.key==item.key));
        });
        let newPlaylist =  Object.assign({}, this.state.selectedPlaylist, {entries : revisedList},this.calculateStatsLocal(revisedList) );
        this.setState(prevState=>({
            selectedPlaylist: newPlaylist
        }));
    }
    getReferencedItem(slItem){
        let retval={};
        const relevantKey = parseInt(slItem.key);
        switch(slItem.type){
            case "artist":
                retval = _.find(this.props.artists, {'_id': relevantKey });
                break;
            case "album":
                retval = _.find(this.state.allAlbums, {'_id': relevantKey });
                break;
            case "song":
                retval = _.find(this.state.allSongs, {'_id': relevantKey });
                break;
        }
        return retval;
    }
    calculateStatsLocal(itemList){
        let songCount = 0; 
        let listSize= 0;
        itemList.forEach(e => {
            const item = this.getReferencedItem(e);
            songCount += item.songCount;
            listSize += item.sizeInMb;
        });
        return {songCount, listSize};
    }
    setMode(event){
        let newMode = event.target.value;
        this.setState(prevState=>({
            mode: newMode,
            selectedPlaylist: {
                name:"", entries:[]
            }
        }));
    }
    playlistNameChange(event){
        let newName = event.target.value;
        let newPlaylist =  Object.assign({}, this.state.selectedPlaylist, {name:newName});
        this.setState(prevState=>({
            selectedPlaylist: newPlaylist
        }));
    }   
    savePlaylist(){
        apiHelper.savePlayList(this.state.selectedPlaylist).then(
            (result) =>{},
            (err) => {}
        );
        
    }
    createCopyFile(){
        apiHelper.playlistCopyFile(this.state.selectedPlaylist).then(
            (result) => {
                let uriContent = "data:application/octet-stream," + encodeURIComponent(result);
                window.open(uriContent);
            },
            (err) => {
                //console.log(`ERROR->${err}`)
            }
        );
    }
    render(){
        return (
            <div className="artistListMainView">
                <h1>Manage Playlists:</h1>
                
                <form>
                    <input type="radio" name="mode" value="add" onClick={this.setMode} checked={this.state.mode=="add"} />add
                    <input type="radio" name="mode" value="edit" onClick={this.setMode} checked={this.state.mode=="edit"}/>edit
                    <span>   </span>
                    <select className={(this.state.mode == "edit") ? "visible": "invisible"} onChange={this.selectPlaylist}>
                        <option>(None)</option>
                        {this.state.playlists.map(e=>{
                            return(<option key={e.name}>{e.name}</option>);
                        })}
                    </select>
                    <input type="text" className={(this.state.mode == "add") ? "visible": "invisible"} onChange={this.playlistNameChange} />
                    <button type="button" onClick={this.savePlaylist}>Save</button>
                    <a type="button" onClick={this.createCopyFile} download="copyFile.txt">|Create Copy File</a>

                </form>
                <br />
                <PlaylistItemSelector selectFunction={this.addToPlaylist} artists={this.props.artists}/>
                <PlaylistDetail selectedList={this.state.selectedPlaylist} removeFunction={this.removeFromPlaylist}/>
            </div>
        );
    }
}

ManagePlaylistsPage.propTypes = {
    artists: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

const mapStateToProps = (state, ownProps) =>{
    return {
        artists: state.artists
    };
};

export default connect(mapStateToProps)(ManagePlaylistsPage);

