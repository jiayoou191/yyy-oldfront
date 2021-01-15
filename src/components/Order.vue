<template>
  <div class="order-form" :style="{width: width ? width : '100%'}" @click.stop>
    <div class="order-inner">
      <!-- 请选择商品 -->
      <div class="input-item goods-item" @click="showGoodsPanel">
        <label class="input-label">
          <i class="el-icon-goods"></i>
        </label>
        <!-- <p class="input-tip ellipsis">{{goods.label ? goodsNames : $t('order.goods_tip') }}</p> -->
        <p class="input-tip ellipsis">{{goods.id ? goods.data[0].name : $t('order.goods_tip') }}</p>
      </div>
      <!-- 详细的提货地址 -->
      <div class="input-item start-item" @click="showStartMapPanel">
        <label class="input-label">
          <i class="el-icon-location-outline"></i>
        </label>
        <!-- <p class="input-tip ellipsis">{{ start.address ? `${start.title}(${start.address})` : $t('order.pickup_tip')}}</p> -->
        <p class="input-tip ellipsis">{{ startContent ? startContent : $t('order.pickup_tip')}}</p>
      </div>
      <!-- 详细的目的地址 -->
      <div class="input-item end-item" @click="showEndMapPanel">
        <label class="input-label">
          <i class="el-icon-location-outline"></i>
        </label>
        <!-- <p class="input-tip ellipsis">{{ end.address ? `${end.title}(${end.address})` : $t('order.delivery_tip')}}</p> -->
        <p class="input-tip ellipsis">{{ endContent ? endContent : $t('order.pickup_tip')}}</p>
      </div>
      <div class="input-item button-item">
        <el-button type="primary" @click="queryPrice">{{$t('order.check_button')}}</el-button>
      </div>
    </div>
    <!-- <Goods /> -->
    <newGoods></newGoods>
    <BingMap
      class="map-choose"
      :autofocus="autofocus"
      @onChange="handleChangeAddress"
      v-if="$store.state.chooseStartMapPanel||$store.state.chooseEndMapPanel"
    ></BingMap>
    <!-- <Map class="map-choose" /> -->
  </div>
</template>

<script>
import BingMap from "@/components/BingMap.vue";
// import Map from '@/components/Map.vue'
// import Goods from '@/components/Goods.vue'
import newGoods from "@/components/newGoods.vue";
import { httpGet, httpPostFormData } from "@/api/httpUtils.js";
import { queryRouter } from "@/service/order";

export default {
  props: ["width"],
  data() {
    return {
      autofocus: false,
      title: "",
      startContent: "",
      endContent: "",
      address: {
        startAddress: {},
        endAddress: {}
      },
      newGoodsListOption: []
    };
  },
  components: {
    // Map,
    // Goods,
    BingMap,
    newGoods
  },
  computed: {
    goodsNames() {
      let names = "";
      if (this.$store.state.goods.data.length > 0) {
        this.$store.state.goods.data.forEach(item => {
          if (names == "") {
            names = item.name;
          } else {
            names = `${names},${item.name}`;
          }
        });
      } else {
        names = this.$store.state.goods.label;
      }
      return names;
    },
    goods() {
      // console.log(this.$store.state.goods);
      return this.$store.state.goods;
    },
    start() {
      return this.$store.state.start;
    },
    end() {
      return this.$store.state.end;
    }
  },
  created() {
    console.log('200227a')
    this.itemTypeGet();
  },
  methods: {
    itemTypeGet() {
      httpGet("/item_type/list")
        .then(res => {
          // console.log(res.data.itemTypes);
          this.newGoodsListOption = res.data.itemTypes;
          // console.log(this.dataSource);
          // this.totalPages = res.data.totalPages;
        })
        .catch(e => {
          console.log("e: ", e);
        });
    },
    showGoodsPanel() {
      this.$store.commit("showGoodsPanel");
    },
    showStartMapPanel() {
      // console.log(1)
      this.autofocus = true;
      // this.$store.commit('showStartMapPanel')
      this.title = "start";
      console.log(this.$store.state.chooseStartMapPanel);
      console.log(this.$store.commit("showStartMapPanel"));

      this.$store.commit("hideEndMapPanel");
    },
    showEndMapPanel() {
      this.title = "end";
      this.$store.commit("showEndMapPanel");
      this.$store.commit("hideStartMapPanel");
    },
    handleChangeAddress(value, address) {
      if (this.title == "start") {
        this.startContent = value;
        this.$store.commit("showStartMapPanel");
        this.$store.commit("showEndMapPanel");
        this.title = "end";
        this.address.startAddress = { ...address };
        // this.newGoodsListOption.map((i,j)=>{
        //   // i.name ==
        // })
        // console.log("goods:", this.goods);
        // console.log("start:", this.address);
      } else {
        this.endContent = value;
        this.$store.commit("showEndMapPanel");
        this.address.endAddress = { ...address };

        console.log("end:", this.address);
      }
    },

    //TODO 此处调用接口 查询 是否找到货物
    queryPrice() {
      let data = {
        item_type_id: this.goods.id,
        item_name: this.goods.data[0].name,
        item_weight: Number(this.goods.data[0].weight),
        item_volume: Number(this.goods.data[0].volume),
        from_address_json: JSON.stringify(this.address.startAddress),
        to_address_json: JSON.stringify(this.address.endAddress)
      };
      let formData = new FormData();
      formData.set("item_type_id", data.item_type_id);
      formData.set("item_name", data.item_name);
      formData.set("item_weight", data.item_weight);
      formData.set("item_volume", data.item_volume);
      formData.set("from_address_json", data.from_address_json);
      formData.set("to_address_json", data.to_address_json);
      // console.log(data);
      httpPostFormData('/search',formData).then(res => {
        console.log(res.data);
       this.$emit('onClick',res.data)
     
    // console.log('path:',this.$route.path)
    if(this.$route.path != '/detail'){
          this.$router.push({name:'detail',params:res.data})
    }

      
      });

      // if (this.goods.type === "" || this.goods.data.length == 0) {
      //   return this.$message.error("商品信息不能为空");
      // } else if (this.goods.type === 1) {
      //   return this.$message.error(
      //     `该商品暂时不支持在线询价，具体请电话联系客服:${this.CONSUMER_HOTLINE}`
      //   );
      // } else if (this.start.address == "") {
      //   return this.$message.error("请填写提货地址");
      // } else if (this.end.address == "") {
      //   return this.$message.error("请填写收货地址");
      // } else {
      //   const res = await queryRouter({
      //     startAddressId: this.start.id,
      //     endAddressId: this.end.id,
      //     isMultiPickUpPoints: 0,
      //     itemTypeId: this.goods.id,
      //     items: this.goods.data
      //   });
      //   if (res.code == 0) {
      //     this.$store.commit("hideEndMapPanel");
      //     this.$store.commit("hideStartMapPanel");
      //     this.$router.push({
      //       path: "/detail",
      //       query: {
      //         id: res.data.queryId
      //       }
      //     });
      //   } else {
      //     this.$message.error(this.$t("message.something_error"));
      //   }
      // }
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/_var.scss";
.order-form {
  height: 100%;
  border-radius: 4px;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  background-color: #fff;
  position: relative;
  .order-inner {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    .input-item {
      align-items: center;
      height: 100%;
      display: flex;
      border-right: 1px solid #eee;
      box-sizing: content-box;
      cursor: pointer;
      color: #666;
      &.goods-item {
        min-width: 20%;
      }
      &.start-item,
      &.end-item {
        min-width: 35%;
      }
      &.button-item {
        flex: 1;
        border-right: none;
        .el-button {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 0;
          font-size: 16px;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }
      .input-tip {
        padding-right: 8px;
      }
      .input-label {
        padding: 8px;
        i {
          font-size: 24px;
          color: $theme-color;
        }
      }
    }
  }
}
</style>