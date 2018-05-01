import * as types from '../actions/actionTypes';
import initialState from './initalState';

const artistReducer = (state = { artists: initialState.artists}, action) => {
    switch(action.type){
        case types.LOAD_ARTISTS_SUCCESS:
            //return Object.assign({}, state, {artists: action.artists});
            return action.artists;
        default:    
            return state;
    }
};

export default artistReducer;


/*
        case types.CREATE_COURSE_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.course)
            ] ; 
        case types.UPDATE_COURSE_SUCCESS:
            return [
               ...state.filter(course => course.id !== action.course.id),
               Object.assign({}, action.course)
            ];  
*/