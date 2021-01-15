import LOCALES from '@/constants/locale'
import { ALLGOODS } from '@/constants/goods'
import { GOODSUNIT } from '@/constants/unit'
import { MERCHANTS_TEL, COMPANY, ADDRESS, CONSUMER_HOTLINE } from '@/constants/contact'
import { UNLOGIN, LOGINED } from '@/constants/status'
import { PLANTYPES, TRANSPACKS, TRANSPACKTYPES, BOXS, CHARGEDETAIL } from '@/constants/plan'
import { getUserInfo } from '@/service/user'
import { mapState, mapGetters } from 'vuex'

const install = (Vue) => {
  Vue.mixin({
    data () {
      return {
        MERCHANTS_TEL,
        CONSUMER_HOTLINE,
        COMPANY,
        ADDRESS,
        LOCALES,
        UNLOGIN,
        LOGINED,
        PLANTYPES,
        ALLGOODS,
        GOODSUNIT,
        BOXS,
        CHARGEDETAIL,
        TRANSPACKS,
        TRANSPACKTYPES
      }
    },
    computed: {
      CURRENCYS() {
        return this.$store.state.rate
      },
      $API_HOST() {
        return process.env.VUE_APP_API_HOST
      },
      isLogin () {
        return this.$store.state.status.login == this.LOGINED
      },
      currentCurrency () {
        return this.$store.state.status.currency
      },
      currencyRate () {
        return this.$store.state.rate[this.currentCurrency]
      },
      ...mapState([
        'rate',
        'userinfo',
        'orderList',
      ]),
      ...mapGetters([
        'doneOrderList',
        'cancelOrderList',
        'undoneOrderList'
      ]),
    },
    methods: {
      $getGoodsTypeById (id){
        let type
        let label
        this.ALLGOODS.forEach(item => {
          if (item.id === id) {
            type = item.type
            label = item.name
          }
        })
        return { type, label }
      },
      $openLoginPanel() {
        this.$store.commit('openLogin')
      },
      async $fetchUserInfo() {
        const res = await getUserInfo()
        if (res.code == 0) {
          this.$store.commit('setLogined')
          this.$store.commit('setUserinfo', res.data.user)
        }
        if (res.code == 1) {
          this.$store.commit('setUnlogin')
        }
      },
      showTip() {
        this.$message.success(this.$t('message.feature_is_developing'))
      }
    }
  })
}

export default { install }
