<template>
  <div class="detail-page">
    <HeaderComponent theme="dark" />
    <div class="order-wrap">
      <Order width="800px" @onClick="handleClick" />
    </div>
    <el-row type="flex" class="row-bg" :gutter="20" justify="center">
      <el-col :span="13">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <h2>方案明细</h2>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>
            <moreDetail :query="query" :needPlan="needPlan"></moreDetail>
            <div class="over">
              <div class="floatleft">
                <h1>估价: {{sub(needPlan.priceValueDisplay)}}</h1>
                <h3>平均每立方价格：337CNY</h3>
                <h3>具体换算价格请以世纪汇率为准</h3>
              </div>
              <div class="floatRight">
                <!-- <el-button>历史差价记录</el-button>
                <el-button>远期运价需求</el-button>-->
                <el-button>我仅核价</el-button>
                <el-button @click="handleRealChoose" type="primary">确认出货</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>

      <el-col :span="5">
        <div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <h3>推荐方案</h3>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>
            <div>
              <selectCard :query="query" :allPlan="allPlan" @click="handleCardClick"></selectCard>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

    <!-- v-if="!loading && recommendPlans.length == 0" -->
    <!-- <div class="no-plans theme-width" >
      <img src="@/assets/404.png" class="no-plans__image" alt="404">
      <p class="no-plans__tip">暂时没有合适的方案可以提供给您, 详情请联系客服:{{CONSUMER_HOTLINE}}</p>
    </div>-->
  </div>
</template>


<script>
import Order from "@/components/Order";
import HeaderComponent from "@/components/Header";
import selectCard from "./selectCard";
import moreDetail from "./moreDetail";
import { httpPostFormData } from "@/api/httpUtils.js";

import { deepCopySimpleObject } from "@/util";
import { queryRouterDetail } from "@/service/order";

export default {
  data() {
    return {
      allPlan: [],
      needPlan: {}, //选择的计划方案
      query: {} //选择的商品信息
    };
  },
  components: {
    Order,
    HeaderComponent,
    selectCard,
    moreDetail
  },

  // async mounted() {
  //   await this.fetchData()
  // },
  methods: {
    sub(k) {
      //TODO 截取字符串 完整价格的截取 只保留小数点后2位
      let a = k;
      let w = a.indexOf(".");
      let c = a.substr(0, w + 3);
      return c;
    },
    subDay(k) {
      //TODO 截取字符串 天数
      let a = k;
      let w = a.indexOf(".");
      let c = a.substr(0, w);
      return c;
    },
    handleRealChoose() {
      //TODO 确认出货
      let formData = new FormData();
      formData.set("plan_id", this.needPlan.id);
      formData.set("query_id", this.query.id);

      httpPostFormData("/order/create", formData).then(res => {
        console.log(res.data);
         this.$router.push({ name: "pending" ,params:res.data });

        // console.log('path:',this.$route.path)
      });
    },
    handleClick(val) {
      //TODO 查询的内容

      console.log("val: ", val.originalQuery);
      this.query = { ...val.originalQuery };
      this.allPlan = [];

      console.log(this.query);
      if (val.airPlan) {
        // eslint-disable-next-line
        let { ...a } = val.airPlan;
        this.allPlan.push(a);
      }
      if (val.railPlan) {
        // eslint-disable-next-line
        let { ...a } = val.railPlan;
        this.allPlan.push(a);
      }
      if (val.shippingPlan) {
        // eslint-disable-next-line
        let { ...a } = val.shippingPlan;
        this.allPlan.push(a);
      }
      // console.log("allplan:", this.allPlan);
      this.needPlan = this.allPlan[0];
      console.log("all:", this.allPlan);
      console.log("need:", this.needPlan);
    },
    handleCardClick(val) {
      //TODO 卡片选择的推荐方案
      this.needPlan = { ...val };
      console.log("needPlan: ", this.needPlan);
      console.log("query:", this.query);
    }
  },
  mounted() {
    console.log("route:", this.$route.params);
    const val = this.$route.params;

    this.query = { ...val.originalQuery };

    if (val.airPlan) {
      // eslint-disable-next-line
      let { ...a } = val.airPlan;
      this.allPlan.push(a);
    }
    if (val.railPlan) {
      // eslint-disable-next-line
      let { ...a } = val.railPlan;
      this.allPlan.push(a);
    }
    if (val.shippingPlan) {
      // eslint-disable-next-line
      let { ...a } = val.shippingPlan;
      this.allPlan.push(a);
    }
    this.needPlan = this.allPlan[0];
    console.log("needplan", this.needPlan);
  },
  watch: {
    $route: "fetchData"
  },
  computed: {
    // isLogin () {
    //   return this.$store.state.status.login
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_var.scss";

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
        box-shadow: -3px -3px 10px 0 rgba(0, 0, 0, 0.04),
          3px 3px 10px 0 rgba(0, 0, 0, 0.04);
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
      box-shadow: -3px -3px 10px 0 rgba(0, 0, 0, 0.04),
        3px 3px 10px 0 rgba(0, 0, 0, 0.04);
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
  .over {
    overflow: hidden;
    zoom: 1;
  }
  .floatleft {
    float: left;
  }
  .floatRight {
    margin-top: 20px;
    float: right;
  }
}
</style>