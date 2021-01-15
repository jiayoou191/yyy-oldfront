<template>
  <div 
    class="position-choose-wrap"
    :class="{'start': chooseStartMapPanel, 'end': chooseEndMapPanel}"
    v-if="chooseStartMapPanel || chooseEndMapPanel" 
    @click.stop="">
    <div class="place-input-wrap">
      <h2 class="header">{{chooseStartMapPanel ? '出发地址' : '目的地址'}}</h2>
      <el-autocomplete
        ref="tests"
        v-model="inputAddress"
        style="width:100%"
        :fetch-suggestions="querySearchAsync"
        :trigger-on-focus="autofocus"
         @select="handleSelect"
        placeholder="请输入具体地址">
      </el-autocomplete>
      <div class="place-input__tip">
        <p>如果您的商品涉及多个提货点，请联系我司客服：<span class="em">{{CONSUMER_HOTLINE}}</span></p>
      </div>
    </div>
    <div class="bing-map-wrap">
      <span class="close-button" @click="closeMapPanel">
        <img src="@/assets/icons/close.png" class="close" alt="关闭按钮">
      </span>
      <div id="bing-map" class="bing-map"></div>
    </div>
  </div>
</template>

<script>
/* global Microsoft */
// import { checkAddress } from '@/service/order';
import * as util from '@/utils/util'


export default {
  props: {
    autofocus: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      map: null,
      mapZoom:13,
      mapSearchManager: null,
      defaultCenter: {
        lat: 31.230519,
        lng: 121.473665
      },
      lat:31,
      lng:121,
      inputAddress: '',
      auto:false
    } 
  },
  watch: {
    lat(newValue) {
      console.log(newValue)
      this.mapWhere()
    },
    // autofocus(newValue){
    //   console.log(newValue)
    // }
  },

directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
},
  mounted () {
    // this.$refs.tests.autofocus = true
    // this.$refs.tests.$refs.input.focused = true
    // console.log(this.$refs.tests.$refs.input.focused)
    this.$nextTick(()=>{
      this.$refs.tests.focus()
    }) 

    this.mapWhere()
    // console.log(navigator.language.startsWith('zh'))
    if(navigator.language.startsWith('zh')){
      util.setCookie('lang','zh')
      // console.log(util.getCookie('lang')) 

    }else{
      util.setCookie('lang','en')
    }

  },
  updated() {
    // console.log("bing map updated")
    this.$nextTick(()=>{
      this.$refs.tests.focus()
    })
  },
  computed: {
    currentPositon() {
      if (this.chooseStartMapPanel) {
        return JSON.parse(JSON.stringify(this.start))
      } else {
        return JSON.parse(JSON.stringify(this.end))
      }
    },
    start () {
      return this.$store.state.start
    },
    end () {
      return this.$store.state.end
    },
    chooseEndMapPanel () {
      return this.$store.state.chooseEndMapPanel
    },
    chooseStartMapPanel () {
      return this.$store.state.chooseStartMapPanel
    },
    buttonDisabled () {
      if (this.currentPositon.point.lng) {
        return false
      } 
      return true
    }
  },
  methods: {
    mapWhere(){
      const timer = setInterval(() => {
      if (window.Microsoft) {
        this.map = new Microsoft.Maps.Map('#bing-map', {
          credentials: 'Ar9MXnc3r1weTPMSVG714J98MRgUw2xYTeiZBrHGpwhLz8yVTVZaspNASOVvz9QH',
          center: new Microsoft.Maps.Location(this.defaultCenter.lat, this.defaultCenter.lng),
          includeCountryIso2:true,
          zoom: 16
        })

        Microsoft.Maps.loadModule('Microsoft.Maps.Search', () => {
          this.mapSearchManager = new Microsoft.Maps.Search.SearchManager(this.map)
        })

        clearInterval(timer)
      }
    }, 100)
    },
    closeMapPanel() {
      this.$store.commit('hideEndMapPanel')
      this.$store.commit('hideStartMapPanel')
    },
    async querySearchAsync (queryString, callback) {
      // console.log("query str: " + queryString)
      const searchRequest = {
        where: queryString,
        includeCountryIso2: true,
        callback: function (r) {
          // console.log(r)
          if (r && r.results && r.results.length > 0) {
            const s = []
            for (let i = 0, len = r.results.length; i < len; i++) {
              var x = r.results[i]
              // console.log(x.address); 

              var item = { 
                city: x.locality,
                value: x.name,
                title: x.name,
                point: {
                  lat: x.location.latitude,
                  lng: x.location.longitude
                },
                location: x.location,
                address: x.address,
                province: x.address.adminDistrict,
              }
              s.push(item)
              callback(s)
            }
          } else {
            callback([])
          }
        },
        errorCallback: function () {
          // 有可选参数e
          // console.log(e)
          callback([])
        }
      }
      this.mapSearchManager.geocode(searchRequest)
    },
    //获取详细地址 代码
    async handleSelect (item) {
      // console.log("stringify item: " + JSON.stringify(item))
      // console.log(item)
      // const { title, point, address, province, city } = item
      let { address } = item

      // console.log(item)
      // console.log(address)
      const latLng = {
        latitude :  item.point.lat,
        longitude: item.point.lng
      }
      //TODO adress为要传给后端的代码
      // this.$set(address,'countryRegionIso2',address.countryRegionISO2)
      this.$set(address,'latLng',latLng);
      // let {countryRegionISO2,...a} = address;
      // address = a;
      // console.log(address);
      // this.$set(address,'lng',item.point.lng);
      // console.log(address.countryRegionISO2);
      if(address.countryRegionISO2 == undefined){
        this.$message('请您输入详细的地址：xx市xx区xx号')
      }else{
        console.log(item.value)
        this.$emit('onChange',item.value,address)
        this.inputAddress=''
      }

      this.defaultCenter.lat = item.point.lat;
      this.defaultCenter.lng = item.point.lng;
      this.lat = item.point.lat;
      this.lng = item.point.lng;
      // const res = await checkAddress({
      //   title,
      //   address,
      //   city,
      //   province,
      //   lat: point.lat,
      //   lng: point.lng,
      // })
      // if (res.code == 0) {
      //   const data = res.data
      //   if (data.type != 0) {
      //     this.setMapPin(item)
      //     this.currentPositon.id = data.id
      //     if (this.chooseStartMapPanel) {
      //       this.$store.commit('changeStartPosition', {
      //         id: data.id, title, point, city, province, address
      //       })
      //       this.$store.commit('showEndMapPanel')
      //       this.$store.commit('hideStartMapPanel')
      //     } else {
      //       this.$store.commit('changeEndPosition', {
      //         id: data.id, title, point, city, province, address
      //       })
      //     }
      //   } else {
      //     this.$message.error('当前地址暂时不支持，请重新选择地址')
      //   }
      // }
    },
    setMapPin (item) {
      this.map.entities.clear()
      const pin = new Microsoft.Maps.Pushpin(item.location, {
        text: item.title
      })
      this.map.entities.push(pin)
    }
  }
}
</script>

<style lang="scss">
@import '@/scss/_var.scss';

.position-choose-wrap {
  margin: 15px auto 0;
  width: 800px;
  height: 400px;
  display: flex;
  text-align: left;
  border-radius: 4px;
  position: relative;
  background-color: #fff;
  z-index: 999;
  box-shadow: 2px 2px 14px 0 rgba(0,0,0,0.1), -2px -2px 14px 0 rgba(0,0,0,0.1);
  &.start {
    &:before {
      left: 180px;
    }
  }
  &:before {
    content: '';
    width: 0;
    height: 0;
    top: -10px;
    z-index: -1;
    position: absolute;
    left: 460px;
    transition: all ease 0.3s;
    border-bottom: 12px solid #fff;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
  }
  .place-input-wrap {
    padding:10px;
    width: 300px;
    border-right: 1px solid #ddd;
    .header {
      font-size: 16px;
      margin-bottom: 15px;
      display: inline-block;
      border-bottom: 2px solid $theme-color;
    }
    .place-input__tip {
      margin-top: 10px;
      color: #666;
      .em {
        font-weight: bold;
        font-size: 16px;
        color: $theme-color;
      }
    }
  }
  .bing-map-wrap {
    flex: auto;
    height: 100%;
    overflow: hidden;
    position: relative;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    .close-button {
      position: absolute;
      background-color: #fff;
      height: 30px;
      width: 30px;
      top: 0;
      right:0;
      z-index: 999;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      .close {
        height: 20px;
        width: 20px;
      }
    }
    .bing-map {
      height: 100%;
      width: 100%;
    }
  }
} 
</style>