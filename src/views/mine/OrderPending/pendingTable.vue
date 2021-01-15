<template>
  <div>
    <el-table
      :data="data"
      :header-cell-style="{background:'#eef1f6',color:'#606266',textAlign:'center'}"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="订单号" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px; fontSize:12px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="货运信息" align="center">
        <template slot-scope="scope">
          <ul>
            <li class="fontSize">商品名：{{ scope.row.query.itemName }}</li>
            <li class="fontSize">重量：{{ scope.row.query.itemWeight }}KG</li>
            <li class="fontSize">体积：{{ scope.row.query.itemVolume }}m3</li>
          </ul>
          <!-- <span style="margin-left: 10px;fontSize:12px;color:green">{{ scope.row.informPort.name }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="账号信息" align="center">
        <template slot-scope="scope">
          <ul>
            <li class="fontSize">用户名：{{ scope.row.createdBy.nickName }}</li>
            <li class="fontSize">始发港：{{ scope.row.plan.pol }}</li>
            <li class="fontSize">目的港：{{ scope.row.plan.pod }}</li>
          </ul>
          <!-- <span style="margin-left: 10px;fontSize:12px">{{ scope.row.name }}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="下单时间" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px;fontSize:12px;">{{ scope.row.lastUpdatedAt }}</span>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px;fontSize:12px;color:green">{{ scope.row.plan.stage5Plan.priceSummary.value }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px;fontSize:12px;color:red">{{ scope.row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      data: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit("onSelectionChange", val);
    },
    handleEdit(i, j) {
      this.$emit("onEdit", i, j);
    }
    // handleDelete(i,j){
    //   this.$emit('onDelete',i,j)
    // }
  },
  beforeMount() {
    this.data = this.tableData;
  },
  watch: {
    tableData(newValue, oldValue) {
      this.data = newValue;
    }
  }
};
</script>

<style lang="scss" scoped>
.fontSize{
    font-size: 90%;
}
</style>