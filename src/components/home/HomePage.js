import React, {PropTypes, Component } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class HomePage extends React.Component{
    render(){
        return(
            <div className="jumbotron">
                <h1>Rob's Music Collection</h1>
                <p>React, Redux and React Router in ES6 for ultra-responsive web apps</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn More</Link>
            </div>
        );
    }
}

export default HomePage;


