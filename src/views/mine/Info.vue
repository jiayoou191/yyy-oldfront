<template>
  <div class="user-info">
    <h2 class="header">个人信息管理</h2>
    <span @click="handleChangeInform" style="color:red">{{change}}</span>
    <div class="info-content">
      <div class="info-item">
        <label for="phone">姓名:</label>
        <p v-if="flag">{{$store.state.newDetail.name}}</p>
        <el-input size="mini" v-else v-model="input.name" placeholder="请输入姓名"></el-input>
      </div>
      <div class="info-item">
        <label for="phone">公司:</label>
        <p v-if="flag">云运智能科技</p>
        <el-input size="mini" v-else v-model="input.company" placeholder="请输入公司名"></el-input>
      </div>
      <div class="info-item">
        <label for="phone">手机号:</label>
        <p v-if="flag">{{$store.state.newDetail.phone}}</p>
        <el-input size="mini" v-else v-model="input.phone" placeholder="请输入手机号"></el-input>
      </div>
      <div class="info-item">
        <label for="phone">邮箱:</label>
        <p v-if="flag">{{$store.state.newDetail.email}}(暂时不支持修改)</p>
        <el-input size="mini" v-else v-model="input.email" placeholder="请输入邮箱"></el-input>
      </div>
      <div class="info-item">
        <label for="phone">密码:</label>
        <p v-if="flag">****** (暂时不支持修改)</p>
        <el-input size="mini" v-else show-password v-model="input.password" placeholder="请输入内容"></el-input>
      </div>
      <el-button v-if="!flag" @click="handleSave">保存</el-button>
    </div>
  </div>
</template>

<script>
import { httpPostFormData } from "@/api/httpUtils.js";

export default {
  data() {
    return {
      change: "修改",
      flag: true, //是否可被修改
      input: {
        name: "",
        company: "云运智能科技",
        phone: "",
        email: "",
        password: "*******"
      }
    };
  },
  methods: {
    handleSave() {
      // this.flag = !this.flag;
      // this.$store.commit("setNewDetail", {
      //   name: this.input.name,
      //   email: this.input.email,
      //   phone: this.input.phone
      // });

      // let formData = new FormData();
      // formData.set("phone", this.input.phone);
      // formData.set("nick_name", this.input.name);
      // httpPostFormData("/user/detail", formData).then(res => {
      //   console.log(res.data);
      //   this.$message("修改成功");
      //   this.$store.commit("setNewDetail", {
      //     name: this.input.name,
      //     email: this.input.email,
      //     phone: this.input.phone
      //   });
      // });

      this.$confirm("此操作将会修改您的个人信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.flag = !this.flag;
          this.$store.commit("setNewDetail", {
            name: this.input.name,
            email: this.input.email,
            phone: this.input.phone
          });
          let formData = new FormData();
          formData.set("phone", this.input.phone);
          formData.set("nick_name", this.input.name);
          httpPostFormData("/user/detail", formData).then(res => {
            console.log(res.data);
            // this.$message("修改成功");
            this.$store.commit("setNewDetail", {
              name: this.input.name,
              email: this.input.email,
              phone: this.input.phone
            });
          });
          this.$message({
            type: "success",
            message: "更改成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消更改"
          });
        });
    },
    handleChangeInform() {
      this.flag = !this.flag;
      if (!this.flag) {
        // this.change = "保存";
        this.input.name = this.$store.state.newDetail.name;
        this.input.phone = this.$store.state.newDetail.phone;
        this.input.email = this.$store.state.newDetail.email;
      } else {
        this.change = "修改";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/scss/_var.scss";

.user-info {
  padding: 20px 30px;
  .header {
    font-size: 17px;
    margin-bottom: 15px;
    padding-bottom: 2px;
    display: inline-block;
    border-bottom: 2px solid $theme-color;
  }
  .info-content {
    .info-item {
      display: flex;
      padding: 10px 0;
      label {
        min-width: 60px;
        font-weight: bold;
        text-align: justify;
      }
      p {
        color: #666;
        min-width: 200px;
      }
      span {
        color: $theme-color;
        cursor: pointer;
        font-size: 12px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>