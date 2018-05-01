import * as types from './actionTypes';
import apiHelper from '../api/apiHelper';


export function loadArtistsSuccess(artists){
    return { type: types.LOAD_ARTISTS_SUCCESS, artists};
}

export function loadArtists(){
    return function(dispatch) {
        return apiHelper.artists().then(artists => {
            /*  
                add a sort key by ignoring the "the" for artists who
                begin that way...also make case insensitive
            */
            artists.forEach(a => {
                    a._sortkey = (a.artist.toUpperCase().substring(0,4)=="THE ") ? a.artist.toUpperCase().slice(4) : a.artist.toUpperCase();
            });
            artists.sort((a,b)=>{ return (a._sortkey > b._sortkey) ? 1 : -1;});
            dispatch(loadArtistsSuccess(artists));
        }).catch(error =>{
            throw(error);
        });
    };
}


/*
export function loadCoursesSuccess(courses){
    return { type: types.LOAD_COURSES_SUCCESS, courses};
}

export function createCourseSuccess(course){
    return{type: types.CREATE_COURSE_SUCCESS, course};
}


export function updateCourseSuccess(course){
    return{type: types.UPDATE_COURSE_SUCCESS, course};
}


export function saveCourse(course){
    return function(dispatch, getState){
        return courseApi.saveCourse(course).then(savedCourse=>{
            course.id ? dispatch(updateCourseSuccess(savedCourse)) :
            dispatch(createCourseSuccess(savedCourse));
        }).catch(error => { 
            throw(error);
        });
    };
}

*/