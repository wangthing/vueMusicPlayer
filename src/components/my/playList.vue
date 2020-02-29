<template>
    <div class="lists" id="wrap" @click="hide" :class= "isShow ? 'show' : ''" w-if="getNowPlayId">
        
        <div class="content" @click.stop="clickContent">
            <p class="action"> <i style="color: #31c27c" class="iconfont icon-bofang1"></i> 播放全部 ({{ getNowGroup && getNowGroup.length  }})</p>
            <ul class="songs" v-if = "getNowPlayId && getNowPlayId.length > 3 || isNaN(getNowPlayId)"> 
                <li class="item" v-for="(item, index) in getNowGroup"
                 :key="index" 
                 v-if=" item && !item.pay.pay_play"
                 :class="nowPlaySong && nowPlaySong.track_info.id == item.id ? 'now iconfont' : ''"
                 
                 @click = "  switchSong(item.mid, item.id) "
                 >
                    <!-- 排行榜的歌曲只能通过 -->
                    <!-- 这里是其他的情况 因为排行榜的id是小于100的-->
                   <h1 
                        
                       :data-mid = "item.mid" :data-id = "item.id">
                       <span class="name">{{ item.name}}  </span>
                       <span class="singer" > {{' - ' +  item.singer[0].name}}</span>
                   </h1>
                    
                </li>
            </ul>
            <!-- <p>{{ getNowPlayId}}</p> -->
            <ul class="songs"  v-if = " getNowPlayId && getNowPlayId.length <= 3" > 
                <li class="item" v-for="(item, index) in getNowGroup"
                 :key="index"
                 :class="nowPlaySong && nowPlaySong.track_info.id == item.songId ? 'now iconfont' : ''"  
                 @click = "  switchSong2(item.albumMid, item.songId)"
                 >
                    <!-- 排行榜的歌曲只能通过 -->
                   
                    <!-- 这里是排行榜的情况 -->
                   <h1 :data-albumMid = "item.albumMid" :data-id = "item.songId">
                       <span class="name">{{ item.title}}  </span>
                       <span class="singer" > {{' - ' +  item.singerName}}</span>
                   </h1>
                </li>
            </ul>
            <p class="close" @click="hide">关闭</p>
        </div>
    </div>
</template>

<script>
import eventBus from '@/api/eventBus'
import {Toast} from 'mint-ui'
import {Indicator} from 'mint-ui'
export default {
    name: 'palyList',
    data() {
        return {
          groupId: ''  
        }
    },
    methods: {
        clickContent (e) {
            
        },
        hide (e) {
            this.$store.state.showPlayList = false
        },
        switchSong (mid, id, pay_play = false) {
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
            if(isPlayed && isPlayed.length) {

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
                console.log(err);
            })
        },
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


        // 切换歌曲 排行榜
        switchSong2 (albumMid, songId ) {
            // 这首歌已经在播放了
            if( this.nowPlaySong && songId === this.nowPlaySong.track_info.id) return;
            // 先判断这个id的歌是不是在最近播放里面获取过
            let isPlayed = this.$store.getters.getRecentlyPlayed(songId);

            

            if(isPlayed && isPlayed.length) {
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
                console.log(res,"专辑的");
                var data = res.data.response.data
                var song = data.list.filter(item => item.songid == songId)[0]
                console.log(song);
                // 判断是不是付费的
                var isPay = song.pay.pay_play
                if(isPay) {
                    Toast("这首歌是付费的，试试别的吧")
                    return;
                }
                var songMid = song.songmid
                this.getSongInfo(songMid, songId)
            })
            .catch(err => {
                Indicator.close()
                alert("不好意思，无法播放这首歌")
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
        },
        next () {
            // console.log(this);
            this.$bus.$on('nextSong', (isNext = true) => {

                var group = this.getNowGroup
                var nowPlay = this.nowPlaySong
                var nowPlayId = this.getNowPlayId
                console.log(group, nowPlayId, nowPlay,"--------------------");
                group.forEach ((item, index, arr) => {
                    if((item.id || item.songId) == nowPlay.track_info.id ) {
                        console.log("找到了id一样的");
                        // true是上一首
                        let songInfo 
                        
                        if(isNext) {
                            console.log("下一首");

                            songInfo = arr[index+1 < arr.length ? index+1 : 0]
                        }else {
                             songInfo = arr[(index-1) > 0 ? (index-1) : arr.length-1]
                        }
                        
                        if(this.getNowPlayId.length <= 3) {
                            console.log("下一首");
                                this.switchSong2(songInfo.albumMid, songInfo.songId)
                        } else {
                            this.switchSong(songInfo.mid,songInfo.id)

                        }
                    
                    } 
                })
            })
        }

    },
    created() {
        this.next()
    },
    computed: {

        getNowGroup () {
            return this.$store.getters.getNowPlayGroup
        },
        isShow () {
            return this.$store.state.showPlayList
        },
        // 获取现在播放歌单的id 两位数的是排行榜的，排行榜孤儿
        getNowPlayId () {
            // get() {
                return this.$store.getters.getNowPlayId;
            // },
            // set: function (newVal) {
                // this.getNowPlayId = newVal
            // }
        },
        nowPlaySong () {
            return this.$store.getters.getSongPlay
        }
    },
    watch: {

    },
    mounted () {
        
    }
}
</script>

<style lang="sass" scoped>
    $baseColor: #31c27c;

    .lists
        font-size: 1.2rem
        position: fixed
        z-index: 99999
        top: 100%
        bottom: -100%
        height: 100vh
        left: 0
        right: 0
        
        // transform: translateX(-100%)
        
        
        background-color: rgba(25, 25, 25,.5 )
        transition: .3s
        
        &.show
            // height: 100%
            //  transform: translateX(-100vw)
            top: 0
            bottom: 0
        .content 
            height: 75%
            position: absolute
            width: 100vw
            bottom: 0
            border-radius: 1.5rem 1.5rem 0 0
            background-color: white 
             
            .action
                font-size: 1.6rem
                padding: 1.8rem  
                text-align: left
            .songs
                height: 80%
                font-size: 1.2rem
                text-align: left
                overflow-y: auto
                &::-webkit-scrollbar
                    display: none  
                
                .item
                    padding: 1.2rem 1.5rem
                    border-top: 1px solid rgb(225, 235, 245)
                    line-height: 1.2
                    &.now h1 
                        color: $baseColor
                    h1
                        margin-right: 4rem
                        font-size: 1.6rem
                        overflow: hidden
                        text-overflow: ellipsis
                        white-space: nowrap
                        display: flex
                        justify-content: flex-start
                        align-items: center
                        
                        span
                            
                        .name
                            margin-right: 1rem

                        .singer
                            font-size: 1.4rem
                            // color: rgb(35, 35, 35)

            .close
                text-align: center
                position: absolute
                bottom: 1rem
                width: 100%
                font-size: 1.6rem
                line-height: 1.5
                
</style>