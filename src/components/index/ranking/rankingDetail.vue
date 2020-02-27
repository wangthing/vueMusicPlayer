<template>
    <div class="ranking-detail"> 
        <div class="top">
            <img :src="getTopList.headPicUrl" alt="">
            <p class="visited">
                <span class="left"><i class=""></i>{{getTopList.updateTime}} 更新</span>
            </p>
        </div>
        <!-- <songList :songLists="cdLists ? cdLists.songlist : ''"></songList> -->
        <!-- 展示歌曲列表页面 -->
        <div class="song-list">
           <!-- 定位 -->
           <a v-if="!!nowPlaySong" 
           class="iconfont icon-miaozhun location" 
           :href="nowPlaySong.songid"
           @click.prevent="goLocation"
           ></a>

            <h1 class="playAll"><i class="iconfont icon-bofang1"></i>  播放全部{{` (${getTopList.totalNum})`}}</h1>
            
            <ul class="songs">
                <li class="item" 
                 :class=" (nowPlaySong == null) ? '' : (item.songId ===   (nowPlaySong.track_info ? nowPlaySong.track_info.id : nowPlaySong.songid) ? 'playing' : '')" 
                 v-for="(item, index) in songLists.song" 
                 @click="switchSong(item.songId, item.albumMid)" 
                 :key="index"
                 :data-album="item.albumMid"
                 >
                    <i :id="item.songId" class="loc"></i>                 
                    <span class="index">{{index+1}}</span>  

                    <div class="content">
                        <h1>{{item.title}}</h1>
                        <span>
                            <!-- <i v-if="item.pay.pay_play" class="iconfont icon-vip"></i> -->
                            <i class="sq iconfont icon-sq"></i>
                            <i v-if="item.isonly" class="isonly iconfont icon-dujia"></i>
                            {{' ' + item.singerName}}<i style="font-weight:bold;color:black"></i>
                        </span>
                    </div>
                    <span class="right"> 
                        <i  class="mv iconfont icon-mv"></i>
                        <i  class="more iconfont icon-gengduo "></i> </span>                    
                </li>
            </ul>
        </div> 
        <topBar :title="songLists && songLists.titleDetail " 
        :name="'排行榜'"
        :titleColor="'white'"
        ></topBar>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import {Indicator} from 'mint-ui'
import topBar from '@/components/com/topBar'
import songList from '@/components/com/songList'
export default {
    name:'rankingDetail',
    data() {
        return {
            groupId: this.$route.query.groupId,
            topId: this.$route.params.id,
            songLists: null
        }
    },
    components: {
        songList,
        topBar
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
              Toast("当前页面没有定位到正在播放歌曲")
          }
          
        },
        getRankingDetail (topId) {
            this.$http.get(`getRanks`, {
              params: {topId: topId}
            })
            .then((res) => {
                // 这是排行榜所有的歌曲
                var data = res.data.response.detail.data.data
                this.songLists = data
                this.$store.commit('setNowPlayGroup', {
                    group: this.songLists.song.slice(0,100)
                })
                Indicator.close()
            }).catch((err) => {
                Indicator.close()                
            })
        },
        // 切换歌曲
        switchSong (songId, albumMid) {
            // 这首歌已经在播放了
            if( this.nowPlaySong && songId === this.nowPlaySong.track_info.id) return;
            // 先判断这个id的歌是不是在最近播放里面获取过
            let isPlayed = this.$store.getters.getRecentlyPlayed(songId);
            
            if(isPlayed.length) {
                // 返回的是一个数组
                let song = isPlayed[0]
                console.log("已经播放了，去内存中取吧");
                this.$store.commit('setNowPlay',{
                    song
                })
                this.getSongVkey(song.track_info.mid, songId)
                return;
            } 
            Indicator.open({
                text: '正在缓冲...',
                sninnerType: 'fading-circle'
            });
            this.getAlbumInfo(songId,albumMid);
        },
        // 由于排行榜的信息没有歌的mid，也没有歌曲是否付费的信息
        // 只能通过专辑id获取到专辑，再找到我们要播放的歌
        getAlbumInfo (songId, albummid) {
            
            this.$http.get(`getAlbumInfo`, {
              params: {albummid: albummid}
            })
            .then(res => {
                var data = res.data.response.data
                var song = data.list.filter(item => item.songid == songId)[0]
                console.log(song);
                // 判断是不是付费的
                var isPay = song.pay.payplay
                if(isPay) {
                    Toast("这首歌是付费的，试试别的吧")
                    retutn;
                }
                var songMid = song.songmid
                this.getSongInfo(songMid, songId)
            })
            .catch(err => {
                Indicator.close()
                console.log(err);
            })
        },
        // 获取歌曲的播放信息
        getSongVkey (mid, id) {
            this.$http.get(`getMusicVKey`, {
              params: {songmid: mid}
            })
            .then(res => {
                var playList = res.data.response.playLists
                this.$store.state.nowPlayUrl = playList[0]
            })
            .catch(err => {
                console.log(err.toString());
            })
        },
        getSongInfo (mid, id) {
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
                console.log(err);
            })
        }
        

    },
  
    watch: {
        $route: {
            handler: function (to, from) {
                if(to.name == 'rankingDetail') {
                    this.groupId = to.query.groupId
                    this.topId = to.params.id
                }
            },
            deep: true
        }
    },
    computed: {
        nowPlaySong () {
            return this.$store.getters.getSongPlay
        },
        getTopList () {
            return this.$store.getters.getTopListById(this.groupId, this.topId)
        },
        
    },
    mounted () {
         Indicator.open({
            text: '加载中...',
            sninnerType: 'fading-circle'
         });
    },
    destroyed () {  
            Indicator.close()

    },
    updated () {

        
    },
    beforeRouteUpdate (to, from, next) {
        console.log(to, from,'uodate');
    },
    beforeRouteEnter (to, from, next) {
        next( (vm) => {
            vm.getRankingDetail(vm.topId)
        })
             
    }

}
</script>

<style lang="sass" scoped>
    $baseColor: #31c27c;

    .ranking-detail

        .top
            height: 30rem   
            overflow: hidden
            position: relative
            .visited    
                font-size: 1.2rem
                color: white;
                position: absolute;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                justify-content: space-between;
                align-items: center;
            img
                width: 100%
                height: auto
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
            border-radius: 2rem 2rem 0 0
            font-size: 1.5rem
            // background-color: red
            .playAll
                
                line-height: 2 
                color: black
                padding: 0 2rem
                text-align: left
                display: flex
                align-items: center
                i
                    color: $baseColor
                    font-size: 2.2rem 
                    margin-right: .4rem   
            .songs
                .item 
                    .content span
                        display: flex
                        align-items: center        
                .item.playing
                    .content 
                        h1
                        color: $baseColor
                        
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