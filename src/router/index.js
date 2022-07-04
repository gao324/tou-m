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
    path:'/layout',
    name:'layout',
    component:()=>import('@/views/layout')
  }
]

const router = new VueRouter({
  routes
})

export default router
