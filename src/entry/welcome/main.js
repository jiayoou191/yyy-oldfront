import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/element.js'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
      
    


Vue.config.productionTip = false
Vue.http.options.emulateJSON = true
Vue.http.options.credentials = true

Vue.http.interceptors.push((request, next) => {
  request.credentials = true
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')