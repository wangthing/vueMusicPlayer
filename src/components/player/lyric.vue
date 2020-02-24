<template>
    <transition name="slide">
    
    <div class="Lyric" :class="showLyric ? 'show' : ''"  >
        <div class="background">
            <div class="blur"></div>
        </div>
        <div class="top-bar">
            <span class="iconfont icon-screen-more hide" @click.stop="switchLyric"></span>
            <div class="title">
                <h1 class="name">{{songInfo && songInfo.track_info.name}}</h1>
                <h2 class="singer">{{songInfo && songInfo.track_info.singer[0].name}}</h2>
            </div>
        </div>
        <div id="lyricwrap" class="lyric-wrap">
            <!-- :class="(getCurrentTimeFomated.length == 4 ? ('0' + getCurrentTimeFomated) : getCurrentTimeFomated) == getId(item) ? 'now' : ''" -->
            <p v-for="(item, index) in lyric" 
                :class="nowshowingLyric == getId(item) ? 'now' : ''"
                :key="index"  @click = "jumpToHere">
                {{item.split(']')[1]}} 
                <i class='location' :id="getId(item)"></i> 
            </p>
        </div>
        <div class="action">
            <div class="progress">
                <div class="progress-bar" ref="progressBar" @click="changeProgress">
                    <div class="now-progress" ref="nowProgress">
                        <span class="dot"></span>
                    </div>
                </div>
                <div class="time">
                    <span>{{audio && getCurrentTimeFomated}}</span>
                    <span>{{audio && returnTime(audio.duration)   }}</span>
                </div>                
            </div>
            <div class="operate">
                <span class="iconfont icon-SanMiAppglyphico3"></span>
                <span class="iconfont icon-SanMiAppglyphico" ></span>
                <!-- <span class="iconfont "></span> -->
                <span class="iconfont stop-play" @click = "stopOrPlay" :class="!isStop ?  'icon-zhongzhi' : 'icon-bofang'"></span>
                <span class="iconfont icon-SanMiAppglyphico1"></span>
                <span class="iconfont icon-bofangliebiao"></span>
            </div>
        </div>
    </div>
    </transition>

</template>

<script>
import utils from '@/api/utils'
export default {
    name: 'lyric',
    data () {
        return {
            lyric: [],
            isDrag: false,
            nowshowingLyric: 0,
        }
    },
    methods: {
        returnTime (time) {
          return  (Math.floor(time/60)) +':'+ ( (Math.floor(time%60) >= 10) ?  (Math.floor(time%60)) : ('0'+Math.floor(time%60)) )
        },
        getId(item) {
           return item.split(']')[0].split('[')[1].split('.')[0]
        },
        switchLyric () {
            this.$store.commit('switchLyric')
        },
        // 获取这首歌的歌词
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
        },
        // 点击进度条改变进度条
        progressChange () {
            // console.log((this.getTotalWidth.replace('px','')));
            if(this.$refs.nowProgress){
                this.$refs.nowProgress.style.width = this.getCurrentWidth
            } else {
                console.log("ops");
            }
        },
        // 切换暂停和播放
        stopOrPlay () {
            console.log(this.$refs);            
            if(this.isStop) {
                this.audio.play()
                this.$store.commit('stopOrPlay',{
                    value: false
                })
            } else {
                this.audio.pause()
                this.$store.commit('stopOrPlay',{
                    value: true
                })
            }

        },
        // 点击改变播放进度
        changeProgress (e) {
            var width = e.offsetX
            var totalWidth = +(this.getTotalWidth).replace('px','')
            var changeTime = Math.floor((width/totalWidth)*audio.duration)
            console.log(changeTime);
            this.audio.currentTime = changeTime
        },
        // 点击歌词踢桃转到这句歌词
        jumpToHere (e) {
            var id = e.target.childNodes[1].id
            console.log(id);
            document.getElementById(id).scrollIntoView({
                behavior: "smooth"
            })
            this.nowshowingLyric = id
            id = id.split(':')
            let value = (+id[0]*60) + (+id[1])
            this.audio.currentTime = value
            this.audio.play()
        },
        // 当用户滑动的时候，就不要让歌词自动定位
        onScroll () {
            console.log("滚动了");
            this.isDrag = true
            setTimeout(() => {
                this.isDrag = false
            }, 2500);
            
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

                return  this.$store.state.audio
        },
        getCurrentTimeFomated () {
            return this.returnTime(this.getCurrentTime)
        },
        getCurrentTime () {
            return this.$store.state.currentTime
        },
        getTotalWidth () {
            return getComputedStyle(this.$refs.progressBar).width
        },
        getPercent () {
            return (this.getCurrentTime / this.audio.duration)
        },
        getCurrentWidth () {
            return (this.getPercent*(this.getTotalWidth.replace('px', ''))) +'px'
        },
        isStop (){
            return this.$store.state.isStop
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
        getCurrentTimeFomated: {
            handler (val, newVal) {
                // 避免重复触发事件
                if(newVal == val) return
                // 进度条改变，增加 
                this.progressChange()
                newVal = (newVal.length == 4 ? ('0' + newVal) : newVal)
                var el = document.getElementById(newVal)
                if(el ) {
                    this.nowshowingLyric = newVal
                    
                    if(!this.isDrag) {
                        el.scrollIntoView({
                            behavior: "smooth"
                        })
                    }
                }
            },
            deep: true
        },
    },
    mounted () {
        setTimeout(() => {
            if(!this.audio) {
                console.log("hasdasda");
                this.audio = document.getElementById('audio')
            }
        }, 10)
        // 给歌词添加滚动监听
        document.getElementById('lyricwrap').addEventListener('scroll', utils.throttle(this.onScroll, 300))

        this.getLyric(this.songInfo.track_info.id,this.songInfo.track_info.mid)
    },
    created () {
    },
    updated () {

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
                background-color: rgba(50, 50, 50, .3)
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
                position: absolute
                top: 0rem
                left: 1rem   
                padding: 1.5rem        
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
            margin: 4rem 0 3rem
            height: 60% 
            overflow: auto
            font-size: 1.6rem
            color: #f1f2f3
            line-height: 3
            padding-bottom: 20rem
            box-sizing: border-box

            // text-align: left
            &::-webkit-scrollbar
                display: none
            p
                transition: all .3s
                .location
                    font-size: 0
                    position: relative
                    top: -20rem                
            .now
                background-image: linear-gradient(90deg, red  , blue )
                opacity: 0.5
                font-size: 2rem
                font-weight: bold
                color: transparent
                // background-position: 0
                -webkit-background-clip: text
                // background-clip: text
                // color: red
        .action
            .progress
                padding: 1rem 4rem
                .progress-bar
                    height: .4rem
                    // width: 
                    background-color: rgba(225, 205, 235, .5)
                    // opacity: .2
                    border-radius: .2rem
                    .now-progress
                        height: .4rem
                        background-color: white
                        position: relative
                        .dot
                            position: absolute
                            display: inline-block
                            background-color: white
                            width: .8rem
                            height: .8rem
                            border-radius: 50%;
                            right: 0
                            top: 0
                            transform: translateY(-25%)
                .time
                    color: #f0f1f2
                    margin: 1rem auto 0
                    display: flex
                    justify-content: space-between
            .operate
                display: flex
                justify-content: space-around
                align-items: center
                position: absolute
                bottom: 2rem
                width: 100%
                .stop-play
                    font-size: 4rem
                span
                    font-size: 3rem
                    color: #f0f0f5
                    display: inline-block
            
</style>