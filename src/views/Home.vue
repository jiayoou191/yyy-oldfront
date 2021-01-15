<template>
  <div class="home-page">
    <div class="background"></div>
    <HeaderComponent />
    <div class="main">
        <!-- 智能供应链服务系统标题 -->
      <div class="slogan-wrap">
        <h1 class="slogan">{{$t('home.slogan')}}</h1>
        <h2 class="slogan-intro">{{$t('home.slogan_tip')}}</h2>
      </div>
      <!-- 搜索框 -->
      <div class="order-wrap"> 
        <order @search="goDetail" width="800px" />
      </div>
    </div>
    <div class="intro-wrap">
      <div class="intro-item theme-width">
        <h2 class="intro-item__header">{{$t('home.intro')}}</h2>
        <p class="intro-item__tip">{{$t('home.intro_tip')}}</p>
        <div class="intro-item__img">
          <img src="@/assets/home/detail.png" class="img" alt="详情">
        </div>
      </div>
      <div class="intro-item theme-width">
        <h2 class="intro-item__header">{{$t('home.advantages')}}</h2>
        <p class="intro-item__tip"></p>
        <div class="advatage-wrap">
          <div class="advatage-item">
            <img src="@/assets/icons/time.png" class="icon" alt="省时间">
            <p>{{$t('home.advatage_tip1')}}</p>
          </div>
          <div class="advatage-item">
            <img src="@/assets/icons/router.png" class="icon" alt="省时间">
            <p>{{$t('home.advatage_tip2')}}</p>
          </div>
          <div class="advatage-item">
            <img src="@/assets/icons/fee.png" class="icon" alt="省时间">
            <p>{{$t('home.advatage_tip3')}}</p>
          </div>
        </div>
      </div>
      <div class="intro-item theme-width">
        <h2 class="intro-item__header">{{$t('home.partner')}}</h2>
        <div class="coopration-wrap">
          <div class="coopration-item">
            <img src="@/assets/logos/COSCO.png" class="icon" alt="合作伙伴">
          </div>
          <div class="coopration-item">
            <img src="@/assets/logos/MAERSK.png" class="icon" alt="合作伙伴">
          </div>
          <div class="coopration-item">
            <img src="@/assets/logos/CMA.png" class="icon" alt="合作伙伴">
          </div>
          <div class="coopration-item">
            <img src="@/assets/logos/OOCL.png" class="icon" alt="合作伙伴">
          </div>
          <a href="https://wj.qq.com/s2/4985729/c343/" target="_blank">
            <div class="coopration-item join">
              <span>{{$t('home.join_us')}}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header.vue'
import Order from '@/components/Order.vue'

export default {
  name: 'home',
  components: {
    Order,
    HeaderComponent
  },
  methods: {
    goDetail () {
      this.$router.push({
        path: '/detail'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_var.scss';

.home-page {
  position: relative;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100vh;
    background: #ffffff url('../assets/background.jpg') no-repeat;
    background-size: cover;
  }
  .main {
    text-align: center;
    padding-top: 80px;
    .slogan-wrap {
      color: #fff;
      width: 1000px;
      margin: 0 auto;
      .slogan {
        font-size: 55px;
        font-weight: normal;
      }
      .slogan-intro {
        margin-top: 20px;
        font-size: 30px;
        font-weight: normal;
      }
    }
    .order-wrap {
      margin-top: 30px;
      height: 60px;
      margin-bottom: 400px;
    }
  }

  .intro-wrap {
    background-color: #fff;
    .intro-item {
      text-align: center;
      padding: 50px;
      border-bottom: 1px dashed #eee;
      .intro-item__header {
        font-size: 36px;
        font-weight: normal;
        margin-bottom: 20px;
      }
      .intro-item__tip {
        font-size: 15px;
        margin-bottom: 10px;
      }
      .intro-item__img {
        width: 900px;
        margin:0 auto;
        border-radius: 4px;
        .img {
          width: 100%;
        }
      }
    }
    .advatage-wrap {
      display: flex;
      justify-content: space-around;
      .advatage-item {
        margin-top: 30px;
        .icon {
          width: 60px;
          height: 60px;
        }
        p {
          margin-top: 20px;
          color: #666;
        }
      }
    }
    .coopration-wrap {
      display: flex;
      justify-content: space-around;
      margin-top: 40px;
      .coopration-item {
        width: 150px;
        height: 60px;
        padding: 12px;
        line-height: 36px;
        border-radius: 4px;
        text-align: center;
        border: 1px solid #eee;
        color: #666;
        &.join {
          cursor: pointer;
          transition: all ease 0.3s;
          &:hover {
            color: #fff;
            border-color: $theme-color;
            background-color: $theme-color;
          }
        }
        .icon {
          max-width: 100%;
          max-height: 100%;
          vertical-align: middle;
        }
      }
    }
  }
}

</style>
