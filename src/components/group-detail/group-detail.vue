<template>
    <div id="detail" data-content_id= "groupInfo.content_id">
        <topBar :title="title"></topBar>
        <header class="top">
            <div class="info">
                 <div class="cover">
                     
                     <span> <i class="iconfont icon-ting"></i> {{groupInfo?groupInfo.listen_num/100 + '万':'0'}}</span>
                     <img :src="groupInfo&&groupInfo.cover" alt="">
                 </div>
                 <div class="des">
                     <h1>{{groupInfo ? groupInfo.title : ''}}</h1>
                     <div class="author">
                         <img :src="cdLists.headurl" class="avatar" alt="">
                         <span>{{cdLists.nickname}}</span>
                     </div>
                     <h1 class="desc">
                         <span>{{'简介：'+cdLists.desc}}</span>
                         <i class="iconfont icon-arrow-right"></i>
                     </h1>
                 </div>
            </div>
            <div class="action">
                <span>
                    <i class="iconfont icon-xihuanzhengchangx"></i>23万
                </span>
                <span>
                <i class="iconfont icon-pinglun"></i>2536
                </span>
                <span>
                <i class="iconfont icon-fenxiang"></i>分享
                </span>
            </div>
        </header>
        <div class="main">
            <songList :songLists="cdLists ? cdLists.songlist : []"> </songList>
        </div>
    </div>
</template>

<script>
import {Indicator } from 'mint-ui'

import songList from '../com/songList'
import topBar from '../com/topBar'
export default {
    name: "group",
    data() {
        return {
            groupInfo: this.getGroup,
            id: this.$route.params.id,
            type: this.$route.query.type,
            songLists: [],
            cdLists: [],
            test:"message fom parent",
            title:"歌单"
        }
    },
    components:{
        songList,
        topBar
    },
    methods: {
        // 根据content_id查询这个歌单的详情列表
        getGroupDetail (content_id) {
            this.$http.get(`getSongListDetail`, {
              params: {disstid: content_id}
            })
            .then((res) => {
                Indicator.close();                
                this.cdLists = res.data.response.cdlist[0]
                this.songLists = cdLists.songlist
                console.log("res",this.songLists);
            }).catch((err) => {
                
            })
        },
        getAlbumInfo (albumId) {

            this.$http.get(`getAlbumInfo`, {
              params: {albummid: albumId}
            })
            .then(res => {
                var data = res.response.data
                this.cdLists = data.list
                this.songList = cdLists
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    computed: {

        getGroup () { 
            return  this.$store.getters.getGroupById(this.id)[0]
        },
        getSongLists () {
            return this.cdLists.songlist
        }
    },
    mounted() {
        

        console.log(this.type);
        console.log(this.id);
        Indicator.open({
            text: '加载中...',
            sninnerType: 'fading-circle'
        });
        if(this.getGroup) {
            console.log("这是在推荐个蛋里面有的");
            this.groupInfo = this.getGroup
            this.getGroupDetail(this.groupInfo.content_id);
        }else  if(this.type == 1){
            this.getAlbumInfo(this.id)
        }
        
        

    },
    beforeDestroy() {
        Indicator.close()
    },
}
</script>


<style lang="sass" scoped>
    
    #detail
        width: 100%
        .top
            width: 100%
            background-image: linear-gradient(rgba(10, 18, 100, .5), rgba(215, 21, 158,.8));
            padding: 6rem 2.5rem 1rem;
            height: 22rem;
            box-sizing: border-box
            .info
                display: flex;
                justify-content: space-between
                
                .des
                    padding: 0 2rem;
                    // flex: 1;
                    color: white
                    width: 95%
                    position: relative
                    .author
                        font-size: 1.2rem
                        line-height: 1.2;
                        margin: .5rem 0
                        text-align: left
                        .avatar
                            width: 2.5rem;
                            height: auto;
                            border-radius: 50%
                            vertical-align: middle
                            margin-right: .5rem
                            // overflow: hidden;
                    .desc
                        font-size: 1.2rem
                        display: flex
                        position: absolute
                        bottom: 0
                        
                        i
                            font-size: 1rem
                        span
                            width: 20rem
                            text-overflow: ellipsis
                            overflow: hidden
                            white-space: nowrap
                    h1
                        font-size: 1.4rem;
                        font-weight: bold;
                        line-height: 1.1
                        color: white
                        text-align: left;
                .cover
                    position: relative
                    font-size: 1.2rem
                    color: white
                    span
                        position: absolute
                        bottom: 0.5rem
                        right: 0.5rem
                    img
                        border-radius: .8rem;
                        vertical-align: top
                        width: 9rem;
                        height: auto;
            .action
                margin: 2rem 0 0;
                color: white
                display: flex
                justify-content: space-between
                font-size: 1.2rem
                span 
                    i
                        margin-right: 0.5rem

</style>