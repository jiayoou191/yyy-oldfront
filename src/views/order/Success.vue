<template>
  <div class="success-page">
    <i class="el-icon-check success-icon"></i>
    <h2>提交成功，请耐心等待反馈</h2>
    <p class="message">稍后会有专属客服联系您，请注意接听</p>
    <el-button type="primary" class="check-order" @click="goToOrder">查看订单</el-button>
  </div>
</template>
<script>

export default {
  data () {
    return {}
  },
  methods: {
    goToOrder () {
      this.$router.push({
        path: '/mine/'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_var.scss';
.success-page {
  padding-top: 80px;
  text-align: center;
  h2 {
    font-size: 20px;
    margin-top: 30px;
  }
  .message {
    margin-top: 5px;
    font-size: 15px;
    color: #666;
  }
  .success-icon {
    font-size: 50px;
    padding: 10px;
    border-radius: 50%;
    color: $success-color;
    border: 3px solid $success-color;
  }
  .check-order {
    padding: 10px;
    margin-top: 30px;
    min-width: 140px;
    border-radius: 3px;
  }
}
</style>