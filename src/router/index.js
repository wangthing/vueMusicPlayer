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
import my from '@/components/index/my'

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
      children: [
        
        
        {
          path: '/sad',
          name: 'group',
          component: group
        }
      ],
      
    },
    
    {
      path: '/ranking',
      name: 'ranking',
      component: ranking
    },
    {
      path: '/my',
      name: 'my',
      component: my
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
    }
  ]
})
