import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadArtists} from './actions/artistActions';
import {queryPlaylist} from './actions/playlistActions';
import './styles/styles.css';
import { querySonghist} from './actions/songhistActions';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();
store.dispatch(loadArtists());
store.dispatch(queryPlaylist());
store.dispatch(querySonghist());
  
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
    document.getElementById('app')
);
