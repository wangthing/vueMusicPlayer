<template>
    <div class="topBar" :style="{ backgroundImage: `linear-gradient(45deg,rgba(55, 55, 55, ${opacity}), rgba(145, 145, 145, ${opacity}))`}">
        <span class="iconfont icon-houtui back" @click="goBack"></span>
        <span class="title" >{{title}}</span>
        <!-- <span class="iconfont icon-gengduo"></span> -->
    </div>
</template>

<script>
import utils from '@/api/utils'

export default {
    name: 'topBar',
    data() {
        return {
            opacity:0,
            scrollTop: 0
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
        },
        changeOpacity (e) {
            
            var scrollTop = document.documentElement.scrollTop
            if( scrollTop <= 200  ) {
                if(scrollTop < 50 ) {
                    this.opacity = 0
                }
                this.opacity = ((scrollTop)/200).toFixed(3)
            }else {
                this.opacity = 1
            }
            

        }
    },
    mounted () {
        window.addEventListener('scroll',  utils.throttle(this.changeOpacity, 50))
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
        justify-content: center
        text-align: center
        padding: 1rem 1rem
        
        .back
            position: absolute
            left: 2rem
        .title
            font-weight: bold

            
        
</style>