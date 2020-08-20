<template>
  <div class="member-box">
    <Title :title="title"></Title>
    <div class="top-search">
      <el-button size="small" @click="repairCar()" class="tijiao el-button--primary">补卡</el-button>
      <el-button size="small" @click="recharge()" class="tijiao el-button--primary">充值</el-button>
      <el-button size="small" @click="alterPassword()" class="tijiao el-button--primary">修改密码</el-button>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="会员类型 " prop="level">
        <el-select :disabled="true" v-model="ruleForm.level" placeholder="请选择" style="width: 300px">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡号" prop="member_card">
        <el-input :disabled="true" v-model.trim="ruleForm.member_card" class="widthinp"></el-input>
      </el-form-item>
      <el-form-item label="证件类型" prop="idType">
        <el-select
          :disabled="true"
          v-model.trim="ruleForm.idType"
          placeholder="请选择"
          style="width: 300px"
        >
          <el-option
            v-for="item in optionsPapers"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号" prop="idcard">
        <el-input :disabled="true" v-model.trim="ruleForm.idcard" class="widthinp"></el-input>
      </el-form-item>
      <el-form-item label="会员名" prop="username">
        <el-input v-model.trim="ruleForm.username" class="widthinp"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input class="widthinp" v-model.trim="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="支付密码" prop="passwordData">
        <el-input :disabled="true" class="widthinp" v-model.trim="passwordData"></el-input>
      </el-form-item>
      <el-form-item label="再次输入密码" prop="password">
        <el-input :disabled="true" class="widthinp" v-model.trim="ruleForm.password" show-password></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="ruleForm.gender" @change="changeGender">
          <el-radio class="radio" label="1">男</el-radio>
          <el-radio class="radio" label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="充值金额" prop="money">
        <el-input class="widthinp" :disabled="true" v-model.trim="ruleForm.money"></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <!-- <el-input class="widthinp" v-model.trim="ruleForm.birthday"></el-input> -->
        <el-date-picker
          @change="timeCut"
          v-model="ruleForm.birthday"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="支付方式">
        <el-radio-group v-model="ruleForm.pay_status" :disabled="true">
          <el-radio class="radio" label="1">现金</el-radio>
          <el-radio class="radio" label="2">刷卡</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitAlter('ruleForm')" class="tijiao">修改</el-button>
      </el-form-item>
    </el-form>
    <!-- 补卡挂失弹出框 -->
    <el-dialog title="补卡挂失" :visible.sync="dialogRepair" width="40%">
      <el-form
        :model="repairData"
        :rules="repairRules"
        ref="repairData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="方式" prop="type">
          <el-radio-group v-model="repairData.type" @change="radioRepair">
            <el-radio class="radio" label="0">换卡</el-radio>
            <el-radio class="radio" label="1">挂失补卡</el-radio>
            <el-radio class="radio" label="2">仅挂失</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="新卡号" prop="member_card" v-show="cardShow">
          <el-input v-model.number="repairData.member_card"></el-input>
        </el-form-item>
        <el-form-item label="当前卡号" prop="old_card">
          <el-input v-model.number="repairData.old_card"></el-input>
        </el-form-item>
        <el-form-item label="费用" prop="price">
          <el-input v-model.trim="repairData.price "></el-input>
        </el-form-item>
        <el-form-item label="支付方式" prop="pay_type">
          <el-radio-group v-model="repairData.pay_type">
            <el-radio class="radio" label="1">现金</el-radio>
            <el-radio class="radio" label="2">刷卡</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model.trim="repairData.remark "></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRepair">取 消</el-button>
        <el-button type="primary" @click="alterRepair('repairData')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码的弹出框 -->
    <el-dialog title="修改密码" :visible.sync="dialogPassword" width="30%">
      <el-form
        :model="passAlter"
        :rules="passRules"
        ref="passAlter"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原因" prop="status">
          <el-radio-group v-model="passAlter.status" @change="radioStatus">
            <el-radio class="radio" label="1">正常修改</el-radio>
            <el-radio class="radio" label="0">忘记密码</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="新密码" prop="newPsd">
          <el-input v-model.number="passAlter.newPsd" show-password></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldPsd" v-show="passRadio">
          <el-input v-model.number="passAlter.oldPsd" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">取 消</el-button>
        <el-button type="primary" @click="alterPass('passAlter')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 充值的弹窗 -->
    <el-dialog title="充值" :visible.sync="dialogFormVisible" width="30%">
      <el-form
        :model="rechargeRuleform"
        :rules="rechargeRules"
        ref="rechargeRuleform"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="充值金额" prop="money">
          <el-input v-model.trim="rechargeRuleform.money"></el-input>
        </el-form-item>
        <el-form-item label="充值金额" prop="pay_status">
          <el-radio-group v-model="rechargeRuleform.pay_status">
            <el-radio class="radio" label="1">现金</el-radio>
            <el-radio class="radio" label="2">刷卡</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="会员卡号" prop="member_card">
          <el-input v-model.trim="rechargeRuleform.member_card"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="alterMoney('rechargeRuleform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Title from "../../components/cont_title";
import yz from "../../config/validation";
export default {
  components: {
    Title
  },
  data() {
    return {
      title: {
        title: "会员信息",
        title_show: true
      },
      ruleForm: {
        level: "",
        member_card: "",
        idcard: "",
        idType: "",
        username: "",
        phone: "",
        pay_status: "",
        gender: "",
        money: "",
        birthday: "",
        password: ""
      },
      passwordData: "",
      rules: {
        username: [
          { required: true, message: "请输入会员名", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: yz.validateMobilePhoneNo, trigger: "blur" }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        birthday: [{ required: true, message: "请选择生日", trigger: "blur" }]
      },
      options: [],
      optionsPapers: [],
      alterId: "", //修改的id
      dialogRepair: false, //换卡的弹出
      repairData: {
        //补卡挂失----
        type: "0",
        member_card: "",
        old_card: "",
        price: "",
        pay_type: "",
        remark: ""
      },
      bukaId: '',
      cardShow: true,
      priceShow: false,
      passAlter: {
        //修改密码的数据---
        status: '0',
        newPsd: "",
        oldPsd: ""
      },
      passStatus: '',
      passRadio: false,
      dialogPassword: false,
      dialogFormVisible: false, //充值弹窗-------
      rechargeRuleform: {
        money: "",
        pay_status: "",
        member_card: ""
      },
      //卡办理验证
      repairRules: {
        type: [
          { required: true, message: "请选择换卡的方式", trigger: "blur" }
        ],
        member_card: [
          { required: true, message: "请输入新卡号", trigger: "blur" },
          { type: "number", message: "新卡号必须为数字" }
        ],
        old_card: [
          { required: true, message: "请输入当前卡号", trigger: "blur" },
          { type: "number", message: "卡号必须为数字" }
        ],
        price: [{ required: true, message: "请输入费用", trigger: "blur" }],
        pay_type: [{ required: true, message: "请选择支付方式", trigger: "blur" }],
        remark: [{ required: true, message: "请输入描述", trigger: "blur" }]
      },
      passRules: {
        //修改密码的验证
        status: [
          { required: true, message: "请选择修改密码的原因", trigger: "blur" }
        ],
        newPsd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          // { type: "number", message: "密码必须为数字值" }
           { validator: yz.validatePass, trigger: "blur" }
        ],
        oldPsd: [
          { required: true, message: "请旧密码", trigger: "blur" },
          { validator: yz.validatePass, trigger: "blur" }
        ]
      },
      rechargeRules: {
        //充值验证
        money: [{ required: true, message: "请输入金额", trigger: "blur" }],
        pay_status: [
          { required: true, message: "请选择方式", trigger: "blur" }
        ],
        member_card: [
          { required: true, message: "请输入会员卡号", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    changeGender() {
      console.log(this.ruleForm.gender, 2233);
    },
    // 修改验证
    submitAlter(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.alterData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 挂卡补卡
    alterRepair(formName) {
      if (this.bukaId == 2) {
        delete this.repairRules.member_card;
      } else {
        // delete this.repairRules.price;
        // delete this.repairRules.pay_type;
      }
      console.log(this.repairRules,this.repairData,22222222)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.repairPort();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 详情接口
    detailsData() {
      let formData = new FormData();
      formData.append("id", this.alterId);
      this.$axios.post(this.$baseUrl + "/member/get", formData).then(res => {
        this.ruleForm = res.data.pojo; //修改拿到详情的数据
        this.passwordData = this.ruleForm.password;
        this.ruleForm.gender = JSON.stringify(this.ruleForm.gender);
        if (this.ruleForm.status == 1) {
          this.ruleForm.status = "正常";
        } else {
          this.ruleForm.status = "注销";
        }
      });
    },
    // 截取时间
    timeCut(val) {
      var d = new Date(val);
      var datetime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.ruleForm.birthday = datetime;
    },
    //修改
    alterData() {
      let obj = {
        id: this.alterId,
        username: this.ruleForm.username,
        phone: this.ruleForm.phone,
        gender: this.ruleForm.gender,
        birthday: this.ruleForm.birthday
      };
      this.$axios.post(this.$baseUrl + `/member/edit`, obj).then(res => {
        if (res.data.result == true) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
        } else {
          this.$message({
            type: "warning",
            message: "修改失败"
          });
        }
      });
    },
    // 路由跳转后的接收数据
    skipData() {
      this.alterId = this.$route.query.id; //详情id
    },
    // 挂失补卡弹窗----------------
    repairCar() {
      this.dialogRepair = true;
    },
    // 取消补卡
    cancelRepair() {
      this.dialogRepair = false;
      this.repairEmpty();
    },
    // 挂失补卡接口
    repairPort() {
      this.repairData.old_card = JSON.stringify(this.repairData.old_card);
      this.repairData.member_card = JSON.stringify(this.repairData.member_card);
      this.$axios
        .post(this.$baseUrl + `/member/action/change`, this.repairData)
        .then(res => {
          if (res.data.result == true) {
            this.$message({
              type: "success",
              message: "办理成功"
            });
            this.repairEmpty();
            this.dialogRepair = false;
          } else {
            this.$message({
              type: "warning",
              message: "办理失败"
            });
            this.repairEmpty();
          }
        });
    },
    // 挂失补卡的单选状态
    radioRepair(val) {
      this.repairEmpty(val);
      this.bukaId= val
       if (this.bukaId == 2) {
        this.cardShow = false;
        this.priceShow = true;
        // delete this.repairRules.member_card;
        // delete this.repairData.remark;
      } else {
        this.cardShow = true;
        this.priceShow = false;
        // delete this.repairRules.price;
        // delete this.repairRules.pay_type;
        // delete this.repairData.price;
        // delete this.repairData.pay_type;
      }
    },

    // 补卡清空
    repairEmpty(val) {
      this.repairData.member_card = "";
      this.repairData.type = val;
      this.repairData.old_card = "";
      this.repairData.price = "";
      this.repairData.pay_type = "";
      this.repairData.remark = "";
    },
    // 修改密码 弹窗----------
    alterPassword() {
      this.passAlter.id = this.alterId;
      this.dialogPassword = true;
    },
    // 取消密码
    cancelSubmit() {
      this.dialogPassword = false;
      this.passEmpty();
    },
    // 修改密码
    passData() {
      this.passAlter.newPsd = JSON.stringify(this.passAlter.newPsd);
      this.passAlter.oldPsd = JSON.stringify(this.passAlter.oldPsd);
      this.$axios
        .post(this.$baseUrl + `/member/newpsd`, this.passAlter)
        .then(res => {
          if (res.data.result == true) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            this.passEmpty();
          } else {
            this.$message({
              type: "warning",
              message: "修改失败"
            });
            this.passEmpty();
          }
        });
    },
    // 监听修改密码的变化
    radioStatus(val) {
      this.passStatus = val
      if (val == 0) {
        this.passRadio = false;
        // this.passRules.oldPsd = [
        //   { required: true, message: "请旧密码", trigger: "blur" }
        // ];
      } else {
        this.passRadio = true;
        // delete this.passRules.oldPsd;
        // console.log(this.passRules, 23323);
      }
    },
    // 密码提交
    alterPass(formName) {
      if(this.passStatus == 0){
        delete this.passRules.oldPsd;
        delete this.passAlter.oldPsd;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.passData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //  密码清空
    passEmpty() {
      (this.passAlter.status = ""),
        (this.passAlter.newPsd = ""),
        (this.passAlter.oldPsd = "");
    },
    // 充值按钮-------------------
    recharge(val) {
      this.dialogFormVisible = true;
    },
    // 充值提交
    alterMoney(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.MoneyData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 充值金额接口
    MoneyData() {
      this.$axios
        .post(this.$baseUrl + `/recharge/set`, this.rechargeRuleform)
        .then(res => {
          if (res.data.result == true) {
            this.$message({
              type: "success",
              message: "充值成功"
            });
            this.passEmpty();
            this.dialogFormVisible = false;
          } else {
            this.$message({
              type: "warning",
              message: "充值失败"
            });
            this.passEmpty();
          }
        });
    },
    // 充值清空
    moneyEmpty() {
      this.rechargeRuleform.money = "";
      this.rechargeRuleform.pay_status = "";
      this.rechargeRuleform.member_card = "";
    }
  },
  created() {
    this.skipData();
    this.detailsData();
  }
};
</script>

<style lang="less" scoped>
.member-box {
  width: 100%;
  height: 100%;
  padding: 20px;
  .top-search {
    height: 70px;
    display: flex;
    align-items: center;
  }
}
</style>