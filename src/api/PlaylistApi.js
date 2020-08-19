const playlist = [];
const songhist = [];

class PlaylistApi{
    static getPlaylist(){
        return new Promise((resolve) => {
            resolve(Object.assign([], playlist));
          });
    }
    static getSonghist(){
        return new Promise((resolve) => {
            resolve(Object.assign([], songhist));
        });
    }
    static addToFrontofPlaylist(song){
        song = Object.assign({}, song );
        return new Promise((resolve) => {
            playlist.push(song);
            resolve(song);
          });
    }
    static enqueuePlaylist(song){
        song = Object.assign({}, song );
        return new Promise((resolve) => {
            playlist.push(song);
            resolve(song);
          });
    }
    static enqueueSonghist(song){
        song = Object.assign({}, song);
        return new Promise((resolve)=>{
            songhist.push(song);
            resolve(song);
        });
    }
    static deleteFromPlaylist(song){
        return new Promise((resolve) => {
            const indexOfSongToDelete = playlist.findIndex(s => {
                s._id == song._id;
              });
              playlist.splice(indexOfSongToDelete, 1);
            resolve(Object.assign([], playlist));
          });
    }
    static swapTwoItems(from,to){
        return new Promise((resolve) => {
            let newPlaylist = Object.assign([], playlist)
            newPlaylist[to] = playlist[from];
            newPlaylist[from] = playlist[to];
            resolve(Object.assign([], newPlaylist));
        });
    }
}





export default PlaylistApi;
