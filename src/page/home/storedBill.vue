<template>
  <!-- 积分查询 -->
  <div class="integral-box">
    <div class="menber-box">
      <Title :title="title"></Title>
      <div class="top-search">
        <el-input v-model.trim="getData.memberName" class="select-left" placeholder="会员名" clearable></el-input>
        <el-input v-model.trim="getData.phone" class="select-left" placeholder="手机号" clearable></el-input>
        <el-input v-model.trim="getData.member_card" class="select-left" placeholder="卡号" clearable></el-input>
        <div class="block">
          <el-date-picker
            @change="getTime"
            v-model="time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
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
            prop="increase"
            label="增加"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="minus"
            label="扣除"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="create_time"
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
            prop="staffName "
            label="备注"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="380">
            <template slot-scope="scope">
              <el-button size="mini" @click="detailsButton(scope.row)">详情</el-button>
              <el-button size="mini" :disabled="scope.row.item == 3 ? true : false" @click="revocationButton(scope.row)">撤销</el-button>
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
      <!-- 详情弹窗 -->
      <el-dialog title="修改密码" :visible.sync="dialogDetails" width="50%">
        <el-form
          :model="detailsData"
          ref="detailsData"
          label-width="100px"
          class="demo-ruleForm input-parent"
        >
          <el-form-item label="卡号" class="input-box">
            <el-input :disabled="true" v-model="detailsData.member_card"></el-input>
          </el-form-item>
          <el-form-item label="会员名" class="input-box">
            <el-input :disabled="true" v-model="detailsData.memberName"></el-input>
          </el-form-item>
          <el-form-item label="手机" class="input-box">
            <el-input :disabled="true" v-model="detailsData.phone"></el-input>
          </el-form-item>
          <el-form-item label="项目" class="input-box">
            <el-input :disabled="true" v-model="detailsData.item"></el-input>
            <!-- <template slot-scope="scope">
              
            </template>-->
          </el-form-item>
          <el-form-item label="金额" class="input-box">
            <el-input :disabled="true" v-model="detailsData.money"></el-input>
          </el-form-item>
          <el-form-item label="赠送金额" class="input-box">
            <el-input :disabled="true" v-model="detailsData.give"></el-input>
          </el-form-item>
          <el-form-item label="支付方式" class="input-box">
            <el-input :disabled="true" v-model="detailsData.pay_status"></el-input>
          </el-form-item>
          <el-form-item label="收款日期" class="input-box">
            <el-input :disabled="true" v-model="detailsData.create_time"></el-input>
          </el-form-item>
          <el-form-item label="操作员">
            <el-input :disabled="true" v-model="detailsData.操作员"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelDetails">返回</el-button>、
        </div>
      </el-dialog>
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
          this.detailsData.item = "会员充值 ";
        } else if (item == 2) {
          this.detailsData.item = "充值赠送";
        } else if (item == 3) {
          this.detailsData.item = "撤销充值";
        } else {
          this.detailsData.item = "撤销充值赠送";
        }
      });
    },
    cancelDetails() {
      this.dialogDetails = false;
    },
    //撤销
    revocationButton(val){
      let formData = new FormData();
      formData.append("id", val.id);
      this.$axios.post(this.$baseUrl + `/recharge/revocation`, formData).then(res => {
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