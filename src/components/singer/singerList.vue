<template>
    <div class="main" >
        <div class="tags"  v-if="tags">
            <div class="area">
                <ul class="tag" @click = "swichType">
                    <li 
                    class="item"
                    v-for="(item, index) in tags.area" 
                    :key="index"
                    data-index = 0
                    :id = 'item.id'
                    :class="(item.id == selectedId[0]) ? 'selected' : ''"
                    >
                    {{item.name}}</li>
                </ul>
            </div>
            <div class="genre">
                <ul class="tag" @click = "swichType">
                    <li 
                    class="item"
                    v-for="(item, index) in tags.genre" 
                    :key="index"
                    :id = 'item.id'
                    data-index = 1
                    :class="(item.id == selectedId[1]) ? 'selected' : ''"
                    >
                    {{item.name}}</li>
                </ul>
            </div>
            <div class="sex">
                <ul class="tag" @click = "swichType">
                    <li
                    class="item"
                    v-for="(item, index) in tags.sex" 
                    :key="index"
                    :id = 'item.id'
                    data-index = 3
                    :class="(item.id == selectedId[3]) ? 'selected' : ''"
                    >
                    {{item.name}}</li>
                </ul>
            </div>
            <div class="index">
                <ul class="tag" @click = "swichType">
                    <li
                    class="item"
                    v-for="(item, index) in tags.index" 
                    :key="index"
                    :id = 'item.id'
                    data-index = 2
                    :class="(item.id == selectedId[2]) ? 'selected' : ''"
                    >
                    {{item.name}}</li>
                </ul>
                
            </div>
        </div>
        <div class="lists">
            <div class="item" >
                <span class="index"></span>
                <ul class="singer-list">
                    <li class="singer" 
                    v-for="(item, index) in singerByTag"
                    :key="index"
                    :data-id="item.singer_id"
                    :data-mid = 'item.singer_mid'
                    @click="checkSinger(item.singer_id, item.singer_mid, item.singer_pic)"
                    >
                   
                            <img v-lazy="item.singer_pic" alt="">   
                            <h1>{{item.singer_name}}</h1>
                        
                    </li>
                </ul>
            </div>
        </div>
        <vFooter></vFooter>
        <!-- <a href="#" class="toBackTop iconfont icon-huidaodingbu"></a> -->
    </div>
</template>

<script>
import vFooter from '@/components/com/vfooter'
import {Indicator } from 'mint-ui'
import {Toast } from 'mint-ui'

export default {
    name: 'singerList',
    data() {
        return {
            allSinger: null,
            singerByTag: null,
            tags: null,
            selectedId: [200, 1, -100, -100],
            total: 0,
            page: 3
        }
    },
    components: {
        vFooter
    },
    methods: {
        // 按照地区 流派 性别获取歌手信息，
        // 默认是-100
        getSinger (area = this.selectedId[0], 
        genre = this.selectedId[1], 
        index = this.selectedId[2], 
        sex = this.selectedId[3],
        page = this.page) {
            this.$http.get(`getSingerList`, {
              params: {area: area,sex: sex, index: index, genre: genre, page: page}
            })
            .then((res) => {
                var data = res.data.response.singerList.data
                this.total = data.total

                this.tags = data.tags
                this.singerByTag = data.singerlist

                Indicator.close()
            }).catch((err) => {
                Indicator.close()
                Toast('加载失败！')
            })
        },
        swichType (e) {
            if(e.target.nodeName.toLowerCase() == 'ul') {
                
                return
            }
            var id = e.target.id;
            var index = e.target.dataset.index
            this.selectedId[index] = id

            this.getSinger()
        },
        checkSinger (id, mid, pic) {
            this.$router.push({path: `/singer/${id}`, query: {mid: mid, pic: pic}})
        }
        
    },
    computed: {

    },
    mounted () {
        Indicator.open({
            text: '加载中...',
            sninnerType: 'fading-circle'
        });
        this.getSinger()
    }

}
</script>


<style lang="sass" scoped>
    $baseColor: #31c27c;
    .toBackTop
        padding: 3rem
        font-size: 3rem
        position: fixed
        right: 2rem
        bottom: 2rem
    .main
        scroll-behavior: smooth

        padding: 5rem 2rem 3rem
        .tags
            &>div
               
                .tag
                    display: flex;
                    justify-content: flex-start
                    font-size: 1.2rem
                    line-height: 1.2
                    flex-wrap: nowrap
                    margin: 1.2rem 0
                    overflow-x: auto
                    &::-webkit-scrollbar
                        display: none
                    li
                        padding: .5rem .6rem
                        border-radius: 1rem
                        background-color: white
                        margin-right: 1.5rem
                        min-width: 3rem
                        text-align: center
                        word-break: keep-all
                        &.selected
                            background-color: $baseColor
                            color: white
                        
        .lists

            .item

                .index
                
                .singer-list

                    .singer
                        margin: 1.5rem 0
                        display: flex
                        justify-content: flex-start
                        align-items: center
                        h1  
                            font-size: 1.5rem
                            text-overflow: ellipsis
                            overflow: hidden
                            white-space: nowrap
                        // border-bottom: .2rem solid rgb(235, 250, 245)
                        img
                            width: 4rem
                            height: auto
                            border-radius: 50%
                            margin-right: 1rem
</style>