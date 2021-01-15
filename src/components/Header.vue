<template>
  <header :class="{'dark': theme == 'dark'}">
    <div class="theme-width header-inner">
      <router-link to="/">
        <img :src="logo" class="logo" :alt="$t('header.name')">
      </router-link>
      <ul class="menu">
        <router-link to="/"> <li>{{$t('header.home')}}</li> </router-link>
        <router-link to="/enterprise"> <li>{{$t('header.customization')}}</li></router-link>
        <router-link to="/download"> <li>{{$t('header.app_download')}}</li> </router-link>
        <!-- @click="$openLoginPanel" -->
        <!-- <a v-if="!isLogin" href="javascript:void(0)"   @click="handleLoginClick"   class="login-button"> 
          <li>{{$t('header.login')}} / {{$t('header.register')}}</li> 
        </a> -->
        <a v-if="!$store.state.newLogin" href="javascript:void(0)"   @click="handleLoginClick"   class="login-button"> 
          <li>{{$t('header.login')}} / {{$t('header.register')}}</li> 
        </a>
        <a v-else href="javascript:void(0)"   @click="handleInfo" > 
          <li>{{$store.state.newDetail.name}}</li> 
        </a>
        
        <!-- <router-link v-if="isLogin" to="/mine/">
          <div class="user-info">
            <span>{{ userinfo.phone }}</span>
            <el-avatar class="avatar" :size="30" :src="userinfo.avatar"></el-avatar>
          </div>
        </router-link> -->
      </ul>
    </div>
    <loginModal 
     :isVisible = 'isVisible'
     @onClose='handleClose'
     @onOk='handleOk'
    ></loginModal>
  </header>
</template>

<script>
import { LOGINED, UNLOGIN } from '@/constants/status';
import loginModal from '@/components/LoginRegister/loginModal'

export default {
  components: {
    loginModal,
  },
  props: ['theme'],
  data () {
    return {
      UNLOGIN,
      LOGINED,
      isVisible:false
    }
  },
  methods: {
    handleInfo(){
      //TODO 点击进入个人中心
      this.$router.push({name:'info'})
    },
    handleLoginClick() {
      // console.log(11);
      this.isVisible = !this.isVisible;
    },
    handleClose(){
      this.isVisible = !this.isVisible;
    },
    handleOk(){
      //TODO 确定点击登陆  
      this.isVisible = !this.isVisible;
      this.$store.commit('setNewLogin',true)

    }
  },
  computed: {
    logo () {
      if (this.theme == 'dark') {
        return require('@/assets/logo-black.png')
      } else {
        return require('@/assets/logo.png')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/_var.scss';
header {
  padding-top: 15px;
  padding-bottom: 15px;
  color: #fff;
  &.dark {
    color: $text-color;
    border-bottom: 1px solid #eee;
  }
  .header-inner {
    display: flex;
    justify-content: space-between;
  }
  .logo {
     height: 40px;
  }
  .menu {
    display: flex;
    align-items: center;
    a {
      color: inherit;
      text-decoration: none;
      flex: none;
      padding: 8px 15px; 
      li {
        border-bottom: 2px solid transparent;
        transition: all ease 0.3s;
      }
      &:hover, &.router-link-exact-active{
        li {
          color: $theme-color;
          border-bottom: 2px solid $theme-color; 
        }
      }
      &.login-button {
        li {
          color: #fff;
        }
        margin-left: 15px;
        border-radius: 4px; 
        transition: background-color ease 0.3s;
        background-color: $theme-color;
        &:hover {
          background-color: $dark-theme-color;
          li {
            color: #fff;
            border-bottom: 2px solid transparent;
          }
        }
      }
    }
    .user-info {
      display: flex;
      align-items: center;
      .avatar {
        margin-left: 5px;
      }
    }
  }
}
</style>