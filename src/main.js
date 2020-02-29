// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
// import VueAwesomeSwipre from 'vue-awesome-swiper'
import router from './router'
import MintUI from 'mint-ui'
import vueBus from 'vue-bus'
import 'mint-ui/lib/index'
import {Indicator } from 'mint-ui'

axios.defaults.baseURL = "http://192.168.43.106:3200";

Vue.prototype.$http = axios
// Vue.use(VueAwesomeSwipre)
Vue.use(MintUI)
Vue.use(vueBus)
import  vueLazyload from 'vue-lazyload'
Vue.use(vueLazyload,{
  error: './static/fail1.png',
  loading: 'https://y.gtimg.cn/mediastyle/global/img/album_300.png?max_age=31536000'
})
import store from '@/state/index'


//路由守卫
router.beforeEach((to, from, next) => {
  // 路由改变了就隐藏歌词
  if(store.state.showLyric) {

     store.state.showLyric = false
     return;
  }
  if(store.state.showPlayList) {
    store.state.showPlayList = false
    return
  }

  if(from.name == null && to.path.lastIndexOf('/recommend') == -1) {
    
    router.push('/')
  }
  next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App  },
  template: '<App/>'
})
