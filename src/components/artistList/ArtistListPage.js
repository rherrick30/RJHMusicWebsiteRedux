import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as artistActions from '../../actions/artistActions';
import {browserHistory} from 'react-router';
import ArtistList from './ArtistList';
import ArtistListArtistDetail from './ArtistListArtistDetail';

class ArtistListPage extends React.Component {
    constructor(props, context){
        super(props, context);
        this.state = {
            selectedArtist: {},
            filteredArtists: this.props.artists
        };
        this.selectArtist = this.selectArtist.bind(this);
        this.filterTextChange = this.filterTextChange.bind(this);
    }
    selectArtist(artist){
        const selectedArtist = Object.assign({}, artist);
        this.setState(prevState => ({
           selectedArtist: selectedArtist
        }));
    }
    filterTextChange(sender){
        const filterText = sender.target.value.toLowerCase();
        if(filterText.length>0){
            this.setState(prevState=>({
                filteredArtists: Object.assign([], this.props.artists.filter(a => a._sortkey.toLowerCase().substring(0, filterText.length) == filterText))
            }));
        }else{
            this.setState(prevState=>({
                filteredArtists: this.props.artists
            }));
        }
    }
    render(){
        return (
            <div className="artistListMainView">
                <h1>Artist List</h1>
                <label>Search for:</label><input type="text" onChange={this.filterTextChange}></input>
                <br />
                <ArtistList artists={this.state.filteredArtists} selectFunction={this.selectArtist} />
                <ArtistListArtistDetail artist={this.state.selectedArtist}/>
            </div>
        );
    }
}


ArtistListPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ArtistListPage);
