<template>
  <el-dialog
    title="请填写商品信息"
    width="700px"
    class="goods-input-panel"
    :visible="chooseGoodsPanel"
    :showClose="false"
    @open="initGoodsData"
  >
    <div class="goods-input-content">
      <div class="goods-input-item">
        <label class="input-label">商品类别</label>
        <el-select class="goods-type" placeholder="请选择" v-model="goods.id" @change="handleChangeGoodsInfo">
          <el-option v-for="item in ALLGOODS" :key="item.id" :label="item.name" :value="item.id">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #999; font-size: 13px">{{ item.intro}}</span>
          </el-option>
        </el-select>
      </div>
      <template v-if="goods.type!==1">
        <div class="goods-input-item top">
          <label class="input-label">商品信息</label>
          <div class="info-wrap">
            <template v-if="goodsData.length > 0">
              <div class="info-item" v-for="(item, index) in goodsData" :key="index">
                <el-input class="goods-name-input" v-model="item.name" placeholder="商品名称"></el-input>
                <el-input placeholder="体积" v-model="item.volume">
                  <template slot="append">m³</template>
                </el-input>
                <el-input placeholder="重量" v-model="item.weight">
                  <template slot="append">kg</template>
                </el-input>
                <i
                  v-if="index > 0"
                  @click="handleDeleteGoodsItem(index)"
                  class="el-icon-remove-outline"
                ></i>
              </div>
            </template>
            <el-link class="add-new-goods" @click="handleAddGoodsItem" type="primary">新增商品</el-link>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="goods-input-item">
          <label class="input-label"></label>
          <el-alert type="warning" :closable="false">
            <p slot="title">
              该商品暂时不支持在线询价，具体请电话联系客服：
              <span class="em">{{CONSUMER_HOTLINE}}</span>
            </p>
          </el-alert>
        </div>
      </template>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideGoodsPanel">取消</el-button>
      <el-button type="primary" @click="checkGoodsInfo">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { deepCopySimpleObject } from "@/util";

export default {
  data() {
    return {
      start: "",
      goodsData: [],
      newGoods: []
    };
  },
  computed: {
    chooseGoodsPanel() {
      return this.$store.state.chooseGoodsPanel;
    },
    goods() {
      return this.$store.state.goods;
    }
  },
 
  methods: {

    showGoodsPanel() {
      this.$store.commit("showGoodsPanel");
    },
    hideGoodsPanel() {
      this.$store.commit("hideGoodsPanel");
    },
    initGoodsData() {
      if (this.goods.data.length > 0) {
        this.goodsData = deepCopySimpleObject(this.goods.data);
      } else {
        this.goodsData = [{ name: "", weight: "", volume: "" }];
      }
    },

    checkGoodsInfo() {
      if (this.goods.id === "") {
        return this.$message.error("请选择商品类型");
      }

      if (this.goods.type === 0) {
        for (let index = 0, len = this.goodsData.length; index < len; index++) {
          const item = this.goodsData[index];
          item.name = item.name.trim();
          const weight = Number(item.weight);
          const volume = Number(item.volume);
          if (!item.name || !item.weight || !item.volume) {
            return this.$message.error("商品信息不能为空");
          }
          if (isNaN(weight) || weight <= 0 || isNaN(volume) || volume <= 0) {
            return this.$message.error("商品重量和体积必须为大于0的数字");
          }
        }
      }
      this.$store.commit(
        "changeGoodsData",
        deepCopySimpleObject(this.goodsData)
      );
      this.hideGoodsPanel();
    },
    handleChangeGoodsInfo(id) {
      const { type, label } = this.$getGoodsTypeById(id);
      if (type == 1) {
        this.goodsData = [];
      }
      this.$store.commit("changeGoodsInfo", { id, type, label });
    },
    handleDeleteGoodsItem(index) {
      this.goodsData.splice(index, 1);
    },
    handleAddGoodsItem() {
      this.goodsData.push({ name: "", weight: "", volume: "" });
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/_var.scss";
.goods-input-panel {
  .goods-input-content {
    padding-left: 30px;
    padding-right: 30px;
    .goods-input-item {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      &.top {
        align-items: baseline;
      }
      &:last-child {
        margin-bottom: 0;
      }
      .input-label {
        min-width: 80px;
        font-weight: bold;
      }
      .em {
        font-size: 16px;
        font-weight: bold;
      }
      .goods-type {
        flex: auto;
      }
      .info-wrap {
        display: flex;
        flex-direction: column;
        .info-item {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          .el-input {
            margin-right: 15px;
          }
          .goods-name-input {
            width: 200px;
          }
          .el-input-group {
            width: 120px;
            .el-input-group__append {
              padding: 0 10px;
            }
          }
          i {
            font-size: 24px;
            color: $theme-color;
            cursor: pointer;
          }
        }
        .add-new-goods {
          width: 70px;
        }
      }
    }
  }
}
</style>