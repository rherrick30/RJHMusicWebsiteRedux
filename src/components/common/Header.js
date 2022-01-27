import React from 'react';
import {NavLink} from 'react-router-dom';
import Player from './Player';

const Header = () => {
    return(
        <div>
        <nav>
            <NavLink to="/" activeClassName="activeHeaderLink" className="inactiveHeaderLink" exact>Home</NavLink>
            {" | "}
            <NavLink to="/about" activeClassName="activeHeaderLink" className="inactiveHeaderLink">Player Status</NavLink>
            {" | "}
            <NavLink to="/artistList" activeClassName="activeHeaderLink" className="inactiveHeaderLink">Artist List</NavLink>
            {" | "}
            <NavLink to="/albumList" activeClassName="activeHeaderLink" className="inactiveHeaderLink">Album Search</NavLink>
            {" | "}
            <NavLink to="/songList" activeClassName="activeHeaderLink" className="inactiveHeaderLink">Song Search</NavLink>
            {" | "}
            <NavLink to='/summary' activeClassName="activeHeaderLink" className="inactiveHeaderLink">Summaries</NavLink>
            {" | "}
            <NavLink to="/managePlaylists" activeClassName="activeHeaderLink" className="inactiveHeaderLink">Manage Playlists</NavLink>
        </nav>
        <Player playlist={[]} songhist={[]} />
        </div>
    );
};

export default Header;