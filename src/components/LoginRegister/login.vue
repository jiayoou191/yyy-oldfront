<template>
  <div class="container">
    <!-- <div class="regiform"> -->
    <div class="title">
      <!-- <h1>注册WeTrial帐号</h1> -->
    </div>
    <div class="details">
      <el-form ref="rules" :model="form" label-width="80px" :rules="rules" :status-icon="true">
        <el-form-item v-if="!isEnglish" label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item v-if="isEnglish" label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>

        <el-form-item v-if="!isEnglish" class="changeWidth" label="验证码" prop="code">
          <el-input v-model="form.code" placeholder="验证码获取" style="width:150px"></el-input>
          <div class="pic">
            <el-button type="text" @click="hanldePhoneCodeClick">获取短信验证码（手机）</el-button>
          </div>
        </el-form-item>
        <el-form-item v-if="isEnglish" class="changeWidth" label="验证码" prop="code">
          <el-input v-model="form.code" placeholder="验证码获取" style="width:150px"></el-input>
          <div class="pic">
            <el-button type="text" @click="hanldeEmailCodeClick">获取短信验证码（邮箱）</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="handleSunbmit('rules')">立即创建</el-button> -->
          <el-button v-if="!isEnglish" type="primary" @click="handlePhoneLogin">立即登陆(手机)</el-button>
          <el-button v-if="isEnglish" type="primary" @click="handleEmailLogin">立即登陆(邮箱)</el-button>
          <el-button @click="handleCancle('rules')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <!-- </div> -->
</template>


<script>
import { isvalidPhone, isvalidEmail, isvalidPassword } from "./help.js";
import { httpPostFormData } from "@/api/httpUtils.js";

export default {
  //
  data() {
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!isvalidPhone(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      }
      var params = new URLSearchParams();
      params.append("phone", value);
    };
    var validEmil = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入邮箱"));
      } else if (!isvalidEmail(value)) {
        callback(new Error("请输入正确的邮箱地址"));
      }
      var params = new URLSearchParams();
      params.append("email", value);
      //   this.$axios
      //     .post(
      //       "http://www.jiayou191.store/dongjie/thinkphp/index.php/home/user/index",
      //       params,
      //       { emulateJSON: true }
      //     )
      //     .then(res => {
      //       console.log(res.data.code);
      //       if (res.data.code == 4) {
      //         callback(new Error(res.data.msg));
      //       } else {
      //         callback();
      //       }
      //     });
    };

    return {
      isEnglish: location.href.includes("eztrans.cn"),
      form: {
        phone: "",
        email: "",
        code: ""
      },
      length: {
        minlength: 6,
        maxlength: 11
      },
      rules: {
        phone: [{ required: true, trigger: ["blur"], validator: validPhone }],
        email: [
          {
            required: true,
            trigger: "blur",
            validator: validEmil
          }
        ],

        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: ["blur"]
          }
        ]
      }
    };
  },
  methods: {
    hanldePhoneCodeClick() {
      //TODO 此处为手机注册获取验证码接口
      console.log(this.form.phone);
      let formData = new FormData();
      formData.set("phone", this.form.phone);
      httpPostFormData("/send/phone/code", formData).then(res => {
        console.log(res.data);
      });
    },
    hanldeEmailCodeClick() {
      //TODO 此处为邮箱注册获取验证码接口
      let formData = new FormData();
      formData.set("email", this.form.email);
      httpPostFormData("/send/email/code", formData).then(res => {
        console.log(res.data);
      });
    },
    handlePhoneLogin() {
      //TODO 此处为手机登陆接口
      let formData = new FormData();
      formData.set("code", this.form.code);
      httpPostFormData("/login/phone/"+this.form.phone+"/code", formData).then(res => {
        console.log(res.data);
        const user = res.data.user;
        console.log(user)
        this.$message("登陆成功");
        this.$store.commit("setNewDetail",{name:user.nickName,email:user.email,phone:user.phone})
        this.form.phone = "";
        this.form.email = "";
        this.form.code = "";
        this.$emit('onOk')
      });
    },
    handleEmailLogin() {
      //TODO 此处为邮箱登陆接口
      //   /register/via/phone
      let formData = new FormData();
      formData.set("email", this.form.email);
      formData.set("code", this.form.code);
      httpPostFormData("/login/email/"+this.form.email+"/code", formData).then(res => {
        console.log(res.data);
        this.$message("登陆成功");
        this.form.phone = "";
        this.form.email = "";
        this.form.code = "";
        this.$emit('onOk')
      });
    },
    // handleSunbmit(formName) {
    //   this.$refs[formName].validate(valid => {
    //     if (valid) {
    //       alert("注册成功");
    //       this.$emit("click", this.form);
    //     } else {
    //       console.log("error submit!!");
    //       alert("注册失败，请校验信息后重新注册");

    //       return false;
    //     }
    //   });
    //   console.log(this.form);
    // },
    handleCancle(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form-item__content {
  line-height: 0px;
  position: relative;
  font-size: 14px;
}
.container {
  width: 100%;
  text-align: center;
  .pic {
    height: 40px;
    vertical-align: middle;
    display: inline-block;
    .pic1 {
      height: 30px;
    }
    .word {
      color: #ccc;
      height: 20px;
      font-size: 10px;
    }
  }
  .regiform {
    width: 425px;
    background: #fff;
    border-radius: 8px;
    margin: 0 auto;
    padding: 20px 30px 40px 30px;
    border: 1px solid #dadada;
    box-shadow: 0 2px 2px #ddd;
    margin-top: 30px;
    .title {
      width: 45px;
      border-bottom: 2px #42b3e5 solid;
      margin-bottom: 20px;
      h1 {
        width: 200px;
        font-size: 18px;
        font-weight: 100;
        color: #aaa;
        text-align: left;
        line-height: 40px;
      }
    }
  }
}
.changeWidth {
  text-align: left;
}
</style>