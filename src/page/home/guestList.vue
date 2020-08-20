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
            prop="username"
            label="客户姓名"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
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
            prop="card_type"
            label="证件类型"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="card_num"
            label="证件号"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="birthday"
            label="生日"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="user_type"
            label="用户类型"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="member_card"
            label="会员卡号"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="consume_num"
            label="消费次数"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="消费次数"
            label="总消费"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="80">
            <template slot-scope="scope">
              <el-button size="mini" @click="historyButton(scope.row)">客史</el-button>
            </template>
          </el-table-column>
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
        title: "客人列表",
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
    getList() {
      this.$axios
        .post(this.$baseUrl + `/customer/bypage`, this.getData)
        .then(res => {
          this.listData = res.data.pojo.list;
          this.toltal = res.data.pojo.total;
        });
    },
    historyButton(val) {
      console.log(val,222)
      this.$router.push({
        name: "guestHistory",
        query: { id: val.card_num }
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