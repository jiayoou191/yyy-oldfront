<template>
  <div class="order-item" v-if="detail">
    <div class="header">
      <p>
        <span class="time"><span class="em">创建时间:</span> {{data.createTime | formatDate}}</span>
        <span class="number"><span class="em">订单编号:</span> {{ detail.plan.serial}}</span>
      </p>
      <p>
        <span class="em">订单状态:</span>
        <span class="theme">{{data.status | formatOrderStatus}}</span>
      </p>
    </div>
    <div class="content">
      <div class="content__left">
        <div class="goods-info">
          <i class="el-icon-goods icon"></i>
          <div class="detail">
            <p v-for="(item, index) in detail.itemList" :key="index">
              {{item.name}} · {{item.weight}}kg · {{item.volume}}m³
            </p>
            <p v-if="boxInfo">
              装箱方案:
            <template v-for="(value, key) in boxInfo">
              <span :key='key'>{{BOXS[key].name | uppercase}} * {{value}} </span>
            </template>
            </p>
          </div>
        </div>
        <div class="route-info" v-if="transportRoute">
          <i class="el-icon-location-outline icon"></i>
          <div class="detail">
            <p>
               {{$t(`country.${transportRoute.polCountry}`) | capitalize}}·{{$t(`port.${transportRoute.pol}`) | capitalize}}
               -
               {{$t(`country.${transportRoute.podCountry}`) | capitalize}}·{{$t(`port.${transportRoute.pod}`) | capitalize}}
            </p>
            <p>运输方式：陆运+{{TRANSPACKTYPES[detail.plan.transPackType]}}</p>
          </div>
        </div>
        <div class="route-info" v-if="TRANSPACKS.EXPRESS == detail.plan.transPackType">
          <i class="el-icon-location-outline icon"></i>
          <div class="detail">
            <p>提货地址：{{detail.query.startAddress.address}}</p>
            <p>送货地址：{{detail.query.endAddress.address}}</p>
            <p>运输方式：{{TRANSPACKTYPES[detail.plan.transPackType]}}</p>
          </div>
        </div>
      </div>
      <div class="sep"></div>
      <div class="content__middle">
        <p class="price">CNY:</p>
        <p>{{detail.plan.count | currency('', 0)}}</p>
      </div>
      <div class="sep"></div>
      <div class="content__right">
        <template v-if="data.status == ORDER_STATUS_INIT">
          <router-link :to="`/order/booking/${data.id}`" target="_blank">
            <el-button type="primary">填写委托书</el-button>
          </router-link>
        </template>
        <el-button 
          v-if="data.status != ORDER_STATUS_CANCEL && data.status != ORDER_STATUS_DONE"
          class="cancel-button" 
          type="text" 
          @click="cancelOrder(data.id)"
        >取消订单</el-button>
        <router-link :to="`/mine/order/detail/${data.id}`">
          <el-button type="text">查看详情</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  cancelOrder,
  getPlanDetail
} from '@/service/order'
import { 
  ORDER_STATUS_INIT,
  ORDER_STATUS_DONE,
  ORDER_STATUS_CANCEL,
  ORDER_STATUS_BOOKING,
} from '@/constants/status'

export default {
  props: ['data'],
  data () {
    return {
      detail: null,
      ORDER_STATUS_INIT,
      ORDER_STATUS_DONE,
      ORDER_STATUS_CANCEL,
      ORDER_STATUS_BOOKING,
    }
  },
  async mounted() {
    const res = await getPlanDetail(this.data.planId)
    if (res.code === 0) {
      this.detail = res.data
    }
  },
  computed: {
    transportRoute () {
      if (this.detail && this.detail.plan && this.detail.plan.transportRoute) {
        return this.detail.plan.transportRoute
      } else {
        return null
      }
    },
    boxInfo () {
      if (this.detail && this.detail.plan && this.detail.plan.packing &&  this.detail.plan.packing.boxInfo) {
        return JSON.parse(this.detail.plan.packing.boxInfo)
      } else {
        return null
      }
    }
  },
  methods: {
    async cancelOrder (orderId) {
      this.$confirm('此操作将永久取消该订单?', '提示', {
          type: 'warning'
        }).then(async () => {
          const res = await cancelOrder(orderId)
          if (res.code == 0) {
            this.$emit('fetchOrderList')
            this.$message.success('取消订单成功')
          }
        }).catch(() => {
          console.log(1)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_var.scss';
.order-item {
  border: 1px solid #ddd;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .em {
    font-weight: bold;
  }
  .theme {
    color: $theme-color;
  }
  .header {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    color: #666;
    background-color: #f8f8f8;
    border-bottom: 1px solid #eee;
    font-size: 13px;
    .time {
      padding-right: 20px;
    }
  }
  .content {
    padding: 10px 20px;
    display: flex;
    justify-content: space-around;
    .sep {
      border-right: 1px solid #eee;
    }
    .content__left{
      display: flex;
      width: 500px;
      flex-shrink: 0;
      flex-direction: column;
      .goods-info, .route-info {
        display: flex;
        padding: 8px 0;
        align-items: center;
        .icon {
          color: rgba($theme-color, 0.8);
          font-size: 24px;
          padding-right: 15px;
        }
        .detail {
          color: #666;
          p {
            margin-bottom: 4px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
    .content__middle {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 22px;
    }
    .content__right {
      width: 120px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      
      .el-button {
        margin-left: 0;
        padding: 5px 10px;
        border-radius: 3px;
        &.el-button--text {
          padding: 0;
        }
        &:last-child{
          margin-bottom: 0;
        }
      }
      .cancel-button {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>