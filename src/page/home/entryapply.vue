<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
      <el-button type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus'  @click="addEvent()">{{$t('public.add')}}</el-button>
      <el-button type="danger" size="small"   icon='el-icon-delete'  @click="delEvent()">{{$t('public.alldelete')}}</el-button>
    <div class="lists">
      <!-- class="select-left" -->
     <el-date-picker
        v-model="ruleForm.apply_time"
        type="datetime"
        value-format="timestamp"
        :placeholder="$t('reception.apply_time')">
     </el-date-picker>
     <el-date-picker
        v-model="ruleForm.audit_time"
        type="datetime"
        value-format="timestamp"
        :placeholder="$t('reception.audit_time')">
     </el-date-picker>
     <el-select v-model.trim="ruleForm.type" :placeholder="$t('reception.type')" clearable class="select-left">
        <el-option key="1" :label="$t('reception.laid_up')" value="1">{{$t('reception.laid_up')}}</el-option>
        <el-option key="2" :label="$t('reception.of_cargo')" value="2">{{$t('reception.of_cargo')}}</el-option>
      </el-select>
      <el-select v-model.trim="ruleForm.status" :placeholder="$t('reception.status')" clearable class="select-left">  
        <el-option key="0" :label="$t('reception.not')" value="0">{{$t('reception.not')}}</el-option>
        <el-option key="1" :label="$t('reception.audit')" value="1">{{$t('reception.audit')}}</el-option>
        <el-option key="2" :label="$t('reception.audit_not')" value="2">{{$t('reception.audit_not')}}</el-option> 
      </el-select>
      <el-select v-model.trim="ruleForm.finish" :placeholder="$t('public.operate')" clearable class="select-left">
        <el-option key="1" :label="$t('reception.finish_1')" value="1">{{$t('reception.finish_1')}}</el-option>
        <el-option key="0" :label="$t('reception.finish_0')" value="0">{{$t('reception.finish_0')}}</el-option>
      </el-select>
      <el-button type="primary tijiao" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
    </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" header-align='center'  @selection-change="handleSelectionChange1">
       <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="apply_time" :label="$t('reception.apply_time')" width="auto" show-overflow-tooltip align='center' :formatter="dateFormat2"></el-table-column>
      <el-table-column prop="audit_time" :label="$t('reception.audit_time')" width="auto" show-overflow-tooltip align='center' :formatter="dateFormat"></el-table-column>
      <el-table-column prop="type" :label="$t('reception.type')" width="auto" show-overflow-tooltip align='center'>
        <template slot-scope='scope'>
          <el-tag v-if="scope.row.type==1" >{{$t('reception.laid_up')}}</el-tag>
          <el-tag v-if="scope.row.type==2" type="danger">{{$t('reception.of_cargo')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" :label="$t('reception.status')" width="auto" show-overflow-tooltip align='center'>
         <template slot-scope='scope'>
          <el-tag v-if="scope.row.status==0" type="danger">{{$t('reception.not')}}</el-tag>
          <el-tag v-if="scope.row.status==1" >{{$t('reception.audit')}}</el-tag>
          <el-tag v-if="scope.row.status==2" type="danger">{{$t('reception.audit_not')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="finish" :label="$t('public.operate')" width="auto" show-overflow-tooltip align='center'>
         <template slot-scope='scope'>
          <el-tag v-if="scope.row.finish==0" type="danger">{{$t('reception.finish_0')}}</el-tag>
          <el-tag v-if="scope.row.finish==1">{{$t('reception.finish_1')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('public.operate')" align="center" width="340px" fixed="right">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
           <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.edit')}}</el-button>
           <el-button size="mini" @click="handlestatus(scope.$index, scope.row)" v-show="scope.row.status==0">{{$t('reception.not')}}</el-button>
           <el-button size="mini" @click="handlestatus(scope.$index, scope.row)" v-show="scope.row.status==1">{{$t('reception.audit')}}</el-button>
           <el-button size="mini" @click="handlestatus(scope.$index, scope.row)" v-show="scope.row.status==2">{{$t('reception.audit_not')}}</el-button>
           <el-button size="mini" @click="handlefinish(scope.$index, scope.row)" v-show="scope.row.finish==0">{{$t('reception.finish_0')}}</el-button>
           <el-button size="mini" @click="handlefinish(scope.$index, scope.row)" v-show="scope.row.finish==1">{{$t('reception.finish_1')}}</el-button>
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

    <el-dialog :title="$t('left.entryapply')" :visible.sync="dialogFormVisible" class="dia" width="30%">
      <el-form :model="forms" status-icon :rules="rule" ref="forms" label-width="60px" class="demo-ruleForm mars">
         <el-form-item label="类型" prop="type">
           <el-radio v-model="forms.type" label="1">{{$t('reception.laid_up')}}</el-radio>
           <el-radio v-model="forms.type" label="2">{{$t('reception.of_cargo')}}</el-radio>
         </el-form-item>
         <el-tabs type="border-card">
          <el-table :data="applyCargoList" stripe style="width: 100%" ref="multipleTable"  header-align='center' @selection-change="handleSelectionChange" v-show="show">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="cargo_name" :label="$t('reception.goods_1')" width="auto" show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :label="$t('reception.goods_1')" width="150" align="center">
              <template slot-scope="scope">
                <el-input-number  size="mini" v-model="scope.row.number" :min="0"></el-input-number>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="delete_status" label="删除状态" width="auto" show-overflow-tooltip align='center'></el-table-column> -->
          </el-table>

           <el-table :data="applyCargoList" stripe style="width: 100%"  header-align='center' v-show="!show">
            <el-table-column prop="cargo_name" :label="$t('reception.goods_1')" width="auto" show-overflow-tooltip align='center'></el-table-column>
            <el-table-column :label="$t('reception.goods_1')" width="150" align="center">
              <template slot-scope="scope">
                <el-input-number  size="mini" v-model="scope.row.number" :min="0"></el-input-number>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="delete_status" label="删除状态" width="auto" show-overflow-tooltip align='center'></el-table-column> -->
          </el-table>
         </el-tabs>
         
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
          // title:'出入库管理',
          title_show:false
        },
         ruleForm: {
          apply_time:"",
          audit_time:"",		  
          type:"",	
          status:"",   
          finish:"",  
        },
        multipleSelection1:[],
        multipleSelection:[],
        mytotal:0,
        tableData:[],
        currentPage:1,
        pagesize:10,
        pages:0,
        pageNums:0,
        applyCargoList:[],
        applyCargoList1:[],
        show:true,
        dialogFormVisible: false,
        forms: {
          id:"",
          type:"1",
        },
        // rule: {
         
        // },
        number:"",
        apply_times:"",
        audit_time:"",
        lists:[]
      }
    },
    created() {
      this.list(1,this.pagesize);
      this.cargoEvent();
    },
    computed:{
      titles(){
        return {title:this.$t('left.entryapply')}
      },
      rule(){
        const rule={
         type: [
            {required: true, message: this.$t('Validation.entry_apply.type'), trigger: 'blur'}
          ]
        }
        return rule
      }
    },
    methods:{
        dateFormat(row, column){
          if(row.audit_time!=""&&row.audit_time!=null){
        var moment = require('moment');
          var date = (row[column.property])*1000;
          return moment(date).format("YYYY-MM-DD HH:mm:ss")
          }
          else{
            return null
          }
        },
         dateFormat2(row, column){
          if(row.apply_time!=null){
          var moment = require('moment');
          var date = (row[column.property])*1000;
          return moment(date).format("YYYY-MM-DD HH:mm:ss")
          }
          else {
            return 
          }
         
        },
       cargoEvent(){
        this.$axios.post(this.$baseUrl + '/cargo/getcargo',{})
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
        this.cargoEvent();
      },
      list(a,b){
        if(this.ruleForm.apply_time==""||this.ruleForm.apply_time==null){
           this.apply_times = ""
        }else{
          this.apply_times = (this.ruleForm.apply_time)/1000
        }
        if(this.ruleForm.audit_time==""||this.ruleForm.audit_time==null){
          this.audit_times = ""
        }else{
          this.audit_times = (this.ruleForm.audit_time)/1000
        }
         var para = {
          apply_time:this.apply_times,
          audit_time:this.audit_times,
          type:this.ruleForm.type,
          status:this.ruleForm.status,
          finish:this.ruleForm.finish,
          page:a,
          size:b
          }
       var that = this;
       this.$axios.post(this.$baseUrl + '/entryApply/getentryApplyPage',para)
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
      handleSelectionChange1(val){
           this.multipleSelection1 = val;
      },
       submitForms(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          var that = this;
          if(this.multipleSelection.length == ""){
            that.$message.warning(this.$t('reception.multipleSelection'))
            return;
          }
           this.multipleSelection.forEach(function(item){
              item.cargo_id = item.id
           })
           var arr={};
           var arrlist=[];
           this.multipleSelection.forEach(item=>{
              arr.cargo_id= item.cargo_id;
              arr.number=item.number;
              arr.delete_status='';
              arrlist.push(arr)
              arr={}
            })
          // var para = {
          //   type:this.forms.type,
          //   applyCargoList:arrlist
          // }
          that.$axios.post(this.$baseUrl +`/entryApply/addentryApply`,{
             type:this.forms.type,
            applyCargoList:arrlist
          })
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
       modifyEvent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this;
          // console.log(that.lists)
          // console.log(that.multipleSelection)
          // return;
        
          var para = {
            id:this.forms.id,
            type:this.forms.type,
            applyCargoList:that.lists
          }
          that.$axios.post(this.$baseUrl +`/entryApply/updateentryApply`,para)
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
         this.forms.type = String(row.type);
         var that = this;
         that.lists = row.applyCargoList;
         that.applyCargoList = row.applyCargoList;
        //  console.log( that.lists)
//          that.lists.forEach(function(items,index){
//             that.applyCargoList.forEach(function(item,indexs){
//                 if(items.cargo_id == item.id){
//                   that.$nextTick(function () {
// // 　                  that.$refs.multipleTable.toggleRowSelection(that.$refs.multipleTable.data[1],true);
//                        that.$refs.multipleTable.toggleRowSelection(that.$refs.multipleTable.data[indexs],true);
//                    }) 
//                   }else{
//                       that.$refs.multipleTable.toggleRowSelection(that.$refs.multipleTable.data[indexs],false);   
//                   }
//               })
//             })
          
      },
      handleDelete(index,row){
        this.$confirm(this.$t('public.info'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
          var that = this;
        this.$axios.post(this.$baseUrl + '/entryApply/delentryApply',[row.id])
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
      })   
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
        this.$axios.post(this.$baseUrl + '/entryApply/delentryApply',that.listId)
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
      
      handlestatus(index,row){
        var that = this;
        this.$confirm(this.$t('public.editstatus'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
          if(row.status ==1){
            var para = {
            id:row.id
          }
        this.$axios.post(this.$baseUrl + '/entryApply/exFailEntryApply',para)
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
          }
          else{
             var para = {
             id:row.id
          }
        this.$axios.post(this.$baseUrl + '/entryApply/exEntryApply',para)
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
          }
          
      }).catch(() => {
          this.$message({
          type: 'info',
          message: this.$t('public.cancel')
        });
      })    
      },
       handlefinish(index,row){
         var that = this;
        this.$confirm(this.$t('public.editstatus'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
          var para = {
            id:row.id
          }
        this.$axios.post(this.$baseUrl + '/entryApply/doOutOrIn',para)
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
      })
        
      },
    }
  }
</script>

<style scoped="scoped">

</style>
