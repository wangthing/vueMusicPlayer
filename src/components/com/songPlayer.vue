<template>
    <div id="player" v-if="!!getSongPlay ">
        <audio :src="getNowPlayUrl ? getNowPlayUrl : '' "  id="audio" autoplay 
        @play="onPlay"
        @error="onError"
        @waiting="onWaiting"
        @ended="onEnded"
        @loadstart="onLoadStart"
        @canplay="onCanPlay"
        ></audio>
        <div class="left">
            <i :class="isStop ? '' : 'playing'" class="iconfont icon-zhuanji1"></i>
            <!-- <img class="cover" :src=" 'http://i0.sinaimg.cn/ent/y/2012-08-14/U8044P28T3D3711322F326DT20120814145836.jpg'" alt=""> -->
            <div class="info">
                <p>{{ getSongPlay.track_info.name }}</p>
                <span>{{getSongPlay.track_info.singer[0].name}}</span>
            </div>
        </div>
        <div class="right">
            <i v-if="isStop" class="iconfont icon-bofang1" @click="StopOrStart"></i>
            <i v-if="!isStop" class="iconfont icon-zantingtingzhi" @click="StopOrStart"></i>
            <i class="iconfont icon-bofangliebiao"></i>
        </div>
    </div>
</template>

<script>
import {Indicator} from 'mint-ui'

export default {
    name: "songPlay",
    data() {
        return {
            songInfo: this.$store.state.nowPlaySong,
            isStop: false
        }
    },
    methods: {
        StopOrStart () {
            var audio = document.getElementById('audio')
            if(audio.src.indexOf('qqmusic') == -1) return;
            if(audio.paused) {
                this.isStop = false
                audio.play()
            } else {
                this.isStop = true
                audio.pause()
            }
        },
        onPlay () {
            console.log("开始播放了");
            Indicator.close()
            this.isStop = false
        },
        onWaiting () {
            console.log("正在加载");
            this.isStop = true
            Indicator.open({
                text: '正在缓存...',
                sninnerType: 'fading-circle'
            })
        },
        onError (e) {
            console.log("error", e);
            this.isStop = true
            Indicator.close()
        },
        onEnded () {
            this.isStop = true
        },
        onLoadStart (e) {
            e.target.pause()
            Indicator.open({
                text: '正在缓存...',
                sninnerType: 'fading-circle'
            })
        },
        onCanPlay (e) {
            console.log("可以播放了");
            this.isStop = false 
            e.target.play()
            Indicator.close()
        }
    },
    computed: {
        getSongPlay () {
            return this.$store.getters.getSongPlay
        },
        getNowPlayUrl () {
            return this.$store.state.nowPlayUrl
        }
    },
    mounted() {
        
    },
}
</script>

<style lang="sass">
    $baseColor: #31c27c;
    #player
        position: fixed;
        bottom: 0rem;
        width: 100%
        height: 6rem;
        // line-height: 5rem;
        font-size: 1.5rem;
        background-color: white;
        // border-top: 1px solid red;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.5rem
        box-sizing: border-box
        .left
            font-size: 1.4rem
            text-align: left
            flex: 1
            line-height: 1.2
            text-overflow: ellipsis
            height: 100%
            display: flex;
            justify-content: flex-start
            align-items: center
            .playing
                transform: rotate(360000deg)
                transition: all 3600s linear
            .cover
                width: 4rem
                height: auto
                margin-right: .5rem
                border-radius: 50%
            .info
                span 
                    font-size: 1.2rem

            i
                font-size: 8rem
        .right
            width: 25vw;
            i
                margin-left: 1rem
                font-size: 2.5rem
                color: $baseColor
        .left
            width: 65vw
            i
                color: $baseColor
                font-size: 4rem
                vertical-align: middle
                margin-right: .5rem
</style>