<template>
  <div class="quotation-page">
    <HeaderComponent theme='dark' />
    <div class="quotation-content">
      <h1 class='header'>简易运 - OFCL - 洋山港 - 意大利 - 报价单</h1>
      <h2>商品信息</h2>
      <table class="goods-table column-4-table">
        <tbody>
          <tr>
            <td rowspan="3" class="em">商品信息</td>
            <td class="em">品名</td> 
            <td class="em">重量(KG)</td> 
            <td class="em">体积(m³)</td> 
          </tr>
          <tr>
            <td>书包1</td> 
            <td>80</td> 
            <td>120</td> 
          </tr>
          <tr>
            <td>书包1</td> 
            <td>80</td> 
            <td>120</td> 
          </tr>
        </tbody>  
      </table>
      <h2>航线信息</h2>
      <table class="goods-table column-4-table">
        <tbody>
          <tr>
            <td class="em">启运港</td> 
            <td>上海港</td> 
            <td class="em">目的港</td> 
            <td>汉堡港</td> 
          </tr>
          <tr>
            <td class="em">运输方式</td> 
            <td>海运+陆运</td> 
            <td class="em">全程耗时</td> 
            <td>36天</td> 
          </tr>
          <tr>
            <td class="em">船期</td> 
            <td colspan="3">每周六开船，提前四天提货集装箱</td> 
          </tr>
        </tbody>  
      </table>
      <h2>费用信息</h2>
      <table class="goods-table column-8-table">
        <tbody>
          <tr>
            <td colspan="3" class="em">箱型</td>
            <td class="em">20GP</td>
            <td class="em">40GP</td>
            <td class="em">40HQ</td>
            <td class="em">45HQ</td>
            <td rowspan="2" class="em">总价</td>
          </tr>
          <tr>
            <td colspan="3" class="em">数量</td>
            <td>0</td>
            <td>1</td>
            <td>2</td>
            <td>0</td>
          </tr>
          <tr>
            <td class="em" rowspan="11">启运港费用</td>
            <td class="em" rowspan="8">每箱单价</td> 
            <td class="em">订舱费</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
          </tr>
          <tr>
            <td class="em">拖车费</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
          </tr>
          <tr>
            <td class="em">码头操作费</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
          </tr>
          <tr>
            <td class="em">操作费</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
          </tr>
          <tr>
            <td class="em">称重费</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
          </tr>
          <tr>
            <td class="em">安保费</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
          </tr>
          <tr>
            <td class="em">放单费</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
          </tr>
          <tr>
            <td class="em">封子费</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
          </tr>
          <tr>
            <td class="em" rowspan="3">每票单价</td> 
            <td class="em">文件费</td> 
            <td colspan="4">0</td> 
            <td>0</td> 
          </tr>
          <tr>
            <td class="em">舱单费</td> 
            <td colspan="4">0</td> 
            <td>0</td> 
          </tr>
          <tr>
            <td class="em">报关费</td> 
            <td colspan="4">0</td> 
            <td>0</td> 
          </tr>
          <tr>
            <td class="em">运输费用</td>
            <td class="em">每箱单价</td>
            <td class="em">运输费</td>
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
          </tr>
          <tr>
            <td class="em">目的港费用</td>
            <td class="em">每箱单价</td>
            <td class="em">运输费</td>
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
            <td>0</td> 
          </tr>
        </tbody>  
      </table>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '@/components/Header'

export default {
  data () {
    return {

    }
  },
  components: {
    HeaderComponent,
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_var.scss';

.quotation-page {
  .quotation-content {
    width: 800px;
    margin: 20px auto;
    border-radius: 4px;
    padding: 20px;
    border: 1px solid #ddd;
    min-height: 500px;
    box-shadow: -3px -3px 10px 0 rgba(0,0,0,.04), 3px 3px 10px 0 rgba(0,0,0,.04);
    .header {
      font-size: 24px;
      text-align: center;
      margin-bottom: 15px;
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
        font-size: 13px;
        &.em {
          color: #333;
          font-weight: bold;
          background-color: #f8f8f8;
        }
      }
    }
  }
}

  
</style>