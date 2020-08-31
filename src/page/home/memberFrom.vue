<template>
  <div class="member-box">
    <Title :title="titles"></Title>
    <el-form 
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="120px"
      class="demo-ruleForm boxTop"
    >
      <el-form-item :label="$t('reception.vip_type')" prop="level">
        <el-select
          :disabled="detailsShow"
          v-model="ruleForm.level"
          :placeholder="$t('reception.vip_type')"
          @change="memberChange"
          style="width: 300px"
        >
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('reception.vip_card')" prop="member_card">
        <el-input :disabled="detailsShow" v-model.number="ruleForm.member_card" class="widthinp" type="number"></el-input>
      </el-form-item>
      <el-form-item :label="$t('reception.idType')" prop="idType">
        <el-select
          :disabled="detailsShow"
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
        <el-input :disabled="detailsShow" v-model.trim="ruleForm.idcard" class="widthinp"></el-input>
      </el-form-item>
      <div>
        <el-form-item :label="$t('reception.phone2')" prop="phone">
          <el-input :disabled="detailsShow" class="widthinp" v-model.trim="ruleForm.phone"></el-input>
        </el-form-item>
      </div>
      <el-form-item :label="$t('reception.vip_name')" prop="username">
        <el-input
          :disabled="detailsShow"
          auto-complete="new-password"
          v-model.trim="ruleForm.username"
          class="widthinp"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('reception.memberpass')" prop="passwordData" v-show="aloneShow">
        <el-input
          type="password"
          class="widthinp"
          show-password
          v-model.number="ruleForm.passwordData"
          auto-complete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('reception.re_pass')" prop="password" v-show="aloneShow">
        <el-input
          type="password"
          class="widthinp"
          v-model.number="ruleForm.password"
          show-password
          auto-complete="new-password"
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('public.gender')" prop="gender">
        <el-radio-group :disabled="detailsShow" v-model="ruleForm.gender" @change="changeGender">
          <el-radio class="radio" label="1">{{$t('public.man')}}</el-radio>
          <el-radio class="radio" label="2">{{$t('public.woman')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('reception.push_money')" prop="money" v-show="aloneShow">
        <el-input class="widthinp" v-model.trim="ruleForm.money"></el-input>
      </el-form-item>
      <el-form-item :label="$t('backstage.birthday')" prop="birthday">
        <el-date-picker
          :disabled="detailsShow"
          @change="timeCut"
          v-model="ruleForm.birthday"
          type="date"
          :placeholder="$t('backstage.birthday')"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('reception.pay_type')" v-show="aloneShow" prop="pay_status">
        <el-radio-group v-model="ruleForm.pay_status" @change="changeHandler">
          <el-radio class="radio" label="1">{{$t('reception.payf_0')}}</el-radio>
          <el-radio class="radio" label="2">{{$t('reception.use_a_card')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 以下出是详情新增的input -->
      <el-form-item :label="$t('reception.card_status')" v-show="detailsShow">
        <el-input :disabled="detailsShow" class="widthinp" v-model.trim="ruleForm.status"></el-input>
      </el-form-item>
      <el-form-item :label="$t('reception.ji_fen')" prop="score" v-show="detailsShow">
        <el-input :disabled="detailsShow" class="widthinp" v-model.trim="ruleForm.score"></el-input>
      </el-form-item>
      <el-form-item :label="$t('reception.balance')" v-show="detailsShow">
        <el-input :disabled="detailsShow" class="widthinp" v-model.trim="ruleForm.balance"></el-input>
      </el-form-item>
      <el-form-item :label="$t('reception.amount')" v-show="detailsShow">
        <el-input :disabled="detailsShow" class="widthinp" v-model.trim="ruleForm.amount"></el-input>
      </el-form-item>
      <el-form-item :label="$t('reception.amount_num')" v-show="detailsShow">
        <el-input :disabled="detailsShow" class="widthinp" v-model.trim="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item :label="$t('reception.staff_name')" v-show="detailsShow">
        <el-input :disabled="detailsShow" class="widthinp" v-model.trim="ruleForm.staff"></el-input>
      </el-form-item>
      <el-form-item :label="$t('public.email')" v-show="detailsShow">
        <el-input :disabled="detailsShow" class="widthinp" v-model.trim="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item :label="$t('reception.add_time')" v-show="detailsShow">
        <el-input :disabled="detailsShow" class="widthinp" v-model.trim="ruleForm.addtime"></el-input>
      </el-form-item>
      <el-form-item v-show="detailsShow == true ? false : true">
        <el-button type="primary" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.add')}}</el-button>
      </el-form-item>
    </el-form>
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
    var validatePass = (rule, value, callback) => {
     if (value !== this.ruleForm.passwordData) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // title: {
      //   title: "会员信息",
      //   title_show: true
      // },
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
        passwordData: "",
        password: ""
      },
      //第一次输入密码
      passwordWaring: true,
      // 添加按钮的控制
      // showButton: true,
      detailsShow: false,
      aloneShow: true,
      detailsId: "",
      rules: {
        level: [{ required: true, message: "请选择卡号类型", trigger: "blur" }],
        member_card: [
          { required: true, message: "请输入卡号", trigger: "blur" },
          { type: "number", message: "卡号必须为数字" }
        ],
        idType: [
          { required: true, message: "请选择证件类型", trigger: "blur" }
        ],
        idcard: [
          { required: true, message: "请输入证件号", trigger: "blur" },
          { validator: yz.validateCardIdNo, trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入会员名", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: yz.validateMobilePhoneNo, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          // { validator: yz.validatePass, trigger: "blur" }
          { validator: validatePass, trigger: "blur" }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
        money: [
          { required: true, message: "请输入充值金额", trigger: "blur" },
          { validator: yz.validateMoney, trigger: "blur" }
        ],
        birthday: [{ required: true, message: "请选择生日", trigger: "blur" }],
        pay_status: [
          { required: true, message: "请选择支付方式", trigger: "blur" }
        ],
        passwordData: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      },
      options: [],
      optionsPapers: []
    };
  },
  computed:{
    titles(){
      return {title:this.$t('left.members'),
       title_show:true
      }
    }
  },
  methods: {
    // 截取时间
    timeCut(val) {
      var d = new Date(val);
      var datetime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      this.ruleForm.birthday = datetime;
    },
    // 清空数据
    dataEmpty() {
      this.ruleForm.level = "";
      this.ruleForm.member_card = "";
      this.ruleForm.idcard = "";
      this.ruleForm.idType = "";
      this.ruleForm.username = "";
      this.ruleForm.phone = "";
      this.ruleForm.pay_status = "";
      this.ruleForm.gender = "";
      this.ruleForm.money = "";
      this.ruleForm.birthday = "";
      this.ruleForm.passwordData = "";
      this.ruleForm.password = "";
    },
    // 添加接口
    addData() {
      this.ruleForm.password = JSON.stringify(this.ruleForm.password);
      this.ruleForm.member_card = JSON.stringify(this.ruleForm.member_card);
      delete this.ruleForm.passwordData;
      this.$axios
        .post(this.$baseUrl + "/member/set", this.ruleForm)
        .then(res => {
          if (res.data.result == true) {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.dataEmpty();
          } else {
            this.$message({
              type: "warning",
              message: "添加失败"
            });
          }
        });
    },
    changeHandler() {
      console.log(typeof this.ruleForm.pay_status, 7777);
    },
    changeGender() {
      console.log(this.ruleForm.gender, 2233);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (this.passwordWaring == true) {
          if (valid) {
            this.addData();
          } else {
            console.log("error submit!!");
            return false;
          }
        } else {
        }
      });
    },
    submitAlter(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.alterData();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取会员类型
    memberType() {
      this.$axios.post(this.$baseUrl + `/memberLevel/list`).then(res => {
        this.options = res.data.pojo;
      });
    },
    // 获取选中的会员类型
    memberChange(val) {
      this.defaultMoney(val);
    },
    // 获取证件类型
    papersData() {
      this.$axios.post(this.$baseUrl + `/idType/list`).then(res => {
        this.optionsPapers = res.data.pojo;
      });
    },
    // 充值默认选中金额接口
    defaultMoney(val) {
      let formData = new FormData();
      formData.append("level_id", val);
      this.$axios
        .post(this.$baseUrl + `/memberLevel/need`, formData)
        .then(res => {
          this.ruleForm.money = res.data.pojo;
        });
    },
    // 详情接口
    detailsData() {
      if (this.detailsShow) {
        let formData = new FormData();
        formData.append("id", this.detailsId);
        this.$axios.post(this.$baseUrl + "/member/get", formData).then(res => {
          this.ruleForm = res.data.pojo;
          // this.alterRuleform = res.data.pojo; //修改拿到详情的数据
          this.ruleForm.gender = JSON.stringify(this.ruleForm.gender);
          this.ruleForm.member_card = parseInt(this.ruleForm.member_card);
          if (this.ruleForm.status == 1) {
            this.ruleForm.status = "正常";
          } else {
            this.ruleForm.status = "注销";
          }
        });
      }
    },
    // 路由跳转后的接收数据
    skipData() {
      this.detailsShow = this.$route.query.details; //详情
      this.detailsId = this.$route.query.id; //详情id
      if (this.detailsShow) {
        this.aloneShow = false;
        this.detailsShow = true;
      }
    }
  },
  created() {
    this.skipData();
    this.memberType();
    this.papersData();
    this.detailsData();
  },
  mounted() {}
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
  .boxTop{
    margin-top: 20px;
  }
}
</style>