import React from 'react';
import {Route} from 'react-router-dom';
import App from './components/App';
import HomePage from './components/home/HomePage';
import PlayerStatusPage from './components/playerStatus/PlayerStatusPage';
import ArtistListPage from './components/artistList/ArtistListPage';
import AlbumListPage from './components/albumList/AlbumListPage';
import SongListPage from './components/songList/SonglistPage';
import ManagePlaylistsPage from './components/managePlaylists/ManagePlaylistsPage';
import WordBrainSolver from './components/wordBrainSolver/WordBrainSolver';

export default(
    <div className="mainBody">
    <Route path="/" component={App}>
        <Route component={HomePage} />
        <Route path="about" component={PlayerStatusPage} />
        <Route path="artistList" component={ArtistListPage} />
        <Route path="albumList" component={AlbumListPage} />
        <Route path="songlist" component={SongListPage} />
        <Route path="managePlaylists" component={ManagePlaylistsPage} />
        <Route path="wordBrain" component={WordBrainSolver} />
    </Route>
    </div>
);

