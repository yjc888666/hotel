<template>
<!-- 积分查询 -->
  <div class="integral-box">
    <Title :title="title"></Title>
    <div class="menber-box">
      <div class="top-search">
        <el-input
          v-model.trim="getData.memberName"
          class="select-left"
          placeholder="会员名"
          clearable
        ></el-input>
        <el-input v-model.trim="getData.phone" class="select-left" placeholder="手机号" clearable></el-input>
        <el-input
          v-model.trim="getData.member_card"
          class="select-left"
          placeholder="卡号"
          clearable
        ></el-input>
        <div class="block">
          <el-date-picker
            @change="getTime"
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <el-button size="small" type="primary tijiao" @click="integralQuery()" class="tijiao">查询</el-button>
      </div>
      <div class="menber-list">
        <el-table :data="listData" stripe style="width: 100%" header-align="center">
          <el-table-column prop="member_card" label="卡号" width="auto" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="memberName" label="会员名" width="auto" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="auto" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="increase" label="增加" width="auto" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="minus" label="扣除" width="auto" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="create_time" label="发生时间" width="auto" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="staffName" label="操作员工" width="auto" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column prop="staffName " label="备注" width="auto" show-overflow-tooltip align="center"></el-table-column>
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
      time: '',
      getData: {
        page: 1,
        size: 10,
        memberName: "",
        phone: "",
        member_card: "",
        startTime: "",
        endTime: ""
      },
      toltal: 0,
      listData: []
    };
  },
  methods: {
    handleSizeChangeCont(){

    },
    handleCurrentChangeCont(){

    },
    // 查询
    integralQuery() {},
    getList() {
      this.$axios.post(this.$baseUrl + `/scorenote/bypage`,this.getData)
      .then(res =>{
        this.listData = res.data.pojo.list
      })
    },
    // 获取选中的时间
    getTime(val){
      console.log(val,222)
    }
  }
};
</script>

<style lang="less" scoped>
.integral-box{
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
    margin-top: 20px;
    .el-input {
      margin: 0 5px 0 5px;
    }
    .tijiao{
      margin-left: 10px;
    }
  }
}
</style>