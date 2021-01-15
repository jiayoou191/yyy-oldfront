<template>
  <div>
    <el-dialog :visible.sync="visible" width="60%" :before-close="handleClose">
      <el-row :gutter="20">
        <el-col :span="12">
          <div>
            <img class="about" src="../../assets/about.png" alt="">
          </div>
        </el-col>
        <el-col :span="12">
          <div class="wel">
            <span class="welcome">欢迎加入简宜运</span>
            <span><img class="lihua" src="../../assets/lihua.png" alt="礼花"></span>
          </div>
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="登陆" name="first">
                <login @onOk="handleOk"></login>
              </el-tab-pane>
              <el-tab-pane label="注册" name="second">
                <register></register>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>-->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import login from "./login";
import register from "./register";

export default {
  components: {
    login,
    register
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleOk() {
      this.$emit("onOk");
    },
    handleClose() {
      this.$emit("onClose");
    }
  },
  created() {
    this.visible = this.isVisible;
  },
  watch: {
    isVisible(newValue) {
      this.visible = newValue;
    }
  }
};
</script>

<style lang="scss" scoped>
.welcome{
  font-size: 22px;
  color:red;
}
.lihua{
  padding-top: 3px;
  margin-left: 5px;
  width: 30px;
  height: 30px;
}
.about{
  width: 90%
}
.wel{
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>