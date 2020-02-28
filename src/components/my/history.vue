<template>
    <div class="history">
        <topBar 
                :title = "'最近播放'"
                :isOpacity = 'false'
                :them = '{from: [245,245,245], to: [245,245,245]}'
        >
        </topBar>
        <songLists v-if="songLists.length"  :groupId = "'6666'" :songLists="songLists.length ? songLists : []"> </songLists>
        <p class="nowPlay" v-if="!songLists.length">暂时还没有播放过！</p>
    </div>
</template>

<script>
import songLists from '@/components/com/songList'
import topBar from '@/components/com/topBar'
export default {
    name: 'history',
    data() {
        return {
            songLists: []
        }
    },
    components: {
        songLists,
        topBar
    },
    methods: {
        getDate(key) {
            var str = localStorage.getItem(key) || "[]"
            var arr = JSON.parse(str)
            return arr
        },
        getSongLists () {
            this.songLists =  this.getDate("_historyplayed")
            console.log(this.songLists);
        } 

    },
    computed: {
        
    },
    mounted () {
       
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.getSongLists()
        })
    }
}
</script>


<style lang="sass" scoped>
    
    .nowPlay
        font-size: 1.8rem
        line-height: 18
        text-align: center
        color: gray
</style>