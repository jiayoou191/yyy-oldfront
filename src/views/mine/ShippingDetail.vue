<template>
  <div class="shipping-detail">
    <h1>委托书详情</h1>
    <div class="content" v-if="data">
      <div class="goods-description section-info">
        <h2>货物描述</h2>
        <p class="description-item" v-for="(item, index) in data.descriptions" :key="index">
          {{item.desc}} · {{item.num}} · {{item.unit}} · {{item.weight}}KG · {{item.volume}}m³ 
        </p>
      </div>
      <div class="shipper-detail section-info">
        <h2>收货人信息</h2>
        <el-input :value="data.shipper.name" disabled>
          <template slot="prepend">发货人</template>
        </el-input>
        <el-input :value="data.shipper.address" disabled>
          <template slot="prepend">联系地址</template>
        </el-input>
        <el-input :value="data.shipper.phone" disabled>
          <template slot="prepend">联系电话</template>
        </el-input>
        <el-input :value="data.shipper.email" disabled>
          <template slot="prepend">联系邮箱</template>
        </el-input>
        <el-input :value="data.shipper.card || '暂无'" disabled>
          <template slot="prepend">证件号码</template>
        </el-input>
        <el-input :value="data.shipper.social || '暂无'" disabled>
          <template slot="prepend">及时通讯</template>
        </el-input>
      </div>

      <div class="consignee-detail section-info">
        <h2>收货人信息</h2>
        <el-input :value="data.consignee.name" disabled>
          <template slot="prepend">收货人</template>
        </el-input>
        <el-input :value="data.consignee.address" disabled>
          <template slot="prepend">联系地址</template>
        </el-input>
        <el-input :value="data.consignee.phone" disabled>
          <template slot="prepend">联系电话</template>
        </el-input>
        <el-input :value="data.consignee.email" disabled>
          <template slot="prepend">联系邮箱</template>
        </el-input>
        <el-input :value="data.consignee.card || '暂无'" disabled>
          <template slot="prepend">证件号码</template>
        </el-input>
        <el-input :value="data.consignee.social || '暂无'" disabled>
          <template slot="prepend">及时通讯</template>
        </el-input>
      </div>

      <div class="payment-info section-info">
        <h2>付款信息</h2>
        <p> <span class="label">是否购买货物保险：</span> {{data.insurance ? '已购买' : '暂无购买'}} </p>
        <p> <span class="label">运费支付方：</span> {{data.payment == 1 ? '买方付费' : '卖方付费'}} </p>
      </div>

      <div class="time-info section-info">
        <h2>时间信息</h2>
        <p> <span class="label">货物备好时间：</span> {{data.goodsReadyTime | formatDate}} </p>
        <p> <span class="label">计划出货时间：</span> {{data.shippingTime | formatDate}} </p>
      </div>

      <div class="operatior-info section-info">
        <h2>简宜运操作联系人</h2>
        <p><span class="label">联系人：</span>刘鹏</p>
        <p><span class="label">联系方式：</span>021-11112222</p>
        <p><span class="label">电子邮件：</span>liupeng@jianyiyun.com</p>
      </div>
    </div>
    <div class="no-content" v-if="!data">
      <img src="@/assets/404.png" class="no-shipping-image" alt="尚未填写委托书">
      <p class="tip">尚未填写委托书， <router-link :to="`/order/booking/${orderId}`">前往填写</router-link></p>
    </div>  
  </div>
</template>

<script>
export default {
  props: ['data', 'orderId']
}
</script>

<style lang="scss">
@import '@/scss/_var';
.shipping-detail {
  border: 1px solid #eee;
  h1 {
    padding: 20px;
    font-weight: normal;
    border-bottom: 1px solid #eee;
  }
  .no-content {
    padding: 40px;
    text-align: center;
    .no-shipping-image {
      width: 200px;
    }
    .tip {
      margin-top: 20px;
      a {
        color: $theme-color;
        text-decoration: underline;
      }
    }
  }
  .section-info {
    padding: 20px;
    border-bottom: 1px dashed #eee;
    &:last-child {
      border-bottom: none;
    }
    h2 {
      font-size: 18px; 
      margin-bottom: 10px;
    }
    .el-input {
      margin-bottom: 10px;
      max-width: 500px;
      &:last-child {
        margin-bottom: 0;
      }
      .el-input-group__prepend {
        width: 100px;
        border-radius: 0;
        font-weight: bold;
      }
      .el-input__inner {
        color: #666;
        border-radius: 0;
      }
    }
  }
}
</style>