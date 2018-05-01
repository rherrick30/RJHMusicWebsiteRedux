import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import Player from './Player';

const Header = () => {
    return(
        <div>
        <nav>
            <IndexLink to="/" activeClassName="active">Home</IndexLink>
            {" | "}
            <Link to="/about" activeClassName="active">Player Status</Link>
            {" | "}
            <Link to="/artistList" activeClassName="active">Artist List</Link>
            {" | "}
            <Link to="/songList" activeClassName="active">Song Search</Link>
        </nav>
        <Player playlist={[]} songhist={[]} />
        </div>
    );
};

export default Header;