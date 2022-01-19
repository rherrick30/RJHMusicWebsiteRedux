import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import apiHelper from '../../api/apiHelper';
import PlaylistDetail from './PlaylistDetail';
import PlaylistItemSelector from './PlaylistItemSelector';
import Selector from '../controls/Selector'


const ManagePlaylistsPage = (props) =>{

    const [selectedPlaylist, setSelectedPlaylist] = useState({name:"", entries:[]});
    const [playlists, setPlaylists] = useState([]);
    const [mode, setMode] = useState("add");

    useEffect(()=>{
        apiHelper.getPlayLists().then(
            result => { setPlaylists(result); }
        );
    },[]);

    const changeMode = (event) => {
        setSelectedPlaylist({name:"", entries:[]})
        setMode(event.target.value)
    }

    const selectPlaylist = (event) =>{
        if(event==null){
            setSelectedPlaylist(Object.assign({}, [], calculateStatsLocal([])))
        }else{
            const selectedList = event.value;
            apiHelper.getPlaylist(selectedList).then(newList=>{
                setSelectedPlaylist(Object.assign({}, newList, calculateStatsLocal(newList.entries)))
            });
        }
    }

    const addToPlaylist = (item) => {
        if(selectedPlaylist.entries.filter(o =>{
            return(o.type==item.type && o.title==item.title);
        }).length == 0){
            let newItemList = [ item, ...selectedPlaylist.entries ];
            let newPlaylist =  Object.assign({}, selectedPlaylist, {entries : newItemList}, calculateStatsLocal(newItemList));
            setSelectedPlaylist(newPlaylist);
        }
    }

    const calculateStatsLocal = (itemList) => {
        // TO DO: have the Api tell us song count and
        // size for each non song.
        let songCount = 0; 
        let listSize= 0;
        itemList.forEach(e => {
            songCount += e.songCount;
            listSize += e.sizeInMb;
        });
        return {songCount, listSize};
    }

    const removeFromPlaylist = (item) => {
        const revisedList = selectedPlaylist.entries.filter(o => {
            return( !( o.type==item.type && o.key==item.key));
        });
        let newPlaylist =  Object.assign({}, selectedPlaylist, {entries : revisedList},calculateStatsLocal(revisedList) );
        setSelectedPlaylist(newPlaylist);
    }
    
    const playlistNameChange = (event) => {
        let newName = event.target.value;
        let newPlaylist =  Object.assign({}, selectedPlaylist, {name:newName});
        setSelectedPlaylist(newPlaylist);
    }   
    const savePlaylist = () => {
        apiHelper.savePlayList(selectedPlaylist)
    }

    return (
        <div className="artistListMainView">
            <h1>Manage Playlists: </h1>
            
            <form>
                <div className="playlistSelector">
                <input type="radio" name="mode" value="add" onChange={changeMode} checked={mode=="add"} />add
                <input type="radio" name="mode" value="edit" onChange={changeMode} checked={mode=="edit"}/>edit
                <span>   </span>
                {mode === "edit" &&
                <Selector 
                    onChange={selectPlaylist}
                    options = {(Array.isArray(playlists)) ? playlists.map(e=>{
                        return {value:e._id, label:e.name} 
                    }) : [] }
                    isClearable={true}
                />}
                {mode === "add" &&
                <input type="text" className="playlistTitle" onChange={playlistNameChange} />
                }
                <button type="button" onClick={savePlaylist}>Save</button>
                </div>
            </form>
            <br />
            <PlaylistItemSelector selectFunction={addToPlaylist} artists={Array.isArray(props.artists) ? props.artists : []}/>
            <PlaylistDetail selectedList={selectedPlaylist} removeFunction={removeFromPlaylist}/>
        </div>
    );

}

ManagePlaylistsPage.propTypes = {
    artists: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

const mapStateToProps = (state) =>{
    return {
        artists: state.artists
    };
};

export default connect(mapStateToProps)(ManagePlaylistsPage);

