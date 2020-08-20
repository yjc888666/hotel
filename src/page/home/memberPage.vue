<template>
  <!-- 会员管理 -->
  <div class="menber-boss">
    <div class="menber-box">
      <Title :title="title"></Title>
      <div class="top-search">
        <el-button
          class="adds"
          type="success"
          size="small"
          style="background: #066197;border-color: #066197;"
          icon="el-icon-plus"
          @click="addButton"
        >新增</el-button>
        <el-input v-model.trim="searchData.phone" class="select-left" placeholder="手机号" clearable></el-input>
        <el-input
          v-model.number="searchData.member_card"
          class="select-left"
          placeholder="卡号"
          clearable
        ></el-input>
        <el-input
          v-model.trim="searchData.username"
          class="select-left"
          placeholder="会员姓名"
          clearable
        ></el-input>
        <el-input v-model.trim="searchData.level" class="select-left" placeholder="会员类型" clearable></el-input>
        <el-button size="small" type="primary tijiao" @click="searchLevel()" class="tijiao">查询</el-button>
        <!-- <el-button size="small" @click="recharge()" class="tijiao el-button--primary">充值</el-button> -->
      </div>
      <div class="menber-list">
        <el-table :data="listData" stripe style="width: 100%" header-align="center">
          <el-table-column prop="id" label="ID" width="auto" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="username"
            label="会员名"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="username"
            label="证件类型"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="idcard"
            label="身份证号"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="member_card"
            label="会员卡号"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="level"
            label="会员类型"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="addtime"
            label="添加时间"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="gender"
            label="性别"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="birthday"
            label="生日"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="status"
            label="卡状态"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="score"
            label="积分"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="balance"
            label="余额"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="amount"
            label="总消费"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="num"
            label="消费次数"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="staff"
            label="操作员工"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="380">
            <template slot-scope="scope">
              <el-button size="mini" @click="detailsButton(scope.row)">详情</el-button>
              <el-button size="mini" @click="alterButton(scope.row)">修改</el-button>
              <el-button class="el-button--danger" size="mini" @click="deleteButton(scope.row)">删除</el-button>
              <el-button size="mini" @click="logoutButton(scope.row.id)">注销</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChangeCont"
          @current-change="handleCurrentChangeCont"
          :current-page="currentPage"
          :page-sizes="[5,10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="mytotal"
        ></el-pagination>
      </div>
    </div>
  
  </div>
</template>
<script>
import Title from "../../components/cont_title";
import yz from "../../config/validation.js";
export default {
  components: {
    Title
  },
  data() {
    return {
      title: {
        title: "会员信息",
        title_show: false
      },
      searchData: {
        level: "",
        phone: "",
        member_card: "",
        username: ""
      },
      listData: [],
      currentPage: 1,
      pagesize: 10,
      mytotal: 0,
     
      dialogPassword: false,
      
    };
  },
  methods: {
    // 搜索接口
    searchLevel() {
      let pro = this.searchData;
      this.getData(
        this.currentPage,
        this.pagesize,
        pro.level,
        pro.phone,
        pro.member_card,
        pro.username
      );
    },
    // 每页多少条
    handleSizeChangeCont(val) {
      let pro = this.searchData;
      this.getData(
        this.currentPage,
        val,
        pro.level,
        pro.phone,
        pro.member_card,
        pro.username
      );
    },
    // 切换页数
    handleCurrentChangeCont(val) {
      let pro = this.searchData;
      this.getData(
        val,
        this.pagesize,
        pro.level,
        pro.phone,
        pro.member_card,
        pro.username
      );
    },
    // 初始化数据
    getData(page, size, level, phone, member_card, username) {
      let obj = {
        page: page,
        size: size,
        level: level,
        phone: phone,
        member_card: member_card,
        username: username
      };
      this.$axios.post(this.$baseUrl + `/member/bypage`, obj).then(res => {
        this.listData = res.data.pojo.list;
        this.mytotal = parseInt(res.data.pojo.total);
      });
    },
    // 新增跳转传参
    addButton() {
      this.$router.push({ name: "memberFrom", query: { paicheNo: true } });
    },
    // 详情跳转传参
    detailsButton(val) {
      this.$router.push({
        name: "memberFrom",
        query: { details: true, id: val.id, showButton: true }
      });
    },
    // 点击修改跳转传参
    alterButton(val) {
      this.$router.push({
        name: "memberAlter",
        query: { aletrShow: true, id: val.id }
      });
    },
    // 点击删除
    deleteButton(val) {
      let formData = new FormData();
      formData.append("id", val.id);
      this.$axios.post(this.$baseUrl + `/member/delete`, formData).then(res => {
        if (res.data.result == true) {
          this.$message({
            type: "success",
            message: "删除成功"
          });
        } else {
          this.$message({
            type: "warning",
            message: "删除失败"
          });
        }
      });
    },
    // 注销接口
    logoutButton(val) {
      let formData = new FormData();
      formData.append("id", val);
      this.$axios.post(this.$baseUrl + `/member/cancel`, formData).then(res => {
        if (res.data.result == true) {
          this.$message({
            type: "success",
            message: "注销成功"
          });
        } else {
          this.$message({
            type: "warning",
            message: "注销失败"
          });
        }
      });
    },
  },
  created() {
    let pro = this.searchData;
    this.getData(
      this.currentPage,
      this.pagesize,
      pro.level,
      pro.phone,
      pro.member_card,
      pro.username
    );
  }
};
</script>
<style lang="less" scoped>
.menber-boss {
  height: 100%;
  width: 100%;
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
      margin-right: 5px;
    }
  }
  .menber-list {
    // display: flex;
    // flex-direction: column;
    // align-items: center;
  }
}
</style>