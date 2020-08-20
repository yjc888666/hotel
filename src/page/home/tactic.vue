<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
      <el-button type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus'  @click="addEvent()">{{$t('public.add')}}</el-button>
      <el-button type="danger" size="small"   icon='el-icon-delete'  @click="delEvent()">{{$t('public.alldelete')}}</el-button>
    <div class="lists">
      <el-input v-model="ruleForm.tactic_name" :placeholder="$t('reception.tactic_name')"  class="select-left" clearable></el-input>      
     <el-select v-model.trim="ruleForm.status" :placeholder="$t('public.status')" clearable class="select-left">
        <el-option key="1" :label="$t('reception.start_etc')" value="1">{{$t('reception.start_etc')}}</el-option>
        <el-option key="0" :label="$t('reception.start_etd')" value="0">{{$t('reception.start_etd')}}</el-option>
      </el-select>
      <el-input v-model="ruleForm.remark" :placeholder="$t('public.remark')"  class="select-left" clearable></el-input>      
      <el-button type="primary tijiao" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
    </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" header-align='center'  @selection-change="handleSelectionChange1">
       <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="tactic_name" :label="$t('reception.tactic_name')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="remark" :label="$t('public.remark')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="status" :label="$t('public.status')" width="auto" show-overflow-tooltip align='center'>
         <template slot-scope='scope'>
          <el-tag v-if="scope.row.status==0" type="danger">{{$t('reception.start_etd')}}</el-tag>
          <el-tag v-if="scope.row.status==1" >{{$t('reception.start_etc')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('public.operate')" align="center" width="340px" fixed="right">
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.edit')}}</el-button>
           <el-button size="mini" @click="handlestatus(scope.$index, scope.row)" v-show="scope.row.status==0">{{$t('reception.start_etd')}}</el-button>
           <el-button size="mini" @click="handlestatus(scope.$index, scope.row)" v-show="scope.row.status==1">{{$t('reception.start_etc')}}</el-button>
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

    <el-dialog :title="$t('left.tactic')" :visible.sync="dialogFormVisible" class="dia" width="30%">
      <el-form :model="forms" status-icon :rules="rule" ref="forms" label-width="90px" class="demo-ruleForm mars">
         <el-form-item :label="$t('reception.tactic_name')" prop="tactic_name"> 
           <el-input v-model="forms.tactic_name"></el-input>          
         </el-form-item>
         <el-form-item :label="$t('public.remark')" prop="remark">
           <el-input v-model="forms.remark"></el-input>          
         </el-form-item>
         <el-tabs type="border-card">
            <!-- <el-table :data="applyCargoList.slice((currentPage1-1)*pagesize1,currentPage1*pagesize1)" stripe style="width: 100%" header-align='center' @selection-change="handleSelectionChange"> -->
          <el-table :data="applyCargoList" stripe style="width: 100%" header-align='center' ref="multipleTable">
            <!-- <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column> -->
            <el-table-column prop="name" :label="$t('reception.names')" width="auto"  align='center'></el-table-column>
            <el-table-column prop="prices" :label="$t('reception.prices')" width="auto"  align='center'></el-table-column>
            <el-table-column prop="set_type" :label="$t('reception.set_type')" width="auto"  align='center'>
               <template slot-scope="scope">
                 <el-select v-model.trim="scope.row.set_type" :placeholder="$t('reception.set_type')" clearable>
                    <el-option v-for="item in setType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
               </template>
            </el-table-column>
            <el-table-column prop="set_act" :label="$t('reception.set_act')" width="160px"  align='center'>
              <template slot-scope="scope">
                <el-input-number  size="mini" v-model="scope.row.set_act" :min="0"></el-input-number>
                 <!-- <el-input  type="textarea"  v-model="scope.row.set_act"></el-input> -->
               </template>
            </el-table-column>
          </el-table>
           <!-- <el-pagination 
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" 
           :current-page="currentPage1" 
           :page-sizes="[5, 10, 20, 40,60,100]"
           :page-size="pagesize1" layout="total, sizes, prev, pager, next, jumper" 
           :total="applyCargoList.length">
          </el-pagination> -->
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
        currentPage1: 1, 
        pagesize1: 5, 
        title:{
          // title:'协议单位价格策略管理',
          title_show:false
        },
         ruleForm: {
          tactic_name:"",
          status:"",		  
          remark:"",	
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
        show:true,
        dialogFormVisible: false,
        forms: {
          id:"",
          tactic_name:"",
          remark:""
        },
        rule: {
          tactic_name: [
            {required: true, message: '请输入规则名称 ', trigger: 'blur'}
          ],
        },
        setType: [{                                                   
          value: '0',
          label: '上浮'
        }, {
          value: '1',
          label: '下浮'
        }, {
          value: '2',
          label: '折扣率'
        }, {
          value: '3',
          label: '一口价'
        }],
        lists:[]
      }
    },
    created() {
      this.list(1,this.pagesize);
      this.cargoEvent()
    },
    computed:{
      titles(){
        return {title:this.$t('left.tactic')}
      }
    },
    methods:{
       handleSizeChange: function(size) {
        this.pagesize1 = size;
      },
      handleCurrentChange: function(currentPage) {
        this.currentPage1 = currentPage;
      },
      cargoEvent(){
        this.$axios.post(this.$baseUrl + '/houseType/getlist')
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
        var para = {
          tactic_name:this.ruleForm.tactic_name,
          status:this.ruleForm.status,
          remark:this.ruleForm.remark,
          page:a,
          size:b
        }
       var that = this;
       this.$axios.post(this.$baseUrl + '/tactic/gettacticPage',para)
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
        // console.log(val)
      },
       submitForms(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          var that = this;
           this.applyCargoList.forEach(function(item){
              item.housetype_id = item.id
           })
          var para = {
            tactic_name:this.forms.tactic_name,
            remark:this.forms.remark,
            tactictypeList:this.applyCargoList
          }
          that.$axios.post(this.$baseUrl +`/tactic/addtactic`,para)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.tactic_name = "";
              that.forms.remark = "";
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
           this.applyCargoList.forEach(function(item){
              item.housetype_id = item.id
           })
          var para = {
            id:this.forms.id,
            type:this.forms.type,
            applyCargoList:this.applyCargoList
          }
          that.$axios.post(this.$baseUrl +`/tactic/updatetactic`,para)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.tactic_name = "";
              that.forms.remark = "";
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
        var that = this;
        that.lists =[]
        that.show = false;
        that.cargoEvent();
        var para = {
           id:row.id
         }
        that.$axios.post(this.$baseUrl +`/tactic/gettactic`,para)
          .then(function (res) {
            if (res.data.result== true) {
              that.dialogFormVisible = true;
              that.forms.tactic_name = res.data.pojo[0].tactic_name;
              that.forms.remark = res.data.pojo[0].remark;
              that.forms.id = res.data.pojo[0].id;
              // that.lists = res.data.pojo[0].tactictypeList;
              // that.lists.forEach(function(items,index){
              //   that.applyCargoList.forEach(function(item,indexs){
              //        if(items.housetype_id == item.id){
              //           that.$nextTick(function () {
              //               that.$refs.multipleTable.toggleRowSelection(that.$refs.multipleTable.data[indexs],true);
              //           }) 
              //           }else{
              //               that.$refs.multipleTable.toggleRowSelection(that.$refs.multipleTable.data[indexs],false);   
              //           }
              //           })
              //   })
            }else {
              that.$message.error(that.$t("common."+res.data.msg))
            }
          }).catch(function (error) {
          console.log('逻辑错误')
        }) 
      },
      handleDelete(index,row){
        this.$confirm(this.$t('public.info'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
          var that = this;
        this.$axios.post(this.$baseUrl + '/tactic/deltactic',[row.id])
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
        this.$axios.post(this.$baseUrl + '/tactic/deltactic',that.listId)
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
        this.$confirm(this.$t('public.editstatus'),this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
        if(row.status == 0){
          var para = {
            id:row.id,
            status:1,
          }
          }
         if(row.status == 1){
          var para = {
            id:row.id,
            status:0,
          }
          }
          var that = this;
        this.$axios.post(this.$baseUrl + '/tactic/updatetactic',para)
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
