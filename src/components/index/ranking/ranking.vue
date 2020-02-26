<template>
    <div id="main">
        <vFooter> </vFooter>
        <div class="wrap">
            <div class="rank-lists" v-for="(list, index) in getRankList" 
            :key="index"
            :data-id="list.groupId"
            >
                <p>{{list.groupName}}</p>
                <ul class="lists">
                    <li class="item" v-for="(item, index) in list.toplist" 
                    :key="index"
                    :data-id="item.topId"
                    @click="goRankDetail(list.groupId,item.topId)"
                     >
                        <img v-lazy="item.frontPicUrl" alt="">
                        <p class="visited">
                            <span class="left"><i class="iconfont icon-ting"></i>{{Math.floor(item.listenNum/10000)+'万'}} </span>
                            <span class="right"><i class="iconfont icon-bofang"></i></span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
import vFooter from '@/components/com/vfooter'
export default {
    name:'ranking',
    data () {
        return {

        }
    },
    components: {
        vFooter
    },
    methods: {
        goRankDetail (groupId,topId) {
            this.$router.push({path: `/ranking/${topId}`, query:{groupId: groupId} })
        }
    },
    computed: {
        getRankList() {
            return this.getRecommend.response.toplist.data.group
        },
        getRecommend () {
            return  this.$store.state.recommend
        }
    },
    mounted () {
        console.log(this.getRankList);
    }
}
</script>

<style lang="sass">
    #main
        
        font-size: 18px
        .wrap
            margin-top: 6rem
            text-align: left
            padding: 0 1.5rem
            p
                font-weight: bold
            .rank-lists
                margin: 2rem 0
                .lists
                    display: flex
                    justify-content: flex-start

                    flex-wrap: wrap
                    margin: 1.5rem 0
                    .item
                        width: 31.3%
                        margin: 0 1.5% .5rem 0
                        position: relative
                        .visited    
                            font-size: 1.2rem
                            color: white;
                            position: absolute;
                            width: 80%;
                            bottom: .8rem;
                            left: 50%;
                            transform: translateX(-50%);
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                        img
                            width: 100% 
                            height: auto
                            border-radius: .8rem
</style>