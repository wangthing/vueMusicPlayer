<template>
    <div class="vfooter">
        <ul >
            <li id="/" >
                <!-- <router-link to="first"></router-link> -->
                <i slot="icon" style="font-weight:bold" >Music</i>
            </li>   
            <li class="title">
                <router-link to="recommend" >推荐</router-link>
                <router-link to="ranking">排行</router-link>
                <router-link to="singer">歌手</router-link>
            </li>
            <li id="my" class="search">
               <i slot="icon" class="iconfont icon-sousuo" @click="goSearch"></i>
            </li>
            
        

        </ul>
    </div >
</template>

<script>
export default {
    name: 'vFooter',
    data() {
        return {
            selected:'music'
        }
    },
    methods: {
        goSearch () {
            this.$router.push('/search')
        }
    },  
}
</script>
<style scoped>
    @import url('../../common/style/fonts.css');
</style>
<style lang="sass" scoped>
    $baseColor: #31c27c;
    .vfooter 
        height: 5rem;
        padding: auto 0;
        position: fixed;
        z-index: 9999
        background-color: rgb(245, 250, 255);
        margin: 0
        top: 0;
        left: 0;
        right: 0
        margin: 0 !important
        .router-link-active
            font-size: 2rem
            padding-bottom: .2rem

            border-bottom: 2px solid currentColor
            
        .title
            color: $baseColor
            font-size: 1.6rem
            display: flex
            justify-content: space-between
            align-items: center
            flex: 6
            a
                transition: all .3s
        & >ul
            display: flex;
            height: 4.6rem;
            color: rgba(255,20 ,155 ,.8 );
            border-top: 1px solid #f2f2f2;
            justify-content: space-between
            .actived    
                color: $baseColor;
                    
            li
                font-weight: 400;
                font-size: 1.2rem;
                line-height: 1.5;
                margin: auto;
                // width: 33%;
                padding: 0 auto;
                flex: 3
                i
                    font-size: 1.8rem;
        .search i
            font-size: 2rem
</style>