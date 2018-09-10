import React, {PropTypes} from 'react';

class ArtistListSongDetail extends React.Component {
    constructor(props){
        super(props);
        this._onClickTop = this._onClickTop.bind(this);
        this._onClickEnd = this._onClickEnd.bind(this);
    }
    _onClickTop(){
        this.props.addSongsTopFunction([this.props.song]);
    }
    _onClickEnd(){
        this.props.addSongsEndFunction([this.props.song]);
    }
    render(){
        /*<div className="tooltip"><span className="tooltiptext">Add to top of playlist</span><a onClick={this._onClickTop} href="#"><i className="fas fa-arrow-alt-circle-up"></i></a></div> */
    return(<li className="albumListSongTitle">
                <div className="tooltip"><span className="tooltiptext">Add to end of playlist</span><a onClick={this._onClickEnd} href="#"><i className="fas fa-plus-circle"></i></a></div>
                {'   ' + this.props.song.songName}</li>);
    }
}

ArtistListSongDetail.propTypes = {
    song: PropTypes.object.isRequired,
    addSongsTopFunction: PropTypes.func.isRequired,
    addSongsEndFunction: PropTypes.func.isRequired
};

export default ArtistListSongDetail;
