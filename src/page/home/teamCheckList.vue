<template>
  <div>
    <div class="lists">
      <el-input v-model.trim="ruleForm.teamname" class="time-left" :placeholder="$t('reception.team_name')" clearable></el-input>
       <el-select v-model.trim="ruleForm.status" :placeholder="$t('reception.status2')" clearable>
            <el-option
              :label="$t('reception.no_leave')"
              value="0"
            ></el-option>
                 <el-option
               :label="$t('reception.leave_in')"
              value="1"
            ></el-option>
                 <el-option
              :label="$t('reception.leave_out')"
              value="2"
            ></el-option>
          </el-select>
      <el-button
        type="primary tijiao"
        @click="submitForm('ruleForm')"
        class="tijiao"
      >{{$t('public.inquire')}}</el-button>
    </div>

    <el-table :data="teamCheckInfo" stripe style="width: 100%" header-align="center"  type="flex" :max-height="getTableHeight">
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column
        prop="teamname"
        :label="$t('reception.team_name')"
        width="auto"
        show-overflow-tooltip
        align="center"
      ></el-table-column>
      <el-table-column
        prop="live_time"
       :label="$t('reception.check_time')"
        width="auto"
        align="center"
        :formatter="dateFormat"
      ></el-table-column>
      <el-table-column
        prop="leave_time"
        :label="$t('reception.leave_time')"
        width="auto"
        align="center"
        :formatter="dateFormat"
      ></el-table-column>

      <el-table-column prop="day_num" :label="$t('reception.days')" width="auto" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="type"  :label="$t('reception.source_type')" width="auto" align="center">
        <template slot-scope="scope">
           <el-tag v-if="scope.row.type==1">{{$t('reception.common_pel')}}</el-tag>
          <el-tag v-if="scope.row.type==2" type="danger">{{$t('reception.vip')}}</el-tag>
          <el-tag v-if="scope.row.type==3">{{$t('reception.team_pel')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" :label="$t('reception.status2')" width="auto" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==1" type="danger">{{$t('reception.is_in_hotel')}}</el-tag>
          <el-tag v-if="scope.row.status==2">{{$t('reception.no_in_hotel')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('public.operate')"
        align="center"
        fixed="right"
        width="300px"
        prop="id"
      >
        <template slot-scope="scope">
          <el-button size="mini" @click="handleorder(scope.row)">
            {{$t('reception.order')}}
          </el-button>

          <el-button type="primary" size="mini" @click="withdrawal(scope.$index, scope.row)">
              {{$t('reception.exit_team')}}

          </el-button>

          <!-- <el-button size="mini" @click="handleEdit3(scope.$index, scope.row)">入账</el-button> -->
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
      v-if="mytotal!=0"
    ></el-pagination>

    <!-- 弹出该团队入住人的信息订单 -->

    <el-dialog title="团队入住订单" :visible.sync="dialogTableVisible" append-to-body class="dia">
      <!-- 点击挂账要显示的dialog -->
      <el-dialog
        title="挂账操作"
        :visible.sync="dialogFormVisibleCompany"
        class="dia"
        width="30%"
        append-to-body
      >
        <el-form
          :model="formCompany"
          status-icon
          :rules="rule6"
          ref="formCompany"
          label-width="80px"
          class="demo-ruleForm mars"
        >
          <el-form-item :label="$t('reception.united')" class="floatleft" prop="coo_id">
            <el-select v-model.trim="formCompany.coo_id" placeholder="请选择协议单位" clearable>
              <el-option
                v-for="item in companys"
                :key="item.id"
                :label="item.company_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('reception.on_account_money')" class="floatleft" prop="use_money">
            <el-input v-model="formCompany.use_money"></el-input>
          </el-form-item>

          <el-form-item :label="$t('reception.remark')" prop="remark">
            <el-input type="textarea" :rows="5" v-model.trim="formCompany.remark" height="100px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleCompany = false">{{$t('public.cancel')}}</el-button>
          <el-button
            type="primary"
            @click="onAccount('formCompany')"
            v-show="show"
          >{{$t('public.ok')}}</el-button>
          <el-button
            type="primary"
            @click="modifyEvent('formCompany')"
            v-show="!show"
          >{{$t('public.edit')}}</el-button>
        </div>
      </el-dialog>

      <!-- ---------------- -->

      <el-table :data="teamOrderInfo" stripe :summary-method="getSummaries" show-summary>
        <el-table-column type="expand" class="detailsInfo">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item :label="$t('reception.room_number')+':'">
                <span>{{ props.row.room_number }}</span>
              </el-form-item>
              <el-form-item :label="$t('reception.house_type')+':'">
                <span>{{ props.row.house_type }}</span>
              </el-form-item>
              <el-form-item :label="$t('reception.username2')+':'">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item :label="$t('public.gender')+':'">
                <span v-if="props.row.gender==1">男</span>
                <span v-if="props.row.gender==2">女</span>
              </el-form-item>
              <el-form-item :label="$t('reception.phone2')+':'">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item :label="$t('reception.card_type')+':'">
                <span>{{ props.row.certificate_type }}</span>
              </el-form-item>
              <el-form-item :label="$t('reception.id')+':'">
                <span>{{ props.row.id_number }}</span>
              </el-form-item>
              <el-form-item :label="$t('reception.days')+':'">
                <span>{{ props.row.day }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column :label="$t('reception.room_number')" prop="room_number"></el-table-column>
        <el-table-column :label="$t('reception.house_type')" prop="house_type"></el-table-column>
        <el-table-column :label="$t('reception.username2')" prop="username"></el-table-column>
        <el-table-column :label="$t('reception.use_money')" prop="total_price"></el-table-column>

        <el-table-column prop="pay_status" :label="$t('reception.pay_status')" width="auto" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pay_status==0" type="danger">{{$t('reception.no_pay')}}</el-tag>
            <el-tag v-if="scope.row.pay_status==1">{{$t('reception.is_pay')}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('public.operate')" width="150px" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="primary"
              plain
              size="mini"
              v-if="!scope.row.pay_status"
            >{{$t('reception.on_account')}}</el-button>
            <el-button
              size="mini"
              @click="payBill(scope.$index, scope.row)"
              v-if="!scope.row.pay_status"
            >{{$t('reception.settle_accounts')}}</el-button>

           //需要显示的账单
             <!-- <el-button
              size="mini"
              @click="payBill(scope.$index, scope.row)"
              v-if="!scope.row.pay_status"
            >{{$t('reception.settle_accounts')}}</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- ------------------------- -->

    <!-- 结账 -->

    <el-dialog :title="$t('reception.pay')" :visible.sync="dialogBill" class="dia" width="30%">
      <el-form
        :model="teambillData"
        status-icon
        :rules="rule5"
        ref="teambillData"
        label-width="110px"
        class="demo-ruleForm mars"
      >
        <el-form-item :label="$t('reception.payf')" prop="pay_type">
          <el-radio v-model="teambillData.pay_type" label="0">{{$t('reception.payf_0')}}</el-radio>
          <el-radio v-model="teambillData.pay_type" label="1">{{$t('reception.payf_1')}}</el-radio>
          <el-radio v-model="teambillData.pay_type" label="2">{{$t('reception.payf_2')}}</el-radio>
          <el-radio v-model="teambillData.pay_type" label="3">{{$t('reception.payf_3')}}</el-radio>
        </el-form-item>

        <el-form-item :label="$t('reception.bank_name')" prop="bank_name" v-if="teambillData.pay_type==1">
          <el-input v-model.trim="teambillData.bank_name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.bank_card')" prop="card_num" v-if="teambillData.pay_type==1">
          <el-input v-model.trim="teambillData.card_num"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('reception.card')"
          prop="member_id"
          v-if="teambillData.pay_type==2"
        >
          <el-input v-model.trim="teambillData.member_id"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('reception.memberpass')"
          prop="password"
          v-if="teambillData.pay_type==2"
        >
          <el-input v-model.trim="teambillData.password"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('reception.membersort')"
          prop="integral"
          v-if="teambillData.pay_type==2"
        >
          <el-input v-model.trim="teambillData.integral"></el-input>
        </el-form-item>

        <el-form-item :label="$t('reception.united')" prop="cooperator_id " v-if="teambillData.pay_type==3">
          <!-- <el-input v-model.trim="teambillData.cooperator_id" ></el-input> -->
          <el-select v-model.trim="teambillData.cooperator_id" :placeholder="$t('reception.united')" clearable>
            <el-option
              v-for="item in companys"
              :key="item.id"
              :label="item.company_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('reception.remark')" prop="remark">
          <el-input type="textarea" :rows="5" v-model.trim="teambillData.remark" height="100px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogBill = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary" @click="billCommit('teambillData')">{{$t('public.ok')}}</el-button>
      </div>
    </el-dialog>

    <!-- -------------- -->
  </div>
</template>
<script>
import qs from "qs";
import Title from "../../components/cont_title.vue";
import yz from "../../config/validation.js";
export default {
  components: { Title },
  data() {
    return {
       // 初始化时获取当前打开页面的高度
      screenHeight: document.body.clientHeight,
      
      title: {
        // title:'入住列表',
        title_show: false,
      },
      teamCheckInfo: [],
      tableData: [],
      tableData1: [],

      //团队订单信息字段
      teamOrderInfo: [],
      show: true,
      dialogFormVisible: false,
      dialogTableVisible: false,

      //挂账对话框显示字段
      dialogFormVisibleCompany: false,
      formCompany: {
        bill_id: "",
        remark: "",
        use_money: "",
      },
      forms: {
        //团队的信息和入住时间
        teamname: "",
        leave_time: "",
        day_num: "",
        type: null,
        public_pays: "0",
        remark: "",
        // 团队人员的具体入住房间信息
      },
      istogetherOptions: [
        {
          value: true,
          label: "是",
        },
        {
          value: false,
          label: "否",
        },
      ],
      //是否有同来宾客
      flag: null,

      //挂账的协议单位
      companys: [],
      // rule: {
        
      // },
      dialogFormVisible1: false,
      forms1: {
        status: "",
        teamname: "",
        leave_time: "",
        day: "",
        total_price: "",
      },
      // rule1: {
        
      // },
      dialogFormVisible2: false,
      forms2: {
        bill_id: "",
        cash_pledge: "",
        member_card: "",
        password: "",
        project_type: "",
      },
      // rule2: {
       
      // },
      dialogFormVisible3: false,
      forms3: {
        id: "",
        status: "0",
      },
  //  rule3: {
          
  //     },
      //   rule5:{   
      // },
      // rule6:{
      //     coo_id:[ {required: true, message: this.$t('Validation.check_in.cooperator_id'),  trigger:["blur",'change'] }],
      //     use_money:[{required: true, message: this.$t('Validation.check_in.use_money'), trigger: 'blur'}],
      // },
      // dialogFormVisible5:
      mytotal: 0,
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      pages: 0,
      pageNums: 0,
      ruleForm: {
        teamname: "",
        status:'',
      },
      housetype: [],
      idtype: [],
      memberType: [
        {
          value: "1",
          label: this.$t('Validation.check_in.memberType.item_1'),
        },
        {
          value: "2",
          label: this.$t('Validation.check_in.memberType.item_2'),
        },
        {
          value: "3",
          label: this.$t('Validation.check_in.memberType.item_3'),
        },
      ],
      registerinfos: [],
      customers: [],
      show1: 1,
      projecttype: [
         {
          value: "1",
          label: this.$t('Validation.check_in.project_type.item_1'),
        },
        {
          value: "2",
          label: this.$t('Validation.check_in.project_type.item_2'),
        },
        {
          value: "3",
          label: this.$t('Validation.check_in.project_type.item_3'),
        },
        {
          value: "4",
          label: this.$t('Validation.check_in.project_type.item_4'),
        },
        {
          value: "5",
          label: this.$t('Validation.check_in.project_type.item_5'),
        },
        {
          value: "6",
          label: this.$t('Validation.check_in.project_type.item_6'),
        },
        {
          value: "7",
          label: this.$t('Validation.check_in.project_type.item_7'),
        },
        {
          value: "8",
          label: this.$t('Validation.check_in.project_type.item_8'),
        },
        {
          value: "9",
          label: this.$t('Validation.check_in.project_type.item_9'),
        },
        {
          value: "10",
          label: this.$t('Validation.check_in.project_type.item_10'),
        },
        {
          value: "11",
          label: this.$t('Validation.check_in.project_type.item_11'),
        },
        {
          value: "12",
          label: this.$t('Validation.check_in.project_type.item_12'),
        },
        {
          value: "13",
          label: this.$t('Validation.check_in.project_type.item_13'),
        },
        {
          value: "14",
          label: this.$t('Validation.check_in.project_type.item_14'),
        },
        {
          value: "15",
          label: this.$t('Validation.check_in.project_type.item_15'),
        },
        {
          value: "16",
          label: this.$t('Validation.check_in.project_type.item_16'),
        },
        {
          value: "17",
          label: this.$t('Validation.check_in.project_type.item_17'),
        },
        {
          value: "18",
          label: this.$t('Validation.check_in.project_type.item_18'),
        },
        {
          value: "19",
          label: this.$t('Validation.check_in.project_type.item_19'),
        },
      ],
      order: "",
      //挂账的协议单位数据
      companys: [],

      //结账的弹窗
      dialogBill: false,

      //要付账的参数
      teambillData: {
        bill_id: "",
        cooperator_id: "",
        integral: "",
        member_id: "",
        password: "",
        bank_name: "",
        card_num: "",
        remark: "",
        pay_sn: "",
        bank_sn: "",
      },
    };
  },
  created() {
    this.submitForm();
    this.houseEvent();
    this.idTypeEvent();
    this.getList();
  },
  mounted(){
  // 窗口或页面被调整大小时触发事件
  window.onresize = () => {
    // 获取body的高度
    this.screenHeight = document.body.clientHeight
  }
},
  computed: {
    titles() {
      return { title: "入住列表" };
    },
    getTableHeight() {
    return this.screenHeight-390 
  },
  rule(){
    const rule={
     teamname: [
         { required: true, message: this.$t('Validation.check_in.team_name'), trigger: "blur" },
        ],
        leave_time: [
          { required: true, message: this.$t('Validation.check_in.out_time'), trigger: "blur" },
        ],

        day_num: [{ required: true, message: this.$t('Validation.check_in.days'), trigger: "blur" }],
        team_house_type: [
         { required: true, message: this.$t('Validation.check_in.house_type'), trigger: "blur" },
        ],
        house_type: [
         { required: true, message: this.$t('Validation.check_in.house_type'), trigger: "blur" },
        ],
        type: { required: true, message: this.$t('Validation.check_in.source_type'), trigger: "blur" },
        team_username: [
         [{ required: true, message: this.$t('Validation.check_in.username'), trigger: "blur" }],
        ],
        username: [
          { required: true, message: this.$t('Validation.team_check_list.together_name'), trigger: "blur" },
        ],
        team_phone: [
          { required: true, message: this.$t('Validation.team_check_list.phone'), trigger: "blur" },
        ],
        phone: [
          { required: true, message: this.$t('Validation.team_check_list.together_phone'), trigger: "blur" },
        ],
        team_card_type: [
          { required: true, message: this.$t('Validation.team_check_list.card_type'), trigger: "blur" },
        ],
        card_type: [
          {
            required: true,
            message: this.$t('Validation.team_check_list.together_card'),
            trigger: "blur",
          },
        ],
        team_gender: [
          { required: true, message: this.$t('Validation.team_check_list.gender'), trigger: "blur" },
        ],
        gender: [
          { required: true, message: this.$t('Validation.team_check_list.together_gender'), trigger: "blur" },
        ],
        team_card_num: [
          { required: true, message: this.$t('Validation.team_check_list.id'), trigger: "blur" },
        ],
        card_num: [
          { required: true, message: this.$t('Validation.team_check_list.together_id'), trigger: "blur" },
        ],
        is_together: [
          { required: true, message: this.$t('Validation.team_check_list.is_together'), trigger: "blur" },
        ], 
    }
    return rule
  },
  rule1(){
    const rule1={
    teamname: [
          { required: true, message: this.$t('Validation.check_in.room_num'), trigger: "blur" },
        ],
       status: [
          { required: true, message: this.$t('Validation.check_in.live_status'), trigger: "blur" },
        ],
        leave_time: [
          { required: true, message: this.$t('Validation.check_in.out_time'), trigger: "blur" },
        ],
       day: [{ required: true, message: this.$t('Validation.check_in.days'), trigger: "blur" }],
        total_price: [
          { required: true, message: this.$t('Validation.check_in.total_price'), trigger: "blur" },
        ],
    }
    return rule1
  },
  rule2(){
    const rule2={
     bill_id: [{ required: true, message: this.$t('Validation.check_in.bill_id'), trigger: "blur" }],
        cash_pledge: [
          { required: true, message: this.$t('Validation.check_in.cash_pledge'), trigger: "blur" },
        ],
        member_card: [
          // {required: true, message: '请输入会员卡号', trigger: 'blur'}
        ],
        password: [
          // {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        project_type: [
          { required: true, message: this.$t('Validation.check_in.project_type'), trigger: "blur" },
        ],
    }
    return rule2
  },
    rule3(){
    const rule3={
      status: [{ required: true, message: this.$t('Validation.check_in.pay_status'), trigger: "blur" }],
    }
    return rule3
  },
   rule5(){
    const rule5={
      pay_type: [
          { required: true, message: this.$t('Validation.check_in.pay_type'), trigger: "blur" },
        ],
         bank_name:[{
          required: true, message: this.$t('Validation.check_in.bank_name'), trigger: "blur" 
        }],
        card_num:[{
          required: true, message: this.$t('Validation.check_in.card_num'), trigger: "blur" 
        }],
        member_id: [
          { required: true, message: this.$t('Validation.check_in.method_card'), trigger: "blur" },
        ],
          password: [
          { required: true, message: this.$t('Validation.check_in.password'), trigger: "blur" },
        ],
         integral: [
          {required: true, message: this.$t('Validation.check_in.integral'), trigger: 'blur'}
        ],
    }
    return rule5
  },
     rule6(){
    const rule6={
        coo_id:[ {required: true, message: this.$t('Validation.check_in.cooperator_id'),  trigger:["blur",'change'] }],
          use_money:[{required: true, message: this.$t('Validation.check_in.use_money'), trigger: 'blur'}],
    }
    return rule6
  },

  },
  methods: {
  
    dateFormat(row, column) {
      var moment = require("moment");
      var date = row[column.property] * 1000;
      return moment(date).format("YYYY-MM-DD hh:mm:ss");
    },

    //获取团队列表list
    getList() {
      var arr = [];
      this.$axios
        .post(this.$baseUrl + "/team/getList")
        .then((res) => {
          arr = res.data.pojo;
          this.mytotal = arr.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
   
    //点击挂账，弹出对话框，获取到协议单位的数据
    async handleClick(row) {
      await this.$axios
        .post(
          this.$baseUrl + `/registerinfo/info`,
          qs.stringify({
            id: row.id,
            status: 0,
          })
        )
        .then((res) => {
          this.formCompany.bill_id = res.data.pojo[0].bill_id;
        })
        .catch((err) => {
          console.log(err);
        });
      // this.queryBill_id(row.id)
      //  this.formCompany.bill_id=this.queryBill_id(row.id);
      console.log(this.formCompany.bill_id);
      this.formCompany.use_money = row.use_money;
      this.formCompany.guest_name = row.username;
      this.formCompany.house_num = row.room_number;
      // this.formCompany.bill_id=row.id;
      await this.$axios
        .post(this.$baseUrl + `/cooperator/getlist`)
        .then((res) => {
          console.log(res);
          this.companys = res.data.pojo;
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialogFormVisibleCompany = true;
    },

    //点击弹出的挂账对话框确定按钮，进行挂账操作
    onAccount(accountInfo) {
       this.$refs[accountInfo].validate((valid) => {
        if (valid) {
         console.log(accountInfo);
         var that = this;
        this.$axios
        .post(this.$baseUrl + `/roomact/onAccount`, this.formCompany)
        .then((res) => {
          this.$message.success(that.$t("common." + res.data.msg));
          this.dialogFormVisibleCompany = false;
        })
        .catch((err) => {
          console.log(err);
          console.log("逻辑错误");
        });
        }})
      
    },

    //   //显示团队订单总价

    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        //对显示总价的数据进行汇总
        if (column.property == "total_price") {
          const values = data.map((item) => Number(item[column.property]));
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += "元";
        } else {
          sums[index] = "";
        }
      });
      return sums;
    },

    

    handleorder(row) {
     this.$router.push({
       name:"teamOrder",
       params:{
         teamId:row.id,
         teamName:row.teamname,
       }
     } );
    },
    idTypeEvent() {
      this.$axios
        .post(this.$baseUrl + "/idType/list")
        .then((res) => {
          this.idtype = res.data.pojo;
        })
        .catch((res) => {
        });
    },
    // 房型查询
    houseEvent() {
      this.$axios
        .post(this.$baseUrl + "/houseType/getlist")
        .then((res) => {
          this.housetype = res.data.pojo;
        })
        .catch((res) => {
        });
    },
    list(a, b) {
      var that = this;
      var para = {
        page: a,
        size: b,
        teamname: that.ruleForm.teamname,
        status:that.ruleForm.status
      };
      that.$axios
        .post(this.$baseUrl + `/team/getPage`, qs.stringify(para))
        .then(function (res) {
          if (res.data.result == true) {
            that.teamCheckInfo = res.data.pojo.list;
            that.mytotal = res.data.pojo.total;
            that.pageNums = res.data.pojo.pageNum;
            that.pages = res.data.pojo.pages;
            if (that.pageNums > that.pages && that.currentPage != 0) {
              that.currentPage = that.pages;
              that.list(that.currentPage, that.pagesize);
            }
          } else {
            that.teamCheckInfo = [];
            that.$message.error(that.$t("common." + res.data.msg));
          }
        })
        .catch(function (error) {
          console.log("逻辑错误");
        });
    },
    submitForm() {
      var that = this;
      that.list(that.currentPage, that.pagesize);
    },
    handleSizeChangeCont: function (size) {
      this.pagesize = size;
      this.list(this.currentPage, size);
    },
    handleCurrentChangeCont: function (currentPage) {
      this.currentPage = currentPage;
      this.list(currentPage, this.pagesize);
    },
    addEvent() {
      this.dialogFormVisible = true;
      this.show = true;
    },
    submitForms1(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          that.$axios
            .post(this.$baseUrl + `/registerinfo/info`, this.forms1)
            .then(function (res) {
              if (res.data.result == true) {
                that.$message.success(that.$t("common." + res.data.msg));
                that.dialogFormVisible1 = false;
                that.forms1.teamname = "";
                that.forms1.id = "";
                that.list(that.currentPage, that.pagesize);
              } else {
                that.$message.error(that.$t("common." + res.data.msg));
              }
            })
            .catch(function (error) {
              console.log("逻辑错误");
            });
        }
      });
    },
    submitForms2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          // this.forms1.leave_time = this.forms1.leave_time/1000
          that.$axios
            .post(this.$baseUrl + `/registerinfo/continueroom`, this.forms1)
            .then(function (res) {
              if (res.data.result == true) {
                that.$message.success(that.$t("common." + res.data.msg));
                that.dialogFormVisible1 = false;
                that.forms1.leave_time = "";
                that.forms1.day = "";
                that.forms1.total_price = "";
                that.list(that.currentPage, that.pagesize);
              } else {
                that.$message.error(that.$t("common." + res.data.msg));
              }
            })
            .catch(function (error) {
              console.log("逻辑错误");
            });
        }
      });
    },
    submitForms3(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          that.$axios
            .post(this.$baseUrl + `/registerinfo/cashPledge`, this.forms2)
            .then(function (res) {
              if (res.data.result == true) {
                that.$message.success(that.$t("common." + res.data.msg));
                that.dialogFormVisible2 = false;
                that.dialogFormVisible4 = false;
                that.forms2.bill_id = "";
                that.forms2.cash_pledge = "";
                that.forms2.member_card = "";
                that.forms2.password = "";
                that.forms2.project_type = "";
                that.list(that.currentPage, that.pagesize);
              } else {
                that.$message.error(that.$t("common." + res.data.msg));
              }
            })
            .catch(function (error) {
              console.log("逻辑错误");
            });
        }
      });
    },
    submitForms4(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this;
          that.$axios
            .post(this.$baseUrl + `/registerinfo/info`, this.forms3)
            .then(function (res) {
              if (res.data.result == true) {
                that.$message.success(that.$t("common." + res.data.msg));
                that.dialogFormVisible3 = false;

                that.forms3.id = "";
                that.forms3.status = "";
                that.dialogFormVisible4 = true;
                that.tableData1 = res.data.pojo;
                that.list(that.currentPage, that.pagesize);
              } else {
                that.$message.error(that.$t("common." + res.data.msg));
              }
            })
            .catch(function (error) {
              console.log("逻辑错误");
            });
        }
      });
    },
    handleEdit(index, row) {
      this.dialogFormVisible1 = true;
      this.forms1.status = String(row.live_type);
      this.forms1.id = row.id;
      this.show1 = 1;
    },
    handleEdit1(index, row) {
      this.dialogFormVisible1 = true;
      this.forms1.teamname = row.teamname;
      this.forms1.id = row.id;
      this.show1 = 2;
    },
    handleEdit2(index, row) {
      this.dialogFormVisible1 = true;
      this.forms1.id = row.id;
      this.forms1.day = row.day;
      this.forms1.total_price = row.total_price;
      this.show1 = 3;
    },
    handleEdit3(index, row) {
      this.dialogFormVisible2 = true;
      this.forms2.bill_id = row.id;
    },
    handleDelete(index, row) {
      this.$confirm(this.$t("public.info"), this.$t("public.hint"), {
        confirmButtonText: this.$t("public.ok"),
        cancelButtonText: this.$t("public.cancel"),
        type: "warning",
      })
        .then(() => {
          var fordata = new FormData();
          fordata.append("id", row.id);
          var that = this;
          this.$axios
            .post(this.$baseUrl + "/houseType/del", fordata)
            .then((res) => {
              if (res.data.result == true) {
                this.$message({
                  message: this.$t("common." + res.data.msg),
                  showClose: true,
                  type: "success",
                });
                that.list(that.currentPage, that.pagesize);
              } else {
                this.$message({
                  message: this.$t("common." + res.data.msg),
                  showClose: true,
                  type: "error",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("public.cancel"),
          });
        });
    },

    //获取协议单位数据的方法
    getCompanyData() {
      this.$axios
        .post(this.$baseUrl + `/cooperator/getlist`)
        .then((res) => {
          console.log(res);
          this.companys = res.data.pojo;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //退团的对话框显示内容
    withdrawal(index, row) {
      var that=this;
      if(row.status===2){
         that.$message.error("已经退过团,不能重复退团!");
      }
      else{
      this.teambillData = {};
      this.teambillData.bill_id = row.bill_id;
      console.log(row);
      this.getCompanyData();
      this.dialogBill = true;
      }
     
    },

    //结账退房的对话框显示内容
    payBill(index, row) {
      this.teambillData = {};
      //把这条数据的账单id 赋给要发送结账请求的数据对象中
      console.log(row);
      this.teambillData.registerinfo_id = row.id;
      this.getCompanyData();
      this.dialogBill = true;
    },
    //结账退房的具体操作
    billCommit(teambillData) {
      this.$refs[teambillData].validate((valid)=>{
       if(valid){
      var that = this;
      //判断是团队的退团，还是退房结账
      //如果bill_id存在，则认定为退团状态
      if (that.teambillData.bill_id) {
        //发送退团的post请求
        this.$axios
          .post(this.$baseUrl + `/groupact/backGroup`, that.teambillData)
          .then((res) => {
            if (res.data.result == true) {
              that.$message.success(that.$t("common." + res.data.msg));
              this.dialogBill = false;
               this.dialogTableVisible=false;
              that.list(that.currentPage, that.pagesize);
            } else {
              that.$message.error(that.$t("common." + res.data.msg));
            }

            console.log(res);
          })
          .catch((err) => {
            console.log(err);
            that.$message.error(that.$t("common." + res.data.msg));
          });
      } else {
        //如果teambillData里边bill_id不存在，则认定为结账状态
        //发送结账的post请求
        this.$axios
          .post(this.$baseUrl + `/groupact/endBillGroup`, that.teambillData)
          .then((res) => {
            console.log(res);
            that.$message.success(that.$t("common." + res.data.msg));
            this.dialogBill = false;
             this.dialogTableVisible=false;
          })
          .catch((err) => {
            console.log(err);
            that.$message.error(that.$t("common." + res.data.msg));
          });
      }
       }})
    
    },
  },
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
  width: 100%;
}
.demo-table-expand label {
  width: 90px;
  color: #e0e3e7;
}
.demo-table-expand span {
  width: 180px;
  color: rgb(49, 162, 238);
  font-family: "微软雅黑";
  font-weight: 600;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.detailsInfo {
  background-color: #e0e3e7;
}
</style>