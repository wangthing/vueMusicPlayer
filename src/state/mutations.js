import { stat } from "fs";

export default {
    // 当第一次播放这首歌时，将这首歌存在recentlyPlayed数组
    setNowPlayFirst: (state,payload) => {
        var _historyplayed = JSON.parse(localStorage.getItem('_historyplayed'))
        // 将播放的歌曲存放到本地缓存
        if(_historyplayed == null) {
            _historyplayed = [payload.song]
            localStorage.setItem('_historyplayed',JSON.stringify(_historyplayed))
        } else {
            
            _historyplayed.unshift(payload.song)
            localStorage.setItem('_historyplayed',JSON.stringify([... new Set(_historyplayed)]))
        }
        console.log("mutations收到了歌名：",payload.song.track_info.name );
        state.nowPlaySong = payload.song
        state.recentlyPlayed.push(payload.song)
        console.log(state.recentlyPlayed);
        console.log(state.recentlyPlayed);
    },
    // 如果已经存在
    setNowPlay: (state, payload) => {
        // console.log(payload.song);
        state.nowPlaySong = payload.song
    },
    switchLyric: (state) => {
        state.showLyric = !state.showLyric
    },
    stopOrPlay (state, payload) {
        state.isStop = payload.value
    },
    setNowPlayGroup: (state, payload) => {
        state.setNowPlayGroup = payload.group
        console.log(payload.group);
    },
    addGroupByCategory (state, payload) {
        state.groupByCategory = [... new Set(state.groupByCategory.concat(payload.list)) ]
        console.log(state.groupByCategory);
    }
}