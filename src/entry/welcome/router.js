import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/views/detail/Detail.vue')
    },
    {
      path: '/enterprise',
      name: 'enterprise',
      component: () => import('@/views/Qiye.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
  ]
})
