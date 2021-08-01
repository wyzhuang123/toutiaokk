import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from '../views/login/index'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    component:()=> import ('@/views/login/index')
  },
  {
    path:'/search',
    component:()=> import ('@/views/search/index')
  },
  {
    path:'/',
    component:()=> import('@/views/layout/index'),
    children:
    [
      {
        path:'',
        component:()=> import('@/views/home')
      },
      {
        path:'/home',
        component:()=> import('@/views/home')
      },
      {
        path:'/qs',
        component:()=> import('@/views/qa')
      },
      {
        path:'/video',
        component:()=> import('@/views/video')
      },
      {
        path:'/mine',
        component:()=> import('@/views/mine')
      }
    ]
  },
  {
    // 动态路由
    path:'/article/:articleId',
    name:'article',
    component:()=> import('@/views/article/index'),
    props:true
  }
]

const router = new VueRouter({
  routes
})

export default router
