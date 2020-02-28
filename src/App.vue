<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <keep-alive exclude="group, rankingDetail, singerInfo, history">
      <router-view/>
    </keep-alive>
   
      <!-- <Lyric></Lyric> -->
      
    <keep-alive>
      <Player></Player>
      <playList></playList>
    </keep-alive>
    
  </div>
</template>

<script>


import Player from '@/components/player/player'
import playList from '@/components/my/playList'
export default {
  name: 'App',
  data() {
    return {
      isFirst: true
    }
  },
  components: {
    playList,
    Player
  },
  created () {
    // this.$router.repa
  },
  destroyed() {
    // window.removeEventListener('beforeunload')
  },

}
</script>
<style >
    @import url('./common/style/fonts.css');
</style> 
<style>
#app {
  font-family: 'FZZongYi-M05S','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-bottom: 5rem;
}
</style>
