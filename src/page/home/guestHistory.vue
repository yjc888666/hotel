<template>
  <!-- 客人历史 -->
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
            prop="id_member"
            label="房间号"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="checkin_time"
            label="入住时间"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="total_price"
            label="总价"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column label="支付方式" width="auto" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.pay_status==0">未支付</div>
              <div v-if="scope.row.pay_status==1">已支付</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="day"
            label="天数"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column label="支付方式" width="auto" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.source_type==1">散客</div>
              <div v-if="scope.row.source_type==2">会员</div>
              <div v-if="scope.row.source_type==3">单位</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="toghther_guest"
            label="同来宾客"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="id_number"
            label="证件号"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="team_id"
            label="团队id"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="staff_number"
            label="操作人编号"
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
        title: "客户",
        title_show: true
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
    getList() {
      let el = this.$route.query.id;
      let formData = new FormData()
      formData.append('el',el)
      this.$axios
        .post(this.$baseUrl + `/customer/history`, { id_member: el })
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