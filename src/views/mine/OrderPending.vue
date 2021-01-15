<template>
  <div class="order-pending">
    <div class="order-list">
      <!-- v-if="$store.state.newLogin" -->
      <pendingTable  :tableData="newData"></pendingTable>
    </div>
    <!-- v-if='!$store.state.newLogin' -->
    <!-- <div  class="no-order" >
      <img src="@/assets/404.png" class="no-order-image" alt="暂时没有订单">
      <p class="tip">登陆后才可查看订单</p>
    </div> -->
  </div>
</template>

<script>
import OrderItem from '@/views/mine/OrderItem'
import pendingTable from "./OrderPending/pendingTable";
import {dataTable} from './OrderPending/fakedata'
export default {
  components: {
    OrderItem,
    pendingTable
  },
  data() {
    return {
      dataSource: dataTable,
      newData:[]
    };
  },
  mounted () {
    console.log('route:', this.$route);
    const a = {...this.$route.params}
    this.newData =[...this.newData,a]
    console.log(this.newData)

  },
  methods: {
    fetchOrderList() {
      this.$emit("fetchOrderList");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_var.scss";

.order-pending {
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