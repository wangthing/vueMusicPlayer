<template>
    <div class="topBar">
        <span class="iconfont icon-houtui" @click="goBack"></span>
        <span class="title" >{{title}}</span>
        <span class="iconfont icon-gengduo"></span>
    </div>
</template>

<script>
export default {
    name: 'topBar',
    data() {
        return {
            
        }
    },
    props:{
        title:{
            type: String
        }
    },
    methods: {
        goBack () {
            this.$router.back(-1)      
        }
    },
    watch: {
        
        title : {
            immediate: true, 
            handler: function (newVal) {
                // console.log(newVal);
            }
        }
    }
}
</script>


<style lang="sass" scoped>
    .topBar
        position: fixed;
        z-index: 999
        top: 0
        left: 0
        right: 0
        font-size: 1.5rem
        color: white
        display: flex
        justify-content: space-between
        align-items: center
        padding: 1rem 1rem
        background-color: rgb(20, 205, 250)
        .icon-gengduo, .title
            font-size: 1.8rem
            font-weight: bold
        
</style>