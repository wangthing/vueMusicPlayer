<template>
    <div class="Lyric" :class="showLyric ? 'show' : ''" v-if="showLyric">
        <div class="background">
            <div class="blur"></div>
        </div>
        <div class="top-bar">
            <span class="iconfont icon-screen-more hide" @click="switchLyric"></span>
            <div class="title">
                <h1 class="name">{{songInfo.track_info.name}}</h1>
                <h2 class="singer">{{songInfo.track_info.singer[0].name}}</h2>
            </div>
        </div>
        <div class="lyric-wrap">
            <p v-for="(item, index) in lyric" :key="index" :id="item.split(']')[0].split('[')[1].replace(':','').replace('.','')">{{item.split(']')[1]}}</p>
        </div>
        <div class="action">
            <dir class="progress">
                <div class="progress-bar">
                </div>
                <div class="time">
                    <span>{{audio && getCurrentTime}}</span>
                    <span>{{audio && returnTime(audio.duration)   }}</span>
                </div>                
            </dir>
            <div class="operate">
                <span class="iconfont icon-SanMiAppglyphico3"></span>
                <span class="iconfont icon-SanMiAppglyphico"></span>
                <span class="iconfont icon-bofang1"></span>
                <span class="iconfont icon-SanMiAppglyphico1"></span>
                <span class="iconfont icon-bofangliebiao"></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'lyric',
    data () {
        return {
            lyric: [],
            
        }
    },
    methods: {
        returnTime (time) {
          return  (Math.floor(time/60)) +':'+ ( (Math.floor(time%60) > 10) ?  (Math.floor(time%60)) : ('0'+Math.floor(time%60)) )
        },
        switchLyric () {
            this.$store.commit('switchLyric')
        },
        getLyric (id, mid) {
            var id = this.songInfo.track_info.id
            var mid = this.songInfo.track_info.mid
            this.$http.get(`getLyric?`, {
              params: {songmid: mid}
            })
            .then(res => {
                console.log(res);

                this.lyric = res.data.response.lyric.split('\n')
                console.log(this.lyric);
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    computed: {
        showLyric () {
            return this.$store.state.showLyric
        },
        getNowPlaySong () {

        },
        songInfo () {
            return this.$store.state.nowPlaySong
        },
        audio () {
            return document.getElementById('audio')
        },
        getCurrentTime () {
            return this.returnTime(this.audio.currentTime)
        }
    },
    watch: {
        songInfo: {
            handler (newVal) {
                var id = newVal.track_info.id
                var mid = newVal.track_info.mid
                this.getLyric(id, mid)
            },
            deep: true
        },
        currentTime : {
            
        }
    },
    mounted () {
        
        this.getLyric(this.songInfo.track_info.id,this.songInfo.track_info.mid)
    },
    created () {

    },
    destroyed () {
        
    }
}
</script>


<style lang="sass" scoped>
    .Lyric
        font-size: 1.2rem

        position: fixed
        z-index: 99999
        height: 0
        left: 0
        right: 0
        background-color: #f2f3f4

        bottom: -100%
        transition: all .5s
        .background
            z-index: -1
            position: absolute
            left: -200vw
            right: -200vw
            bottom: -100% 
            top: -100%
            filter: blur(18px)
            .blur
                position: absolute
                width: 100%
                height: 100%
                background-color: rgba(0, 0, 0, .3)
        &.show
            height: 100%
            bottom: 0
        .top-bar
            line-height: 1.4
            padding: 1rem 2rem
            font-size: 1.8rem            
            display: flex
            justify-content: flex-start
            align-items: flex-start
            .hide   
                font-size: 2.5rem            
                color: white
            .title
                color: #f1f2f3
                flex: 1
                text-align: center   
                .name
                    font-weight: bold
                .singer
                    font-size: 1.4rem
        .lyric-wrap
            margin: 6rem 0
            height: 60%
            overflow: auto
            font-size: 1.8rem
            color: #f1f2f3
            line-height: 3
            &::-webkit-scrollbar
                display: none
        .action
            .progress
                padding: 1rem 4rem
                .progress-bar
                    height: .4rem
                    // width: 
                    background-color: red
                .time
                    margin: 1rem auto 0
                    display: flex
                    justify-content: space-between
            .operate
                display: flex
                justify-content: space-around
                align-items: center
                position: absolute
                bottom: 3rem
                width: 100%
                span
                    font-size: 3rem
                    color: #f0f0f5
                    display: inline-block
            
</style>