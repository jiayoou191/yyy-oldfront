import Vue from 'vue'
import Vuex from 'vuex'
import { 
  UNLOGIN, 
  LOGINED, 
  ORDER_STATUS_DONE,
  ORDER_STATUS_CANCEL,
} from '@/constants/status'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    newLogin:false, //xlh 新加入的
    newDetail:{
      name:'',
      phone:'',
      email:''
    },
    chooseGoodsPanel: false,
    chooseStartMapPanel: false,
    chooseEndMapPanel: false,
    loginPanel: false,
    orderList: [],
    goods: {
      type: '',
      id: '',
      label: '',
      data: [],
    },
    start: {
      id: '',
      address: '',
      title: '',
      city: '',
      province: '',
      point: {
        lat: '',
        lng: '',
      },
    },
    end: {
      id: '',
      address: '',
      city: '',
      province: '',
      title: '',
      point: {
        lat: '',
        lng: ''
      },
    },
    userinfo: {
      name: '',
      email: '',
      phone: '',
      company: '',
      avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    },
    status: {
      login: UNLOGIN,
      currency: 'cny'
    },
    rate: {
      eur: 1,
      usd: 1,
      cny: 1,
    }
  },
  getters: {
    doneOrderList (state) {
      return state.orderList.filter(item => item.status == ORDER_STATUS_DONE)
    },
    cancelOrderList (state) {
      return state.orderList.filter(item => item.status == ORDER_STATUS_CANCEL)
    },
    undoneOrderList (state) {
      return state.orderList.filter(item => (item.status != ORDER_STATUS_DONE && item.status != ORDER_STATUS_CANCEL))
    }
  },
  mutations: {
    setNewLogin(state,log){
      state.newLogin = log
    },
    setNewDetail(state,log){
      state.newDetail.name = log.name;
      state.newDetail.phone = log.phone;
      state.newDetail.email = log.email;
    },
    showGoodsPanel(state) {
      state.chooseGoodsPanel = true
    },
    hideGoodsPanel(state) {
      state.chooseGoodsPanel = false
    },
    showStartMapPanel(state) {
      state.chooseEndMapPanel = false
      state.chooseStartMapPanel = !state.chooseStartMapPanel
    },
    hideStartMapPanel(state) {
      state.chooseStartMapPanel = false
    },
    showEndMapPanel(state) {
      state.chooseStartMapPanel = false
      state.chooseEndMapPanel = !state.chooseEndMapPanel
    },
    hideEndMapPanel(state) {
      state.chooseEndMapPanel = false
    },
    changeGoodsInfo (state, { type, id, label }) {
      state.goods.id = id
      state.goods.type = type
      state.goods.label = label
    },
    changeGoodsData (state, data) {
      state.goods.data = data
    },
    changeStartPosition(state, { id, title, address, province, city, point, lat, lng }) {
      state.start.id = id
      state.start.title = title || ''
      state.start.address = address
      state.start.province = province
      state.start.city = city
      state.start.point.lng = lng || point.lng
      state.start.point.lat = lat || point.lat
    },
    changeEndPosition(state, { id, title, province, city, address, point, lat, lng }) {
      state.end.id = id
      state.end.title = title || ''
      state.end.address = address
      state.end.province = province
      state.end.city = city
      state.end.point.lng = lng || point.lng
      state.end.point.lat = lat || point.lat
    },
    closeLogin (state) {
      state.loginPanel = false
    },
    openLogin (state) {
      state.loginPanel = true
    },
    setLogined (state) {
      state.status.login = LOGINED
    },
    setUnlogin (state) {
      state.status.login = UNLOGIN
    },
    setUserinfo(state, { email, phone, company, name}) {
      state.userinfo.name = name
      state.userinfo.email = email
      state.userinfo.phone = phone
      state.userinfo.company = company
    },
    setCurrencyRate(state, {usd, eur}) {
      state.rate.eur = eur
      state.rate.usd = usd
    },
    setCurrency(state, currency) {
      state.status.currency = currency
    },
    setOrderList(state, data) {
      state.orderList = data
    }
  },
  actions: {

  }
})
