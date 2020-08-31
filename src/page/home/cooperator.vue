<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
      <el-button type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus'  @click="addEvent()">{{$t('public.add')}}</el-button>
      <el-button type="danger" size="small"   icon='el-icon-delete'  @click="delEvent()">{{$t('public.alldelete')}}</el-button>
      <div class="lists">
        <el-input v-model.trim="ruleForm.company_name" class="time-left" :placeholder="$t('reception.company_name')" clearable></el-input>
        <el-input v-model.trim="ruleForm.contacts" class="time-left" :placeholder="$t('reception.contacts')" clearable></el-input>
        <el-input v-model.trim="ruleForm.phone" class="time-left" :placeholder="$t('reception.phone')" clearable></el-input>
        <el-input v-model.trim="ruleForm.contract_number" class="time-left" :placeholder="$t('reception.contract_number')" clearable></el-input>
        <el-select v-model.trim="ruleForm.ptype_id" :placeholder="$t('reception.ptype_id')" clearable>
            <el-option v-for="item in houseType" :key="item.id" :label="item.tactic_name" :value="item.id"></el-option>
        </el-select>
        <el-button type="primary" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
     </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" header-align='center' @selection-change="handleSelectionChange1">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="company_name" :label="$t('reception.company_name')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="contacts" :label="$t('reception.contacts')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="phone" :label="$t('reception.phone')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="content" :label="$t('reception.content')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="ptype_id" :label="$t('reception.ptype_id')" width="auto" show-overflow-tooltip align='center'
      :formatter="priceTypeFormat"
      ></el-table-column>
      <el-table-column prop="paccount_price" :label="$t('reception.paccount_price')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="start_time" :label="$t('reception.start_time')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="end_time" :label="$t('reception.end_time')" width="auto" show-overflow-tooltip align='center' ></el-table-column>
      <el-table-column prop="breakfast_num" :label="$t('reception.breakfast_num')" width="auto" show-overflow-tooltip align='center'></el-table-column>
       <el-table-column prop="delete_status" :label="$t('reception.delete_status')" width="auto" show-overflow-tooltip align='center'>
         <template slot-scope='scope'>
          <el-tag v-if="scope.row.delete_status==1" type="danger">{{$t('reception.delete_status_1')}}</el-tag>
          <el-tag v-if="scope.row.delete_status==0">{{$t('reception.delete_status_0')}}</el-tag>
        </template>
      </el-table-column>
       <el-table-column prop="is_invalid" :label="$t('reception.is_invalid')" width="auto" show-overflow-tooltip align='center'>
         <template slot-scope='scope'>
          <el-tag v-if="scope.row.is_invalid==0" type="danger">{{$t('reception.is_invalid_0')}}</el-tag>
          <el-tag v-if="scope.row.is_invalid==1">{{$t('reception.is_invalid_1')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="contract_number" :label="$t('reception.contract_number')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="email" :label="$t('reception.email')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="address" :label="$t('reception.address')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="remark" :label="$t('public.remark')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column :label="$t('public.operate')" align="center" fixed="right" width="150px">  
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('public.delete')}}</el-button>
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
      
       
    
    <el-dialog :title="$t('reception.dia')" :visible.sync="dialogFormVisible" class="dia" width="40%">
      <el-form :model="forms" status-icon :rules="rule" ref="forms" label-width="80px" class="demo-ruleForm mars">
         <el-form-item :label="$t('reception.company_name')" prop="company_name"  class="floatleft">
           <el-input v-model.trim="forms.company_name" ></el-input>
         </el-form-item>
          <el-form-item :label="$t('reception.contacts')" prop="contacts" class="floatleft">
           <el-input v-model.trim="forms.contacts" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('reception.phone')" prop="phone" class="floatleft">
           <el-input v-model.trim="forms.phone" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('reception.content')" prop="content" class="floatleft">
           <el-input v-model.trim="forms.content" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('reception.ptype_id')" prop="ptype_id" class="floatleft">
           <el-select v-model.trim="forms.ptype_id" :placeholder="$t('public.please_select')">
              <el-option v-for="item in houseType" :key="item.id" :label="item.tactic_name" :value="item.id"></el-option>
            </el-select>
         </el-form-item>
         <el-form-item :label="$t('reception.paccount_price')" prop="paccount_price" class="floatleft">
           <el-input v-model.trim="forms.paccount_price" ></el-input>
         </el-form-item> 
          <el-form-item :label="$t('reception.time')" prop="time" class="floatleft">
            <el-date-picker
              v-model="forms.time"
              type="date"
              value-format="yyyy-MM-dd"
              :placeholder="$t('reception.time')">
          </el-date-picker>
        </el-form-item>

         <el-form-item :label="$t('reception.start_time')" prop="start_time" class="floatleft">
            <el-date-picker
              v-model="forms.start_time"
              type="date"
              value-format="yyyy-MM-dd"
              :placeholder="$t('reception.start_time')">
          </el-date-picker>
        </el-form-item>
          <el-form-item :label="$t('reception.end_time')" prop="end_time" class="floatleft">
            <el-date-picker
              v-model="forms.end_time"
              type="date"
              value-format="yyyy-MM-dd"
              :placeholder="$t('reception.end_time')">
          </el-date-picker>
         </el-form-item>
         <el-form-item :label="$t('reception.breakfast_num')" prop="breakfast_num" class="floatleft">
           <el-input v-model.trim="forms.breakfast_num" ></el-input>
         </el-form-item>

         <el-form-item :label="$t('reception.contract_number')" prop="contract_number" class="floatleft">
           <el-input v-model.trim="forms.contract_number" ></el-input>
         </el-form-item>
         
         <el-form-item :label="$t('reception.email')" prop="email" class="floatleft">
           <el-input v-model.trim="forms.email" ></el-input>
         </el-form-item>

         <el-form-item :label="$t('reception.address')" prop="address" class="floatleft">
           <el-input v-model.trim="forms.address" ></el-input>
         </el-form-item>

        <el-form-item :label="$t('public.remark')" prop="remark" class="floatleft">
        <el-input  type="textarea" :rows="2" v-model.trim="forms.remark"></el-input>
        </el-form-item>
      </el-form>
      
       
      <div slot="footer" class="dialog-footer ">
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
          // title:'房型列表',
          title_show:false
        },
        show:true,
        dialogFormVisible: false,
        forms:{
          company_name:"",          
          contacts:"",                  
          phone:"",                    
          content:"",                    
          ptype_id:"",                      
          paccount_price:"",                
          start_time:"",                    
          end_time:"",                 
          breakfast_num:"",                   
          contract_number:"",                
          email:"",                        
          address:"",                       
          remark:"", 
          time:""
         },                 
        rule: {
          company_name: [
            {required: true, message: '请输入单位名称', trigger: 'blur'}
          ],
          contacts: [
            {required: true, message: '请输入联系人', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '请输入电话', trigger: 'blur'},
            {validator: yz.validatePhTelNumber, trigger: 'blur'}
          ],
           content: [
            {required: true, message: '请输入协议内容', trigger: 'blur'}
          ],
           ptype_id: [
            {required: true, message: '请输入价格策略', trigger: 'blur'}
          ],
          paccount_price: [
            {required: true, message: '请输入挂账额度', trigger: 'blur'},
            {validator: yz.validateMoney, trigger: 'blur'}
          ],
          start_time: [
            {required: true, message: '请输入生效日期', trigger: 'blur'},
          ],
          end_time: [
            {required: true, message: '请输入失效日期', trigger: 'blur'}
          ],
          breakfast_num: [
            {required: true, message: '请输入早餐券数', trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
          contract_number: [
            {required: true, message: '请输入合同号', trigger: 'blur'}
          ],
           email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
             {validator: yz.validateEmail, trigger: 'blur'}
          ],
           address: [
            {required: true, message: '请输入地址', trigger: 'blur'}
          ], 
          time:[
            {required: true, message: '请输入协议时间 ', trigger: 'blur'}
          ],    
        },
        mytotal:0,
        tableData:[],
        currentPage:1,
        pagesize:10,
        pages:0,
        pageNums:0,
        houseType:[],
        ruleForm: {
          company_name:"",     
          time :"",       
          contacts  :"",            
          phone:"",	             
          delete_status:"",         
          ptype_id:"",            
          is_invalid :"",           
          contract_number:"",      

        },
        multipleSelection1:[]
     
    }
    },
    created() {
      this.submitForm();
      this.houseEvent();
    },
    computed:{
      titles(){
        return {title:this.$t('reception.room_list')}
      }
    },
    methods:{

    //  that.houseType.forEach(function(items){
    //              res.data.pojo.list.forEach(function(item){
    //                  if(items.id == item.ptype_id){
    //                    item.ptype_id1 = items.tactic_name
    //                  }
    //              })
    //           })


   //价格策略的转换
    priceTypeFormat(row,column){
        for(var i=0,l=this.houseType.length;i<l;i++){
         if(row.ptype_id==this.houseType[i].id){
           return this.houseType[i].tactic_name
         }
       }
    },
      
       handleSelectionChange1(val){
         this.multipleSelection1 = val;
      },

      //查询所有的价格策略
      houseEvent(){
        var para = {
          tactic_name:"",
          status:"",
          remark:""     
        }
       this.$axios.post(this.$baseUrl + '/tactic/gettactic',para)
        .then((res) => {
          this.houseType = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })
      },
      list(a,b) {
        var that=this;
        var para ={
          page:a,
          size:b,
          company_name:that.ruleForm.company_name,		  
          contacts:that.ruleForm.contacts,	
          phone:that.ruleForm.phone,	
          ptype_id:that.ruleForm.ptype_id,
          contract_number:that.ruleForm.contract_number,	
        }
        that.$axios.post(this.$baseUrl +`/cooperator/getPage`,para)
          .then(function (res) {
            if (res.data.result==true) {
              that.tableData = res.data.pojo.list;
              that.mytotal = res.data.pojo.total;
              that.pageNums = res.data.pojo.pageNum;
              that.pages = res.data.pojo.pages;
               if(that.pageNums > that.pages && that.currentPage!=0){
                that.currentPage = that.pages
                that.list(that.currentPage,that.pagesize)
              }
            }else{
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
          that.$axios.post(this.$baseUrl +`/cooperator/insert`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.company_name = "";
              that.forms.contacts = "";
              that.forms.content = "";
              that.forms.ptype_id = "";
              that.forms.paccount_price = "";
              that.forms.start_time = "";
              that.forms.end_time = "";
              that.forms.breakfast_num = "";
              that.forms.contract_number = "";
              that.forms.email = "";
              that.forms.address = "";
              that.forms.remark = "";
              that.forms.time = "";
              that.forms.phone = "";
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
          that.$axios.post(this.$baseUrl +`/cooperator/update`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.company_name = "";
              that.forms.contacts = "";
              that.forms.content = "";
              that.forms.ptype_id = "";
              that.forms.paccount_price = "";
              that.forms.start_time = "";
              that.forms.end_time = "";
              that.forms.breakfast_num = "";
              that.forms.contract_number = "";
              that.forms.email = "";
              that.forms.address = "";
              that.forms.remark = "";
              that.forms.time = "";
              that.forms.phone = "";
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
        this.forms.company_name = row.company_name;
        this.forms.contacts = row.contacts;
        this.forms.phone = row.phone;
        this.forms.content = row.content;
        this.forms.ptype_id = row.ptype_id;
        this.forms.paccount_price = row.paccount_price;
        this.forms.start_time = row.start_time;
        this.forms.end_time = row.end_time;
        this.forms.breakfast_num = row.breakfast_num;
        this.forms.email = row.email;
        this.forms.address = row.address;
        this.forms.remark = row.remark; 
        this.forms.contract_number = row.contract_number; 
        this.forms.time = row.time;
        this.forms.delete_status  = row.delete_status ;
        this.forms.is_invalid  = row.is_invalid ;
         
      },
      handleDelete(index,row){
        this.$confirm(this.$t('public.info'), this.$t('public.hint'), {
           confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
        var that = this;
        this.$axios.post(this.$baseUrl + '/cooperator/del',[row.id])
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
       delEvent(){
        var that = this;
         this.$confirm(this.$t('public.alldelete_info'),this.$t('public.hint'), {
         confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
           that.listId=[];
           that.multipleSelection1.forEach(function(index){
              that.listId.push(index.id)
            })
        this.$axios.post(this.$baseUrl + '/cooperator/del',that.listId)
          .then((res) => {
            if (res.data.result) {
              this.$message({
                message: this.$t("common."+res.data.msg),
                showClose: true,
                type: 'success'
              });
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
.floatleft .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width:100%!important;
}
.floatleft .el-select {
    width: 100%
    }
</style>
