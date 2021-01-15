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
      <GmapMap
        ref="mapRef"
        class="map"
        :center="(currentPositon.point.lat && currentPositon.point) || defaultCenter"
        :zoom="mapZoom">
          <GmapMarker
            :position="(currentPositon.point.lat && currentPositon.point) || defaultCenter"
            :label="currentPositon.title || ''"
            @click="center=m.position"
          />
      </GmapMap>
    </div>
  </div>
</template>

<script>
import { checkAddress } from '@/service/order'
import { searchPlaces } from '@/service/map'
import { gmapApi } from 'vue2-google-maps'

export default {
  data () {
    return {
      map: null,
      mapZoom:13,
      defaultCenter: {
        lat: 31.230519,
        lng: 121.473665
      },
      marker: null,
      inputAddress: '',
    } 
  },
  mounted () {
    // 初始化 google map
    this.$gmapApiPromiseLazy().then(() => {
      if (this.$refs.mapRef) {
        this.$refs.mapRef.$mapPromise.then((map) => {
          this.map = map
        })
      }
    })
  },
  computed: {
    gmap: gmapApi,
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
    closeMapPanel() {
      this.$store.commit('hideEndMapPanel')
      this.$store.commit('hideStartMapPanel')
    },
    async querySearchAsync (queryString, callback) {
      const { code, data } = await searchPlaces({ input: queryString })
      if (code == 0) {
        const s = []
        for (let i = 0, len = data.results.length; i < len; i++) {
          var x = data.results[i]
          var item = { 
            city: x.city,
            value: x.name,
            title: x.name,
            point: x.geometry.location,
            address: x.formatted_address,
            province: x.province,
          }
          s.push(item)
          callback(s)
        }
      } else {
        callback()
      }
    },
    async handleSelect (item) {
      const { title, point, address, province, city } = item
      const res = await checkAddress({
        title,
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
              id: data.id, title, point, city, province, address
            })
            this.$store.commit('showEndMapPanel')
            this.$store.commit('hideStartMapPanel')
          } else {
            this.$store.commit('changeEndPosition', {
              id: data.id, title, point, city, province, address
            })
          }
        } else {
          this.$message.error('当前地址暂时不支持，请重新选择地址')
        }
      }
    },
    setGoogoleMapMarker (item) {
      if (this.marker) {
        this.marker.setMap(null)
      }
      const marker = new this.gmap.maps.Marker({
        position: item.point,
        animation: this.gmap.maps.Animation.DROP,
        title: item.name,
        label: item.address
      })
      marker.setMap(this.map)
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
    .map {
      height: 100%;
      width: 100%;
    }
  }
} 

</style>