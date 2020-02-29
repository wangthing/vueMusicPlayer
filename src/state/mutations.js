

export default {
    // 当第一次播放这首歌时，将这首歌存在recentlyPlayed数组，并存放在本地缓存中
    setNowPlayFirst: (state,payload) => {

        var _historyplayed = JSON.parse(localStorage.getItem('_historyplayed'))
        var songinfo = payload.song.track_info
        var historySong = {}
        {  
            historySong.singer = songinfo.singer
            historySong.id = songinfo.id
            historySong.pay = songinfo.pay
            historySong.isonly = songinfo.isonly
            historySong.mid = songinfo.mid
            historySong.name = songinfo.name
            historySong.album = songinfo.album
        }
        
        // console.log(historySong, songinfo);

        // 将播放的歌曲存放到本地缓存，还需要对歌000过滤
        // 我们字需要track-info里面的
        if(_historyplayed == null) {
            _historyplayed = [historySong]
            localStorage.setItem('_historyplayed',JSON.stringify(_historyplayed))
        } else {

            var id = songinfo.id
            _historyplayed.forEach((item, index, arr) => {

                if(item.id == id) {
                    // console.log(arr);
                    arr.splice(index,1)
                }
            });
            
            _historyplayed.unshift(historySong)
            
            localStorage.setItem('_historyplayed',JSON.stringify(_historyplayed))
        }

        // console.log("mutations收到了歌名：",payload.song.track_info.name );
        state.nowPlaySong = payload.song
        state.recentlyPlayed.push(payload.song)
        
    },
    // 如果已经存在
    setNowPlay: (state, payload) => {
        // console.log(payload.song);
        state.nowPlaySong = payload.song
    },
    // 是否显示格式页面
    switchLyric: (state, payload) => {
        if(payload) {
            state.showLyric = payload.value
        }else {
            state.showLyric = !state.showLyric
        }
      
    },
    // 切换暂停还是播放
    stopOrPlay (state, payload) {
        state.isStop = payload.value
    },
    // 这是最近播放的歌单
    setNowPlayGroups: (state, payload) => {
            // console.log("你到底是個什麽", payload.group,payload.id);        
            state.nowPlayGroups[payload.id] =  payload.group
    },
    setNowPlayGroup (state, payload) {
            state.nowPlayGroup = payload.group
    },
    addGroupByCategory (state, payload) {
        state.groupByCategory = [... new Set(state.groupByCategory.concat(payload.list)) ]
        console.log(state.groupByCategory);
    },
    
}