import React from 'react';
import Header from './common/Header';
import { Switch, Route } from 'react-router-dom';
import HomePage from './home/HomePage';
import PlayerStatusPage from './playerStatus/PlayerStatusPage';
//import ArtistListPage from './artistList/ArtistListPage';
import ArtistTiles from './artistTiles';
import AlbumListPage from './albumList/AlbumListPage'
import SongListPage from './songList/SonglistPage';
import ManagePlaylistsPage from './managePlaylists/ManagePlaylistsPage';
import SummaryPage from './summary/SummaryPage';

function App(){
        return(
            <div className="container-fluid">
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/about" component={PlayerStatusPage} />
                    <Route path="/artistList" component={ArtistTiles} />
                    <Route path="/albumList" component={AlbumListPage} />
                    <Route path="/songlist" component={SongListPage} />
                    <Route path="/managePlaylists" component={ManagePlaylistsPage} />
                    <Route path="/summary" component={SummaryPage} />
                </Switch>
            </div>
        );
}

export default App;