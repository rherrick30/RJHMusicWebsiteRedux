import React, {PropTypes, Component } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as artistActions from '../../actions/artistActions';
import StatsPanel from './StatsPanel';


class HomePage extends React.Component{
    constructor(props, context){
        super(props, context);
    }

    render(){
        return(
            <div className="jumbotron homePage">
                <StatsPanel artists={this.props.artists} />                
            </div>
        );
    }
}

HomePage.propTypes = {
    artists: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) =>{
    return {
        artists: state.artists
    };
};

const mapDispatchToProps = (dispatch) => {
    return { 
        actions: bindActionCreators(artistActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);



