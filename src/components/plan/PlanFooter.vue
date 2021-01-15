<template>
  <div class="plan-detail-footer">
    <div class="footer__left">
      <div class="price">
        <p>估价 · {{ price | exchange(this.currencyRate) | currency('', 0)}}</p>
        <el-select @change="changeCurrency" v-model="currency" class="currency-select" placeholder="请选择">
          <el-option
            v-for="(_, value) in CURRENCYS"
            :key="value"
            :label="value.toUpperCase()"
            :value="value">
          </el-option>
        </el-select>
      </div>
      <p class="tip">{{ priceTip }}</p>
      <p class="tip">具体货币换算价格请以实际汇率为准</p>
    </div>
    <div class="footer__right">
      <el-button @click="showTip">我仅核价</el-button>
      <el-button type="primary" @click="creatOrder">确认出货</el-button>
    </div>
  </div>
</template>

<script>
import { postOrder } from '@/service/order'

export default {
  props: ['price', 'usedWeightAndVolume', 'id'],
  data() {
    return {
      currency: 'CNY'
    }
  },
  computed: {
    priceTip () {
      if (!this.usedWeightAndVolume) {
        return ''
      }
      let str = ``
      if (this.usedWeightAndVolume.weight > this.usedWeightAndVolume.volume) {
        str = `平均每吨价格 · ${Math.ceil(this.price / this.usedWeightAndVolume.weight / this.currencyRate)} ${this.currentCurrency.toUpperCase()}`
      } else {
        str = `平均每立方价格 · ${Math.ceil(this.price / this.usedWeightAndVolume.volume  / this.currencyRate)} ${this.currentCurrency.toUpperCase()}`
      }
      return str
    }
  },
  methods: {
    changeCurrency () {
      this.$store.commit('setCurrency', this.currency)
    },
    async creatOrder () {
      const {code, data} = await postOrder(this.id)
      if (code == 0) {
        this.$router.push({
          path: `/order/booking/${data.order.id}`
        })
      } else {
        console.log('order error')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/scss/_var.scss";
  .plan-detail-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .footer__left {
      flex: auto;
      .price {
        display: flex;
        font-size: 26px;
        font-weight: normal;
        align-items: center;
      }
      .tip {
        color: $theme-color;
      }
    }
  }
  
</style>