import React from 'react';
import Header from './common/Header';
import { Switch, Route } from 'react-router-dom';
import HomePage from './home/HomePage';
import PlayerStatusPage from './playerStatus/PlayerStatusPage';
import ArtistListPage from './artistList/ArtistListPage';
import AlbumListPage from './albumList/AlbumListPage'
import SongListPage from './songList/SonglistPage';
import ManagePlaylistsPage from './managePlaylists/ManagePlaylistsPage';

function App(){
        return(
            <div className="container-fluid">
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/about" component={PlayerStatusPage} />
                    <Route path="/artistList" component={ArtistListPage} />
                    <Route path="/albumList" component={AlbumListPage} />
                    <Route path="/songlist" component={SongListPage} />
                    <Route path="/managePlaylists" component={ManagePlaylistsPage} />
                </Switch>
            </div>
        );
}

export default App;