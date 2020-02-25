<template>
    <div class="main"  v-if="tags">
        <div class="tags">
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
                    @click="checkSinger(item.singer_id, item.singer_mid)"
                    >
                   
                            <img v-lazy="item.singer_pic" alt="">   
                            <h1>{{item.singer_name}}</h1>
                        
                    </li>
                </ul>
            </div>
        </div>
        <vFooter></vFooter>
    </div>
</template>

<script>
import vFooter from '@/components/com/vfooter'

export default {
    name: 'singerList',
    data() {
        return {
            allSinger: null,
            singerByTag: null,
            tags: null,
            selectedId: [200, 1, -100, -100]
        }
    },
    components: {
        vFooter
    },
    methods: {
        // 按照地区 流派 性别获取歌手信息，
        // 默认是-100
        getSinger (area = this.selectedId[0], genre = this.selectedId[1], index = this.selectedId[2], sex = this.selectedId[3]) {
            this.$http.get(`getSingerList`, {
              params: {area: area,sex: sex, index: index, genre: genre}
            })
            .then((res) => {
                console.log(res); 
                var data = res.data.response.singerList.data
                this.tags = data.tags
                this.singerByTag = data.singerlist
            }).catch((err) => {
                
            })
        },
        swichType (e) {
            var id = e.target.id;
            var index = e.target.dataset.index
            this.selectedId[index] = id
            console.log(this.selectedId);
            this.getSinger()
        },
        checkSinger (id,mid) {
            this.$router.push({path: `/singer/${id}`, query: {mid: mid}})
        }
        
    },
    computed: {

    },
    mounted () {
        console.log("dasdasdasd");
        this.getSinger()
    }

}
</script>


<style lang="sass" scoped>
    $baseColor: #31c27c;

    .main
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