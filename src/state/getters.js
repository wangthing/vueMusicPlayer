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
    // 
    getRecentlyPlayed: (state, getters) => (id) => {
        if(!state.recentlyPlayed.length) return false;
        console.log(state.recentlyPlayed);
        return state.recentlyPlayed.filter(item => {
            return item.track_info.id == id
        })
    },
    // 通过获取最热歌单的
    getTopListById: (state, getters) => (groupId, topId) => {
        
        if(state.recommend == null) return ;
        return (state.recommend.response.toplist.data.group.filter(item => {
            return item.groupId == groupId
        }))[0].toplist.filter(item => item.topId == topId)[0]
    },
    // 获取主题
    getThem: (state) => () => {
        return state.backgroundTheme[Math.floor(Math.random()*(state.backgroundTheme.length))]
    },
    // 这个好像没啥用了
    getGroupByCategoryById: (state, getters) => (id) => {
        
        console.log(state,"获取啊");
        return (state.groupByCategory.filter( item => {
            return item.dissid == id
        }))[0]
    },
    // 获取之前获取过的分类歌单
    getGroupByCategory: (state) => {
        console.log(state.GroupByCategory);
        return state.GroupByCategory
    },
    
}

function getDate (key) {
    var str = localStorage.getItem(key) || "[]"
    var arr = JSON.parse(str)
    return arr
}