import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/LoginRegister/detailRegister.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/views/detail/Detail.vue')
    },
    {
      path: '/order',
      component: () => import('@/views/order/Main.vue'),
      children: [
        {
          path: 'booking/:id',
          component: () => import('@/views/order/Booking.vue'),
        },
        {
          path: 'success',
          component: () => import('@/views/order/Success.vue'),
        }
      ]
    },
    {
      path: '/google',
      name: 'google',
      component: () => import('@/views/Google.vue')
    },
    {
      path: '/enterprise',
      name: 'enterprise',
      component: () => import('@/views/Qiye.vue')
    },
    {
      path: '/download',
      name: 'download',
      component: () => import('@/views/Download.vue')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('@/views/mine/Main.vue'),
      children: [
        {
          path: '',
          redirect: 'order/pending'
        },
        {
          path: 'info',
          name:'info',
          component: () => import('@/views/mine/Info.vue'),
        },
        {
          path: 'order/done',
          component: () => import('@/views/mine/OrderDone.vue'),
        },
        {
          path: 'order/cancel',
          component: () => import('@/views/mine/OrderCancel.vue'),
        },
        {
          path: 'order/pending',
          name:'pending',
          component: () => import('@/views/mine/OrderPending.vue'),
        },
        {
          path: 'order/detail/:id',
          component: () => import('@/views/mine/OrderDetail.vue'),
        }
      ]
    },
  ]
})
