import axios from 'axios';

const baseUrl = '/api/';

const axiosExecutor =  (axiosFunction, url, data) => {
        return new Promise((resolve, reject) => {
            axiosFunction(url, data).then(resp => {
                resolve(resp.data);
            });
        });
};


const getFunction = (url, configOptions) => {
    return axiosExecutor(axios.get, url, configOptions);
};

const postFunction = (url, data) => {
    return axiosExecutor(axios.post, url, data);
};

const putFunction = (url, data) => {
    return axiosExecutor(axios.put, url, data);
};

const deleteFunction = (url, data) => {
    return axiosExecutor(axios.delete, url, data );
};



const apiHelper = {
 
    randomAlbum(){
        return getFunction(baseUrl + 'randomAlbum');
    },
    randomArtist(){
        return getFunction(baseUrl + 'randomArtist');
    },
    randomSong(){
        return getFunction(baseUrl + 'randomSong');
    },
    artistSearch(searchPattern){
        return getFunction( baseUrl + 'artistSearch/'+ searchPattern);
    },
    albumSearch(searchPattern){
        return getFunction( baseUrl + 'albumSearch/' + searchPattern);
    },
    songSearch(searchPattern){
        return getFunction(baseUrl + 'songSearch/' + searchPattern);
    },
    albums(){
        return getFunction(baseUrl + 'albums');
    },
    album(id){
        return getFunction(baseUrl + 'album/' + id);
    },
    artists(){
        return getFunction(baseUrl + 'artists');
    },
    artist(id){
        return getFunction(baseUrl + 'artist/' + id);
    },
    getListeningList(){
        return getFunction(baseUrl + 'listeningList');
    },
    addArtist(artist){
        return postFunction(baseUrl + 'artist', artist );
    },
    updateArtist(artist){
        return putFunction( baseUrl + 'artist', artist);
    },
    deleteArtist(id){
        return deleteFunction(baseUrl + 'artist/' + id );
    },
    addAlbum(album){
        return postFunction( baseUrl + 'album', album );
    },
    updateAlbum(album){
        return putFunction( baseUrl + 'album', album );
    },
    deleteAlbum( id ){
        return deleteFunction(baseUrl + 'album/' + id );
    },
    addToListeningList( item ){
        return postFunction(baseUrl + 'listeningList', item );
    },
    deleteFromListeningList(item){
        let type = (item.title) ? 'album' : 'artist';
        return deleteFunction(baseUrl + `listeningList/${type}/${item._id}`);
    },
    albumQuery(queryOptions, updateFuntion, errorFunction){
        return postFunction(baseUrl + 'albumQuery', queryOptions, updateFuntion, errorFunction);
    },
    artistQuery(queryOptions){
        return postFunction(baseUrl + 'artistQuery', queryOptions);
    },
    albumAggQuery(queryOptions){
        return postFunction(baseUrl + 'albumAggQuery', queryOptions);
    },
    artistAggQuery(queryOptions){
        return postFunction(baseUrl + 'artistAggQuery', queryOptions);
    }

};


export default apiHelper;