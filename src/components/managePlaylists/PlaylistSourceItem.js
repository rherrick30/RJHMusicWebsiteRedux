import React from 'react';
import PropTypes from 'prop-types';


class PlaylistSourceItem extends React.Component {
    constructor(props){
        super(props);
        this._onClick = this._onClick.bind(this);
    }
    _onClick(){
        this.props.selectFunction(this.props.oItem);
    }
    render(){ return(
        <div><a className="artistBrowserListEntry defaultColor" onClick={this._onClick} href="#">{this.props.displayText}</a><br/></div>
    );}
}

PlaylistSourceItem.propTypes = {
    oItem: PropTypes.object.isRequired,
    displayText: PropTypes.string.isRequired,
    selectFunction: PropTypes.func
};


export default PlaylistSourceItem;