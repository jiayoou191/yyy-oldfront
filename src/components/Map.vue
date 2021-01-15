<template>
  <div 
    class="position-choose-wrap"
    :class="{'start': chooseStartMapPanel, 'end': chooseEndMapPanel}"
    v-if="chooseStartMapPanel || chooseEndMapPanel" 
    @click.stop="">
    <div class="place-input-wrap">
      <h2 class="header">{{chooseStartMapPanel ? '出发地址' : '目的地址'}}</h2>
      <el-autocomplete
        v-model="inputAddress"
        style="width:100%"
        :fetch-suggestions="querySearchAsync"
        :trigger-on-focus="false"
         @select="handleSelect"
        placeholder="请输入具体地址">
      </el-autocomplete>
      <div class="place-input__tip">
        <p>如果您的商品涉及多个提货点，请联系我司客服：<span class="em">{{CONSUMER_HOTLINE}}</span></p>
      </div>
    </div>
    <div class="baidu-map-wrap">
      <span class="close-button" @click="closeMapPanel">
        <img src="@/assets/icons/close.png" class="close" alt="关闭按钮">
      </span>
      <baidu-map 
        class="map" 
        :center="(currentPositon.point.lng && currentPositon.point) || '上海'"
        :scroll-wheel-zoom="true"
        :zoom="mapZoom"
        @ready="mapReady">
        <bm-navigation 
          anchor="BMAP_ANCHOR_BOTTOM_LEFT"
          type="BMAP_NAVIGATION_CONTROL_SMALL"
          />
        <bm-marker
          v-if="currentPositon.point.lat"
          @click="showInfoShadow"
          :position="currentPositon.point"
          animation="BMAP_ANIMATION_BOUNCE">
          <bm-info-window :show="infoWindowShow" @close="hideInfoShadow" @open='showInfoShadow'>
            {{currentPositon.address}}
          </bm-info-window>
        </bm-marker>
      </baidu-map>
    </div>
  </div>
</template>

<script>
import { checkAddress } from '@/service/order'

export default {
  data () {
    return {
      Map: null,
      Geocoder: null,
      mapZoom:18,
      inputAddress: '',
      infoWindowShow: true,
    } 
  },
  mounted () {
    
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
    mapReady ({BMap, map}) {
      this.Map = BMap
      this.map = map
      // console.log(this.Map)
      // console.log(this.map)
    },
    closeMapPanel() {
      this.$store.commit('hideEndMapPanel')
      this.$store.commit('hideStartMapPanel')
    },
    querySearchAsync (queryString, callback) {
      console.log(callback)
      const options = {
        onSearchComplete: (results) => {
          if (localSearch.getStatus() === 0) {
            const s = []
            for (let i = 0; i < results.getCurrentNumPois(); i++) {
              var x = results.getPoi(i)
              var item = { 
                city: x.city,
                value: x.title, 
                point: x.point,
                address: x.address,
                province: x.province,
              }
              s.push(item)
              callback(s)
            }
          } else {
            callback([])
          }
        }
      }
      const localSearch = new this.Map.LocalSearch(this.map, options)
      localSearch.search(queryString)
    },
    async handleSelect (item) {
      const { value, point, address, province, city } = item
      console.log(item)
      const res = await checkAddress({
        title: value,
        address,
        city,
        province,
        lat: point.lat,
        lng: point.lng,
      })
      if (res.code == 0) {
        const data = res.data
        if (data.type != 0) {
          this.currentPositon.id = data.id
          if (this.chooseStartMapPanel) {
            this.$store.commit('changeStartPosition', {
              id: data.id, title: value, point, city, province, address
            })
            this.$store.commit('showEndMapPanel')
            this.$store.commit('hideStartMapPanel')
          } else {
            this.$store.commit('changeEndPosition', {
              id: data.id, title: value, point, city, province, address
            })
          }
        } else {
          this.$message.error('当前地址暂时不支持，请重新选择地址')
        }
      }
    },
    autoLocation (res) {
     console.log('autolocation', res)
    },
    showInfoShadow () {
      this.infoWindowShow = true
    },
    hideInfoShadow () {
      this.infoWindowShow = false
    },
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
  .baidu-map-wrap {
    flex: auto;
    height: 100%;
    overflow: hidden;
    position: relative;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    .close-button {
      position: absolute;
      background-color: #fff;
      height: 44px;
      width: 44px;
      top: 0;
      right:0;
      z-index: 999;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      .close {
        height: 30px;
        width: 30px;
      }
    }
    .map {
      height: 100%;
      width: 100%;
    }
  }
} 

</style>