<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <keep-alive exclude="group">
      <router-view/>
    </keep-alive>
   
      <Lyric></Lyric>
      
    
    <Player/>
  </div>
</template>

<script>

import Lyric from '@/components/com/lyric'

import Player from '@/components/com/songPlayer'
export default {
  name: 'App',
  data() {
    return {
      isFirst: true
    }
  },
  components: {
    Lyric,    
    Player
  },
  created () {
    this.$router.repa
  },
  destroyed() {
    window.removeEventListener('beforeunload')
  },

}
</script>
<style >
    @import url('./common/style/fonts.css');
</style> 
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* background-color: rgb(240, 245, 250);  */
  margin-bottom: 5rem;
}
</style>
