import React, {PropTypes} from 'react';


class PlayListNameListItem extends React.Component {
    constructor(props){
        super(props);
        this._onClick = this._onClick.bind(this);
    }
    _onClick(){
        this.props.selectFunction(this.props.playlist);
    }
    render(){ return(
        <div><a className="artistBrowserListEntry" onClick={this._onClick} href="#">{this.props.playlist.name}</a><br/></div>
    );}
}

PlayListNameListItem.propTypes = {
    playlist: PropTypes.object.isRequired,
    selectFunction: React.PropTypes.func
};


export default PlayListNameListItem;