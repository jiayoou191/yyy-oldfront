<template>
  <div class="container">
    <div class="logo">
        <img class="log" src="../../assets/logo.png" alt="logo">
    </div>
    <div class="regiform">
      <div class="title">
        <h1>注册简宜运帐号</h1>
      </div>
      <div class="details">
        <el-form ref="rules" :model="form" label-width="100px" :rules="rules" :status-icon="true">
          <el-form-item label="手机号" prop="phone">
            <el-input :disabled="disabled.phone" v-model="form.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input :disabled="disabled.email" v-model="form.email" placeholder="请输入邮箱地址"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="form.password"
              :minlength="length.minlength"
              :maxlength="length.maxlength"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码确认" prop="checkPassword">
            <el-input
              type="password"
              v-model="form.checkPassword"
              :minlength="length.minlength"
              :maxlength="length.maxlength"
              placeholder="请再次输入密码"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item class="changeWidth" label="验证码" prop="code">
          <el-input v-model="form.code" placeholder="验证码获取" style="width:150px"></el-input>-->
          <!-- <div class="pic">
              <div class="pic1">验证码图片</div>
              <div class="word">点击图片重新加载</div>
          </div>-->

          <!-- </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="handleSunbmit">立即完成注册</el-button>
            <el-button @click="handleCancle('rules')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
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
      //   this.$axios
      //     .post(
      //       "http://www.jiayou191.store/dongjie/thinkphp/index.php/home/user/index",
      //       params,
      //       { emulateJSON: true }
      //     )
      //     .then(res => {
      //       if (res.data.code == 4) {
      //         callback(new Error(res.data.msg));
      //       } else {
      //         callback();
      //       }
      //     });
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

      //   // else {
      //   //     callback();
      //   //   }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!isvalidPassword(value)) {
        callback(new Error(" 密码包含 数字,英文,字符中的两种以上，长度6-12"));
      } else {
        if (this.form.checkPassword !== "") {
          this.$refs.rules.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        phone: "",
        email: "",
        name: "",
        password: "",
        checkPassword: ""
        // code: ""
      },
      disabled: {
        phone:false,
        email:false
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
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: ["blur"]
          }
        ],
        checkPassword: [
          {
            required: true,
            validator: validatePass2,
            trigger: ["blur"]
          }
        ],
        name: [
          {
            required: true,
            message: "姓名不能为空",
            trigger: ["blur"]
          }
        ]
      }
    };
  },
  methods: {
    handleSunbmit() {
      let formData = new FormData();

      formData.set("phone", this.form.phone);
      formData.set("pwd", this.form.password);
      formData.set("name", this.form.name);
      formData.set("email", this.form.email);
      httpPostFormData("/register/self/validate", formData).then(res => {
        console.log(res.data);
        // this.$message("注册成功");
        this.$store.commit("setNewDetail",{name:this.form.name,email:this.form.email,phone:this.form.phone})

        this.$router.push({ name: "home"});
        this.$store.commit('setNewLogin',true);
        this.$store.commit('setNewLogin',true)

        this.form.phone = "";
        this.form.name = "";
        this.form.email = "";
        this.form.password = "";
        this.form.checkPassword = "";

      });
    },
    handleCancle(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted () {
    console.log(this.$route)
    const val = this.$route.params;
    // console.log('router:', this.$route.params)
    console.log('val : ',val);
    if(val.phone){
      this.form.phone = val.phone;
      this.disabled.phone = true;
    }
    if(val.email){
      this.form.email = val.email;
      this.disabled.email = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.log{
    width: 20%
}
.el-form-item__content {
  line-height: 0px;
  position: relative;
  font-size: 14px;
}
.container {
  //   width: 100%;
  width: 1000px;
  margin: 0 auto;
  //   text-align: center;
  .logo {
    margin-bottom: 180px;
  }
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
    width: 500px;
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



 let formData = new FormData();
          formData.set("phone", this.input.phone);
          formData.set("nick_name", this.form.name);
          httpPostFormData("/user/detail", formData).then(res => {
            console.log(res.data);
            // this.$message("注册成功");
            this.$store.commit("setNewDetail", {
            name: this.input.name,
            email: this.input.email,
            phone: this.input.phone
          });
          });