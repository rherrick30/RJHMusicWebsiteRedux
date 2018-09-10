import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import PlayerStatusPage from './components/playerStatus/PlayerStatusPage';
import ArtistListPage from './components/artistList/ArtistListPage';
import SongListPage from './components/songList/SonglistPage';
import ManagePlaylistsPage from './components/managePlaylists/ManagePlaylistsPage';

export default(
    <div className="mainBody">
    <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="about" component={PlayerStatusPage} />
        <Route path="artistList" component={ArtistListPage} />
        <Route path="songlist" component={SongListPage} />
        <Route path="managePlaylists" component={ManagePlaylistsPage} />
    </Route>
    </div>
);

