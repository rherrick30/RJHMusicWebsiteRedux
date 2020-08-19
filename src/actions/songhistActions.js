import * as types from './actionTypes';
import PlaylistApi from '../api/PlaylistApi';



/* success messages */
export function querySonghistSuccess(songhist){
    return { type: types.QUERY_SONGHIST_SUCCESS, songhist};
}

export function pushSonghistSuccess(songhist){
    return {type: types.PUSH_SONGHIST_SUCCESS, songhist};
}

export function clearSonghistSuccess(songhist){
    return {type: types.CLEAR_SONGHIST_SUCCESS, songhist };
}

export function clearSonghist(){
    return function(dispatch){
        dispatch(clearSonghistSuccess([]));
    };
}

/* actions interacting w/api */
export function querySonghist(){
    return function(dispatch) {
        return PlaylistApi.getSonghist().then(songhist => {
            dispatch(querySonghistSuccess(songhist));
        }).catch(error =>{
            throw(error);
        });
    };
}

export function pushSonghist(song){
    return function(dispatch) {
        return PlaylistApi.enqueueSonghist(song).then(song => {
            dispatch(pushSonghistSuccess(song));
        }).catch(error =>{
            throw(error);
        });
    };   
}

