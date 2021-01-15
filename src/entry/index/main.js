import Vue from 'vue'
import i18n from '@/i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './mixin'
import filter from './filter'
import '@/plugins/element.js'
import './meiqia'
import VueResource from 'vue-resource'
import Vue2Filters from 'vue2-filters'

import BaiduMap from 'vue-baidu-map'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(BaiduMap, { ak: 'TEb8mKNSKtcLHh5cz1FfggN2kaWMvDpi' })

// import VueGoogleMaps from 'vue2-google-maps'
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyBPL-NJ9wthXzWnoWN6DV30CJ0ji0R1xJc',
//     libraries: 'places',
//     language: 'zh-CN'
//   },
//   installComponents: true,
//   loadCn: true
// })

Vue.use(mixin)
Vue.use(filter)
Vue.use(VueResource)
Vue.use(Vue2Filters)

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
  i18n,
  render: h => h(App)
}).$mount('#app')