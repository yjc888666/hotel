<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
      <el-button type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus'  @click="addEvent()">{{$t('public.add')}}</el-button>
    <div class="lists">
       <el-select v-model.trim="ruleForm.restaurant_id" :placeholder="$t('backstage.restaurant_id')" clearable @change="selectChanged1(ruleForm.restaurant_id)">
          <el-option v-for="item in restauranttype" :key="item.id" :label="item.restaurant" :value="item.id"></el-option>
        </el-select>
        <el-select v-model.trim="ruleForm.table_num" :placeholder="$t('reception.table_num')" clearable>
          <el-option v-for="item in tabletype2" :key="item.id" :label="item.serial_number" :value="item.serial_number"></el-option>
        </el-select>
     <el-date-picker clearable
        v-model="ruleForm.create_time"
        type="date"
        value-format="timestamp"
        :placeholder="$t('reception.create_time')">
     </el-date-picker>
     <el-date-picker clearable
        v-model="ruleForm.end_time"
        type="date"
        value-format="timestamp"
        :placeholder="$t('reception.ends_time')">
     </el-date-picker>
     <el-input v-model.trim="ruleForm.room_number" class="time-left" :placeholder="$t('reception.room_number')" clearable></el-input>
      <el-button type="primary tijiao" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
    </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" header-align='center'>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="restaurant_id" :label="$t('backstage.restaurant_id')" width="auto" show-overflow-tooltip align='center' :formatter="restaurantFormat"></el-table-column>
      <el-table-column prop="table_num" :label="$t('reception.table_num')" width="auto" show-overflow-tooltip align='center'></el-table-column>     
      <el-table-column prop="create_time" :label="$t('backstage.create_time')" width="auto" show-overflow-tooltip align='center' :formatter="dateFormat"></el-table-column>
      <!-- <el-table-column prop="end_time" :label="$t('reception.ends_time')" width="auto" show-overflow-tooltip align='center' :formatter="dateFormat"></el-table-column> -->
      <el-table-column prop="room_number" :label="$t('reception.room_number')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      
      <!-- <el-table-column prop="status" label="状态" width="auto" show-overflow-tooltip align='center'>
         <template slot-scope='scope'>
          <el-tag v-if="scope.row.status==0" type="danger">未审核</el-tag>
          <el-tag v-if="scope.row.status==1" >审核通过</el-tag>
          <el-tag v-if="scope.row.status==2" type="danger">审核未通过</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column  :label="$t('left.menu')" width="auto">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
              <el-table :data="scope.row.orderAffiliateList" stripe style="width: 100%" header-align='center'>
                  <el-table-column  type="index" prop="ID" label="ID"  width="auto" show-overflow-tooltip align='center'></el-table-column>
                  <el-table-column  prop="menu_name" :label="$t('backstage.dishes')" width="auto" show-overflow-tooltip align='center'></el-table-column>
                  <el-table-column  prop="quantity" :label="$t('reception.dishnum')" width="auto" show-overflow-tooltip align='center'></el-table-column>
              </el-table>
                <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{$t('reception.look')}}</el-tag>
              </div>
              </el-popover>
            </template>
        </el-table-column>
       
     <el-table-column prop="pay_status" :label="$t('reception.pay_status')" width="auto" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.pay_status==0" type="danger">{{$t('reception.no_pay')}}</el-tag>
          <el-tag v-if="scope.row.pay_status==1">{{$t('reception.is_pay')}}</el-tag>
        </template>
      </el-table-column>
    
      <el-table-column :label="$t('public.operate')" align="center" width="340px" fixed="right">
        <template slot-scope="scope">   
           <el-button size="mini" :disabled="scope.row.pay_status==1" @click="handleEdit(scope.$index, scope.row)">{{$t('public.edit')}}</el-button>
           <el-button size="mini" :disabled="scope.row.pay_status==1" @click="handleChange(scope.$index, scope.row)" type="danger">{{$t('reception.trade')}}</el-button>
           <el-button size="mini" :disabled="scope.row.pay_status==1" @click="handleDelete(scope.$index, scope.row)">{{$t('reception.settle')}}</el-button>
           <el-button type="primary" size="mini" @click="printRestaurantOrder(scope.row)">{{$t('reception.print')}}</el-button>
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
        v-if="mytotal!=0">
      </el-pagination>
 
      <!-- //打印弹出的餐厅订单 -->
   <el-dialog :title="$t('reception.order_details')" :visible.sync="dialogTableVisible" class="print " width="300px">
     <div >{{$t('reception.order_details')}}:<label for="">{{printOrderData.id}}</label> </div> <br>
     <div class="info clearfix">
       <div class="div_left">{{$t('reception.table_num')}}:<label for="">{{printOrderData.table_num}}</label> </div>    <div class="div_right"> {{$t('reception.room_number')}}:<label for="">{{printOrderData.room_number}}</label> </div>  
        <p class="list">{{$t('reception.dished_ordered')}}</p> 
        <p>
      <ul class="orderAffiliateList">
      <li v-for="item in  printOrderData.orderAffiliateList" :key="item.id"><p>{{item.menu_name}} <span> &yen;{{item.menu_price}}</span></p> <p class="right">x{{item.quantity}}</p></li>
      <p class="right">{{$t('reception.sum')}}: <span> &yen;{{printOrderData. total_prices}}</span> </p>
    </ul>
    </p>
     <div class="div_left">{{$t('reception.pay_status')}}:<label for="">{{isPay}}</label> </div>    <div  v-show="payFlag"  class="div_right">{{$t('reception.pay_type')}}:<label for="">{{payByWhat}}</label> </div>  
      
   <!-- <div><label for="">{{printOrderData.room_number}}</label> </div>    <div> 价格:<label for="">{{printOrderData.total_prices}}</label></div>  -->  
       
   <div v-show="member_flag" class="div_left">{{$t('reception.vip_card')}}:<label for="">{{printOrderData. member_card}}</label> </div>    <div  v-show="member_flag" class="div_right">{{$t('reception.pay_time')}}:<label for="">{{printOrderData.pay_time| formatDate3}}</label> </div>  
   <div  v-show="room_flag" class="div_left">{{$t('reception.on_room')}}:<label for="">{{printOrderData.  room_number }}</label> </div>    <div  v-show="room_flag" class="div_right">{{$t('reception.on_time')}}:<label for="">{{printOrderData.create_time | formatDate3}}</label> </div>  

     </div> 
     
   
   </el-dialog>



    <el-dialog :title="$t('left.order')" :visible.sync="dialogFormVisible" class="dia" width="30%">
      <el-form :model="forms" status-icon :rules="rule" ref="forms" label-width="90px" class="demo-ruleForm mars">
         <el-form-item :label="$t('backstage.restaurant_id')" prop="restaurant_id" class="floatleft">
            <el-select v-model.trim="forms.restaurant_id" :placeholder="$t('public.please_select')" @change="selectChanged(forms.restaurant_id)">
              <el-option v-for="item in restauranttype" :key="item.id" :label="item.restaurant" :value="item.id"></el-option>
            </el-select>
         </el-form-item>
         <el-form-item :label="$t('reception.table_num')" prop="table_num" class="floatleft">
            <el-select v-model.trim="forms.table_num " :placeholder="$t('public.please_select')">
              <el-option v-for="item in tabletype" :key="item.serial_number" :label="item.serial_number" :value="item.serial_number"></el-option>
            </el-select>
         </el-form-item>
         <el-tabs type="border-card">
          <el-table :data="dlist" stripe style="width: 100%" ref="multipleTable"  header-align='center' @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="menu_name" :label="$t('reception.menu_name')" width="auto" show-overflow-tooltip align='center'></el-table-column>
            <!-- <el-table-column prop="price" label="价格" width="auto" show-overflow-tooltip align='center'></el-table-column> -->
            <el-table-column :label="$t('reception.num')" width="150" align="center">
              <template slot-scope="scope">
                <el-input-number  size="mini" v-model="scope.row.quantity" :min="1"></el-input-number>
              </template>
            </el-table-column>
          </el-table>
         </el-tabs>    
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary"  @click="submitForms('forms')" v-show="show">{{$t('public.ok')}}</el-button>
        <el-button type="primary"  @click="modifyEvent('forms')" v-show="!show">{{$t('reception.cai')}}</el-button>
        <el-button type="primary"  @click="changeEvent('forms')" v-show="!show">{{$t('reception.desk')}}</el-button>
      </div>
    </el-dialog>

     <el-dialog :title="$t('reception.pay')" :visible.sync="dialogFormVisible1" class="dia" width="30%">
      <el-form :model="forms1" status-icon :rules="rule1" ref="forms1" label-width="110px" class="demo-ruleForm mars">
         <el-form-item :label="$t('reception.payf')" prop="pay_method" class="floatleft" >
            <el-radio v-model="forms1.pay_method" label="1">{{$t('reception.payf_0')}}</el-radio>
            <el-radio v-model="forms1.pay_method" label="2">{{$t('reception.payf_1')}}</el-radio>
            <el-radio v-model="forms1.pay_method" label="3">{{$t('reception.payf_2')}}</el-radio>
            <el-radio v-model="forms1.pay_method" label="4">{{$t('reception.payf_3')}}</el-radio>
          </el-form-item>
          <el-form-item :label="$t('reception.card')" prop="method_card" class="floatleft" v-if="forms1.pay_method==3">
            <el-input v-model.trim="forms1.method_card" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('reception.memberpass')" prop="password" class="floatleft" v-if="forms1.pay_method==3">
            <el-input v-model.trim="forms1.password" ></el-input>
         </el-form-item>
          <el-form-item :label="$t('reception.membersort')" prop="score" class="floatleft" v-if="forms1.pay_method==3">
            <el-input v-model.trim="forms1.score" ></el-input>
         </el-form-item>
          <el-form-item :label="$t('reception.room_number')" prop="room_number" class="floatleft" v-if="forms1.pay_method==4">
            <el-input v-model.trim="forms1.room_number" class="floatleft" >  
              <el-button slot="append" icon="el-icon-search" @click="submitForm2(forms1.room_number)"></el-button>
            </el-input>
            
         </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary"  @click="submitForms1('forms1')">{{$t('public.ok')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import Title from '../../components/cont_title.vue'
  import yz from '../../config/validation.js'
  import { formatDate } from '@/common/date.js' // 在组件中引用date.js
  export default {
    components:{Title},
    data() {
      return {
        title:{
          // title:'订单管理',
          title_show:true
        },
         ruleForm: {
          restaurant_id:"",    
          table_num:"",        
          room_number:"",     
          create_time:"",    
          end_time:"",       
        },
        multipleSelection:[],
        mytotal:0,
        tableData:[],
        currentPage:1,
        pagesize:10,
        pages:0,
        pageNums:0,
        show:true,
        dialogFormVisible: false,
        dialogTableVisible:false,
        //订单打印的数据
        printOrderData:{},

        forms: {
          table_num:"",
          restaurant_id:"",
        },
        // rule: {
         
        // },
        number:"",
        apply_times:"",
        audit_time:"",
        lists:[],
        restauranttype:[],
        dlist:[],
        tabletype:[],
        tabletype2:[],
        
        dialogFormVisible1: false,
        //是否支付
        isPay:'',
        member_flag:false,
        room_flag:false,
        payByWhat:'',
         
         //根据支付状态控制页面显示内容
          payFlag:null,
        forms1: {
          id:"",
          pay_method:"1",
          method_card:"",
          password:"",
          score:"",
          room_number:"",
        },
        // rule1: {
         
        // },
      }
    },
    created() {
      this.list(1,this.pagesize);
      // this.cargoEvent();
      this.restaurantEvent();
      this.dishEvent();
      this.tableEvent();
    },
    computed:{
      titles(){
        return {title:this.$t('left.order')}
      },
      rule(){
        const rule={
           table_num: [
            {required: true, message: this.$t('Validation.order.table_num'), trigger: 'blur'}
          ],
          restaurant_id: [
            {required: true, message: this.$t('Validation.order.restaurant_id'), trigger: 'blur'}
          ]
        }
        return rule
      },
      rule1(){
        const rule1={
           pay_method: [
            {required: true, message:  this.$t('Validation.order.pay_method'), trigger: 'blur'}
          ],
          method_card: [
            {required: true, message:  this.$t('Validation.order.card'), trigger: 'blur'}
          ],
           password: [
            {required: true, message: this.$t('Validation.order.password'), trigger: 'blur'}
          ],
          //  score: [
          //   {required: true, message: '请输入会员使用积分', trigger: 'blur'}
          // ],
           room_number: [
            {required: true, message: this.$t('Validation.order.room_num'), trigger: 'blur'}
          ]
        }
        return rule1
      }
    },
     filters:{
    formatDate3(time) {
    var date = new Date(time*1000);
    return formatDate(date, 'yyyy年MM月dd日 hh:mm:ss'); 
      }
     },

    methods:{
     submitForm2 (value){
        console.log(value)
     },
     
     

     //打印餐厅订单
      printRestaurantOrder(row){
        this.dialogTableVisible=true;
        console.log(row);
       this.$axios.post(this.$baseUrl+ '/rstartact/printingOrderRstrt',{
         id:row.id
       })
       .then((res)=>{
         console.log(res)
         this.printOrderData=res.data.pojo;
         //判断传回来的数据客户是否支付来啦账单，动态显示信息
         if(!this.printOrderData.pay_status==0){
            this.isPay=this.$t('reception.is_pay')
            this.payFlag=true;
            if(this.printOrderData.pay_method===1){
                this.member_flag=false;
                 this.room_flag=false;
                 this.payByWhat=this.$t('reception.cash3')
              }
              if(this.printOrderData.pay_method===2){
                   this.member_flag=false;
                 this.room_flag=false;
                 this. payByWhat=this.$t('reception.bank_card_')
              }
            if(this.printOrderData.pay_method===3){
              this.member_flag=true;
             this. payByWhat=this.$t('reception.vip_card_')
            }
            if(this.printOrderData.pay_method===4){
              this.room_flag=true;
              this. payByWhat=this.$t('reception.on_account')
            }
         }
         else {
             this.isPay=this.$t('reception.no_pay')
              this.payFlag=false;
              this.member_flag=false;
              this.room_flag=false;
             
         }
         console.log(this.isPay)

         console.log(this.printOrderData);
       })
       .catch((err)=>{
         console.log(err);
       })
      },



      selectChanged1(val){
         this.tableEvent2(val);
      },
      selectChanged(val){
         this.ruleForm.table_num=''
          this.forms.table_num='';
        // console.log(11111)
         this.tableEvent(val);
      },
         // 餐厅列表
        restaurantEvent(){
            this.$axios.post(this.$baseUrl + '/restaurant/getList')
          .then((res) => {
            this.restauranttype = res.data.pojo
          })
          .catch((res) => {
            console.log(res)
          })
        },
         //餐厅号的转换
     restaurantFormat(row,column){
       for(var i=0,l=this.restauranttype.length;i<l;i++){
         if(row.restaurant_id==this.restauranttype[i].id){
           return this.restauranttype[i].restaurant
         }
       }
    },
        tableEvent(a){
        var fordata = new FormData();
        fordata.append("restaurant_id",a)
        fordata.append("status",0)
        this.$axios.post(this.$baseUrl + '/table/getList',fordata)
        .then((res) => {
          this.ruleForm.table_num='';
          this.tabletype = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })
      },
      tableEvent2(){
        this.$axios.post(this.$baseUrl + '/table/getList')
        .then((res) => {
          this.ruleForm.table_num='';
          this.tabletype2 = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })
      },
        dishEvent(){
            this.$axios.post(this.$baseUrl + '/menu/getList')
             .then((res) => {
             this.dlist = res.data.pojo
           })
          .catch((res) => {
            console.log(res)
          })
        },
        dateFormat(row, column){
          var moment = require('moment');
          var date = (row[column.property])*1000;
          return moment(date).format("YYYY-MM-DD")
        },
       cargoEvent(){
        this.$axios.post(this.$baseUrl + '/cargo/getcargo')
          .then((res) => {
            this.applyCargoList = res.data.pojo;
          })
          .catch((res) => {
            console.log(res)
          })
       },
       handleSelectionChange(val) {
        this.multipleSelection = val;
        // console.log(val)
      },
      addEvent(){
        this.dialogFormVisible = true;
        this.show = true;
        this.dishEvent();
      },
      list(a,b){
       var that = this;
       var fordata = new FormData();
        fordata.append("page",a )
        fordata.append("size",b )
        fordata.append("table_num",that.ruleForm.table_num )
        fordata.append("room_number",that.ruleForm.room_number  )
        fordata.append("restaurant_id",that.ruleForm.restaurant_id )
        fordata.append("create_time",that.ruleForm.create_time )
        fordata.append("end_time",that.ruleForm.end_time )
       this.$axios.post(this.$baseUrl + '/order/getPage',fordata)
        .then((res) => {
          if (res.data.result==true) {
            that.tableData = res.data.pojo.list;
            that.mytotal = res.data.pojo.total;
            that.pageNums = res.data.pojo.pageNum;
            that.pages = res.data.pojo.pages;
              if(that.pageNums > that.pages && that.currentPage!=0){
              that.currentPage = that.pages
              that.list(that.currentPage,that.pagesize)
            } 
          } 
          else{
            that.tableData = [];
            that.$message.error(that.$t("common."+res.data.msg))
          }
        })
        .catch((res) => {
          console.log(res)
        })
      },
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
       submitForms(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          var that = this;
          if(this.multipleSelection.length == ""){
            that.$message.warning(this.$t('reception.multiplelist'))
            return;
          }
           this.multipleSelection.forEach(function(item){
              item.menu_id = item.id
              if(item.quantity==undefined){
                item.quantity = 1
              }
           })
          var para = {
            table_num :this.forms.table_num ,
            restaurant_id:this.forms.restaurant_id,
            dlist:this.multipleSelection
          }
          that.$axios.post(this.$baseUrl +`/order/add`,para)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.table_num = " ";
              that.forms.restaurant_id = " ";
              that.list(that.currentPage,that.pagesize)
            }else {
              that.$message.error(that.$t("common."+res.data.msg))
            }
          }).catch(function (error) {
          console.log('逻辑错误')
        })

          }
        })
       },


      submitForms1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          var that = this;
          that.$axios.post(this.$baseUrl +`/order/restPay`,that.forms1)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible1 = false;
              that.forms.id = " ";
              that.forms.pay_method = " 1";
              that.forms.method_card = " ";
              that.forms.password = " ";
              that.forms.score = " ";
              that.forms.room_number = " ";
              that.list(that.currentPage,that.pagesize)
            }else {
              that.$message.error(that.$t("common."+res.data.msg))
            }
          }).catch(function (error) {
          console.log('逻辑错误')
        })

          }
        })
       },
       modifyEvent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this;
          if(this.multipleSelection.length == ""){
            that.$message.warning(this.$t('reception.multiplelist'))
            return;
          }
          this.multipleSelection.forEach(function(item){
              item.menu_id = item.id
              if(item.quantity==undefined){
                item.quantity = 1
              }
           })
          var para = {
            id:this.forms.id,
            dlist:that.multipleSelection
          }
          that.$axios.post(this.$baseUrl +`/order/changeDish`,para)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.list(that.currentPage,that.pagesize)

            }else {
              that.$message.error(that.$t("common."+res.data.msg))
            }
          }).catch(function (error) {
          console.log('逻辑错误')
        })
          }
        })
       },
      handleEdit(index,row){
         this.dialogFormVisible = true;
         this.show = false;
         this.forms.id = row.id;
         var that = this;
         that.lists = row.orderAffiliateList;
         that.forms.table_num = row.table_num;
         that.forms.restaurant_id = row.restaurant_id;
        //  console.log( that.lists)
         that.dlist.forEach(function(items,index){
            that.lists.forEach(function(item,indexs){
                if(items.id == item.menu_id){
                   items.quantity = item.quantity
                   that.$nextTick(function () {  
                       that.$refs.multipleTable.toggleRowSelection(that.$refs.multipleTable.data[index],true);
                   }) 
                    items.quantity = item.quantity
                  }else{
                    
                     if (that.$refs.multipleTable) {
                        that.$refs.multipleTable.clearSelection();
                        // that.$refs.multipleTable.toggleRowSelection(that.$refs.multipleTable.data[index],false);   
                     }
                      
                  }
              })
            })     
      },
       handleChange(index,row){
         this.dialogFormVisible = true;
         this.show = false;
         this.forms.id = row.id;
         var that = this;
         that.forms.table_num = row.table_num;
         that.forms.restaurant_id = row.restaurant_id;
      },
       changeEvent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this;
          var fordata = new FormData();
          fordata.append("id",this.forms.id  )
          fordata.append("restaurant_id",this.forms.restaurant_id )
          fordata.append("table_num",this.forms.table_num )
          that.$axios.post(this.$baseUrl +`/order/changeTable`,fordata)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.list(that.currentPage,that.pagesize)

            }else {
              that.$message.error(that.$t("common."+res.data.msg))
            }
          }).catch(function (error) {
          console.log('逻辑错误')
        })
          }
        })
       },
      handleDelete(index,row){
         this.dialogFormVisible1 = true;
         this.show = true;
         this.forms1.id = row.id;
      },
    }
  }
</script>

<style scoped >
 /deep/ .print {
  margin: 0 ;
  padding: 0;

}
.print div {
 color: rgb(158, 157, 157);
}
 .print .info div {
   width: 50%;
   float: left;
  left: 25%;
  
 }
 .clearfix:after{
   content: "";
   display: block;
   height: 0;
   clear: both;
   visibility: hidden;
 }
 .clearfix {
   *zoom: 1;
 }
 .info {
/* margin: auto 100px; */

text-align: center;
 }
 .info .div_left {
   text-align: left;
 }
 .info .div_right {
    text-align: right;
 }
 .info p {
   text-align: left;
 }
 .info .list {
    text-align: center;
     color: rgb(158, 157, 157);
 }
 .orderAffiliateList {
   border-top: 1px dotted rgb(158, 157, 157);
   border-bottom: 1px dotted rgb(158, 157, 157);
 }
 .orderAffiliateList li {
     color: rgb(158, 157, 157);
     width: 100%;
 }
.left {
   text-align: left;
 }
   .orderAffiliateList span {
   color: rgb(196, 58, 58);

   float:right;
 }
.info  .right {
   text-align: right;
 }
</style>
