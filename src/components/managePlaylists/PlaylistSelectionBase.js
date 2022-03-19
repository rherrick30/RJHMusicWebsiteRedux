import React from 'react';
import PropTypes from 'prop-types';

class PlaylistSelectionBase extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filteredArtists: this.props.artists
        };
        this.filterTextChange = this.filterTextChange.bind(this);
        this.filterArtistList = this.filterArtistList.bind(this);
    }
    filterTextChange(sender){
        const filterText = sender.target.value.toLowerCase();
        this.filterArtistList(filterText);
    }
    filterArtistList(filterText){
        if(filterText.length>0){
            const reSearchKey = new RegExp(filterText.toLowerCase())
            this.setState(()=>({
                filteredArtists: Object.assign([], this.props.artists.filter(a => reSearchKey.test(a._sortkey.toLowerCase())))
            }));
        }else{
            this.setState(()=>({
                filteredArtists: this.props.artists
            }));
        }
    }
    render(){
    return(<div></div>);
    }
}

PlaylistSelectionBase.propTypes = {
    artists: PropTypes.array.isRequired,
    selectFunction: PropTypes.func
};

export default PlaylistSelectionBase;