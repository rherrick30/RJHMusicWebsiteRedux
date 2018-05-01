import {combineReducers} from 'redux';
import artists from './artistReducer';
import playlist from './playlistReducer';
import songhist from './songhistReducer';

const rootReducer = combineReducers({
    artists,
    playlist,
    songhist
});

export default rootReducer;
