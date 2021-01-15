<template>
  <div class="login-page" v-if="showLoginPanel">
    <div class="login-panel">
      <i class="el-icon-close close" @click="closeLoginPanel"></i>
      <div class="left">
        <img src="../assets/login.png" class="login-img" alt="注册">
      </div>
      <div class="right">
        <h1 class="right-login__header">
          <span>欢迎加入简宜运</span>
          <img src="../assets/lihua.png" class="lihua" alt="礼花">
        </h1>
        <div class="right-login__form">
          <el-tabs v-model="pane" @tab-click="changePane">
            <el-tab-pane label="登录" name="loginPane" class="login-pane">
              <el-input placeholder="手机号" v-model="phone" class="input">
                <el-select v-model="phonecode" slot="prepend">
                  <el-option
                    v-for="item in PHONECODE"
                    :key="item.en"
                    :label="item.phone_code"
                    :value="item.phone_code">
                    <span style="float: left">{{ item.phone_code }}</span>
                    <span style="float: right; color: #999; font-size: 13px">{{ item.cn }}</span>
                  </el-option>
                </el-select>
              </el-input>
              <el-input v-if="!loginByPhone" placeholder="请输入您的密码" v-model="loginPassword" class="input" type="password">
                  <template slot="prepend"><i class="el-icon-key"></i></template>
                </el-input>
              <el-input v-if="loginByPhone" placeholder="手机验证码" v-model="loginCode" class="input">
                <template slot="append">
                  <span @click="getCode" :class="{ 'active': time == 0 }">{{ time == 0 ? '收取验证码' : `${time}s重新收取` }}
                  </span>
                </template>
              </el-input>
              <el-link class="login-tip" type="primary" @click="loginByPhone = !loginByPhone">
                {{loginByPhone ? '账号密码登录' : '手机验证码登录'}}
              </el-link>
              <div class="button-wrap">
                <el-button type="primary" class="login-button" @click="login">登录简宜运</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="注册" name="registerPane">
              <div v-if="registerStep == 0">
                <el-input placeholder="手机号" v-model="phone" class="input">
                  <el-select v-model="phonecode" slot="prepend">
                    <el-option
                      v-for="item in PHONECODE"
                      :key="item.en"
                      :label="item.phone_code"
                      :value="item.phone_code">
                      <span style="float: left">{{ item.phone_code }}</span>
                      <span style="float: right; color: #999; font-size: 13px">{{ item.cn }}</span>
                    </el-option>
                  </el-select>
                </el-input>
                <el-input placeholder="手机验证码" v-model="registerCode" class="input">
                  <template slot="append">
                    <span 
                      @click="getCode"
                      :class="{ 'active': time == 0 }">
                    {{ time == 0 ? '收取验证码' : `${time}s重新收取` }}
                    </span>
                  </template>
                </el-input>
                <div class="button-wrap first">
                  <el-button type="primary" class="login-button" @click.stop="register1">注册简宜运</el-button>
                </div>
              </div>
              <div v-if="registerStep == 1"> 
                <el-input placeholder="请输入您的密码" v-model="password" class="input center" type="password">
                  <template slot="prepend"><i class="el-icon-key"></i></template>
                </el-input>
                <el-input placeholder="请确认您的密码" v-model="repeatPassword" class="input center" type="password">
                  <template slot="prepend"><i class="el-icon-key"></i></template>
                </el-input>
                <div class="button-wrap second">
                  <el-button class="login-button" @click="prevStep">上一步</el-button>
                  <el-button type="primary" class="login-button" @click="nextStep">下一步</el-button>
                </div>
              </div>
              <div v-if="registerStep == 2"> 
                <el-input placeholder="请输入您的姓名" v-model="name" class="input center">
                  <template slot="prepend"><i class="el-icon-user"></i></template>
                </el-input>
                <el-input placeholder="请输入您的邮箱" v-model="email" class="input center">
                  <template slot="prepend"><i class="el-icon-postcard"></i></template>
                </el-input>
                <el-input placeholder="请输入公司名称" v-model="company" class="input center">
                  <template slot="prepend"><i class="el-icon-school"></i></template>
                </el-input>
                <div class="button-wrap second">
                  <el-button class="login-button" @click="prevStep">上一步</el-button>
                  <el-button type="primary" class="login-button" @click="register2">注册</el-button>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <!-- <p><el-link type="info">《简宜运用户协议》</el-link></p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isValidNumber, isValidEmail } from '@/util'
import PHONECODE from '@/constants/phonecode'
import { sendSms, login, registerFirst, registerSecond } from '@/service/user'

export default {
  data () {
    return {
      time: 0,
      phone: '',
      name: '',
      email: '',
      company: '',
      password: '',
      loginPassword: '',
      loginByPhone: false,
      repeatPassword: '',
      loginCode: '',
      registerStep: 0,
      registerFirsted: false,
      registerCode: '',
      phonecode: '+86',
      pane: 'loginPane',
      PHONECODE,
    }
  },
  computed: {
    showLoginPanel () {
      return this.$store.state.loginPanel
    },
    phoneNumber () {
      return `${this.phonecode}${this.phone}`
    }
  },
  methods: {
    changePane () {},
    closeLoginPanel () {
      this.$store.commit('closeLogin')
    },
    calTime () {
      this.time = 120
        const timer = setInterval(() => {
          this.time--
          if (this.time == 0) {
            clearInterval(timer)
          }
        }, 1000)
    },
    async getCode () {
      if (!isValidNumber(this.phoneNumber)) {
        return this.$message.error(this.$t('message.phone_format_error'))
      }

      if (this.time > 0) {
        return
      }

      // const res = await sendSms(this.phoneNumber)
      const res = await sendSms(this.phone)
      if (res.code != 0) {
        return this.$message.error(res.msg)
      }

      this.calTime()
      return this.$message.success(this.$t('message.code_send_success'))
    },
    async login () {
      if (!isValidNumber(this.phoneNumber)) {
        return this.$message.error(this.$t('message.phone_format_error'))
      }
      const res = await login({ 
        phone: this.phone,
        code: this.loginCode,
        password: this.loginPassword
      })
      if (res.code != 0 ) {
        return this.$message.error(res.msg)
      }
      
      this.$store.commit('closeLogin')
      this.$store.commit('setLogined')
      await this.$fetchUserInfo()
    },
    prevStep () {
      if (this.registerStep > 0) {
        this.registerStep--
      }
    },
    nextStep () {
      if (this.registerStep == 0) {
        // todo
      } else if (this.registerStep == 1) {
        if (this.password.trim() == '') {
          return this.$message.error(this.$t('message.password_not_null'))
        }

        if (this.password != this.repeatPassword) {
          return this.$message.error(this.$t('message.password_not_same'))
        }
      } else if (this.registerStep == 2) {
        // todo
        return 
      } else {
        return 
      }
      this.registerStep++
    },
    async register1 () {
      if (this.registerFirsted) {
        return this.registerStep = 1
      }

      if (!isValidNumber(this.phoneNumber)) {
        return this.$message.error(this.$t('message.phone_format_error'))
      }

      const res = await registerFirst({ 
        phone: this.phone, 
        code: this.registerCode 
      })

      if (res.code != 0 ) {
        return this.$message.error(res.msg)
      } else {
        this.registerFirsted = true
        this.registerStep = 1
      }
    },
    async register2 () {
      if (!isValidNumber(this.phoneNumber)) {
        return this.$message.error(this.$t('message.phone_format_error'))
      }

      if (!isValidEmail(this.email)) {
        return this.$message.error(this.$t('message.email_format_error'))
      }

      const res = await registerSecond({ 
        name: this.name,
        phone: this.phone, 
        email: this.email, 
        company: this.company, 
        password: this.password,
      })
      if (res.code != 0 ) {
        return this.$message.error(res.msg)
      } else {
        this.$store.commit('closeLogin')
        this.$store.commit('setLogined')
        await this.$fetchUserInfo()
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/scss/_var.scss';
.login-page {
  top: 0;
  left:0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0,0,0,0.6);
  .login-panel {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    margin: auto;
    width: 840px;
    min-height: 500px;
    background-color: #fff;
    padding: 50px;
    display: flex;
    border-radius: 4px;
    box-shadow: 6px 6px 20px 0 rgba(255,255,255,.3), 
                -6px -6px 20px 0 rgba(255,255,255,.3);
    .close {
      font-size: 26px;
      cursor: pointer;
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .left {
      width: 350px;
      margin-right: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      .login-img {
        width: 90%;
      }
    }
    .right {
      flex: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .logo {
        width: 160px;
      }
      .right-login__header {
        display: flex;
        align-items: center;
        font-size: 24px;
        margin-top: 20px;
        margin-bottom: 20px;
        color: #333;
        text-align: center;
        font-weight: normal;
        .lihua {
          margin-left: 10px;
          height: 40px;
        }
      }
    }
  }
  .right-login__form {
    width: 360px;
    .el-tabs {
      .el-tabs__item {
        font-size: 15px;
        padding: 0 10px;
        &.is-active {
          font-size: 18px;
          transition: all ease 0.2s;
        }
      }
    }
    .login-tip {
      margin-top: -10px;
      margin-bottom: 10px;
    }
    .input {
      margin-bottom: 20px;
      height: 44px;
      &.center {
        .el-input-group__prepend {
          width: 60px;
        }
      }
      .el-input-group__prepend {
        width: 90px;
        text-align: center;
        i {
          font-size: 20px;
        }
      }
      .el-input-group__append {
        padding: 0 10px;
        min-width: 110px;
        text-align: center;
        span {
          cursor: default;
        }
        .active {
          cursor: pointer;
          color: $theme-color;
        }
      }
      .el-input__inner {
        height: 44px;
      }
    }
    .button-wrap {
      display: flex;
      margin-bottom: 10px;
      justify-content: space-between;
      &.second {
        .el-button {
          width: 45%;
        }
      }
      .el-button {
        width: 100%;
        height: 44px;
        font-size: 16px;
      }
    }
    p {
      text-align: center;
    }
  }
}
</style>