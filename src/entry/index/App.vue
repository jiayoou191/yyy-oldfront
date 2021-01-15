<template>
  <div id="app" @click="clearSomething">
    <router-view/>
    <Feedback />
    <Login/>
    <FooterComponent />
  </div>
</template>
<script>
import Login from '@/components/Login.vue'
import Feedback from '@/components/Feedback.vue'
import FooterComponent from '@/components/Footer.vue'
import { queryExchangeRate } from '@/service/order'

export default {
  components: {
    Login,
    Feedback,
    FooterComponent
  },
  async mounted () {
    await this.$fetchUserInfo()
    await this.fetchRate()
  },
  methods: {
    clearSomething () {
      this.$store.commit('hideEndMapPanel')
      this.$store.commit('hideStartMapPanel')
    },
    async fetchRate () {
      const res = await queryExchangeRate()
      if (res.code == 0) {
        this.$store.commit('setCurrencyRate', res.data)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/scss/_base.scss';
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
