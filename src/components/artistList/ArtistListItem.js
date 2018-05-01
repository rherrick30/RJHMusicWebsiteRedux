import React, {PropTypes} from 'react';


class ArtistListItem extends React.Component {
    constructor(props){
        super(props);
        this._onClick = this._onClick.bind(this);
    }
    _onClick(){
        this.props.selectFunction(this.props.artist);
    }
    render(){ return(
        <div><a className="artistBrowserListEntry" onClick={this._onClick} href="#">{this.props.artist.artist}</a><br/></div>
    );}
}

ArtistListItem.propTypes = {
    artist: PropTypes.object.isRequired,
    selectFunction: React.PropTypes.func
};


export default ArtistListItem;