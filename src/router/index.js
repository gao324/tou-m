import Vue from 'vue'
import VueRouter from 'vue-router'
// import login from '@/views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:()=>import('@/views/login')
  },
  {
    path:'/',
    name:'layout',
    component:()=>import('@/views/layout'),
    children:[
      {
        path:'home',
        name:'home',
        component:()=>import('@/views/home'),
      },
      {
        path:'cricle',
        name:'cricle',
        component:()=>import('@/views/cricle'),
      },
      {
        path:'video',
        name:'video',
        component:()=>import('@/views/video'),
      },
      {
        path:'my',
        name:'my',
        component:()=>import('@/views/my'),
      },
    ]
  },
  {
    path:'/userp',
    name:'userp',
    component:()=>import('@/views/userp')
  },
  {
    path:'/search',
    name:'search',
    component:()=>import('@/views/search')
  },
  {
    path:'/article/:articleID',
    name:'article',
    component:()=>import('@/components/article/components/article-nav'),
    props:true
  }
]

const router = new VueRouter({
  routes
})

export default router
