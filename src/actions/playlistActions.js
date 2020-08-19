import * as types from './actionTypes';
import PlaylistApi from '../api/PlaylistApi';



/* success messages */
export function queryPlaylistSuccess(playlist){
    return { type: types.QUERY_PLAYLIST_SUCCESS, playlist};
}

export function pushPlaylistSuccess(playlist){
    return {type: types.PUSH_PLAYLIST_SUCCESS, playlist};
}


export function addPlaylistNextSuccess(playlist){
    return {type: types.ADD_PLAYLIST_NEXT_SUCCESS, playlist};
}

export function removePlaylistSuccess(playlist){
    return {type: types.REMOVE_PLAYLIST_SUCCESS, playlist};
}

export function clearPlaylistSuccess(playlist){
    return {type: types.CLEAR_PLAYLIST_SUCCESS, playlist };
}

export function shufflePlaylistSuccess(playlist){
    return {type: types.SHUFFLE_PLAYLIST_SUCCESS, playlist };
}

export function swapTwoItemsSuccess(playlist){
    return {type: types.SWAP_PLAYLIST_SUCCESS, playlist};
}

export function queryTagSuccess(){
    return {type: types.QUERY_TAG_SUCCESS};
}

export function setTagSuccess(tag){
    return {type: types.SET_TAG_SUCCESS, tag};
}

/* simple actions without api interaction */
export function clearPlaylist(){
    return function(dispatch){
        dispatch(clearPlaylistSuccess([]));
    };
}

export function shufflePlaylist(playlist){
    return function(dispatch){
        let newPlaylist = Object.assign([], playlist);
        newPlaylist.forEach(e => { e.__randkey = Math.random(); });
        newPlaylist.sort((a,b)=>{ return (a.__randkey > b.__randkey) ? 1 : -1; });
        newPlaylist.forEach(e => {  delete e.__randkey; });
        dispatch(shufflePlaylistSuccess(newPlaylist));
    };
}


export function queryTag(){
    return function(dispatch){
        dispatch(queryTagSuccess());
    };
}

export function setTag(tag){
    return function(dispatch){
        dispatch(setTagSuccess(tag));
    };
}

/* actions interacting w/api */
export function queryPlaylist(){
    return function(dispatch) {
        return PlaylistApi.getPlaylist().then(playlist => {
            dispatch(queryPlaylistSuccess(playlist));
        }).catch(error =>{
            throw(error);
        });
    };
}

export function pushPlaylist(song){
    return function(dispatch) {
        return PlaylistApi.enqueuePlaylist(song).then(song => {
            dispatch(pushPlaylistSuccess(song));
        }).catch(error =>{
            throw(error);
        });
    };   
}


export function addPlaylistNext(song){
    return function(dispatch)  {
        return PlaylistApi.addToFrontofPlaylist(song).then(song => {
            dispatch(addPlaylistNextSuccess(song));
        }).catch(error =>{
            throw(error);
        });
    }; 
}

export function removePlaylist(song){
    return function(dispatch) {
        return PlaylistApi.deleteFromPlaylist(song).then(() => {
            dispatch(removePlaylistSuccess(song));
        }).catch(error =>{
            throw(error);
        });
    };   
}

export function swapTwoItems(playlist,from,to){
    return function(dispatch){
        let newPlaylist = Object.assign([], playlist);
       const temp = newPlaylist[from];
       delete newPlaylist[from];
       newPlaylist.splice(to, 0, temp);
       newPlaylist.forEach((s,ndx) =>{
        if (s === undefined){delete newPlaylist[ndx];}
       });
        dispatch(swapTwoItemsSuccess(newPlaylist));
    };
  
}
