<template>
  <div class="order-page">
    <HeaderComponent theme='dark' />
    <router-view></router-view>
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

.order-page {
  flex: auto;
  // display: flex;
  // flex-direction: column;
}
</style>