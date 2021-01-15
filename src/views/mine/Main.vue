<template>
  <div class="mine-page">
    <HeaderComponent theme='dark'/>
    <div class="main">
      <div class="left">
        <ul class="nav-wrap">
          <label for="order">订单</label>
          <router-link :to="{path: '/mine/order/pending'}"><li>进行中订单</li></router-link>
          <router-link :to="{path: '/mine/order/done'}"><li>已完成订单</li></router-link>
          <router-link :to="{path: '/mine/order/cancel'}"><li>已取消订单</li></router-link>
          <label for="user">我的</label>
          <router-link :to="{path: '/mine/info'}"><li>个人信息</li></router-link>
        </ul>
      </div>
      <div class="right">
        <router-view @fetchOrderList="fetchOrderList"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderList } from '@/service/order'
import HeaderComponent from '@/components/Header.vue'

export default {
  data () {
    return {

    }
  },
  async mounted () {
    await this.fetchOrderList()
  },
  components: {
    HeaderComponent,
  },
  methods: {
    async fetchOrderList () {
      const res = await getOrderList()
      if (res.code == 0) {
        this.$store.commit('setOrderList', res.data.orderList)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_var.scss';

.mine-page {
  flex: auto;
  // display: flex;
  // flex-direction: column;
  .main {
    // flex: auto;
    display: flex;
    margin: 20px auto 0;
    border-radius: 2px;
    width: $theme-width;
    border: 1px solid #ddd;
    .left {
      width: 200px;
      flex-shrink: 0;
      border-right: 1px solid #ddd;
      .nav-wrap {
        list-style: none;
        padding: 30px;
        label {
          display: block;
          font-size: 15px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        a {
           display: block;
          padding-left: 10px;
        }
        a.router-link-exact-active, a:hover {
         
          li {
            font-weight: bold;
            color: $theme-color;
            border-left-color: $theme-color;
          }
        }
        li {
          margin-bottom: 15px;
          padding: 2px 10px;
          border-left: 4px solid transparent;
          transition: all ease 0.2s;
        }
      }
    }
    .right {
      flex: auto;
    }
  }
}
</style>