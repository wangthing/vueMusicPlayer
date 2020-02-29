<template>
    <div class="singerInfo"  v-if="songLists">
        <div class="top" >
            <div class="blur" :style="{backgroundImage: `url(${pic})`}"></div>
            <div class="singer">
                <img :src="pic" alt="">
                <div>
                    <h1>{{singerInfo &&singerInfo.name}}</h1>
                    <h2>粉丝数：{{singerInfo && Math.floor(singerInfo.fans/10000)}}万</h2>
                </div>
            </div>
            <h1 class="des" >歌手简介： {{data && data.singer_brief ? data.singer_brief :'暂无简介'}}</h1>
            <div class="num" v-if="!!data">
                <h1>歌曲: <span>{{data.total_song}}</span></h1>
                <h1>专辑: <span>{{data.total_album}}</span></h1>
                <h1>MV: <span>{{data.total_mv}}</span></h1>
            </div>
        </div>
        <songList :songLists="songLists ? songLists : []"
                :groupId = "singerInfo  && singerInfo.mid"
        ></songList>
        <topBar :title="singerInfo ? singerInfo.name : ''"
                :titleColor = "'white'"
        ></topBar>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import songList from '@/components/com/songList'
import topBar from '@/components/com/topBar'
export default {
    name: 'singerInfo',
    data() {
        return {
            songLists: null,
            singerInfo: null,
            pic: '',
            data: null
        }
    },
    components: {
        songList,
        topBar
    },
    computed: {

    },
    methods: {
        getSingInfo (id, mid) {
             Indicator.open({
                text: '加载中...',
                sninnerType: 'fading-circle'
             });
            this.$http.get(`getSingerAlbum`, {
              params: {singermid: mid}
            })
            .then((res) => {
                
                var data = res.data.response.singer.data
                this.data = data
                this.singerInfo = data.singer_info
                this.songLists = data.songlist
                Indicator.close()
                this.$store.commit('setNowPlayGroup', {
                    group: this.songLists,
                    id: this.singerInfo.mid
                })
            }).catch((err) => {
                Indicator.close()
                Toast('加载失败')               
            })
        },
        showMore (str) {
             Toast({
                 message: str,
                 duration: 200000,
                 className: 'toast',
             })
        }
    },
    mounted() {
        // this.getSingInfo()
        console.log("更新了吗");
    },
    beforeRouteEnter: (to, from, next) => {
        console.log(from,to);  
        next (vm => {
            if(vm.id != to.params.id) {
                console.log("不一样");
                
                vm.id = to.params.id
                vm.mid = to.query.mid
                vm.pic = to.query.pic
                vm.getSingInfo(vm.id, vm.mid)
            }
        }) 

        
    },
    destroyed () {
            Indicator.close()
    }
}
</script>


<style lang="sass">
    
    .singerInfo


        .top
            height: 18rem
            padding: 5rem 2rem 0
            
            position: relative
            z-index: 5
            color: white
            background-color: rgba(225, 235, 245,.5)
            .blur
                content: ''
                position: absolute
                top: 0
                left: 0 
                right: 0
                bottom: 0
                background-repeat: no-repeat
                background-size: 100%
                filter: brightness(.4)
                z-index: -10
            .singer
                display: flex
                justify-content: flex-start
                align-items: center
                div
                    margin-left: 2rem
                    text-align: left
                    line-height: 1.4   
                    h1
                        
                        font-size: 2rem
                    h2
                        font-size: 1.5rem
                        color: rgb(225, 235, 205)

            .num
                // background-color: green
                font-size: 1.5rem
                width: 80%
                position: absolute
                bottom: 1rem
                display: flex
                padding-top: 2rem
                justify-content: space-between
                span
                    font-size: 1.8rem
            .des
                margin-top: 1rem
                font-size: 1.2rem
                text-align: left
                line-height: 1.2
                overflow-y: auto
                text-overflow: ellipsis
                display: -webkit-box
                -webkit-box-orient: vertical
                -webkit-line-clamp: 5
                &::-webkit-scrollbar
                    display: none
            img
                width: 6rem
                border-radius: 50%
                height: 6rem
</style>