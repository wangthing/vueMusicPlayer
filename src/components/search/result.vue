<template>
    <div class="result"  v-if="showResult && ! showSmart && songLists.length">
            <h1>为你找到以下结果</h1>
            <songList  :songLists="songLists"></songList>
    </div>
</template>

<script>
import songList from '@/components/com/songList'
export default {
    name: 'result',   
    data() {
        return {
            
        }
    },
    components: {
        songList
    },
    props: {
        showResult:{
            type: Boolean
        },
        showSmart: {
            type: Boolean
        },
        songLists: {
            type: Array
        }
    }
}
</script>


<style lang="sass" scoped>
    .result
        h1
            text-align: left
            font-size: 1.5rem
            margin: 1rem 1rem
            font-weight: bold

</style>