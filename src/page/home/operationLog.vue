<template>
  <!-- 操作日志 -->
  <div class="integral-box">
    <div class="menber-box">
      <Title :title="titles"></Title>
      <div class="top-search">
        <el-input v-model.trim="getData.memberName" class="select-left"  :placeholder="$t('reception.username2')" clearable></el-input>
        <el-input v-model.trim="getData.phone" class="select-left" :placeholder="$t('reception.phone2')" clearable></el-input>
        <el-input v-model.trim="getData.member_card" class="select-left" :placeholder="$t('reception.vip_card')" clearable></el-input>
        <el-button size="small" type="primary tijiao" @click="integralQuery()" class="tijiao">{{$t('public.inquire')}}</el-button>
      </div>
      <div class="menber-list">
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
            prop="old_card"
            :label="$t('reception.old_card')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column :label="$t('reception.log_type')" width="auto" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.type==0">{{$t('reception.change_card')}}</div>
              <div v-else-if="scope.row.type==1">{{$t('reception.add_card_')}}</div>
              <div v-else-if="scope.row.type==2">{{$t('reception.gua_shi')}}</div>
              <div v-else-if="scope.row.type==3">{{$t('reception.logout')}}</div>
              <div v-else-if="scope.row.type==4">{{$t('reception.alter_pas')}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="price"
            :label="$t('reception.fei_yong')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column :label="$t('reception.payf')" width="auto" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.type==0">无</div>
              <div v-else-if="scope.row.type==1">现金</div>
              <div v-else-if="scope.row.type==2">刷卡</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="add_time"
            :label="$t('backstage.create_time')"
            width="auto"
           
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
            prop="remark"
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
   computed: {
    titles() {
     return {title:this.$t('left.operation')}
    }
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