<template>
  <!-- 积分查询 -->
  <div class="cont">
    <Title :title="titles"></Title>
     <div class="cont_top_btn">
    <div class="lists">
      <el-input
        v-model.trim="getData.memberName"
        class="time-left"
        :placeholder="$t('reception.username2')"
        clearable
      ></el-input>
      <el-input
        v-model.trim="getData.phone"
        class="time-left"
        :placeholder="$t('reception.phone2')"
        clearable
      ></el-input>
      <el-input
        v-model.trim="getData.member_card"
        class="time-left"
        :placeholder="$t('reception.vip_card')"
        clearable
      ></el-input>
      <el-date-picker
        @change="getTime"
        v-model="time"
        type="daterange"
        range-separator="至"
        :start-placeholder="$t('reception.kai_time')"
        :end-placeholder="$t('reception.jie_time')"
      ></el-date-picker>
      <el-button
        type="primary tijiao"
        @click="integralQuery"
        class="tijiao"
      >{{$t('public.inquire')}}</el-button>
    </div>
    </div>
    <el-table :data="listData" stripe style="width: 100%" header-align="center">
      <el-table-column
        prop="member_card"
        :label="$t('reception.vip_card')"
        width="auto"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="memberName"
        :label="$t('reception.vip_name')"
        width="auto"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="phone"
        :label="$t('reception.phone2')"
        width="auto"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="increase"
        :label="$t('reception.increase')"
        width="auto"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="minus"
        :label="$t('reception.minus')"
        width="auto"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="create_time"
        :label="$t('backstage.create_time')"
        width="auto"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="staffName"
        :label="$t('reception.staff_name')"
        width="auto"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="staffName "
        :label="$t('reception.remark')"
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
      time: "",
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
  computed: {
    titles() {
      return { title: this.$t("left.integral") };
    }
  },
  methods: {
    handleSizeChangeCont() {},
    handleCurrentChangeCont() {},
    // 查询
    integralQuery() {
      this.getList();
    },
    getList() {
      this.$axios
        .post(this.$baseUrl + `/scorenote/bypage`, this.getData)
        .then(res => {
          this.listData = res.data.pojo.list;
          this.toltal = res.data.pojo.total;
        });
    },
    // 获取选中的时间
    getTime(val) {
      console.log(val, 222);
    }
  }
};
</script>

<style lang="less" scoped>
.floatleft {
  width: 47.5%;
  float: left;
}
.floatleft:nth-child(odd) {
  margin-right: 5%;
}
.dia .el-select {
  width: 100%;
}
.dias {
  padding-bottom: 30px;
  padding-left: 30px;
}
</style>