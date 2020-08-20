<template>
  <!-- 操作日志 -->
  <div class="integral-box">
    <div class="menber-box">
      <Title :title="title"></Title>
      <div class="top-search">
        <el-input v-model.trim="getData.memberName" class="select-left" placeholder="会员名" clearable></el-input>
        <el-input v-model.trim="getData.phone" class="select-left" placeholder="手机号" clearable></el-input>
        <el-input v-model.trim="getData.member_card" class="select-left" placeholder="卡号" clearable></el-input>
        <el-button size="small" type="primary tijiao" @click="integralQuery()" class="tijiao">查询</el-button>
      </div>
      <div class="menber-list">
        <el-table :data="listData" stripe style="width: 100%" header-align="center">
          <el-table-column
            prop="member_card"
            label="卡号"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="memberName"
            label="会员名"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="old_card"
            label="旧卡号"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column label="日志类型" width="auto" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.type==0">换卡</div>
              <div v-else-if="scope.row.type==1">挂失补卡</div>
              <div v-else-if="scope.row.type==2">仅挂失</div>
              <div v-else-if="scope.row.type==3">注销</div>
              <div v-else-if="scope.row.type==4">修改密码</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            label="费用"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column label="支付方式" width="auto" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.type==0">无</div>
              <div v-else-if="scope.row.type==1">现金</div>
              <div v-else-if="scope.row.type==2">刷卡</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="add_time "
            label="发生时间"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="staffName"
            label="操作员工"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          
        </el-table>
        <el-pagination
          @size-change="handleSizeChangeCont"
          @current-change="handleCurrentChangeCont"
          :current-page="getData.page"
          :page-sizes="[5,10, 20, 30, 40]"
          :page-size="getData.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="toltal"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../../components/cont_title";
export default {
  components: {
    Title
  },
  created() {
    this.getList(this.getData);
  },
  data() {
    return {
      title: {
        title: "会员信息",
        title_show: false
      },
      time: "",
      getData: {
        page: 1,
        size: 10,
        memberName: "",
        phone: "",
        member_card: ""
      },
      toltal: 0,
      listData: [],
      evocation: false
    };
  },
  methods: {
    handleSizeChangeCont(val) {
      this.getData.size = val;
      this.getList(this.getData);
    },
    handleCurrentChangeCont(val) {
      this.getData.page = val;
      this.getList(this.getData);
    },
    // 查询
    integralQuery() {
      this.getList(this.getData);
    },
    // 初始化数据
    getList() {
      this.$axios
        .post(this.$baseUrl + `/member/action/bypage`, this.getData)
        .then(res => {
          this.listData = res.data.pojo.list;
          this.toltal = res.data.pojo.total;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.integral-box {
  width: 100%;
  height: 100%;
  .menber-box {
    width: 97%;
    background: #fff;
    height: auto;
    margin: 0 auto;
  }
  .top-search {
    height: 70px;
    display: flex;
    align-items: center;
    .el-input {
      margin: 0 5px 0 5px;
    }
    .tijiao {
      margin-left: 10px;
    }
  }
  .input-parent {
    width: 100%;
    .input-box {
      width: 50%;
      float: left;
    }
  }
}
</style>