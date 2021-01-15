import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goods: {
      type: '',
      id: '',
      label: '',
      data: [],
    },
    start: {
      name: '',
      detail: ''
    },
    end: {
      name: '',
      detail: ''
    },
    login: {
      show: false,
      status: 0, // 0 代表未登录 1 代表登录
    }
  },
  mutations: {
    changeGoodsInfo (state, { type, id, label }) {
      state.goods.id = id
      state.goods.type = type
      state.goods.label = label
    },
    closeLogin (state) {
      state.login.show = false
    },
    openLogin (state) {
      console.log(5345)
      state.login.show = true
    }
  },
  actions: {

  }
})
