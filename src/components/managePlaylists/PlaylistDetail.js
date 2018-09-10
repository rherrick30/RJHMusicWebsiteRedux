import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playlistActions from '../../actions/playlistActions';
import apiHelper from '../../api/apiHelper';
import PlaylistDetailItem from './PlaylistDetailItem';

class PlaylistDetail extends React.Component {
    constructor(props, context){
        super(props, context);
        this.addAllSongsInPlaylist = this.addAllSongsInPlaylist.bind(this);
    }
    addAllSongsInPlaylist(){
        let newSongs = [];
        apiHelper.playlistsongs(this.props.selectedList.name).then((res)=>{
            newSongs = newSongs.concat(res);
            this.props.playlistActions.clearPlaylist({});
            this.props.playlistActions.pushPlaylist({
                    songs: newSongs
                });
            });
    }

    render(){
    const item = this.props.selectedList;
    if(item.name === undefined) {
        return (<div className="artistListArtistDetail">Please select a playlist</div>); 
    }
    else{
        return(<div className="artistListArtistDetail">
                    <h3>
                    <input type="button" className="playlistButton" onClick={this.addAllSongsInPlaylist} value="set playlist" />
                    <span>   </span>
                    {item.name}
                    {(item.songCount) ? `  (${item.songCount} songs,` : ""}
                    {(item.listSize) ? (item.listSize>1000) ? `  ${Math.round(item.listSize/1000*100)/100} Gb)` : `  ${Math.round(item.listSize*100)/100} Mb)` : ""}
                    </h3>
                    {item.entries.map(a => {
                    return (<PlaylistDetailItem key={a.key + ":" + a.type} item={a} removeFunction={this.props.removeFunction} />);
                    })}
                </div>);
    }
    }
}

PlaylistDetail.propTypes = {
    selectedList: PropTypes.object.isRequired,
    removeFunction : PropTypes.func.isRequired,
    playlistActions: PropTypes.object.isRequired
};


const mapStateToProps = (state, ownProps) =>{
    return {
        playlist: state.playlist
    };
};

const mapDispatchToProps = (dispatch) => {
    return { 
        playlistActions: bindActionCreators(playlistActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetail);