import Vue from 'vue'
import Router from 'vue-router'
import First from '@/components/index/music/first'

// 解决重复点击导航路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}

// 首页四个页面
// import first from '@/components/index/first'
import recommend from '@/components/index/recommond'
import ranking from '@/components/index/ranking/ranking'
import singerList from '@/components/singer/singerList'
import singerInfo from '@/components/singer/singerInfo'
//搜索页面
import search from '@/components/search/search' 

// 所有歌单分类
import allGroup from '@/components/group-detail/all-group'
//歌单详情的组件
import group from '@/components/group-detail/group-detail'
//排行榜详情页面
import rankingDetail from '@/components/index/ranking/rankingDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      'path': '/',
      redirect: '/recommend'

    },
    {
      path: '/recommend',
      name: 'First',
      alias: '/',
      component: First,
      children: [], 
    },
    
    {
      path: '/ranking',
      name: 'ranking',
      component: ranking
    },
    
    {
      path: '/recommend/:id',
      name: 'group',
      component: group
    },
    {
      path: '/ranking/:id',
      name:'rankingDetail',
      component: rankingDetail
    },
    {
      path: '/singer',
      name: 'singerList',
      component: singerList
    },
    {
      path: '/singer/:id',
      name: 'singerInfo',
      component: singerInfo
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/allGroup',
      name: 'allGroup',
      component: allGroup
    }
  ]
})
