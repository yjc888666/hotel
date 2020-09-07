<template>
  <div class="member-box">
    <Title :title="titles"></Title>
    <div class="top-search">
      <el-button size="small" @click="repairCar()" class="tijiao el-button--primary">{{$t('reception.add_card_')}}</el-button>
      <el-button size="small" @click="recharge()" class="tijiao el-button--primary">{{$t('reception.charge')}}</el-button>
      <el-button size="small" @click="alterPassword()" class="tijiao el-button--primary">{{$t('reception.alter_pas')}}</el-button>
    </div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item :label="$t('reception.vip_type')" prop="level">
        <el-select :disabled="true" v-model="ruleForm.level" placeholder="请选择" style="width: 300px">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('reception.vip_card')" prop="member_card">
        <el-input :disabled="true" v-model.trim="ruleForm.member_card" class="widthinp"></el-input>
      </el-form-item>
      <el-form-item :label="$t('reception.idType')" prop="idType">
        <el-select
          :disabled="true"
          v-model.trim="ruleForm.idType"
          :placeholder="$t('reception.idType')"
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
      <el-form-item :label="$t('reception.id_card')" prop="idcard">
        <el-input :disabled="true" v-model.trim="ruleForm.idcard" class="widthinp"></el-input>
      </el-form-item>
      <el-form-item :label="$t('reception.vip_name')" prop="username">
        <el-input v-model.trim="ruleForm.username" class="widthinp"></el-input>
      </el-form-item>
      <el-form-item :label="$t('reception.phone2')" prop="phone">
        <el-input class="widthinp" v-model.trim="ruleForm.phone"></el-input>
      </el-form-item>
     
      <el-form-item :label="$t('public.gender')" prop="gender">
        <el-radio-group v-model="ruleForm.gender" @change="changeGender">
          <el-radio class="radio" label="1">{{$t('public.man')}}</el-radio>
          <el-radio class="radio" label="2">{{$t('public.woman')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('reception.balance')" prop="money">
        <el-input class="widthinp" :disabled="true" v-model.trim="ruleForm.balance"></el-input>
      </el-form-item>
      <el-form-item :label="$t('backstage.birthday')"  prop="birthday">
        <!-- <el-input class="widthinp" v-model.trim="ruleForm.birthday"></el-input> -->
        <el-date-picker
          @change="timeCut"
          v-model="ruleForm.birthday"
          type="date"
          :placeholder="$t('backstage.birthday')"
        ></el-date-picker>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitAlter('ruleForm')" class="tijiao">{{$t('public.edit')}}</el-button>
      </el-form-item>
    </el-form>
    <!-- 补卡挂失弹出框 -->
    <el-dialog :title="$t('reception.gua_shi_card')" :visible.sync="dialogRepair" width="40%">
      <el-form
        :model="repairData"
        :rules="repairRules"
        ref="repairData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="$t('reception.fang_shi')" prop="type">
          <el-radio-group v-model="repairData.type" @change="radioRepair">
            <el-radio class="radio" label="0">{{$t('reception.change_card')}}</el-radio>
            <el-radio class="radio" label="1">{{$t('reception.gua_shi_card')}}</el-radio>
            <el-radio class="radio" label="2">{{$t('reception.gua_shi')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('reception.new_card')" prop="member_card" v-if="cardShow">
          <el-input v-model.trim="repairData.member_card"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.old_card')" prop="old_card">
          <el-input  :disabled="true" v-model.trim="repairData.old_card" ></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.fei_yong')" prop="price">
          <el-input v-model.trim="repairData.price "></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.payf')" prop="pay_type">
          <el-radio-group v-model="repairData.pay_type">
            <el-radio class="radio" label="1">{{$t('reception.cash3')}}</el-radio>
            <el-radio class="radio" label="2">{{$t('reception.use_a_card')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('reception.remark')" prop="remark" v-if="remarkShow">
          <el-input v-model.trim="repairData.remark" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRepair">{{$t('public.cancel')}}</el-button>
        <el-button type="primary" @click="alterRepair('repairData')">{{$t('public.ok')}}</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码的弹出框 -->
    <el-dialog :title="$t('reception.password')" :visible.sync="dialogPassword" width="30%">
      <el-form
        :model="passAlter"
        :rules="passRules"
        ref="passAlter"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="$t('reception.reason')" prop="status">
          <el-radio-group v-model="passAlter.status" @change="radioStatus">
            <el-radio class="radio" label="1">{{$t('reception.common_alter')}}</el-radio>
            <el-radio class="radio" label="0">{{$t('reception.forget_pass')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('reception.new_password')" prop="newPsd">
          <el-input v-model.number="passAlter.newPsd" show-password></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.old_password')" prop="oldPsd" v-show="passRadio">
          <el-input v-model.number="passAlter.oldPsd" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSubmit">{{$t('public.cancel')}}</el-button>
        <el-button type="primary" @click="alterPass('passAlter')">{{$t('public.ok')}}</el-button>
      </div>
    </el-dialog>
    <!-- 充值的弹窗 -->
    <el-dialog :title="$t('reception.charge')" :visible.sync="dialogFormVisible" width="30%">
      <el-form
        :model="rechargeRuleform"
        :rules="rechargeRules"
        ref="rechargeRuleform"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item :label="$t('reception.push_money')" prop="money">
          <el-input v-model.trim="rechargeRuleform.money"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.payf')" prop="pay_status">
          <el-radio-group v-model="rechargeRuleform.pay_status">
            <el-radio class="radio" label="1">{{$t('reception.cash3')}}</el-radio>
            <el-radio class="radio" label="2">{{$t('reception.use_a_card')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('reception.card')" prop="member_card">
          <el-input :disabled="true" v-model.trim="rechargeRuleform.member_card"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary" @click="alterMoney('rechargeRuleform')">{{$t('public.ok')}}</el-button>
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
      // rules: {
       
      // },
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
      remarkShow:false,
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
      // repairRules: {
       
      // },
      // passRules: {
      //   //修改密码的验证
        
      // },
      // rechargeRules: {
       
      // }
    };
  },
  computed:{
    titles(){
      return {title:this.$t('left.members'),
        title_show:true
      }
    },
    rules(){
      const rules={
        username: [
          { required: true, message: this.$t('Validation.member_alter.username'), trigger: "blur" }
        ],
        phone: [
          { required: true, message: this.$t('Validation.member_alter.phone'), trigger: "blur" },
          { validator: yz.validateMobilePhoneNo, trigger: "blur" }
        ],
        gender: [{ required: true, message: this.$t('Validation.member_alter.gender'), trigger: "blur" }],
        birthday: [{ required: true, message: this.$t('Validation.member_alter.birthday'), trigger: "blur" }]
      }
      return rules
    },
    repairRules(){
      const repairRules={
      type: [
          { required: true, message: this.$t('Validation.member_alter.type'), trigger: "blur" }
        ],
        member_card: [
          { required: true, message: this.$t('Validation.member_alter.member_card'), trigger: "blur" }, 
        ],
        old_card: [
          { required: true, message: this.$t('Validation.member_alter.old_card'), trigger: "blur" },
        ],
        price: [{ required: true, message: this.$t('Validation.member_alter.money'), trigger: "blur" }],
        pay_type: [{ required: true, message:this.$t('Validation.member_alter.price'), trigger: "blur" }],
        remark: [{ required: true, message: this.$t('Validation.member_alter.remark'), trigger: "blur" }]
      }
      return repairRules
    },
    passRules(){
      const passRules={
       status: [
          { required: true, message: this.$t('Validation.member_alter.status'), trigger: "blur" }
        ],
        newPsd: [
          { required: true, message: this.$t('Validation.member_alter.new_pass'), trigger: "blur" },
          // { type: "number", message: "密码必须为数字值" }
           { validator: yz.validatePass, trigger: "blur" }
        ],
        oldPsd: [
          { required: true, message: this.$t('Validation.member_alter.old_pass'), trigger: "blur" },
          { validator: yz.validatePass, trigger: "blur" }
        ]
      }
      return passRules
    },
    rechargeRules(){
      const rechargeRules={
       //充值验证
        money: [{ required: true, message: this.$t('Validation.member_alter.money'), trigger: "blur" }],
        pay_status: [
          { required: true, message:this.$t('Validation.member_alter.pay_status'), trigger: "blur" }
        ],
        member_card: [
          { required: true, message: this.$t('Validation.member_alter.member_card'), trigger: "blur" }
        ]
      }
      return rechargeRules
    }
    

  },
  methods: {
    // 获取会员类型
    memberType() {
      this.$axios.post(this.$baseUrl + `/memberLevel/list`).then(res => {
        this.options = res.data.pojo;
      });
    },


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
        // this.passwordData = this.ruleForm.password;
        this.ruleForm.gender = JSON.stringify(this.ruleForm.gender);
        if (this.ruleForm.status == 1) {
          this.ruleForm.status = this.$t('Validation.member_alter.card_com');
        } else {
          this.ruleForm.status = this.$t('Validation.member_alter.card_log');
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
       this.repairData.old_card=this.ruleForm.member_card
      this.dialogRepair = true;
    },
    // 取消补卡
    cancelRepair() {
      this.dialogRepair = false;
      this.repairEmpty();
    },
    // 挂失补卡接口
    repairPort() {
      // this.repairData.old_card = JSON.stringify(this.repairData.old_card);
      // this.repairData.member_card = JSON.stringify(this.repairData.member_card);
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
      if(this.bukaId == 0){
        this.remarkShow=true;
      }
      else{
        this.remarkShow=false;
      }
    },

    // 补卡清空
    repairEmpty(val) {
      this.repairData.member_card = "";
      this.repairData.type = val;
      //this.repairData.old_card = "";
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
      this.rechargeRuleform.member_card=this.ruleForm.member_card
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
    this.memberType();
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