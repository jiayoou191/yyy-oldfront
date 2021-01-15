<template>
  <div>
    <div class="shoInform">
      <div class="over">
        <div class="inform">
          <div>
            <img class="picture" src="../../assets/home/placeholder.png" alt="图片" />
          </div>
          <div class="shopInform">商品信息</div>
        </div>
        <div class="floleft">
          <div>{{Query.itemName}}*{{Query.itemWeight}}kg*{{Query.itemVolume}}m</div>
          <div class="color">装箱方案：xxxx*{{NeedPlan.boxNum}}，(剩余空间：2m 19tons此部分为写死状态)</div>
        </div>
        <!-- <div class="floright">修改商品</div> -->
      </div>
    </div>
    <el-divider></el-divider>
    <div class="lineInform">
      <div class="over">
        <div class="inform">
          <div>
            <img class="picture" src="../../assets/home/placeholder.png" alt="图片" />
          </div>
          <div class="shopInform">航线信息</div>
        </div>
        <div class="flexLeft">
          <div class="one">提货地址：{{Query.from.addressLine?Query.from.addressLine:Query.from.countryRegion}}</div>
          <div class="one">始发港：{{NeedPlan.pol}}</div>
          <div class="one">目的港:{{NeedPlan.pol}}</div>
          <div class="one">送货地址：{{Query.to.addressLine}}</div>
          <div class="one">船期：xxxx</div>
          <div class="one">全程耗时：{{NeedPlan.stage3TransitTime}}天</div>
          <div class="one">运输方式：{{transportTypeDictionary(NeedPlan.transportType)}}</div>
          <div class="one">航运公司：{{NeedPlan.transshipment}}</div>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="moneyInform">
      <div class="over">
        <div class="inform">
          <div>
            <img class="picture" src="../../assets/home/placeholder.png" alt="图片" />
          </div>
          <div class="shopInform">费用信息</div>
          <div>注意事项</div>
        </div>
        <div class="moneyFlex">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="bo">
                <div class="weight">起运港费用（EUR）</div>
                <div>内陆运输费:2222</div>
                <div>出口口岸费:2222</div>
                <div>清关舱单费:2222</div>
                <div>文件服务费:2222</div>
                <div style="font-size:12px; color:#ccc; ">其他注意项</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="bo">
                <div class="weight">运输费用（USD）</div>
                <div>40GPx1=600</div>
                <div class="weight">价格有效期</div>
                <div>xxxxxxxx</div>
                <div style="color:#fff;">hello world</div>
                <div style="font-size:12px; color:#ccc; ">其他注意项</div>

              </div>
            </el-col>
            <el-col :span="6">
              <div>
                <div>
                  <div class="weight">目的港费用</div>
                  <div>内陆运输费:222</div>
                  <div>进口口岸费:222</div>
                  <div>清关舱单费:222</div>
                  <div>文件服务费:222</div>
                <div style="font-size:12px; color:#ccc; ">其他注意项</div>

                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    query: {
      type: Object,
      default: () => {}
    },
    needPlan: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      Query: {},
      NeedPlan: {}
    };
  },
  watch: {
    query(newValue) {
      this.Query = newValue;
      //  console.log('Query: ', this.Query)
    },
    needPlan(newValue) {
      this.NeedPlan = newValue;
    }
  },
  methods: {
    transportTypeDictionary(k) {
      //TODO 字段翻译使用
      if (k == "ShippingFCL") {
        return "海运整箱";
      } else if (k == "ShippingLCL") {
        return "海运拼箱";
      } else if (k == "Air") {
        return "空运";
      } else if (k == "RailwayFCL") {
        return "铁路整箱";
      } else if (k == "RailwayLCL") {
        return "铁路拼箱";
      } else {
        return " ";
      }
    },
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
    }
  },
  created() {
    this.Query = this.query;
    this.NeedPlan = this.needPlan;
    console.log('Query: ', this.Query)
  }
};
</script>

<style lang="scss" scoped>
.inform {
  text-align: center;
  width: 100px;
  height: 100px;
  float: left;
}
.shopInform {
  font-weight: bold;
  font-size: 18px;
}
.color {
  color: #dbb38d;
}
.floright {
  color: red;
  float: right;
}
.floleft {
  width: 500px;
}
.over {
  overflow: hidden;
  zoom: 1;
}
.flexLeft {
  //   width: 400px;
  // float: left;
  // display: flex;
  // justify-content: space-around;
}
.one {
  width: 225px;
  float: left;
}
.moneyFlex {
  // display: flex;
  // justify-content: space-between;
}
.two {
}
.weight {
  font-weight: bold;
  font-size: 15px;
}
.bo {
  border-right: 1px solid #ccc;
}
.picture {
  width: 50%;
}
</style>