<template>
    <div class="topBar"
        :style="{  backgroundImage: `linear-gradient(90deg,rgba(${them.from[0]},${them.from[1]},${them.from[2]}, ${opacity}), rgba(${them.to[0]},${them.to[1]},${them.to[2]}, ${opacity} ))`}"
    >
        <span class="iconfont icon-houtui back" @click="goBack"></span>
        <span class="title" v-show="opacity < 0.3" >{{ name }}</span>
        <span class="title" v-show="opacity > 0.3" :style='{opacity: opacity}' >{{title}}</span>
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
        },
        them: {
            type: Object,
            default: () => {
                return {from:[35,35,35], to:[175,175,175]}
            }
        },
        name : {
            type: String,
            default: '   '
        }
        
    },
    methods: {
        goBack () {
            this.$router.back(-1)      
        },
        changeOpacity (e) {
            
            var scrollTop = document.documentElement.scrollTop
            if( scrollTop <= 300  ) {
                if(scrollTop < 100 ) {
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
        font-size: 1.6rem
        color: white
        display: flex
        justify-content: center
        text-align: center
        padding: 1.5rem 1rem
        
        .back
            position: absolute
            left: 2rem
        .title
            font-weight: bold

            
        
</style>