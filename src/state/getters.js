export default{
    getGroupById: (state, getters) => (id) => {
        if(state.recommend == null) return 
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
    },
    getTopListById: (state, getters) => (groupId, topId) => {
        
        if(state.recommend == null) return ;
        return (state.recommend.response.toplist.data.group.filter(item => {
            return item.groupId == groupId
        }))[0].toplist.filter(item => item.topId == topId)[0]
    },
    getThem (state) {
        return state.backgroundTheme[Math.floor(Math.random()*(state.backgroundTheme.length))]
    }
}