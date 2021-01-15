<template>
  <div class="test-google">
    <div class="google-map-wrap">
      <div class="left">
        <el-autocomplete
          popper-class="address-autocomplete"
          v-model="inputAddress"
          style="width:100%"
          :fetch-suggestions="querySearchAsync"
          :trigger-on-focus="false"
          @select="handleSelect"
          placeholder="请输入具体地址">
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
              <span class="addr">{{ item.address }}</span>
            </template>
        </el-autocomplete>
      </div>
      <div class="right">
        <GmapMap
          ref="mapRef"
          class="google-map"
          :center="(position.point.lat && position.point)"
          :zoom="position.zoom" />
      </div>
    </div>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps'

export default {
  data () {
    return {
      map: null,
      placeService: null,
      inputAddress: '',
      position: {
        zoom: 14,
        point: {
          lat: 31.332739, 
          lng: 121.412302
        }
      }
    }
  },
  computed: {
    google: gmapApi
  },
  mounted () {
    this.$gmapApiPromiseLazy().then(() => {
       this.$refs.mapRef.$mapPromise.then((map) => {
        this.map = map
        this.placeService = new this.google.maps.places.PlacesService(map)
      })
    })
  },
  methods: {
    querySearchAsync (queryString, callback) {
      const request = {
        query: queryString,
        fields: ['name', 'geometry', 'formatted_address', 'icon', 'types', 'photos']
      }
      const s = []
      this.placeService.textSearch(request, (results, status) => {
        if (status === this.google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            const item = results[i]
            console.log(item)
            s.push({
              value: item.name,
              address: item.formatted_address,
              location: item.geometry.location
            })
          }
        }
      })
      callback(s)
    },
    async handleSelect (item) {
      this.position.point = item.location
      const marker = new this.google.maps.Marker({
        position: item.location,
        title: item.value,
        label: item.address
      })
      marker.setMap(this.map)
    },
  }
}
</script>
<style lang="scss">
.address-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    .name {
      text-overflow: ellipsis;
      font-size: 14px;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }    
    .highlighted .addr {
      color: #ddd;
    }
  }
}
.google-map-wrap {
  height: 600px;
  width: 900px;
  margin: 40px auto;
  border-radius: 4px;
  border:1px solid #ddd;
  display: flex;
  .left {
    padding: 10px;
    width: 300px;
    height: 100%;
  }
  .right {
    flex: auto;
    height: 100%;
  }
  .google-map {
    width: 100%;
    height: 100%;
  }
}
  
</style>