<template>
    <div class="search">
        <div class="top">
            <span class="iconfont icon-houtui" @click="back"></span>
            <div class="ipt">
                <span class="iconfont icon-sousuo"></span>
                <input type="text" v-model="keyword" @focus="iptFocus" @input="iptChange" autofocus="true">
            </div>
        </div>
        <div class="history" v-if="historyKeyword.length && !showResult && !showSmart" >

            <div class="title">
                <h1>历史搜索 </h1>
                <i class="iconfont icon-qingkong" @click="deleteHistory"></i>
            </div>
            <ul class="historykey">
                <li class="key"
                    v-for="(item, index) in historyKeyword" :key="index"
                    @click = "goSearch(item)"
                >
                {{ item }}
                </li>
            </ul>
        </div>
        <div class="hotkey"  v-if="!showResult && !showSmart">

            <h1>热门搜索</h1>
            <ul class="keys">
                <li class="key"
                    v-for="(item, index) in hotkey" :key="index"
                    @click = "goSearch(item.k)"
                >
                <span class="index"
                    :class="index < 3 ? 'hot' :' ' "
                >{{ ++index }}</span>
                <span>{{item.k}}</span>
                </li>
            </ul>
        </div>
        <div class="smart" v-if="showSmart">
            <ul class="smartKeys" v-if=" smartKeys && smartKeys.singer">
                <h1 v-show="smartKeys.singer.itemlist.length">歌手</h1>

                <li  class="keys singer"
                     
                     v-for="(item, index) in smartKeys.singer.itemlist"
                     :key="index"
                     :data-mid = "item.mid"
                     :data-id = "item.id"
                     @click="checkSinger(item.id, item.mid, item.pic)"
                >
                    <img v-lazy="item.pic" alt=""> <span>{{item.name}}</span>
                </li>
            </ul>
            <ul class="smartKeys" v-if="smartKeys && smartKeys.song">
                <h1  v-show="smartKeys.singer.itemlist.length">单曲</h1>
                <li class="keys song"
                    v-for="(item, index) in smartKeys.song.itemlist"
                     :key="index"
                     :data-mid = "item.mid"
                     :data-id = "item.id"
                     @click="goSearch(item.name)"
                >
                    <i class="iconfont icon-sousuo"></i>
                    <span>{{item.name }} &nbsp;</span>
                     <span> {{item.singer}}</span>
                </li>
            </ul>
            <p class="searchAlone" @click="goSearch(keyword)">搜索"{{ keyword }}"</p>
        </div>
        <result 
            :showResult = "showResult"
            :showSmart = "showSmart"
            :songLists= "songLists"
        >   
        </result>
        
    </div>
</template>

<script>
import {Indicator } from 'mint-ui'
import result from './result'
export default {
    name: 'search',
    data() {
        return {
            keyword: '',
            hotkey: [],
            songLists: [],
            showResult: false,
            showSmart: false,
            smartKeys: null,
            page: 1,
            historyKeyword: JSON.parse(localStorage.getItem('_keyword'))
        }
    },
    components: {
        result
    },
    methods: {
        back () {
            this.$router.back(1)
        },
        getHotkey () {
            this.$http.get(`getHotkey`, {
              params: {}
            })
            .then((res) => {
                this.hotkey = res.data.response.data.hotkey  
            }).catch((err) => {
                
            })
        },
        goSearch(key = this.keyword, showSmart = true) {
            // 本地缓存搜索历史
            let _keyword = localStorage.getItem('_keyword')
            if(_keyword == null) {
                _keyword = [key]
                this.historyKeyword = _keyword
                localStorage.setItem('_keyword', JSON.stringify(_keyword))
            } else {
                var tmp = JSON.parse(_keyword)
                tmp.unshift(key)
                // 还需要去重
                tmp = [...new Set(tmp)]
                this.historyKeyword = tmp
                localStorage.setItem('_keyword', JSON.stringify(tmp))
            }
           
            

             if(key == '') return
             this.keyword = key
             this.showSmart = false
             this.showResult = true
             this.songLists.length = 0
             Indicator.open({
                text: '加载中...',
                sninnerType: 'fading-circle'
             });
            this.$http.get(`getSearchByKey`, {
              params: {key: key, limit: 30, page: this.page, catZhida: 3}
            })
            .then((res) => {
                var data = res.data.response.data
                
                Indicator.close()
                this.songLists = data.song.list
            }).catch((err) => {
                
            })
        },
        iptFocus () {
            console.log("点击欧文输入框");
            if(this.showResult && this.keyword != '') {
                this.showResult = false
            }
        },
        iptChange (e) {
            
        },
        getSmartbox (key) {
            this.showSmart = true
            if(key == '') this.showSmart = false;
            this.$http.get(`getSmartbox`, {
              params: {key: key, limit: 10}
            })
            .then((res) => {
                console.log(res);
                var data = res.data.response.data
                this.smartKeys = data
            }).catch((err) => {
                
            })
        },
         checkSinger (id, mid, pic) {
            this.$router.push({path: `/singer/${id}`, query: {mid: mid, pic: pic}})
        },
        deleteHistory () {
            localStorage.removeItem('_keyword')
            this.historyKeyword = []
        }
    },
    computed: {
         
    },
    watch:{
        keyword: {
            handler(newVal, old) {

                if(newVal != old && !this.showResult) {
                    this.getSmartbox(newVal.trim())
                }
            }
        }
    },
    mounted() {
        this.getHotkey()
    },
    destroyed() {

    }
}
</script>

<style lang="sass" scoped>
    $baseColor: #31c27c
    .search 
        font-size: 1.3rem
        text-align: left
        padding-bottom: 3rem
        h1
            font-size: 1.5rem
            font-weight: bold
            margin: 1rem 0  
        
        .top
            display: flex
            justify-content: flex-start
            align-items: center
            padding: 1rem 0
            .ipt
                flex: 1
                margin: 0 2rem 0 1rem
                display: flex
                align-items: center
                padding: .2rem 1rem
                border-radius: 2rem 
                background-color: white
                line-height: 1.5
                input
                    height: 100%
                    width: 100%
                    outline: none
                    
                    &:placehold
                        color: $baseColor
                span
                    color: rgb(225, 225, 225)
                    margin-right: .5rem
                    
            &>span
                padding: 1rem

        .history 
            padding: 0 1.5rem 
            .title
                display: flex
                justify-content: space-between
                align-items: center
            .historykey
                display: flex
                flex-wrap: wrap
                
                text-align: left
                .key
                    min-width: 3rem
                    text-align: center
                    padding: .5rem .8rem
                    background-color: white
                    margin: 0 1rem 1rem 0
                    border-radius: 1rem
        
        .hotkey
            padding: 0 1.5rem 
            text-align: left
            
            .keys

                margin: 1.5rem 0
                display: flex
                flex-wrap: wrap
                .key
                    width: 50%
                    padding: .5rem .5rem .5rem 0
                    box-sizing: border-box
                    margin: .3em 0
                    span.index
                        min-width: 2rem
                        text-align: center
                        display: inline-block  
                        font-weight: bold
                        color: rgb(225, 25, 120)
                        &.hot 
                            color: #d44439                   
        
        .smart
            padding: 1rem 1.5rem
            text-align: left
            .keys
                margin: .5rem 0
                padding: 1rem 0
                display: flex
                justify-content: flex-start
                align-items: center
                font-size: 1.3rem
                text-overflow: ellipsis
                overflow: hidden
                white-space: nowrap
                &.singer
                    img
                        width: 3rem
                        height: auto
                        border-radius: 50% 
                        margin-right: 1.5rem
                &.song
                    
                    i
                        color: $baseColor
                        margin-right: 2rem
            .searchAlone
                margin-top: 1rem
                color: $baseColor
</style>