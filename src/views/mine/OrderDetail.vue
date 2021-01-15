<template>
  <div class="order-detail-page">
    <el-page-header 
      class="detail-header" 
      @back="goBack" 
      title="订单列表"
      content="订单详情" />
    <OFCLDetail
      class="ordered-plan-detail"
      v-if="planDetail && planDetail.transPackType == TRANSPACKS.OFCL" 
      :query="queryDetail"
      :data="planDetail" 
      :goods="goodsDetail"
      :ordered="true"
    />
    <OLCLDetail
      class="ordered-plan-detail"
      v-if="planDetail && planDetail.transPackType == TRANSPACKS.OLCL"
      :query="queryDetail"
      :data="planDetail" 
      :goods="goodsDetail"
      :ordered="true"
    />
    <RFCLDetail
      class="ordered-plan-detail"
      v-if="planDetail && planDetail.transPackType == TRANSPACKS.RFCL" 
      :query="queryDetail"
      :data="planDetail" 
      :goods="goodsDetail"
      :ordered="true"
    />
    <AIRDetail
      class="ordered-plan-detail"
      v-if="planDetail && planDetail.transPackType == TRANSPACKS.AIR" 
      :query="queryDetail"
      :data="planDetail" 
      :goods="goodsDetail"
      :ordered="true"
    />
    <RLCLDetail
      class="ordered-plan-detail"
      v-if="planDetail && planDetail.transPackType == TRANSPACKS.RLCL" 
      :query="queryDetail"
      :data="planDetail" 
      :goods="goodsDetail"
      :ordered="true"
    />
    <ExpressDetail
      class="ordered-plan-detail"
      v-if="planDetail && planDetail.transPackType == TRANSPACKS.EXPRESS" 
      :query="queryDetail"
      :data="planDetail"
      :goods="goodsDetail"
      :ordered="true"
    />
    <ShippingDetail
      :orderId="orderId"
      :data="shippingDetail" 
      class="shipping-detail" 
    />
  </div>
</template>

<script>
import AIRDetail from '@/components/plan/AIRDetail'
import OFCLDetail from '@/components/plan/OFCLDetail'
import OLCLDetail from '@/components/plan/OLCLDetail'
import RFCLDetail from '@/components/plan/RFCLDetail'
import RLCLDetail from '@/components/plan/RLCLDetail'
import ShippingDetail from '@/views/mine/ShippingDetail'
import ExpressDetail from '@/components/plan/ExpressDetail'
import { 
  getPlanDetail,
  getOrderDetail,
} from '@/service/order'
export default {
  data () {
    return {
      orderId: '',
      shippingDetail: null,
      orderDetail: null,
      queryDetail: null,
      planDetail: null,
      goodsDetail: null,
    }
  },
   components: {
    AIRDetail,
    OFCLDetail,
    OLCLDetail,
    RFCLDetail,
    RLCLDetail,
    ExpressDetail,
    ShippingDetail,
  },
  async mounted () {
    this.orderId = this.$route.params.id
    const res = await getOrderDetail(parseInt(this.orderId))
    if (res.code == 0) {
      this.orderDetail = res.data.order
      this.shippingDetail = res.data.order.shippingBookObj
    }

    if (this.orderDetail) {
      const res = await getPlanDetail(parseInt(this.orderDetail.planId))
      if (res.code == 0) {
        const data = res.data
        this.planDetail = data.plan
        this.queryDetail = data.query
        this.goodsDetail = data.itemList
      }
    }
  },
  methods: {
    goBack () {
      this.$router.push({
        path: '/mine/order/pending'
      })
    }
  }
}
</script>

<style lang="scss">
.order-detail-page {
  padding: 20px;
  .detail-header {
    margin-bottom: 20px;
  }
  .ordered-plan-detail {
    box-shadow: none;
    border-radius: 2px;
    .plan-detail__content {
      .goods-item {
        .content-item-operation {
          display: none;
        }
      }
    }
  }
  .shipping-detail {
    margin-top: 20px;
  }
}
</style>