<template>
  <footer>
    <p>© Copyright {{year}} {{$t('header.name')}} 沪ICP备19036185号-2</p>
    <p>{{$t('header.business_phone')}}:{{MERCHANTS_TEL}}, {{$t('header.kefu_phone')}}:{{CONSUMER_HOTLINE}}</p>
    <p>{{$t(COMPANY)}} {{$t('header.address')}}:{{$t(ADDRESS)}}</p>
  </footer>
</template>
<script>
export default {
  data () {
    return {
      year: new Date().getFullYear(),
    }
  },
}
</script>

<style lang="scss" scoped>
footer {
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 13px;
  line-height: 1.8;
}
</style>