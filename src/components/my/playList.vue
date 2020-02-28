<template>
    <div class="lists" >
        <p>dasdasd</p>
        <div class="content">
            <ul>
                <p>asdasda</p>
                <li v-for="(item, index) in 20" :key="index">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'palyList',
    data() {
        return {
            
        }
    },
    methods: {

    },
    computed: {
        getNowPlayGroup () {

            return this.$store.state.nowPlayGroup.get(this.$store.state.noPlayId);
        },
        isShow () {
            return this.$store.state.showPlayList
        }
    },
    mounted () {
        console.log("object");
        var timer = setTimeout(() => {
            console.log("正在播放的歌单",this.getNowPlayGroup);
        },1000)
    }
}
</script>

<style lang="sass" scoped>
    .lists
        background-color: red
        width: 200px;
        height: 200px    
</style>