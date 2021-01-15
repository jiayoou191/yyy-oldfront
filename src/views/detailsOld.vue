<template>
<!-- 老代码 无用处 无需使用 -->
  <div class="detail-page">
    <HeaderComponent theme='dark' />
    <div class="order-wrap">
      <Order width='800px' />
    </div>
    <div class="plans-wrap theme-width" v-if="recommendPlans.length > 0">
      <div class="left">
        <div class="unlogin" v-if="!isLogin">
          <img src="@/assets/404.png" class="unlogin__image" alt="404">
          <el-link class="unlogin__tip" @click="$openLoginPanel" type="primary">登录查看价格详情</el-link>
        </div>
          <!-- v-if="isLogin && currentPlainDetail && currentPlainDetail.transPackType == TRANSPACKS.OFCL"  -->
        <OFCLDetail
          :goods="currentGoodsDetail"
          :query="query"
          :plans="allPlans[currentPlanType]"
          :data="currentPlainDetail" 
        />
          <!-- v-if="isLogin && currentPlainDetail && currentPlainDetail.transPackType == TRANSPACKS.OLCL"  -->
        <OLCLDetail
          :goods="currentGoodsDetail"
          :query="query"
          :plans="allPlans[currentPlanType]"
          :data="currentPlainDetail" 
        />
        <RFCLDetail
          v-if="isLogin && currentPlainDetail && currentPlainDetail.transPackType == TRANSPACKS.RFCL" 
          :goods="currentGoodsDetail"
          :query="query"
          :plans="allPlans[currentPlanType]"
          :data="currentPlainDetail" 
        />
          <!-- v-if="isLogin && currentPlainDetail && currentPlainDetail.transPackType == TRANSPACKS.AIR"  -->
        <AIRDetail
          :goods="currentGoodsDetail"
          :query="query"
          :plans="allPlans[currentPlanType]"
          :data="currentPlainDetail" 
        />
          <!-- v-if="isLogin && currentPlainDetail && currentPlainDetail.transPackType == TRANSPACKS.RLCL"  -->
        <RLCLDetail
          :goods="currentGoodsDetail"
          :query="query"
          :plans="allPlans[currentPlanType]"
          :data="currentPlainDetail" 
        />
          <!-- v-if="isLogin && currentPlainDetail && currentPlainDetail.transPackType == TRANSPACKS.EXPRESS"  -->
        <ExpressDetail
          :goods="currentGoodsDetail"
          :query="query"
          :plans="allPlans[currentPlanType]"
          :data="currentPlainDetail"
        />
      </div>
      <div class="right">
        <div class="header">
          <h2>推荐方案</h2>
        </div>
        <div class="right-content">
          <template v-for="(item, index) in recommendPlans">
            <div class="plan-item"  @click="choosePlanDetail(item.id)" :key="index" >
              <PlanBrief v-if="item.transPackType != TRANSPACKS.EXPRESS" :class="{'active': currentPlanId == item.id}" :data="item" />
              <ExpressBrief v-if="item.transPackType == TRANSPACKS.EXPRESS" :class="{'active': currentPlanId == item.id}" :data="item" :query="query"/>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="no-plans theme-width" v-if="!loading && recommendPlans.length == 0">
      <img src="@/assets/404.png" class="no-plans__image" alt="404">
      <p class="no-plans__tip">暂时没有合适的方案可以提供给您, 详情请联系客服:{{CONSUMER_HOTLINE}}</p>
    </div>
  </div>
</template>


<script>
import Order from '@/components/Order'
import HeaderComponent from '@/components/Header'
import PlanBrief from '@/components/plan/PlanBrief'
import ExpressBrief from '@/components/plan/ExpressBrief'
import AIRDetail from '@/components/plan/AIRDetail'
import OFCLDetail from '@/components/plan/OFCLDetail'
import OLCLDetail from '@/components/plan/OLCLDetail'
import RFCLDetail from '@/components/plan/RFCLDetail'
import RLCLDetail from '@/components/plan/RLCLDetail'
import ExpressDetail from '@/components/plan/ExpressDetail'

import { deepCopySimpleObject } from '@/util'
import { queryRouterDetail } from '@/service/order'

export default {
  data () {
    return {
      queryId: '',
      loading: true,
      query: null,
      allPlans: [],
      recommendPlans: [],
      currentPlanId: '',
      currentPlanType: '',
      currentGoodsDetail: null,
      currentPlainDetail: null,
    } 
  },
  components: {
    Order,
    PlanBrief,
    ExpressBrief,
    AIRDetail,
    OFCLDetail,
    OLCLDetail,
    RFCLDetail,
    RLCLDetail,
    ExpressDetail,
    HeaderComponent,
  },
  async mounted() {
    await this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  computed: {
    isLogin () {
      return this.$store.state.status.login
    }
  },
  methods: {
    async fetchData() {
      const id = this.$route.query.id
      if (id) {
        this.queryId = id
        await this.getQueryDetail(id)
      }
    },
    async getQueryDetail (id) {
      const res = await queryRouterDetail({id})
      const { code, data, msg } = res
      if (code == 2) {
        this.$message.error(msg)
      }
      this.loading = false

      if (code == 0) {
        this.allPlans = data.plans
        this.recommendPlans = data.recommend
        this.currentPlainDetail = this.recommendPlans[0]
        this.currentPlanId = this.currentPlainDetail.id
        this.currentPlanType = this.currentPlainDetail.palyType

        // 设置商品信息数据
        if (data.itemList && data.itemList.length > 0) {
          const goodsList = data.itemList.map(item => {
            return {
              name: item.name,
              weight: item.weight,
              volume: item.volume
            }
          })
          this.setGoodsData({id: data.itemList[0].itemTypeId, goodsList})
          this.currentGoodsDetail = data.itemList
        }

        // 设置起始点信息
        if (data.query.id) {
          this.query = data.query
          this.setAddress(data.query)
        }
      }
    },
    setGoodsData ({id, goodsList}) {
      const { type, label } = this.$getGoodsTypeById(id)
      this.$store.commit('changeGoodsInfo', {id, type, label})
      this.$store.commit('changeGoodsData', deepCopySimpleObject(goodsList))
    },
    setAddress ({startAddress, endAddress}) {
      this.$store.commit('changeStartPosition', startAddress)
      this.$store.commit('changeEndPosition', endAddress)
    },
    choosePlanDetail (id) {
      for (let item of this.recommendPlans) {
        if (item.id == id) {
          this.currentPlainDetail = item
          this.currentPlanId = item.id
          this.currentPlanType = item.planType
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_var.scss';

.detail-page {
  .order-wrap {
    height: 90px;
    padding: 20px 0;
    background-color: #f5f5f5;
  }
  .plans-wrap {
    display: flex;
    // align-items: center;
    margin-top: 15px;
    border-radius: 4px;
    padding: 15px;
    border: 1px solid #eee;
    .left {
      width: 850px;
      position: relative;
      .unlogin {
        height: 100%;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #eee;
        box-shadow: -3px -3px 10px 0 rgba(0,0,0,.04), 3px 3px 10px 0 rgba(0,0,0,.04);
         .unlogin__image {
            width: 300px;
          }
          .unlogin__tip {
            margin-top: 20px;
            font-size: 15px;
          }
      }
    }
    .right {
      width: 320px;
      padding-top: 5px;
      margin-left: 15px;
      border-radius: 4px;
      background-color: #fff;
      border: 1px solid #eee;
      box-shadow: -3px -3px 10px 0 rgba(0,0,0,.04), 3px 3px 10px 0 rgba(0,0,0,.04);
      .header {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
        h2 {
          font-size: 15px;
          color: $theme-color;
          display: inline-block;
          padding-left: 15px;
          padding-right: 15px;
          position: relative;
          line-height: 38px;
          top: -2px;
          border-bottom: 2px solid $theme-color;
        }
      }
      .right-content {
        padding: 10px;
        .plan-item {
          margin-bottom: 15px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
  .no-plans {
    padding: 40px;
    text-align: center;
    .no-plans__image {
      width: 300px;
    }
    .no-plans__tip {
      margin-top: 20px;
      font-size: 15px;
    }
  }
}
  
</style>