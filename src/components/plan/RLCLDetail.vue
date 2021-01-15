<template>
  <div class="plan-detail" :class="{ 'ordered-plan-detail': ordered }">
    <div class="plan-detail__header">
      <h1>方案明细 <span class="number">编号:{{data.serial}}</span></h1>
    </div>
    <div class="plan-detail__content">
      <div class="content-item goods-item">
        <div class="content-item-label">
          <img src="@/assets/icons/goods.png" class="icon" alt="商品信息">
          <h3>商品信息</h3>
        </div>
        <div class="content-item-detail">
          <p v-for="(item, index) in goods" :key="index">
            商品{{index+1}}：{{item.name}} · {{item.weight}}kg · {{item.volume}}m³
          </p>
        </div>
        <div class="content-item-operation">
          <el-link type="primary" @click="showGoodsPanel">修改商品</el-link>
        </div>
      </div>
      <div class="content-item line-item">
        <div class="content-item-label">
          <img src="@/assets/icons/position.png" class="icon" alt="商品信息">
          <h3>航线信息</h3>
        </div>
        <div class="content-item-detail">
          <div class="line-item__intro">
            <el-tooltip placement="top">
              <p slot="content">{{`${startAddress.title}(${startAddress.address})`}}</p>
              <p class="ellipsis">提货地址：{{`${startAddress.title}(${startAddress.address})`}}</p>
            </el-tooltip>
            <p class="ellipsis">始发港：{{$t(`country.${transportRoute.polCountry}`) | capitalize}}·{{$t(`port.${transportRoute.pol}`) | capitalize}}</p>
          </div>
          <div class="line-item__intro">
            <el-tooltip placement="top">
              <p slot="content">{{`${endAddress.title}(${endAddress.address})`}}</p>
              <p class="ellipsis">送货地址：{{`${endAddress.title}(${endAddress.address})`}}</p>
            </el-tooltip>
            <p class="ellipsis">目的港：{{$t(`country.${transportRoute.podCountry}`) | capitalize}}·{{$t(`port.${transportRoute.pod}`) | capitalize}}</p>
          </div>
          <div class="line-item__intro">
            <p>发货时间：每{{info['etd'] | weekday}}发车，提前 4 天提货集装箱</p>
            <p>全程耗时：{{parseInt(info['transittime'] || 0) + 7}} 天</p>
          </div>
          <div class="line-item__intro">
            <p>运输方式：{{TRANSPACKTYPES[transportRoute.transPackType]}}</p>
            <p>航运公司：{{transportRoute.carrier | uppercase}}</p>
          </div>
        </div>
      </div>
      <div class="content-item fee-item">
        <div class="content-item-label">
          <img src="@/assets/icons/fee.png" class="icon" alt="商品信息">
          <h3>费用信息</h3>
        </div>
        <div class="content-item-detail">
          <div class="fee-item__column">
            <p class="fee-item__header">启运港费用<span class="tip">({{partDetail1.currency | uppercase}})</span></p>

            <el-tooltip 
              placement="right"
              v-for="(item, index) in ShowPart1Info" 
              :key="index">
              <div slot="content">
                <p v-for="(obj, i) in item.content" :key="i">{{LOCALES[obj.name].zh}}：{{obj.value}}</p>
              </div>
              <p v-if="item.value > 0">{{item.name}}：{{item.value}}</p>
            </el-tooltip>
          </div>

          <div class="fee-item__separator"></div>
          
          <div class="fee-item__column">
            <p class="fee-item__header">运输费用<span class="tip">({{info.currency | uppercase}})</span>
            </p>
            <p v-for="(value, item) in partDetail3.chargeInfo" :key="item">
              {{LOCALES[item].zh}} : {{Math.ceil(value)}}
            </p>
          </div>
          <div class="fee-item__separator"></div>
          <div class="fee-item__column">
            <p class="fee-item__header">目的港费用<span class="tip">({{partDetail5.currency | uppercase}})</span></p>
            <el-tooltip 
              placement="right"
              v-for="(item, index) in ShowPart3Info" 
              :key="index">
              <div slot="content">
                <p v-for="(obj, i) in item.content" :key="i">{{LOCALES[obj.name].zh}}：{{obj.value}}</p>
              </div>
              <p v-if="item.value > 0">{{item.name}}：{{item.value}}</p>
            </el-tooltip>
          </div>
        </div>
      </div>

    </div>
    <div class="plan-detail__footer" v-if="!ordered">
      <PlanFooter 
        :id="data.id" 
        :price="data.count" 
        :usedWeightAndVolume="usedWeightAndVolume" 
      />
    </div>
  </div>
</template>

<script>
import PlanFooter from './PlanFooter'
export default {
  props: ['data', 'goods' , 'query'],
  data () {
    return {}
  },
  mounted() {},
  components: { PlanFooter },
  computed: {
    startAddress () {
      return this.query.startAddress
    },
    endAddress () {
      return this.query.endAddress
    },
    packing () {
      return this.data.packing
    },
    transportRoute () {
      return this.data.transportRoute
    },
    info () {
      return JSON.parse(this.data.transportRoute.info)
    },
    usedWeightAndVolume () {
      let usedWeight = 0
      let usedVolume = 0
      for (let item of this.goods) {
        usedWeight += parseInt(item.weight)
        usedVolume += parseInt(item.volume)
      }
      return {
        volume: usedVolume,
        weight: usedWeight / 1000
      }
    },
    partDetail1 () {
      return this.data.partDetail1
    },
    partDetail2 () {
      return this.data.partDetail2
    },
    partDetail3 () {
      return this.data.partDetail3
    },
    partDetail4 () {
      return this.data.partDetail4
    },
    partDetail5 () {
      return this.data.partDetail5
    },
    ShowPart1Info () {
      const config = this.CHARGEDETAIL['LCL']
      const chargeInfo = JSON.parse(JSON.stringify(this.partDetail2.chargeInfo))

      const info = []
      config.forEach((item, index) => {
        const obj = { 
          name: '',
          value: 0,
          content: []
        }
        obj.name = item.name
        if (index == 0) {
          obj.value += Math.ceil(this.partDetail1.count)
          obj.content.push({
            name: 'dec',
            value: Math.ceil(this.partDetail1.count),
            currency: this.partDetail1.currency
          })
        }
        if (index < 4) {
          for (let key of item.content) {
            if (chargeInfo[key]) {
              obj.value += chargeInfo[key]
              obj.content.push({
                name: key,
                value: chargeInfo[key],
                currency: this.partDetail2.currency
              })
              delete chargeInfo[key]
            }
          }
        }

        if (index == 4) {
          for (let key in chargeInfo) {
            obj.content.push({
              name: key,
               value: chargeInfo[key],
              currency: this.partDetail2.currency
            })
          }
        }
        info.push(obj)
      })
      return info
    },
    ShowPart3Info () {
      const config = this.CHARGEDETAIL['LCL']
      const chargeInfo = JSON.parse(JSON.stringify(this.partDetail4.chargeInfo))

      const info = []
      config.forEach((item, index) => {
        const obj = { 
          name: '',
          value: 0,
          content: []
        }
        obj.name = item.name
        if (index == 0) {
          obj.value += Math.ceil(this.partDetail5.count)
          obj.content.push({
            name: 'dec',
            value: Math.ceil(this.partDetail5.count),
            currency: this.partDetail5.currency
          })
        }
        if (index < 4) {
          for (let key of item.content) {
            if (chargeInfo[key]) {
              obj.value += chargeInfo[key]
              obj.content.push({
                name: key,
                value: chargeInfo[key],
                currency: this.partDetail4.currency
              })
              delete chargeInfo[key]
            }
          }
        }

        if (index == 4) {
          for (let key in chargeInfo) {
            obj.content.push({
              name: key,
               value: chargeInfo[key],
              currency: this.partDetail4.currency
            })
          }
        }
        info.push(obj)
      })
      return info
    },
  },
  methods: {
    showGoodsPanel () {
      this.$store.commit('showGoodsPanel')
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_var.scss";

.plan-detail {
  height: 100%;
  border-radius: 4px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: -3px -3px 10px 0 rgba(0,0,0,.04), 3px 3px 10px 0 rgba(0,0,0,.04);
  .plan-detail__header {
    border-bottom: 1px solid #eee;
    h1 {
      font-size: 26px;
      font-weight: normal;
      padding: 20px;
      .number {
        font-size: 16px;
        color: #666;
      }
    }
  }
  .plan-detail__content {
    color: #666;
    .warn {
      color: $mark-color;
    }
    .content-item {
      padding: 20px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      justify-content: space-around;
      &:last-child {
        border-bottom: none;
      }
      .content-item-label {
        width: 120px;
        text-align: center;
        .icon {
          max-width: 30px;
          max-height: 30px; 
        }
        h3 {
          font-size: 14px;
        }
      }
      .content-item-detail {
        flex: auto;
        p {
          line-height: 1.8;
        }
      }
      .content-item-operation {
        text-align: center;
        width: 100px;
      }
      &.line-item {
        .line-item__intro {
          max-width: 650px;
          display: flex;
          justify-content: space-between;
          p {
            &:first-child {
              width: 60%;
            }
            &:last-child {
              width: 36%;
            }
          }
        }
      }
      &.goods-item {
        .goods-detail__intro {
          margin-top: 5px;
          color: $mark-color;
          font-size: 12px;
        }
      }
      &.fee-item {
        .content-item-detail {
          display: flex;
          justify-content: space-between;
          .fee-item__separator {
            width: 1px;
            align-self: stretch;
            background-color: #eee;
          }
          .fee-item__column {
            font-size: 13px;
            &:last-child {
              margin-right: 100px;
              border-right: none; 
            }
            .other {
              display: inline-block;
              color: $theme-color;
              cursor: pointer;
            }
            .fee-item__header {
              font-size: 13px;
              font-weight: bold;
              .tip {
                font-weight: normal;
                font-size: 12px;
              }
            }
            .em {
              font-size: 13px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .plan-detail__footer {
    padding: 20px 30px;
    border-top: 1px solid #eee;
  }
}
  
</style>