<template>
  <div class="feedback-wrap">
    <div class="feedback-item">
      <img src="@/assets/weixin_theme.png" class="img" alt="微信公众号">
      <div class="hover-tip">
        <p class="text">微信扫码反馈问题</p>
        <img src="@/assets/qrcode.png" alt="微信公众号二维码">
      </div>
    </div>
    <div class="feedback-item">
      <img src="@/assets/kefu_theme.png" class="img" alt="在线反馈">
       <div class="hover-tip">
        <p>简宜运热线电话</p>
        <p class="em">{{CONSUMER_HOTLINE}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@import '@/scss/_var.scss';

.feedback-wrap {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  display: flex;
  flex-direction: column;
  .feedback-item {
    width: 60px;
    height: 60px;
    display: flex;
    margin-top: 20px;
    cursor: pointer;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: #fff;
    box-shadow: 2px 2px 14px 0 rgba(0,0,0,0.1), -2px -2px 14px 0 rgba(0,0,0,0.1);
    .img {
      max-width: 30px;
      max-height: 30px;
    }
    &:hover {
      .hover-tip {
        visibility: visible;
        opacity: 1;
        bottom: 0px;
      }
    }
    .hover-tip {
      width: 180px;
      padding: 10px;
      display: flex;
      visibility: hidden;
      opacity: 0;
      flex-direction: column;
      align-items: center;
      position: absolute;
      text-align: center;
      border-radius: 4px;
      right: 66px;
      bottom: -60px;
      border: 1px solid #eee;
      background-color: #fff;
      transition: all ease 0.2s 0.1s;
      box-shadow: 2px 2px 14px 0 rgba(0,0,0,0.05), -2px -2px 14px 0 rgba(0,0,0,0.05);
      &:after {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        right: -12px;
        bottom: 14px;
        z-index: 1;
        border-top: 10px solid transparent;
        border-left: 12px solid #eee;
        border-bottom: 10px solid transparent;
      }
      &:before {
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        right: -10px;
        bottom: 14px;
        z-index: 2;
        border-top: 10px solid transparent;
        border-left: 12px solid #fff;
        border-bottom: 10px solid transparent;
      }
      .text {
        font-weight: bold;
        color: #333;
      }
      .em {
        font-size: 18px;
        color: $theme-color;
        font-weight: bold;
      }
      img {
        width: 160px;
      }
    }
  }
}
</style>