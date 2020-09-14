<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
      <el-button type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus'  @click="addEvent()">{{$t('public.add')}}</el-button>
      <div class="lists">
     <el-input v-model.trim="ruleForm.username" class="time-left" :placeholder="$t('reception.username')" clearable></el-input>
     <el-input v-model.trim="ruleForm.phone" class="time-left" :placeholder="$t('reception.phone')" clearable></el-input>
     <el-input v-model.trim="ruleForm.ID_card" class="time-left" :placeholder="$t('reception.id_card')" clearable></el-input> 
            <el-select v-model.trim="ruleForm.restaurant_id" :placeholder="$t('backstage.restaurant_id')" @change="selectChanged2(ruleForm.restaurant_id)" clearable>
              <el-option v-for="item in restauranttype" :key="item.id" :label="item.restaurant" :value="item.id"></el-option>
            </el-select>
            <el-select v-model.trim="ruleForm.table_id " :placeholder="$t('reception.table_id')" clearable>
              <el-option v-for="item in tabletype" :key="item.id" :label="item.serial_number" :value="item.id"></el-option>
            </el-select>
      <el-select v-model.trim="ruleForm.cash_status " :placeholder="$t('reception.cash_status')" clearable>
         <el-option v-for="item in cashstatustype" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
       <el-select v-model.trim="ruleForm.reserve_status " :placeholder="$t('reception.reserve_status')" clearable>
         <el-option v-for="item in reservetype" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>

      <el-button type="primary tijiao" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
     </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" header-align='center'>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="username" :label="$t('reception.username')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="phone" :label="$t('reception.phone')" width="auto"  align='center'></el-table-column>
      <el-table-column prop="card_type" :label="$t('reception.card_type')" width="auto" show-overflow-tooltip align='center'  :formatter="idTypeFormat" ></el-table-column>
      <el-table-column prop="ID_card" :label="$t('reception.id_card')" width="auto"  align='center'></el-table-column>
      <el-table-column prop="restaurant_id" :label="$t('backstage.restaurant_id')" width="auto"  align='center' :formatter="restaurantFormat"></el-table-column>
      <el-table-column prop="table_id" :label="$t('reception.table_id')" width="auto"  align='center' :formatter="tableFormat"></el-table-column>
      <el-table-column prop="people_num" :label="$t('reception.people_num')" width="auto"  align='center'></el-table-column>
      <el-table-column prop="eat_time" :label="$t('reception.eat_time')" width="auto"  align='center' :formatter="dateFormat"></el-table-column>
      <el-table-column prop="create_time" :label="$t('reception.create_time')" width="auto"  align='center' :formatter="dateFormat"></el-table-column>
      <el-table-column prop="cash_pledge" :label="$t('reception.cash_pledge')" width="auto"  align='center'></el-table-column>
      <el-table-column prop="reserve_status" :label="$t('reception.reserve_status')" width="auto" align='center'> 
        <template slot-scope='scope'>
          <el-tag  v-if="scope.row.reserve_status==0" >{{$t('public.cancel')}}</el-tag>
          <el-tag v-if="scope.row.reserve_status==1" type="danger">{{$t('reception.reserve_status_1')}}</el-tag>
          <el-tag v-if="scope.row.reserve_status==2">{{$t('reception.reserve_status_2')}}</el-tag>
        </template>
      </el-table-column>
       <el-table-column prop="cash_status" :label="$t('reception.cash_status')" width="auto" align='center'> 
        <template slot-scope='scope'>
          <el-tag  v-if="scope.row.cash_status==0" >{{$t('reception.cash_status_0')}}</el-tag>
          <el-tag v-if="scope.row.cash_status==1" type="danger">{{$t('reception.cash_status_1')}}</el-tag>
          <el-tag v-if="scope.row.cash_status==2">{{$t('reception.cash_status_2')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" :label="$t('public.remark')" width="auto"  align='center'  ></el-table-column>
      <el-table-column :label="$t('public.operate')" align="center"  fixed="right" width="220px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('public.delete')}}</el-button>
          <el-button size="mini" @click="handleCancel(scope.$index, scope.row)" v-show="scope.row.reserve_status==1">{{$t('public.cancel')}}</el-button>
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


    <el-dialog :title="$t('left.restReserve')" :visible.sync="dialogFormVisible" class="dia" width="40%">
      <el-form :model="forms" status-icon :rules="rule" ref="forms" label-width="80px" class="demo-ruleForm mars">
         <el-form-item :label="$t('reception.username')" prop="username" class="floatleft">
           <el-input v-model.trim="forms.username" ></el-input>
         </el-form-item>
          <el-form-item :label="$t('reception.phone')" prop="phone" class="floatleft">
           <el-input v-model.trim="forms.phone" ></el-input>
         </el-form-item>
          <el-form-item :label="$t('reception.card_type')" prop="card_type" class="floatleft">
            <el-select v-model.trim="forms.card_type" :placeholder="$t('public.please_select')">
              <el-option v-for="item in scardtype" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
         </el-form-item>
          <el-form-item :label="$t('reception.id_card')" prop="ID_card" class="floatleft">
           <el-input v-model.trim="forms.ID_card" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('backstage.restaurant_id')" prop="restaurant_id" class="floatleft">
            <el-select v-model.trim="forms.restaurant_id" :placeholder="$t('public.please_select')" @change="selectChanged(forms.restaurant_id)">
              <el-option v-for="item in restauranttype" :key="item.id" :label="item.restaurant" :value="item.id"></el-option>
            </el-select>
         </el-form-item>
         <el-form-item :label="$t('reception.table_id')" prop="table_id" class="floatleft">
            <el-select v-model.trim="forms.table_id " :placeholder="$t('public.please_select')">
              <el-option v-for="item in tabletype2" :key="item.id" :label="item.serial_number" :value="item.id"></el-option>
            </el-select>
         </el-form-item>
          <el-form-item :label="$t('reception.people_num')" prop="people_num" class="floatleft">
           <el-input v-model.trim="forms.people_num" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('reception.eat_time')" prop="eat_time" class="floatleft">
            <el-date-picker
              v-model="forms.eat_time"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="timestamp"
             
              :placeholder="$t('reception.eat_time')">
          </el-date-picker>
           </el-form-item>
          <el-form-item :label="$t('reception.cash_pledge')" prop="cash_pledge" class="floatleft">
           <el-input v-model.trim="forms.cash_pledge" ></el-input>
         </el-form-item>
          <el-form-item :label="$t('public.remark')" prop="remark" class="floatleft">
           <el-input v-model.trim="forms.remark" type="textarea"></el-input>
         </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary"  @click="submitForms('forms')" v-show="show">{{$t('public.ok')}}</el-button>
        <el-button type="primary"  @click="modifyEvent('forms')" v-show="!show">{{$t('public.edit')}}</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
  import Title from '../../components/cont_title.vue'
  import yz from '../../config/validation.js'
  export default {
    components:{Title},
    data() {
      return {
        title:{
          // title:'预订管理',
          title_show:false
        },
  
        show:true,
        dialogFormVisible: false,
        cashstatustype:[{
          value: '0',
          label: this.$t('Validation.rest_reserve.cash_status_type.item_1')
        }, {
          value: '1',
          label: this.$t('Validation.rest_reserve.cash_status_type.item_2')
        }, {
          value: '2',
          label: this.$t('Validation.rest_reserve.cash_status_type.item_3')
        }],
        reservetype:[{
          value: '0',
          label: this.$t('Validation.rest_reserve.reserve_type.item_1')
        }, {
          value: '1',
          label: this.$t('Validation.rest_reserve.reserve_type.item_2')
        }, {
          value: '2',
          label: this.$t('Validation.rest_reserve.reserve_type.item_3')
        }],
        forms: {
          id:"",
          username:"",
          phone:"",
          card_type:"",
          ID_card:"",
          restaurant_id:"",
          table_id:"",
          people_num:"",
          eat_time:"",
          cash_pledge:"",
          remark:"",
        },
        // rule: {
         
        // },
        mytotal:0,
        tableData:[],
        currentPage:1,
        pagesize:10,
        pages:0,
        pageNums:0,
        ruleForm: {
          username:"",
          phone:"",
          ID_card:"",
          restaurant_id:"",
          table_id:"",
          cash_status:"",
          reserve_status:""
        },
        restauranttype:[],
        scardtype:[],
        tabletype:[],
        tabletype2:[],
        tabletype3:[],
        idType:[]

      }
    },
    created() {
      this.submitForm();
      this.restaurantEvent();
      this.idTypeEvent();
      this.tableEvent3();

    },
    computed:{
      titles(){
        return {title:this.$t('left.restReserve')}
      },
      rule(){
        const rule={
           username: [
            {required: true, message: this.$t('Validation.rest_reserve.rule.username'), trigger: 'blur'}
          ],
          phone: [
            {required: true, message: this.$t('Validation.rest_reserve.rule.phone'), trigger: 'blur'},
            {validator: yz.validateMobilePhone, trigger: 'blur'}
          ],
           card_type: [
            {required: true, message: this.$t('Validation.rest_reserve.rule.card_type'), trigger: 'blur'}
          ],
          ID_card: [
            {required: true, message: this.$t('Validation.rest_reserve.rule.id'), trigger: 'blur'},
            {validator: yz.validateCardId, trigger: 'blur'}
          ], 
          restaurant_id: [
            {required: true, message: this.$t('Validation.rest_reserve.rule.res'), trigger: 'blur'}
          ],
           table_id : [
            {required: true, message: this.$t('Validation.rest_reserve.rule.table'), trigger: 'blur'},
          ],
           people_num : [
            {required: true, message: this.$t('Validation.rest_reserve.rule.people_num'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
          eat_time : [
            {required: true, message: this.$t('Validation.rest_reserve.rule.eat_time'), trigger: 'blur'}
          ],
           cash_pledge : [
            {required: true, message: this.$t('Validation.rest_reserve.rule.cash'), trigger: 'blur'},
             {validator: yz.validateMoney, trigger: 'blur'}
          ],
           eat_time : [
            {required: true, message: this.$t('Validation.rest_reserve.rule.eat_time'), trigger: 'blur'}
          ],
          //  remark: [
          //   {required: true, message: '请输入备注', trigger: 'blur'},
          // ]
        }
        return rule
      }
    },
    methods:{
      dateFormat(row, column) {
      var moment = require("moment");
      var date = row[column.property] * 1000;
      return moment(date).format("YYYY-MM-DD hh:mm:ss");
    },
   


      tableEvent(a){
        var fordata = new FormData();
        fordata.append("restaurant_id",a)
        fordata.append("status",0)
        this.$axios.post(this.$baseUrl + '/table/getList',fordata)
        .then((res) => {
          this.tabletype2 = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })
      },
      tableEvent1(a){
        var fordata = new FormData();
        fordata.append("restaurant_id",a)
        this.$axios.post(this.$baseUrl + '/table/getList',fordata)
        .then((res) => {
          this.tabletype = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })
      },
       tableEvent3(a){
        this.$axios.post(this.$baseUrl + '/table/getList')
        .then((res) => {
          this.tabletype3 = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })
      },
        
      selectChanged(val){
        this.ruleForm.table_id=''
         this.forms.table_id='';
        // console.log(11111)
         this.tableEvent(val);

       },
        selectChanged2(val){
        this.ruleForm.table_id=''
         this.forms.table_id='';
        // console.log(11111)
         this.tableEvent1(val);

       },

        idTypeEvent(){
          this.$axios.post(this.$baseUrl + '/idType/list')
        .then((res) => {
          this.scardtype = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })
      },
        //证件类型的转换
    idTypeFormat(row,column){
       for(var i=0,l=this.scardtype.length;i<l;i++){
         if(row.card_type==this.scardtype[i].id){
           return this.scardtype[i].name
         }
       }
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

      

      //餐桌号的转换
    tableFormat(row,column){
       for(var i=0,l=this.tabletype3.length;i<l;i++){
         if(row.table_id==this.tabletype3[i].id){
           return this.tabletype3[i].serial_number
         }
       }
    },
      list(a,b) {
        var that=this;
        var fordata = new FormData();
        fordata.append("page",a )
        fordata.append("size",b )
        fordata.append("username",that.ruleForm.username )
        fordata.append("phone",that.ruleForm.phone )
        fordata.append("ID_card",that.ruleForm.ID_card )
        fordata.append("restaurant_id",that.ruleForm.restaurant_id )
        fordata.append("table_id",that.ruleForm.table_id )
        fordata.append("cash_status",that.ruleForm.cash_status )
        fordata.append("reserve_status",that.ruleForm.reserve_status )
        that.$axios.post(this.$baseUrl +`/restReserve/getPage`,fordata)
          .then(function (res) {
            if (res.data.result==true) {
              //  that.scardtype.forEach(function(items){
              //    res.data.pojo.list.forEach(function(item){
              //        if(items.id == item.card_type){
              //          item.card_type1 = items.name
              //        }
              //    })
              // })
              // that.restauranttype.forEach(function(items){
              //    res.data.pojo.list.forEach(function(item){
              //        if(items.id == item.restaurant_id){
              //          item.restaurant_id1 = items.restaurant
              //        }
              //    })
              // })
              //  that.tabletype.forEach(function(items){
              //    res.data.pojo.list.forEach(function(item){
              //        if(items.id == item.table_id){
              //          item.table_id1 = items.serial_number
              //        }
              //    })
              // })
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
          }).catch(function (error) {
          console.log('逻辑错误')
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
      addEvent(){
        this.dialogFormVisible = true;
        this.show = true
      },
       submitForms(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          var that = this;
          this.forms.eat_time/=1000;
          that.$axios.post(this.$baseUrl +`/restReserve/add`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.username = "";
              that.forms.phone = "";
              that.forms.card_type = "";
              that.forms.ID_card = "";
              that.forms.table_id = "";
              that.forms.people_num = "";
              that.forms.eat_time = "";
              that.forms.cash_pledge = "";
              that.forms.remark = "";
              that.forms.restaurant_id = ""
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
          that.$axios.post(this.$baseUrl +`/restReserve/edit`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.username = "";
              that.forms.phone = "";
              that.forms.card_type = "";
              that.forms.ID_card = "";
              that.forms.table_id = "";
              that.forms.people_num = "";
              that.forms.eat_time = "";
              that.forms.cash_pledge = "";
              that.forms.remark = "";
              that.forms.restaurant_id = ""
              that.list(that.currentPage,that.pagesize)
              console.log(this.currentPage,this.pagesize)          
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
         this.forms.username = row.username;
         this.forms.id = row.id;
         this.forms.phone = row.phone;
         this.forms.card_type = row.card_type;
         this.forms.ID_card = row.ID_card;
         this.forms.restaurant_id = row.restaurant_id;
         this.forms.table_id = row.table_id;
         this.forms.id = row.id;
         this.forms.people_num = row.people_num;
         this.forms.eat_time = row.eat_time;
         this.forms.cash_pledge = row.cash_pledge;
         this.forms.remark = row.remark;
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
        this.$axios.post(this.$baseUrl + '/restReserve/delete',fordata)
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
      handleCancel(index,row){
        this.$confirm(this.$t('public.dlecancel'), this.$t('public.hint'), {
           confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
        var fordata = new FormData();
        fordata.append("id",row.id )
        var that = this;
        this.$axios.post(this.$baseUrl + '/restReserve/cancel',fordata)
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
.floatleft:nth-child(odd){
  margin-right:5%;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: auto;
}
.dia .el-select {
  width: 100%;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
}
</style>
