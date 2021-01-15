<template>
  <div>
    <div v-for="(i,j) in AllPlan" :key="j" class="box " :id='i.id' ref="box" >
      <div @click="handleClick(j)">
      <div class="flex">
        <div class="word">{{transportTypeDictionary(i.transportType)}}</div>
        <div class="red">{{i.currency}} {{sub(i.priceValueDisplay)}}</div>
      </div>
      <div class="left">
        <span class="countryWord">{{Query.from.countryRegion}}</span>-
        <span class="countryWord">{{Query.to.adminDistrict}}</span>
      </div>
      <div class="left">
        全程38天 ｜ 提货-
        <span class="font">{{transportTypeDictionary(i.transportType)}}</span>-送货
      </div>
      <div class="left">
        每
        <span>周二/周四发货</span>提前{{subDay(i.etd)}}天装箱装货
      </div>
      <div class="all">
        <div class="left bor">价格低</div>
        <div class="sec">查看详情</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    allPlan: {
      type: Array,
      default: () => []
    },
    query: {
      type: Object,
      default: ()=>{}
    }
  },
  data() {
    return {
      AllPlan: [],
      Query: {},

    };
  },
  methods: {
    
    transportTypeDictionary(k) {
      //TODO 字段翻译使用
      if (k == "ShippingFCL") {
        return "海运整箱";
      } else if (k == "ShippingLCL") {
        return "海运拼箱";
      } else if (k == "Air") {
        return "空运";
      } else if (k == "RailwayFCL") {
        return "铁路整箱";
      } else if (k == "RailwayLCL") {
        return "铁路拼箱";
      } else {
        return " ";
      }
    },
     sub(k) {
       //TODO 截取字符串 完整价格的截取 只保留小数点后2位
      let a = k
      let w = a.indexOf('.')
      let c = a.substr(0,w+3)
      return c;
    },
     subDay(k) {
       //TODO 截取字符串 天数
      let a = k
      let w = a.indexOf('.')
      let c = a.substr(0,w)
      return c;
    },
    handleClick(j){
      this.$emit('click',this.allPlan[j])
    }
  },
  beforeMount() {
    this.AllPlan = [...this.allPlan];
    console.log("allPlan:", this.AllPlan)
  },
  created () {
    this.Query = this.query;
    console.log('Query123: ',this.Query)
  },
  mounted () {
    //  this.$nextTick(()=>{
      //  document.querySelector('#200225050131EgqiWycl').setAttribute('class', 'box borderColor')
      // this.$refs.box[0].setAttribute('class','box borderColor');

    // }) 
  },
  watch: {
    allPlan(newValue) {
      this.AllPlan = [...newValue];
    },
     query(newValue) {
      this.Query = newValue;
      //  console.log('Query: ', this.Query)
    },
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 10px;
}
.box {
  width: 100%;
  // height: 100px;
  border: 1px solid #eee;
  border-radius: 5px;
}
.box:active
{ 
  width: 100%;
  // height: 100px;
  border: 1px solid #eee;
  border-radius: 5px;
}

.boderColor{
  border: 1px solid red;
}
.word {
  width: 70px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background: #eee;
  border-radius: 3px;
}
.red {
  color: red;
  font-size: 20px;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.left {
  margin-top: 5px;
  margin-left: 10px;
}
.countryWord {
  font-size: 18px;
}
.font {
  font-size: 15px;
  font-weight: bold;
}
.bor {
  border: 1px solid #e7a23d;
  width: 50px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background: #e7a23d;
  color: #fff;
  border-radius: 5px;
  float: left;
}
.sec {
  margin-right: 10px;
  margin-top: 5px;
  float: right;
  color: red;
}
.all {
  overflow: hidden;
  zoom: 1;
  margin-bottom: 10px;
  // display: flex;
  // justify-content: space-around;
}
</style>