<template>
    <div class="father" :class="!isOpacity ? 'normal' : ''">
            <div class="topBar"
               :style="{  
                backgroundImage: 
                `linear-gradient(90deg,rgba(${them.from[0]},${them.from[1]},${them.from[2]}, 
                ${opacity}), rgba(${them.to[0]},${them.to[1]},${them.to[2]}, ${opacity} ))`,
                color:titleColor,}"
                
            >
            <span class="iconfont icon-houtui back" @click="goBack"></span>
            <span class="title" v-show="opacity < 0.3" >{{ name }}</span>
            <span class="title" v-show="opacity > 0.3" :style='{opacity: opacity}' >{{title}}</span>
            <!-- <span class="iconfont icon-gengduo"></span> -->
        </div>
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
            default: '  '
        },
        titleColor : {
            type: String,
            default: 'black'
        },
        // 需不需要透明顶部不遮挡  false的话就固定高度  不会透明
        isOpacity: {
            type: Boolean,
            default: true
        }
        
    },
    methods: {
        goBack () {
            this.$router.back(-1)      
        },
        changeOpacity (e) {
            
            var scrollTop = document.documentElement.scrollTop
            if( scrollTop <= 400 ) {
                if( scrollTop < 100  ) {
                    this.opacity = 0
                } else {
                    this.opacity = ((scrollTop)/200).toFixed(3)
                }
                
            }else {
                this.opacity = 1
            }
            

        }
    },
    mounted () {
        if(this.isOpacity) {
            window.addEventListener('scroll',  utils.throttle(this.changeOpacity, 50))
        }
    },
    watch: {
        
        isOpacity : {
            immediate: true, 
            handler: function (newVal) {
                if(newVal == false) {
                    this.opacity = 1
                    window.removeEventListener('scroll',() => {})
                }
            }
        }
    }
}
</script>


<style lang="sass" scoped>
.father 
    height: 4rem   
    position: absolute 
    &.normal
        overflow: hidden;
        position: relative
        height: 4rem
    
    .topBar
        // transform: translateX(100%)
        height: 4rem
        box-sizing: border-box
        position: fixed;
        z-index: 9999
        top: 0
        left: 0
        right: 0
        font-size: 1.6rem
        // line-height: 1.2
        color: white
        display: flex
        justify-content: center
        text-align: center
        padding: 1.5rem .5rem
        overflow: hidden
        
        .back
            position: absolute
            left: 2rem
        .title
            font-weight: bold

            
        
</style>