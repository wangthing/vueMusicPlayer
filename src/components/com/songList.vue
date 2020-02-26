<template>
    
       <div class="song-list" >
           <!-- 定位 -->
           <a v-if="!!nowPlaySong" 
           class="iconfont icon-miaozhun location" 
           :href="nowPlaySong.track_info && nowPlaySong.track_info.id"
           @click.prevent="goLocation"
           ></a>
            <h1 class="playAll"><i class="iconfont icon-bofang1"></i>  播放全部{{songLists && ` (${songLists.length})`}}</h1>
            <ul class="songs">
                <li class="item" :class=" (nowPlaySong == null) ? '' : (item.id ===   nowPlaySong.track_info.id ? 'playing' : '')" 
                 v-for="(item, index) in songLists" 
                 @click="switchSong(item.mid, item.id,item.pay.pay_play)" 
                 :key="index"
                 
                 >
                    <i :id="item.id" class="loc"></i>                 
                    <span class="index">{{index+1}}</span>    
                    <div class="content"    :data-mid = "item.mid">
                        <h1>{{item.name}}</h1>
                        <span>
                            <i v-if="item.pay.pay_play" class="iconfont icon-vip"></i>
                            <i class="sq iconfont icon-sq"></i>
                            <i v-if="item.isonly" class="isonly iconfont icon-dujia"></i>
                            {{'' + item.singer[0].name}}<i style="font-weight:bold;">·</i>{{item.album.name}}
                        </span>
                    </div>
                    <span class="right"> 
                        <i  class="mv iconfont icon-mv"></i>
                        <i  class="more iconfont icon-gengduo "></i> </span>                    
                </li>
            </ul>
        </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    name: 'songList',
    data() {
        return {

        }
    },
    methods: {
        goLocation (e) {
            // console.log(this.nowPlaySong);
          var id = this.nowPlaySong.track_info.id
          var el = document.getElementById(id)
          if(el) {

            el.scrollIntoView({
                behavior: "smooth"
            }) 
          } else {
              Toast("当前页面没有定位到播放歌曲")
          }
          
        },
   
        // 接口说明: 调用此接口, 可获取歌曲相关信息 
        //songmid: 歌曲id
        //接口地址: /getSongInfo
        //调用例子: /getSongInfo?songmid=0025NhlN2yWrP4
            
        switchSong (mid, id, pay_play) {
            if(pay_play) {
                Toast({
                    message: '这是付费的,试试其他的吧',
                    // iconClass: 'iconfont icon-fufei',
                    duration: 2000
                })
                return  
            }
            // 这首歌已经在播放了
            if( this.nowPlaySong && id === this.nowPlaySong.track_info.id) return;
            // 先判断这个id的歌是不是在最近播放里面获取过
            let isPlayed = this.$store.getters.getRecentlyPlayed(id);
            // console.log(isPlayed);
            if(isPlayed.length) {
                let song = isPlayed[0]
                console.log("已经播放了，去内存中取吧");
                this.$store.commit('setNowPlay',{
                    song
                })
                this.getSongVkey(mid, id)
                return;
            }   

            this.$http.get(`getSongInfo`, {
              params: {songmid: mid}
            })
            .then((res) => {
                var song = res.data.response.songinfo.data
                console.log("歌曲信息",song);
                this.$store.commit('setNowPlayFirst', {
                    song
                })
                this.getSongVkey(mid, id)
                // 同时还要获取音乐的vkey和播放链接
            }).catch((err) => {
                
            })
        },
        getSongVkey (mid, id) {
            this.$http.get(`getMusicVKey`, {
              params: {songmid: mid}
            })
            .then(res => {
                var playList = res.data.response.playLists
                console.log(playList);

                this.$store.state.nowPlayUrl = playList[0]
            })
            .catch(err => {
                console.log(err.toString());
            })
        },
    },
    props:{
        songLists:{
            type:Array,
            
        }
    },
    computed: {
        nowPlaySong () {
            return this.$store.getters.getSongPlay
        },

        
    },

    created () {
        
        
    },
    mounted() {
        
    },
    beforeDestroy() {
        
    },
}
</script>

<style lang="sass" scoped>
    $baseColor: #31c27c;
    .location
        position: fixed
        right: 20vw
        bottom: 10rem
        font-size: 3rem
        z-index: 9999
    .loc
        position: absolute
        top: -30rem
        font-size: 0
    .song-list
        font-size: 1.5rem;
        color: black
        .playAll
                
            line-height: 2 
            color: black
            padding: 0 1rem
            text-align: left
            display: flex
            align-items: center
            i
                color: $baseColor
                font-size: 2.2rem 
                margin-right: .4rem   
        .songs
            .item.playing
                .content h1
                    color: $baseColor
                    span
                        display: flex
                        align-items: center
                border-left: .2rem solid $baseColor
                &::after
                    width: 100vw
                    left: 0
                    // transform: translateX(200%)
                    transition: all .3s                    
                    
            .item
                position: relative
                &::after
                    height: 100%
                    width: 0
                    left: 50%
                    content: ''
                    position: absolute
                    background-color: rgba(12, 125, 12, .1)
                display: flex
                justify-content: space-between
                align-items: center
                padding: 1rem 1.5rem
                .index
                .content
                    text-overflow: ellipsis
                    overflow: hidden
                    white-space: nowrap
                    width: 70%
                    text-align: left;
                    line-height: 1.2
                    span
                        color: $baseColor
                        font-size: 1rem
                        i
                            font-size: 1.6rem
                    i
                        font-size: 1.6rem
                        vertical-align: middle
                .right
                    
                    i
                        color: $baseColor
                        font-size: 2rem
                        line-height: 1
                        margin-left: .5rem;

</style>