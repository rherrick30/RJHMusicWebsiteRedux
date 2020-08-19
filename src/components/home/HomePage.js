import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as artistActions from '../../actions/artistActions';
import StatsPanel from './StatsPanel';


const HomePage = (props) => {
    return(
        <div className="jumbotron homePage">
            <StatsPanel artists={props.artists} />                
        </div>
    );
}

HomePage.propTypes = {
    artists: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>{
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



