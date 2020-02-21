export default{
    getGroupById: (state, getters) => (id) => {
        
        return state.recommend.response.recomPlaylist.data.v_hot.filter(item => {
            return item.content_id == id
        })
    },
    getSongPlay (state) {
        
        return state.nowPlaySong
    },
    getRecentlyPlayed: (state, getters) => (id) => {
        if(!state.recentlyPlayed.length) return false;
        console.log(state.recentlyPlayed);
        return state.recentlyPlayed.filter(item => {
            return item.track_info.id == id
        })
    }
}