import { stat } from "fs";

export default {
    // 当第一次播放这首歌时，将这首歌存在recentlyPlayed数组
    setNowPlayFirst: (state,payload) => {
        console.log("mutations收到了歌名：",payload.song.track_info.name );
        state.nowPlaySong = payload.song
        state.recentlyPlayed.push(payload.song)
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
    }
}