<template>
    
    <transition name="fade">
        <div id="mains">
            <vFooter></vFooter>
            
            <!-- 轮播图组件 -->
            <vSwiper/>
            <!-- 分类 -->
            <div class="classfy">
                
                <router-link class="link" to="/singer">
                    <i class="iconfont icon-geshou"></i>
                    歌手
                </router-link>
              
                <router-link class="link" to="/ranking">
                    <i class="iconfont icon-paihang"></i>
                    排行
                </router-link>
                <router-link class="link" to="/allGroup">
                    <i class="iconfont icon-leimupinleifenleileibie"></i>
                    分类歌单
                </router-link>
                <router-link class="link" to="/singer">
                    <i class="iconfont icon-ziyuan"></i>
                    电台
                </router-link>
                <router-link class="link" to="/singer">
                    <i class="iconfont icon-tingge"></i>
                    一起听
                </router-link>
            </div>

            <!-- 超热歌单 -->
            <div class="hot-title">
                <h1 class="title">
                    <span class="left">超热歌单</span>
                    <span class="right">更多<i class="iconfont icon-arrow-right"></i> </span>
                </h1>
            </div>
            <div class="hot-list">
                <div class="list-wrap">
                    <ul class="lists">
                    
                        <li class="list-item" v-for="(item, index) in recommendList" :key="index"
                            :data-groupId= "item.content_id" @click="goGroupDetail(item.content_id)"
                        >
                            
                            <div class="cover">
                                <div class="img">
                                    <h1 class="visted">
                                        <span class="left"><i class="iconfont icon-ting"></i>{{Math.floor(item.listen_num/1000)+'万'}} </span>
                                        <span class="right"><i class="iconfont icon-bofang"></i></span>
                                        </h1>
                                    <img v-lazy="item.cover" alt="">
                                </div>
                                <h1>{{item.title}}</h1>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- MV-->
            <div class="MV">
                <h1 class="title">
                    <span class="left">大家都在看</span>
                    <span class="right">更多<i class="iconfont icon-arrow-right"></i> </span>
                </h1>
                <div class="wrap">
                    <ul class="mv-list">
                        <li class="mv-item" v-for="(item, index) in MV" :key="index"> 
                            <img :src="item.picurl" alt="" >
                            <p class="title">{{item.mvdesc}}</p>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>

import vFooter from '@/components/com/vfooter'

import topSearch from '@/components/com/top-search'
import vSwiper from './swiper'
export default {
    name:'index',
    data () {
        return {
            recommend: {},
            recommendList: [],
            newAlbum: this.getNewAlbum,
            MV: []
        }
    },
    components: {
        topSearch,
        vSwiper,
        vFooter
    },
    methods: {
        getRecommendList () {
            var recommend = this.$store.state.recommend
            if(recommend) {
                this.recommendList = recommend.response.recomPlaylist.data.v_hot
                return;
            }
            this.$http.get(`getRecommend`, {
              params: {}
            })
            .then((res) => {
                var data = res.data;
                this.recommendList = data.response.recomPlaylist.data.v_hot
                this.recommend = data;
                this.$store.state.recommend  = data;
                console.log("加载好了推荐个蛋");
            })
            .catch((err) => {
                alert(err.toString())
            })
        },
        // 获取值得一听的个，从推荐最热歌单随机选取一个歌单的列表
        getWorthySongs () {
            var contentId = this.recomPlaylist.content_id
            this.$http.get(`getSongListDetail`, {
              params: {disstid:contentId}
            })
            .then(res => {
                this.worthySongs = res.data.response
            })
            .then(err => {
                console.log(err);
            })
        },
        getMV () {
            this.$http.get(`getMvByTag`, {
              params: {}
            })
            .then(res => {
                var MVs = res.data.response
                this.MV = MVs.data.mvlist.slice(0,8)
            })
            .catch(err => {
                console.log(err);
            })
        },
        goGroupDetail (id) {
            this.$router.push({path: `/recommend/${id}`})   
        }
    },
    computed: {
        // 推荐最热歌单
        recomPlaylist () {
            return this.recommend.response.recomPlaylist.data.v_hot[(Math.floor(Math.random()*11))]
        },
        getNewAlbum () {
            return this.recommend.response.new_album.data.albums
        },
        

    },
    mounted() {
        this.getRecommendList();
        this.getMV()
    },
}
</script>
<style scoped>
    @import url('../../../common/style/fonts.css');
</style>    
<style lang="sass" scoped>
    $baseColor: #31c27c
    #mains
        padding-top: 4rem
        margin: 1.2rem .8rem;        
        font-size: 18px
        &>div
            margin: 1rem .8rem;
        .top
    
    
    
            display: flex;
            justify-content: space-between;
            align-items: center;
            i 
                font-size: 2.4rem;
                margin-right: 1rem;

                color: $baseColor;
        .classfy
            display: flex;
            font-size: 1.2rem;
            line-height: 1.8;
            margin: 1rem auto;
            justify-content: space-around;
            .link
                display: flex;
                flex-direction: column;
                i
                    color: $baseColor;
                    font-size: 2rem
        .hot-title,.MV
            .title
                display: flex;
                justify-content: space-between;
                font-size: 1.5rem;
                margin: 0.5rem 0;
                .left
                    font-weight: bold;
                .right
                    font-size: 1.2rem;
                    font-weight: bold;
                    vertical-align: middle;
        .MV
            .wrap
                overflow-x: auto;
                overflow-y: hidden;
                margin: 1rem 0;
                &::-webkit-scrollbar 
                    display: none;
    
                .mv-list
                    display: flex;
                    // width: 178vw;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    .mv-item
                        width: 47%;
                        margin: 0 1% 1% 0;
                        .title
                            font-size: 1.2rem
                            text-align: left
                        img
                            width: 100%;
                            border-radius: 1rem;
                            height: auto; 
        .hot-list
            overflow-x: auto
            overflow-y: hidden
            &::-webkit-scrollbar
                display: none
            
                
            .lists
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between
                .list-item
                    width: 31.3%;
                    // height: 14rem;
                    margin: 0 1% .1% 0;
                    .cover
                        // height: 14rem;
                        margin: 0.5rem 0;
                        width: 100%;
                        .img
                            position: relative;
                        .visted
                            color: white;
                            position: absolute;
                            width: 80%;
                            bottom: .8rem;
                            left: 50%;
                            transform: translateX(-50%);
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        h1
                            color: black;
                            font-size: 1.2rem;
                            line-height: 1.2;
                            text-align: left;
                        img
                            width: 100%;
                            border-radius: 1rem;
                            height: auto;
                            












</style>