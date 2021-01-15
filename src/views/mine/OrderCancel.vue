<template>
  <div class="order-done">
      <div class="order-list" v-if="cancelOrderList.length > 0">
      <OrderItem 
        v-for="item in cancelOrderList" 
        :key="item.id" :data="item" 
      />
    </div>
    <div class="no-order" v-if="cancelOrderList.length == 0">
      <img src="@/assets/404.png" class="no-order-image" alt="暂时没有订单">
      <p class="tip">暂无取消的订单</p>
    </div>
  </div>
</template>

<script>
import OrderItem from '@/views/mine/OrderItem'

export default {
  components: {
    OrderItem
  },
  methods: {
    fetchOrderList () {
      this.$emit('fetchOrderList')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_var.scss';

.order-done {
  padding: 20px 30px;
 .no-order {
   text-align: center;
   padding-top: 80px;
   .no-order-image {
     width: 300px;
   }
   .tip {
     margin-top: 20px;
   }
 }
}
</style>