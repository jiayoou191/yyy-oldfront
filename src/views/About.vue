<template>
  <div class="about-page">
    <HeaderComponent theme='dark' />
    <div class="about">
      <img src="../assets/about.png" class="image" alt="敬请期待">
      <h1>正在紧张开发中，敬请期待</h1>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header'

export default {
  data () {
    return {}
  },
  components: {
    HeaderComponent,
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_var.scss';

.about-page {
  .about {
    padding-top: 40px;
    padding-bottom: 40px; 
    text-align: center;
    img {
      width: 500px;
    }
    h1 {
      color: $theme-color-blue;
      font-weight: normal;
      font-size: 20px;
      margin-top: 30px;
    }
  }
}
</style>