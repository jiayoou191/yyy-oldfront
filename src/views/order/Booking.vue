<template>
  <div class="quotation-page">
    <div class="quotation-content">
      <h1 class='header'>国际运输委托书 </h1>
      <p class="no">订单编号：EZ1000641000001015<span v-if="planDetail">（{{TRANSPACKTYPES[planDetail.transPackType]}}）</span></p>
      <h2>商品信息</h2>
      <table class="goods-table column-4-table">
        <tbody>
          <tr>
            <td rowspan="3" class="em">商品信息</td>
            <td class="em">品名</td> 
            <td class="em">重量(KG)</td> 
            <td class="em">体积(m³)</td> 
          </tr>
          <tr v-for="(item, index) in goodsDetail" :key="index">
            <td>{{item.name}}</td> 
            <td>{{item.weight}}</td> 
            <td>{{item.volume}}</td> 
          </tr>
        </tbody>  
      </table>

      <h2>货物描述</h2>
      <div class="description-info">
        <div class="description-item">
          <div class="description-item__content">
            <template v-if="descriptions.length > 0">
              <div class="description-item__inner" v-for="(item, index) in descriptions" :key='index'> 
                <el-input class="input" v-model="item.desc" placeholder="商品唛头"></el-input>
                <el-input class="input" v-model="item.num" placeholder="件数"></el-input>
                <el-select class="input" placeholder="包装类型" v-model="item.unit" @change="handleChangeUnit">
                  <el-option v-for="item in GOODSUNIT" :key="item.id" :label="item.zh" :value="item.zh">
                    <span style="float: left">{{ item.zh }}</span>
                    <span style="float: right; color: #999; font-size: 13px">{{ item.en}}</span>
                  </el-option>
                </el-select>
                <el-input class="input" placeholder="体积" v-model="item.volume">
                  <template slot="append">m³</template>
                </el-input>
                <el-input class="input" placeholder="重量" v-model="item.weight">
                  <template slot="append">kg</template>
                </el-input>
                <i v-if="index > 0" @click="handleDeleteDesc(index)"  class="el-icon-remove-outline">
                </i>
              </div>
            </template>
            <el-link class="add-new-item" @click="handleAddDesc" type="primary">新增货物描述</el-link>
          </div>
        </div>
      </div>

      <h2>联系信息</h2>
      <div class="info-wrap">
        <div class="left">
          <el-input placeholder="请输入公司名称或者个人姓名" v-model="shipper.name">
            <template slot="prepend">发货人</template>
          </el-input>
          <el-input placeholder="请输入公司名称或者个人的详细地址" v-model="shipper.address">
            <template slot="prepend">联系地址</template>
          </el-input>
          <el-input placeholder="请输入有效联系电话" v-model="shipper.phone">
            <template slot="prepend">联系电话</template>
          </el-input>
          <el-input placeholder="请输入有效联系邮箱" v-model="shipper.email">
            <template slot="prepend">联系邮箱</template>
          </el-input>
          <el-input placeholder="企业统一社会信用证编号/身份证号/护照号" v-model="shipper.card">
            <template slot="prepend">证件号码</template>
          </el-input>
          <el-input placeholder="请输入及时通讯名称和账号,如微信:XXX" v-model="shipper.social">
            <template slot="prepend">及时通讯</template>
          </el-input>
        </div>
        <div class="sep"></div>
        <div class="right">
          <el-input placeholder="请输入公司名称或者个人姓名" v-model="consignee.name">
            <template slot="prepend">发货人</template>
          </el-input>
          <el-input placeholder="请输入公司名称或者个人的详细地址" v-model="consignee.address">
            <template slot="prepend">联系地址</template>
          </el-input>
          <el-input placeholder="请输入有效联系电话" v-model="consignee.phone">
            <template slot="prepend">联系电话</template>
          </el-input>
          <el-input placeholder="请输入有效联系邮箱" v-model="consignee.email">
            <template slot="prepend">联系邮箱</template>
          </el-input>
          <el-input placeholder="企业统一社会信用证编号/身份证号/护照号" v-model="consignee.card">
            <template slot="prepend">证件号码</template>
          </el-input>
          <el-input placeholder="请输入及时通讯名称和账号,如微信:XXX" v-model="consignee.social">
            <template slot="prepend">及时通讯</template>
          </el-input>
        </div>
      </div>

      <h2>航线信息</h2>
      <div class="operator-info">
         <div class="left">
          <el-input v-if="queryDetail" v-model="queryDetail.startAddress.address" disabled>
            <template slot="prepend">提货地址</template>
          </el-input>
          <el-input 
            v-if="transportRoute"
            :value="$t(`country.${transportRoute.polCountry}`) + $t(`port.${transportRoute.pol}`)" 
            disabled
          >
            <template slot="prepend">启运港</template>
          </el-input>
        </div>
        <div class="sep"></div>
        <div class="right">
          <el-input v-if="queryDetail" v-model="queryDetail.endAddress.address" disabled>
            <template slot="prepend">送货地址</template>
          </el-input>
          <el-input 
            v-if="transportRoute"
            :value="$t(`country.${transportRoute.podCountry}`)+$t(`port.${transportRoute.pod}`)" 
            disabled
          >
            <template slot="prepend">目的港</template>
          </el-input>
        </div>
      </div>
      <h2>支付信息</h2>
      <div class="pay-info">
        <div class="line">
          <label>货物保险:</label>
          <el-checkbox v-model="insurance">是否购买国际运输保险</el-checkbox>
        </div>
        <div class="line">
          <label>运费支付:</label>
          <el-radio-group v-model="payment">
            <el-radio :label="1">买方支付</el-radio>
            <el-radio :label="2">卖方支付</el-radio>
          </el-radio-group>
        </div>
      </div>
      <h2>时间信息</h2>
      <div class="time-info">
        <div class="line">
          <label>货物备好时间：</label>
          <el-date-picker
            v-model="goodsReadyTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="line">
          <label>计划出货时间：</label>
          <el-date-picker
            v-model="shippingTime"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <h2>简宜运操作联系人</h2>
      <div class="operatior-info">
        <p>
          <label>联系人：</label>刘鹏
        </p>
        <p>
          <label>联系方式：</label>021-11112222
        </p>
        <p>
          <label>电子邮件：</label>liupeng@jianyiyun.com
        </p>
      </div>
      <div class="button-wrap">
        <el-button type="primary" @click="submitShippingBook">确认提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  getPlanDetail,
  getOrderDetail,
  postShippingBook
} from '@/service/order'

export default {
  data () {
    return {
      orderId: '',
      orderDetail: null,
      queryDetail: null,
      planDetail: null,
      goodsDetail: null,
      descriptions: [ //货物描述
        // {
        //   desc: '',   // 唛头
        //   num: '',    // 件数
        //   unit: '',   // 包装类型
        //   weight: '', // 重量单位千克
        //   volume: ''  // 体积单位立方米
        // }
      ],
      shipper: {     // 发货人
        name: '',    // 姓名
        address: '', // 地址
        phone: '',   // 电话
        email: '',   // 邮箱地址
        card: '',    // 证件号码
      },
      consignee: {
        name: '',    // 姓名
        address: '', // 地址
        phone: '',   // 电话
        email: '',   // 邮箱地址
        card: '',    // 证件号码
        social: ''   // 及时通讯联系方式
      },
      insurance: true,  // 是否需要保险
      payment: 1, // 1表示买方支付 2表示卖方支付
      shippingTime: null, //出货时间
      goodsReadyTime: null, //货物备好时间
    }
  },
  computed: {
    transportRoute () {
      if (this.planDetail && this.planDetail.transportRoute) {
        return this.planDetail.transportRoute
      } else {
        return null
      }
    },
  },
  async mounted () {
    this.orderId = this.$route.params.id
    const res = await getOrderDetail(parseInt(this.$route.params.id))
    if (res.code == 0) {
      this.orderDetail = res.data.order
    }

    if (this.orderDetail) {
      const res = await getPlanDetail(parseInt(this.orderDetail.planId))
      if (res.code == 0) {
        const data = res.data
        this.planDetail = data.plan
        this.queryDetail = data.query
        this.goodsDetail = data.itemList

        for (let item of this.goodsDetail) {
          this.descriptions.push({
            desc: item.name, 
            num: '',
            unit: '', 
            weight: item.weight, 
            volume: item.volume
          })
        }
      }
    }
  },
  methods: {
    handleChangeUnit () {
      console.log(this.descriptions)
    },
    handleDeleteDesc (index) {
      this.descriptions.splice(index, 1)
    },
    handleAddDesc () {
      this.descriptions.push({desc: '', num: '', unit: '', weight: '', volume: ''})
    },
    checkDescInfo () {
      for (let index = 0, len = this.descriptions.length; index < len; index++) {
        const item = this.descriptions[index]
        item.desc = item.desc.trim()
        const num = Number(item.num)
        const weight = Number(item.weight)
        const volume = Number(item.volume)
        if (!item.desc || !item.unit || !item.num || !item.weight || !item.volume) {
          this.$message.error('商品描述不能为空')
          return false
        }
        if (isNaN(weight) || weight <=0 || isNaN(num) || num <=0 ||  isNaN(volume) || volume <= 0) {
          this.$message.error('商品重量/体积/件数必须为大于0的数字')
          return false
        }
      }
      return true
    },
    checkUserInfo () {
      if (!this.shipper.name || !this.shipper.address || !this.shipper.phone || !this.shipper.email || !this.shipper.card || !this.shipper.social) {
        this.$message.error('发货人信息各项信息不能为空')
        return false
      }

      if (!this.consignee.name || !this.consignee.address || !this.consignee.phone || !this.consignee.email || !this.consignee.card || !this.consignee.social) {
        this.$message.error('收货人信息各项信息不能为空')
        return false
      }
      return true
    },
    checkTimeInfo () {
      if (!this.shippingTime) {
        this.$message.error('计划出货时间不能为空')
        return false
      }
      if (!this.goodsReadyTime) {
        this.$message.error('货物备好时间不能为空')
        return false
      }
      return true
    },
    async submitShippingBook () {
      if (!this.checkDescInfo() ||  !this.checkUserInfo() || !this.checkTimeInfo()) {
        return 
      }
      const res = await postShippingBook({
        orderId: parseInt(this.orderId),
        descriptions: this.descriptions,
        shipper: this.shipper,
        consignee: this.consignee,
        insurance: this.insurance,
        payment: this.payment,
        shippingTime: this.shippingTime,
        goodsReadyTime: this.goodsReadyTime
      })

      if (res.code == 0) {
        this.$router.push({
          path: '/order/success'
        })
      } else {
        this.$message.error('请稍后重试')
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/scss/_var.scss';

.quotation-page {
  .quotation-content {
    width: 1000px;
    margin: 20px auto;
    border-radius: 4px;
    padding: 60px;
    border: 1px solid #ddd;
    min-height: 500px;
    box-shadow: -3px -3px 10px 0 rgba(0,0,0,.04), 3px 3px 10px 0 rgba(0,0,0,.04);
    .header {
      font-size: 30px;
      text-align: center;
      margin-bottom: 15px;
      .no {
        font-size: 16px;
        font-weight: normal;
      }
    }
    h2 {
      font-size: 16px;
      display: inline-block;
      margin-bottom: 10px;
      margin-top: 20px;
      border-bottom: 2px solid $theme-color;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      &.column-4-table {
        td {
          width: 25%;
        }
      }
      &.column-8-table {
        td {
          width: 12.5%;
        }
      }
      td {
        padding: 10px;
        text-align: center;
        color: #666;
        border: 1px solid #ddd;
        &.em {
          color: #333;
          font-weight: bold;
          background-color: #F5F7FA;
        }
      }
    }
    .description-info {
      .description-item {
        .description-item__content {
          display: flex;
          flex-direction: column;
          .description-item__inner {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            .input {
              width: 155px;
              margin-right: 15px;
            }
            .el-input-group__append {
              border-radius: 0;
              font-weight: bold;
            }
            .el-input__inner {
              color: #666;
              border-radius: 0;
            }
            .el-icon-remove-outline{
              font-size: 24px;
              color: $theme-color;
              cursor: pointer;
            }
          }
          .add-new-item {
            width: 90px;
          }
        }
      }
    }
    .info-wrap, .operator-info {
      display: flex;
      justify-content: space-between;
      .sep {
        border-right: 1px dashed #ddd;
      }
      .left,.right {
        width: 48%;
        .el-input {
          margin-bottom: 10px;
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
    .pay-info, .time-info {
      .line {
        font-size: 15px;
        label {
          min-width: 100px;
          display: inline-block;
        }
        margin-bottom: 15px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    .operatior-info {
      p {
        label {
          min-width: 80px;
          display: inline-block;
        }
        margin-bottom: 8px;
      }
    }
    .button-wrap {
      text-align: center;
      margin-top: 20px;
      .el-button {
        font-size: 16px;
        width: 200px;
      }
    }
  }
}
</style>