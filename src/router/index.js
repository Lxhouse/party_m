import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

//路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register')
  },
  {
    path: '/lostPassword',
    name: 'lostPassword',
    component: () => import('@/views/lostPassword')
  },
  {
    path: '/lostId',
    name: 'lostId',
    component: () => import('@/views/lostId')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true
  },
  {
    path: '/vote_deone/:tid',
    name: 'vote_deone',
    component: () => import('@/views/vote_deone'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('@/views/team')
  },
  {
    path: '/vote',
    name: 'vote',
    component: () => import('@/views/vote')
  },
  {
    path: '/vote_de',
    name: 'votede',
    component: () => import('@/views/vote_de')
  },
  {
    path: '/falist',
    name: 'falist',
    component: () => import('@/views/falist')
  },
  {
    path: '/chatlist',
    name: 'chatlist',
    component: () => import('@/views/chat_list')
  },
  {
    path: '/fee',
    name: 'fee',
    component: () => import('@/views/fee')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/'),
        meta: {
          keepAlive: true,
          deepth: 1
        }
      },
      {
        path: '/xt',
        name: 'xt',
        component: () => import('@/views/xt/')
      },
      {
        path: '/dz',
        name: 'dz',
        component: () => import('@/views/dz/')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/')
      },
    ]
  },
  {
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat'),
  },
  {
    path: '/peopleevaluation',
    name: 'peopleevaluation',
    component: () => import('@/views/peopleevaluation'),
  }, {
    path: '/branchev',
    name: 'branchev',
    component: () => import('@/views/branchev'),
  }, {
    path: '/mutual',
    name: 'mutual',
    component: () => import('@/views/mutual')
  }, {
    path: '/myinfo',
    name: 'myinfo',
    component: () => import('@/views/myinfo')
  }, {
    path: '/processdata',
    name: 'processdata',
    component: () => import('@/views/processdata')
  }
]

const router = new VueRouter({
  routes
})

export default router
