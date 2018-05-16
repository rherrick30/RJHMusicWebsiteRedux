import apiHelper from './apiHelper';

const playlist = [];
const songhist = [];

class PlaylistApi{
    static getPlaylist(){
        return new Promise((resolve, reject) => {
            resolve(Object.assign([], playlist));
          });
    }
    static getSonghist(){
        return new Promise((resolve, reject) => {
            resolve(Object.assign([], songhist));
        });
    }
    static addToFrontofPlaylist(song){
        song = Object.assign({}, song );
        return new Promise((resolve, reject) => {
            playlist.push(song);
            resolve(song);
          });
    }
    static enqueuePlaylist(song){
        song = Object.assign({}, song );
        return new Promise((resolve, reject) => {
            playlist.push(song);
            resolve(song);
          });
    }
    static enqueueSonghist(song){
        song = Object.assign({}, song);
        return new Promise((resolve, reject)=>{
            songhist.push(song);
            resolve(song);
        });
    }
    static deleteFromPlaylist(song){
        return new Promise((resolve, reject) => {
            const indexOfSongToDelete = playlist.findIndex(s => {
                s.songPk == song.songPk;
              });
              playlist.splice(indexOfSongToDelete, 1);
            resolve(Object.assign([], playlist));
          });
    }
    static swapTwoItems(from,to){
        return new Promise((resolve, reject) => {
            const temp = playlist[to];
            playlist[to] = playlist[from];
            playlist[from] = temp;
            console.log(`in API->${JSON.stringify(playlist)}`)
            resolve(Object.assign([], playlist));
        });
    }
}





export default PlaylistApi;
