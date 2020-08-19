import React from 'react';
import {NavLink} from 'react-router-dom';
import Player from './Player';

const Header = () => {
    return(
        <div>
        <nav>
            <NavLink to="/" activeClassName="active" exact>Home</NavLink>
            {" | "}
            <NavLink to="/about" activeClassName="active">Player Status</NavLink>
            {" | "}
            <NavLink to="/artistList" activeClassName="active">Artist List</NavLink>
            {" | "}
            <NavLink to="/albumList" activeClassName="active">Album Search</NavLink>
            {" | "}
            <NavLink to="/songList" activeClassName="active">Song Search</NavLink>
            {" | "}
            <NavLink to="/managePlaylists" activeClassName="active">Manage Playlists</NavLink>
        </nav>
        <Player playlist={[]} songhist={[]} />
        </div>
    );
};

export default Header;