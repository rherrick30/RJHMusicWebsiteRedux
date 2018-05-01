import * as types from '../actions/actionTypes';
import initialState from './initalState';

const songhistReducer = (state = { songhist: initialState.songhist}, action) => {
    switch(action.type){
        
        case types.PUSH_SONGHIST_SUCCESS:            
            return [ ...action.songhist.songs, ...state];
        case types.QUERY_SONGHIST_SUCCESS: 
            return action.songhist;
        case types.CLEAR_SONGHIST_SUCCESS:
            return [];
        default:    
            return state;
    }
};

export default songhistReducer;
