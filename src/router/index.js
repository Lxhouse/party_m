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
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/')
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
  }
]

const router = new VueRouter({
  routes
})

export default router
