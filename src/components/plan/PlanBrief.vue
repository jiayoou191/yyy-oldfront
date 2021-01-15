<template>
  <div class="sea-plan">
    <div class="header">
      <label class="type">{{TRANSPACKTYPES[data.transPackType]}}</label>
      <label class="price">CNY {{data.count | currency('', 0)}}</label>
    </div>
    <div class="content">
      <div class="way ellipsis">
        {{$t(`country.${transportRoute.polCountry}`) | capitalize}}·{{$t(`port.${transportRoute.pol}`) | capitalize}}
        -
        {{$t(`country.${transportRoute.podCountry}`) | capitalize}}·{{$t(`port.${transportRoute.pod}`) | capitalize}}
      </div>
      <div>
        <span>
        全程
          <span class="label" v-if="data.planType == 0">{{parseInt(info['transittime'] || 0) + 7}}</span>
          <span class="label" v-if="data.planType == 2">{{parseInt(info['transittime'] || 0) + 7}}</span>
          <span class="label" v-if="data.planType == 1">{{parseInt(info['transittime'] || 0) + 4}}</span>
        天
        </span>
        <span class="sep">|</span>
        <span class="type">提货-<span class="em">{{TRANSPACKTYPES[transportRoute.transPackType]}}</span>-送货</span>
      </div>
      <p class="tip">每{{info['etd'] | weekday}}发货，
        提前 <span v-if="data.planType == 0">4</span>
        <span v-if="data.planType == 2">4</span>
        <span v-if="data.planType == 1">2</span> 天提箱装货
      </p>
      <div class="footer">
        <span class="label" v-if="data.planType == 0">价格低</span>
        <span class="label" v-if="data.planType == 2">折中方案</span>
        <span class="label" v-if="data.planType == 1">时间短</span>
        <el-link type="primary">{{isLogin ? '查看详情' : '登录查看详情' }}</el-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {}
  },
  computed: {
    transportRoute () {
      return this.data.transportRoute
    },
    info () {
      return JSON.parse(this.data.transportRoute.info)
    },
  },
  mounted() {
    // console.log(this.data)
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_var.scss';

.sea-plan {
  overflow: hidden;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #eee;
  transition: border ease 0.2s;
  &.active, &:hover {
    border-color: $theme-color;
  }
  .header {
    height: 32px;
    line-height: 32px;
    position: relative;
    .type {
      top: 0;
      left: 0;
      width:80px;
      position: absolute;
      font-size: 14px;
      text-align: center;
      border-radius: 4px;
      display: inline-block;
      background-color: #eee;
    }
    .price {
      top: 0px;
      right: 0;
      letter-spacing: 0;
      font-size: 24px;
      position: absolute;
      padding-right: 10px;
      color: $theme-color;
    }
  }
  .content {
    padding: 15px 10px;
    font-size: 16px;
    .way {
      margin-bottom: 5px;
    }
    .sep {
      color: #666;
      display: inline-block;
      margin-left: 5px;
      margin-right: 5px;
    }
    .type {
      font-size: 14px;
      color: #666;
      .em {
        color: #000;
        font-size: 16px;
      }
    }
    .tip {
      color: #666;
      margin-top: 5px;
      font-size: 12px;
    }
  }
  .footer {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .label {
      color: #fff;
      font-size: 13px;
      padding: 3px 6px;
      border-radius: 4px;
      background-color: $mark-color;
    }
  }
}
</style>