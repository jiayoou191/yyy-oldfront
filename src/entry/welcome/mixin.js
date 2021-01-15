const install = (Vue) => {
  Vue.mixin({
    computed: {
      $API_HOST() {
        return process.env.VUE_APP_API_HOST
      }
    }
  })
}

export default { install }
