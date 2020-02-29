<template>
    <div id="detail" data-content_id= "groupInfo.content_id">
        <topBar :name="'歌单'" :title="cdLists && cdLists.dissname" 
        :them = 'them'
        :titleColor="'white'"
        ></topBar>
        <header class="top" >
            <!-- :style="{backgroundImage:`url(${groupInfo&&groupInfo.cover})`}" -->
            <div class="filter"
                v-if="!!them"
                :style="{backgroundImage: `linear-gradient(135deg,rgb(${them.from[0]},${them.from[1]},${them.from[2]}), rgb(${them.to[0]},${them.to[1]},${them.to[2]} ))`}"
             ></div>
            <div class="info">
                
                 <div class="cover">
                     
                     <span> <i class="iconfont icon-ting"></i> {{cdLists.visitnum ? Math.floor(cdLists.visitnum/1000) + '万':'0'}}</span>
                     <img :src="cdLists && cdLists.logo" alt="">
                 </div>
                 <div class="des">
                     <h1>{{cdLists ? cdLists.dissname : ''}}</h1>
                     <div class="author">
                         <img :src="cdLists.headurl" class="avatar" alt="">
                         <span>{{cdLists.nickname}}</span>
                     </div>
                     <h1 class="desc">
                         <span>{{'简介：'+cdLists && cdLists.desc }}</span>
                         <i class="iconfont icon-arrow-right"></i>
                     </h1>
                 </div>
            </div>
            <div class="action">
                <span>
                    <i class="iconfont icon-xihuanzhengchangx"></i>{{Math.floor(Math.random()*100) + 22}}万
                </span>
                <span>
                <i class="iconfont icon-pinglun"></i>{{Math.floor(Math.random()*10000) + 1242}}
                </span>
                <span>
                <i class="iconfont icon-fenxiang"></i>分享
                </span>
            </div>
        </header>   
        <div class="main">
            <songList :groupId ="id"  :songLists="cdLists ? cdLists.songlist : []" > </songList>
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
            title:"歌单",
            
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
                this.songLists = this.cdLists.songlist
                console.log(this.songLists, this.id,"到底是zenm回事");

                this.$store.commit('setNowPlayGroups', {
                    group: this.songLists,
                    id: this.id
                })

               
            }).catch((err) => {
                console.log(err);
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
            return  this.$store.getters.getGroupById(this.id)
        },
        getSongLists () {
            return this.cdLists.songlist
        },
        getGroupByCategoryById () {
             return  this.$store.getters.getGroupByCategoryById(this.id)
        },
        them () {
            return this.$store.getters.getThem()
        }
    },
    mounted() {
        
      
        
        Indicator.open({
            text: '加载中...',
            sninnerType: 'fading-circle'
        });

         this.getGroupDetail(this.id);

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
            // background-image: linear-gradient(rgba(10, 18, 100, .5), rgba(215, 21, 158,.8));
            padding: 6rem 2.5rem 1rem;
            height: 22rem;
            box-sizing: border-box
            position: relative
            .filter
                    position: absolute
                    top: 0
                    left: 0
                    right: 0
                    bottom: 0
                    
                    
                    z-index: -1
            .info
                display: flex;
                justify-content: space-between
                margin-top: 2rem

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