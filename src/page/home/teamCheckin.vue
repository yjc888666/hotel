<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
     

       <el-form :model="forms" status-icon :rules="rule" ref="forms" label-width="80px" class="demo-ruleForm mars">
         <el-form-item :label="$t('reception.team_name')" prop="teamname" class="floatleft">
           <el-input v-model.trim="forms.teamname" :disabled="edit" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('reception.days')" prop="day_num"  class="floatleft">
           <el-input v-model.number="forms.day_num" :disabled="edit"></el-input>
         </el-form-item>
        

          <el-form-item :label="$t('reception.leave_time')" prop="leave_time"  class="floatleft">
             <el-date-picker   v-model="forms.leave_time" type="date" :placeholder="$t('reception.leave_time')" value-format="timestamp" :disabled="edit"></el-date-picker>
         </el-form-item>
          <el-form-item :label="$t('reception.source_type')" prop="type" class="floatleft">
            <el-select v-model.trim="forms.type" :placeholder="$t('reception.source_type')" clearable>
              <el-option v-for="item in memberType" :key="item.value" :label="item.label" :value="item.value" :disabled="edit"></el-option>
            </el-select>
          </el-form-item>
       <!-- 添加团队住户信息 -->
           <el-button type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus'  @click="addEvent('forms')">{{$t('public.addTeamPlayer')}}</el-button>
           <!-- <el-button @click="getList"> 测试list</el-button> -->
           <!-- <el-button @click="getBillId"> 测试billId</el-button> -->
 </el-form>
   </div>
           
            <keep-alive>
                <router-view :teamData='forms'>  </router-view>
            </keep-alive>
                
            
           
         
        
       
  </div>
</template>

<script>
   import qs from 'qs';
  import Title from '../../components/cont_title.vue'
  import yz from '../../config/validation.js'
  export default {
    components:{Title},
    data() {
      return {
        title:{
          // title:'入住列表',
          title_show:false
        },
        teamCheckInfo:[],
        tableData: [],
        tableData1:[],
        show:true,
        dialogFormVisible: false,
        forms: {
          //团队的信息和入住时间
          teamname:"",
          leave_time:"",
          day_num:"",
          type:null,
          public_pays:'0',
          remark:"",
        },
        

        istogetherOptions : [{
          value: true,
          label: "是"
        }, {
          value: false,
          label: '否'
        }],
        //是否有同来宾客
        flag:null,
        

        // rule: {
          
        // },
         dialogFormVisible1: false,
         forms1: {
          status:"",
          teamname:"",
           leave_time:"",
           day:"",
           total_price:"" 
        },
        // rule1: {
        //  },
       dialogFormVisible2: false,
       forms2: {
          bill_id:"",
          cash_pledge:"",
           member_card:"",
           password:"",
           project_type:"" 

        },
        // rule2: {
        //  },
           dialogFormVisible3: false,
           forms3: {
            id:"",
           status:"0",
           
        },
        // rule3: {
        //  },
        dialogFormVisible4:false,
        // dialogFormVisible5:
        mytotal:0,
        tableData:[],
        currentPage:1,
        pagesize:10,
        pages:0,
        pageNums:0,
        ruleForm: {
          phone:"",
          teamname:"",     
          id_number:"",  
          certificate_type:"",  
        },
        housetype:[],
        idtype:[],
        memberType: [{
          value: 1,
          label: this.$t('Validation.check_in.memberType.item_1')
        }, {
          value: 2,
          label: this.$t('Validation.check_in.memberType.item_2')
        }, {
          value: 3,
          label: this.$t('Validation.check_in.memberType.item_3')
        }],
        registerinfos:[],
        customers:[],
        show1:1,
        projecttype: [ {
          value: "1",
          label: this.$t('Validation.check_in.project_type2.item_1'),
        },
        {
          value: "2",
          label: this.$t('Validation.check_in.project_type2.item_2'),
        },
        {
          value: "3",
          label: this.$t('Validation.check_in.project_type2.item_3'),
        },
        {
          value: "4",
          label: this.$t('Validation.check_in.project_type2.item_4'),
        },
        {
          value: "5",
          label: this.$t('Validation.check_in.project_type2.item_5'),
        },
        {
          value: "6",
          label: this.$t('Validation.check_in.project_type2.item_6'),
        },
        {
          value: "7",
          label: this.$t('Validation.check_in.project_type2.item_7'),
        },
        {
          value: "8",
          label: this.$t('Validation.check_in.project_type2.item_8'),
        },
        {
          value: "9",
          label: this.$t('Validation.check_in.project_type2.item_9'),
        },
        {
          value: "10",
          label: this.$t('Validation.check_in.project_type2.item_10'),
        },
        {
          value: "11",
          label: this.$t('Validation.check_in.project_type2.item_11'),
        },
        {
          value: "12",
          label: this.$t('Validation.check_in.project_type2.item_12'),
        },
        {
          value: "13",
          label: this.$t('Validation.check_in.project_type2.item_13'),
        },
        {
          value: "14",
          label: this.$t('Validation.check_in.project_type2.item_14'),
        },
        {
          value: "15",
          label: this.$t('Validation.check_in.project_type2.item_15'),
        },
        {
          value: "16",
          label: this.$t('Validation.check_in.project_type2.item_16'),
        },
        {
          value: "17",
          label: this.$t('Validation.check_in.project_type2.item_17'),
        },
        {
          value: "18",
          label: this.$t('Validation.check_in.project_type2.item_18'),
        },
        {
          value: "19",
          label: this.$t('Validation.check_in.project_type2.item_19'),
        }],
        order:"",
        getuserdata:{},
        //输入框状态
        edit:false,
      }
    },
    created() {
    },
    computed:{
      titles(){
        return {title:this.$t('left.teamCheckin')}
      },
      rule(){
        const rule={
         teamname: [
            {required: true, message: this.$t('Validation.check_in.team_name'), trigger: 'blur'}
          ],
           leave_time: [
            {required: true, message: this.$t('Validation.check_in.out_time'), trigger: 'blur'},
          ],
           
            day_num: [
            {required: true, message: this.$t('Validation.check_in.days'), trigger: 'blur'},
          ],
           
             type: [
            {required: true, message: this.$t('Validation.check_in.source_type'), trigger: 'blur'},
          ],
        }
        return rule
      },
      rule1(){
        const rule1={
           teamname: [
            {required: true, message: this.$t('Validation.check_in.room_num'), trigger: 'blur'}
          ],
          status: [
            {required: true, message: this.$t('Validation.check_in.live_status'), trigger: 'blur'}
          ],
           leave_time: [
            {required: true, message: this.$t('Validation.check_in.out_time'), trigger: 'blur'}
          ],
           day: [
            {required: true, message: this.$t('Validation.check_in.days'), trigger: 'blur'}
          ],
           total_price: [
            {required: true, message: this.$t('Validation.check_in.total_price'), trigger: 'blur'}
          ]
        }
        return rule1
      },
      rule2(){
        const rule2={
          bill_id: [
            {required: true, message: this.$t('Validation.check_in.bill_id'), trigger: 'blur'}
          ],
          cash_pledge: [
            {required: true, message: this.$t('Validation.check_in.cash_pledge'), trigger: 'blur'}
          ],
           member_card : [
            // {required: true, message: '请输入会员卡号', trigger: 'blur'}
          ],
           password: [
            // {required: true, message: '请输入密码', trigger: 'blur'}
          ],
           project_type: [
            {required: true, message: this.$t('Validation.check_in.project_type'), trigger: 'blur'}
          ]
        }
        return rule2
      },
      rule3(){
        const rule3={
          status: [
            {required: true, message: this.$t('Validation.check_in.pay_status'), trigger: 'blur'}
          ]
        }
        return rule3
      }
    },
    
    //监听路由的变化，清除输入框的值
    watch:{
      //方法2
    '$route'(to, from) {
       /// 判断条件   监听路由名 监听你从什么路由跳转过来的
     if (from.path == "/teamCheckin/teamuser") { 
      this.forms.teamname=''; 
      this.forms.leave_time='';
      this.forms.day_num='';
      this.type=null;
      this.remark='';  
     }
  } ,
    'forms.leave_time'(val){
       let a= val;
      if(val!=""){  
        let nowTime=new Date();
      this.forms.day_num= Math.ceil(val/1000/3600/24)-parseInt(Date.parse(nowTime)/1000/24/3600);
      } 
    },
    'forms.day_num'(val){
       let a= val;
      if(val!=""){
        let nowTime2=new Date();
           this.forms.leave_time=a*1000*24*3600+parseInt(Date.parse(nowTime2)/1000/3600/24)*1000*3600*24
      }
      else{
       this.forms.leave_time='';
       }
    },
    },
    methods:{

      // 房型查询
      submitForm() {
        var that=this;
        that.list(1,this.pagesize)
      },
      handleSizeChangeCont: function(size) {
        this.pagesize = size;
         this.list(this.currentPage,size)
      },
      handleCurrentChangeCont: function(currentPage) {
        this.currentPage = currentPage;
        this.list(currentPage,this.pagesize)
      },
      addEvent(forms){
         this.$refs[forms].validate((valid)=>{
           if(valid){
           this.$router.replace('/teamCheckin/teamuser')
           }
         })
      },
      
      handleEdit(index,row){
        //  console.log(row)
         this.dialogFormVisible1 = true;
         this.forms1.status = String(row.live_type);
         this.forms1.id = row.id;
         this.show1 = 1 ;
      },
       handleEdit1(index,row){
         this.dialogFormVisible1 = true;
         this.forms1.teamname = row.teamname;
         this.forms1.id = row.id;
         this.show1 = 2 ;
      },
        handleEdit2(index,row){
    
         this.dialogFormVisible1 = true;
        //  this.forms1.leave_time = row.leave_time;
         this.forms1.id = row.id;
        //  console.log(row.id)
         this.forms1.day = row.day;
         this.forms1.total_price = row.total_price;
         this.show1 = 3 ;
      },
        handleEdit3(index,row){
         this.dialogFormVisible2 = true;
         this.forms2.bill_id = row.id;
       
      },
     
      handleDelete(index,row){
        this.$confirm(this.$t('public.info'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
        var fordata = new FormData();
        fordata.append("id",row.id )
        var that = this;
        this.$axios.post(this.$baseUrl + '/houseType/del',fordata)
          .then((res) => {
            if (res.data.result) {
              this.$message({
                message: this.$t("common."+res.data.msg),
                showClose: true,
                type: 'success'
              });
              // this.tableData.splice(index,1)
               that.list(that.currentPage,that.pagesize)
            }else{
              this.$message({
                message: this.$t("common."+res.data.msg),
                showClose: true,
                type: 'error'
              });
            }
          })
      }).catch(() => {
          this.$message({
          type: 'info',
          message: this.$t('public.cancel')
        });
      });    
      },
    }
  }
</script>

<style scoped="scoped">
.floatleft{
  width:47.5%;
  float:left;
}
radio-float {
  width: 20%;
  float: left;
}
.floatleft:nth-child(odd){
  margin-right:5%;
}
.dia .el-select {
  width: 100%;
}
.floatleft .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%
}
</style>
