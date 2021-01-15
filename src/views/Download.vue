<template>
  <div class="download-page">
    <HeaderComponent theme='dark' />
    <div class="main">
      <div class="intro">
        <img src="@/assets/about.png" class="download-image" alt="客户端下载">
        <div class="download-tip">
          <h2>客户端下载</h2>
          <h3>方便  ·  可靠  ·  便捷</h3>
        </div>
      </div>
      <div class="download-channels">
        <el-card class="channel-item">
          <img src="@/assets/icons/android.png" class="icon" alt="android端">
          <p>Android端</p>
          <el-button type="info" disabled>敬请期待</el-button>
        </el-card>
        <el-card class="channel-item">
          <img src="@/assets/icons/apple.png" class="icon" alt="iOS端">
          <p>iOS端</p>
          <el-button type="info" disabled>敬请期待</el-button>
        </el-card>
        <el-card class="channel-item">
          <img src="@/assets/icons/mini.png" class="icon" alt="小程序">
          <p>小程序</p>
          <el-button type="info" disabled>敬请期待</el-button>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header'
export default {
  components: {
    HeaderComponent
  }
}
</script>


<style lang="scss" scoped>
@import '@/scss/_var.scss';

.download-page {
  
  // background: url('../../assets/images/background.png') center center no-repeat no-repeat;
  background-size: cover;
  .main {
    width: $theme-width;
    margin: 40px auto;
  }
  .intro {
    display: flex;
    justify-content: center;
    .download-image {
      margin-right: 100px;
      max-width: 600px;
      max-height: 300px;
    }
    .download-tip {
      // flex: auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h2 {
        font-size: 30px;
        margin-bottom: 20px;
      }
      h3 {
        font-size: 24px;
      }
    }
  }
  .download-channels {
    margin-top: 60px;
    display: flex;
    justify-content: space-around;
    .channel-item {
      width: 240px;
      padding: 40px 20px 40px;
      text-align: center;
      border: 1px solid #ddd;
      border-radius: 4px;
      .icon {
        max-width: 80px;
        max-height: 80px;
      }
      p {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .el-button {
        width: 120px;
        border-radius: 4px;
        padding: 10px;
      }
    }
  }
}
</style>