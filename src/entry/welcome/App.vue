<template>
  <div id="app">
    <div class="app-inner">
      <router-view/>
      <Feedback />
      <Login/>
      <FooterComponent />
    </div>
    <div class="welcome"> 
      <div class="panel">
        <img v-if="!isEnglish" src="../../assets/logo-black.png" class="logo" alt="简宜运logo">
        <img v-if="isEnglish" src="../../assets/logo-black-en.png" class="logo" alt="简宜运logo">
        <!-- <h2 v-if="isEnglish">Countdown <span class="em">{{day}}</span> {{ day > 1 ? "days" : 'day'}}</h2>
        <h2 v-if="!isEnglish">距离上线时间 <span class="em">{{day}}</span> 天</h2> -->
        <h2 v-if="isEnglish">Coming soon!</h2>
        <h2 v-if="!isEnglish">敬请期待！</h2>
        <p class="content" v-if="isEnglish">Under intelligent technology, Eztrans get through each part in multifarious logistics process, Eztrans not only can save cost for end users, but also can transfer clients’ requirement to logistics service vendor.</p>
        <p class="content" v-if="!isEnglish">简宜运建立的国际物流新业态：通过强大的智能运算自动匹配国际运输的路线和运输方式并自动计算进口关税成本，为终端用户提供真正的海陆空铁全站国际物流供应链服务，简宜运既是进出口客户的不二选择，亦是优质物流服务供应商的获客来源。</p>
        <img src="../../assets/welcome/intro.png" class="intro" alt="简宜运logo">
      </div>
    </div>
  </div>
</template>
<script>
import Login from '@/components/Login.vue'
import Feedback from '@/components/Feedback.vue'
import FooterComponent from '@/components/Footer.vue'

const endDate = new Date(2019, 10, 15)
const startDate = new Date()

export default {
  data () {
    return {
      day: Math.floor((endDate.getTime() - startDate.getTime())/(1000*60*60*24)),
      isEnglish: location.href.includes('eztrans.cn')
    }
  },
  components: {
    Login,
    Feedback,
    FooterComponent
  }
}
</script>

<style lang="scss">
@import '@/scss/_base.scss';
@import '@/scss/_var.scss';

#app {
  height: 100%;
  .app-inner {
    height: 100%;
    filter: blur(4px);
    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false);
  }
  .welcome {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;  
    .panel {
      top: 50%;
      left: 50%;
      text-align: center;
      width: 700px;
      padding: 50px;
      position: absolute;
      transform: translateX(-50%) translateY(-50%);
      border-radius: 4px;
      border: 1px solid #ddd;
      background-color: #fff;
      .logo {
        width: 200px;
      }
      .content {
        font-size: 18px;
      }
      .em {
        color: $theme-color;
        font-size: 60px;
      }
      .intro {
        margin-top: 30px;
        width: 80%;
      }
    }  
  }
}
</style>
