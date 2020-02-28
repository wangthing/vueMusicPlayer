<template>
    <div class="wrap">
        <topBar :title="'分类歌单'" 
        :name="'分类歌单'"
        :isOpacity="false"
        :them = '{from:[245,245,245], to: [245,245,245]}'> 
        </topBar>
        <div class="category">
            <ul class="lists">
                <li class="item" v-for="(item, index) in allCategory"
                 :key="index"
                 :data-type = "index"
                 :data-id = 'item.dissid'
                :class="checkType == index ? 'selected' : ''"
                 @click = "checkCategory(index)"
                 >
                    {{item.categoryGroupName}}

                </li>
                <!-- <li class="iconfont icon-sanheng1"></li> -->
            </ul>
        </div>

        <div class="group" v-for="(item, type) in allCategory" v-show="checkType == type" :key="type" >
            <div class="hot-list">
                <div class="list-wrap">
                    <ul class="lists">
                    
                        <li class="list-item" v-for="(item, index) in groupList[checkType]" :key="index"
                           
                            :data-groupId= "item.content_id" @click="goGroupDetail(item.dissid)"
                        >
                            
                            <div class="cover">
                                <div class="img">
                                    <h1 class="visted">
                                        <span class="left"><i class="iconfont icon-ting"></i>{{Math.floor(item.listennum/1000)+'万'}} </span>
                                        <span class="right"><i class="iconfont icon-bofang"></i></span>
                                        </h1>
                                    <img v-lazy="item.imgurl" alt="">
                                </div>
                                <h1>{{item.dissname}}</h1>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import topBar from '@/components/com/topBar.vue'
import {Indicator} from 'mint-ui'

export default {
    name: 'allGroup',
    data() {
        return {
            allCategory: null,
            nowCategory: 0,
            groupList : new Array(20),
            checkType: 0,
            page: 1
        }
    },
    components: {
        topBar
    },
    methods: {
        getAllCategory () {
            this.$http.get(`getSongListCategories`, {
              params: {}
            })
            .then((res) => {
                console.log(res);
                var data = res.data.response.data.categories
                this.allCategory = data
                this.checkCategory()
            }).catch((err) => {
                
            })
        },
        checkCategory (index = 0) {
            this.checkType = index
            this.getGroupById(this.allCategory[index].items[0].categoryId, index);
        },
        getGroupById (id, index) {

            if(this.groupList[index]) return;
            Indicator.open({
                text: '正在加载...',
                sninnerType: 'fading-circle'
            });
            this.$http.get(`getSongLists`, {
              params: {categoryId: id, limit: 32}
            })
            .then((res) => {
                console.log(res);
                this.groupList.splice(index, 1, res.data.response.data.list)
            
                // this.$store.commit('addGroupByCategory',{
                //     list: this.groupList[index]
                // })
                Indicator.close()
            }).catch((err) => {
                Indicator.close()                
            })
        },
        goGroupDetail (id) {
            this.$router.push({path: `/group/${id}`})   
        }
    },
    computed: {

    },
    mounted () {
        this.getAllCategory()
    },
    destroyed () {

    }
}
</script>

<style lang="sass" scoped>
    $baseColor: #31c27c;

    .wrap
        padding: 0 1.5rem 2rem
        font-size: 1.2rem
        .category
            z-index: 100
            height: 4.5rem 
            overflow: hidden
            position: relative
            // background-color: red
            .lists  
                position: fixed
                
                width: 100vw
                left: 0
                padding: 1rem 0
                display: flex
                justify-content: space-between
                background-color: rgb(245, 245, 245)
                .item
                    flex: 1
                    font-size: 1.4rem
                    padding: .3rem 0 .5rem 
                    // font-weight: bold
                    &.selected
                        position: relative
                        color: $baseColor
                        &::after
                            content: ''
                            position: absolute
                            // width: .2rem
                            background-color: currentColor
                            height: .2rem
                            bottom: 0
                            left: 35%
                            right: 35%
                       
        .group
            // padding-top: 4re m
            .hot-list
                overflow-x: auto
                overflow-y: hidden
                &::-webkit-scrollbar
                    display: none
                
                    
                .lists
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-start
                    .list-item
                        width: 31.3%;
                        // height: 14rem;
                        margin: 0 2% .5% 0;
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