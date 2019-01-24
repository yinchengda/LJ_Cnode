import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/cnode'
import List from '@/components/cnode/list'
import Info from '@/components/cnode/info'
import userInfo from '@/components/cnode/userinfo'
import collector from '@/components/cnode/collector'
import issue from '@/components/cnode/releaseTopic'
import message from '@/components/cnode/message'



Vue.use(Router)

const router =  new Router({
  routes: [{
    path: '/',
    component: Index,
    children: [{
        path: '/',
        component: List,
        meta:{
          title:"Cnode社区-首页"
        }
      },
      {
        path: '/info/:id',
        component: Info,
        meta:{
          title:"帖子详情"
        }
      },{
        path: '/user/:userName',
        component: userInfo,
        meta:{
          title:"用户详情"
        }
      },
      {
        path: '/collector/:user',
        component: collector,
        meta:{
          title:"用户收藏"
        }
      }, {
        path: '/issue',
        component: issue,
        meta:{
          title:"发布主题"
        }
      }, {
        path: '/message',
        component: message,
        meta:{
          title:"消息"
        }
      }
    ]
  }]
})
export default router

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  // console.log(to,from)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
