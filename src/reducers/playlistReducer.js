import * as types from '../actions/actionTypes';
import initialState from './initalState';

const playlistReducer = (state = { playlist: initialState.playlist}, action) => {
    
    switch(action.type){
        case types.ADD_PLAYLIST_NEXT_SUCCESS:
            return [...action.playlist.songs, ...state];
        case types.REMOVE_PLAYLIST_SUCCESS:    
            return [
                ...state.filter(song => action.playlist.songPk != song.songPk)
            ];  
        case types.PUSH_PLAYLIST_SUCCESS:            
            return [...state, ...action.playlist.songs];
        case types.QUERY_PLAYLIST_SUCCESS:            
            return action.playlist;
        case types.CLEAR_PLAYLIST_SUCCESS:
            return [];
        case types.SHUFFLE_PLAYLIST_SUCCESS:
            return action.playlist;   
        case types.SWAP_PLAYLIST_SUCCESS:
            return action.playlist;     
        default:    
            return state;
    }
};

export default playlistReducer;
