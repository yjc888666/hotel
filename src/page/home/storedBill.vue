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
          @click="integralQuery()"
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
        prop="money"
        :label="$t('backstage.moneys')"
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
        prop="staff"
        :label="$t('reception.staff_name')"
        width="auto"
        show-overflow-tooltip
        align="center"
        :formatter="workerFormat"
      ></el-table-column>
      <el-table-column
        prop="remark "
        :label="$t('reception.remark')"
        width="auto"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column :label="$t('public.operate')" align="center" fixed="right" width="380">
        <template slot-scope="scope">
          <el-button size="mini" @click="detailsButton(scope.row)">{{$t('reception.vip_details')}}</el-button>
          <el-button
            size="mini"
            :disabled="scope.row.item == 3 ? true : false"
            @click="revocationButton(scope.row)"
          >{{$t('reception.revoke')}}</el-button>
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
    <!-- 详情弹窗 -->
    <el-dialog :title="$t('reception.password')" :visible.sync="dialogDetails" width="50%">
      <el-form
        :model="detailsData"
        ref="detailsData"
        label-width="100px"
        class="demo-ruleForm input-parent"
      >
        <el-form-item :label="$t('reception.vip_card')" class="input-box">
          <el-input :disabled="true" v-model="detailsData.member_card"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.vip_name')" class="input-box">
          <el-input :disabled="true" v-model="detailsData.memberName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.phone2')" class="input-box">
          <el-input :disabled="true" v-model="detailsData.phone"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.pay_project')" class="input-box">
          <el-input :disabled="true" v-model="detailsData.item"></el-input>
          <!-- <template slot-scope="scope">
              
          </template>-->
        </el-form-item>
        <el-form-item :label="$t('backstage.moneys')" class="input-box">
          <el-input :disabled="true" v-model="detailsData.money"></el-input>
        </el-form-item>
        <el-form-item :label="$t('backstage.give_money')" class="input-box">
          <el-input :disabled="true" v-model="detailsData.give"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.payf')" class="input-box">
          <el-input :disabled="true" v-show="detailsData.pay_status===1" value="现金"></el-input>
          <el-input :disabled="true" v-show="detailsData.pay_status===2" value="刷卡"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.time2')" class="input-box">
          <el-input :disabled="true" v-model="detailsData.create_time"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDetails">{{$t('public.cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Title from "../../components/cont_title";
export default {
  components: {
    Title
  },
  created() {
    this.queryWorker();
    this.getList(this.getData);
  },
  data() {
    return {
      title: {
        title: "储值账单",
        title_show: false
      },
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
      listData: [],
      detailsData: {
        //详情弹窗数据
      },
      dialogDetails: false,
      evocation: false,
      //操作员列表
      workerList: []
    };
  },
  computed: {
    titles() {
      return { title: this.$t("left.stored") };
    }
  },
  methods: {
    //查询操作员列表
    queryWorker() {
      this.$axios
        .post(this.$baseUrl + `/staff/getpage`,{
          size:500
        })
        .then(res => {
          this.workerList = res.data.pojo.list;
        })
        .catch(res => {
          console.log(err);
        });
    },

    //操作员类型的转换
    workerFormat(row) {
      for (var i = 0, l = this.workerList.length; i < l; i++) {
        if (row.staff == this.workerList[i].id) {
          return this.workerList[i].username;
        }
      }
    },

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
        .post(this.$baseUrl + `/recharge/bypage`, this.getData)
        .then(res => {
          this.listData = res.data.pojo.list;
          this.toltal = res.data.pojo.total;
        });
    },
    // 获取选中的时间
    getTime(val) {
      let start = this.dateToMs(val[0]);
      let end = this.dateToMs(val[1]);
      this.getData.startTime = start;
      this.getData.endTime = end;
      this.getList(this.getData);
    },
    //  标准时间转成时间戳
    dateToMs(date) {
      let result = new Date(date).getTime() / 1000;
      return result;
    },

    // 详情
    detailsButton(val) {
      this.dialogDetails = true;
      let formData = new FormData();
      formData.append("id", val.id);
      this.$axios.post(this.$baseUrl + `/recharge/get`, formData).then(res => {
        this.detailsData = res.data.pojo;
        let item = this.detailsData.item;
        if (item == 1) {
          this.detailsData.item = this.$t('Validation.store_bill.item_1');
        } else if (item == 2) {
          this.detailsData.item = this.$t('Validation.store_bill.item_2');
        } else if (item == 3) {
          this.detailsData.item = this.$t('Validation.store_bill.item_3');
        } else {
          this.detailsData.item = this.$t('Validation.store_bill.item_4');
        }
      });
    },
    cancelDetails() {
      this.dialogDetails = false;
    },
    //撤销
    revocationButton(val) {
      let formData = new FormData();
      formData.append("id", val.id);
      this.$axios
        .post(this.$baseUrl + `/recharge/revocation`, formData)
        .then(res => {
          if (res.data.result == true) {
            this.$message({
              type: "success",
              message: "撤销成功"
            });
            this.getList(this.getData);
          } else {
            this.$message({
              type: "warning",
              message: "撤销失败"
            });
          }
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