<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
      <el-button type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus'  @click="addEvent()">{{$t('public.add')}}</el-button>
      <el-button type="danger" size="small"   icon='el-icon-delete'  @click="delEvent()">{{$t('public.alldelete')}}</el-button>
    <div class="lists">
     <el-input v-model.trim="ruleForm.classify_name" class="time-left" :placeholder="$t('reception.goods')" clearable></el-input>
     <el-button type="primary tijiao" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
     </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" header-align='center' @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="classify_name" :label="$t('reception.goods')" width="auto" show-overflow-tooltip align='center'></el-table-column>
       <!-- <el-table-column prop="remark" label="备注" width="auto" show-overflow-tooltip align='center'></el-table-column> -->
      <el-table-column :label="$t('public.operate')" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('public.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="$t('reception.goods')" :visible.sync="dialogFormVisible" class="dia" width="30%">
      <el-form :model="forms" status-icon :rules="rule" ref="forms" label-width="80px" class="demo-ruleForm mars">
         <!-- <el-form-item label="仓库编号" prop="ware_number">
           <el-input v-model.trim="forms.ware_number" ></el-input>
         </el-form-item> -->
         <el-form-item :label="$t('reception.goods')" prop="classify_name">
           <el-input v-model.trim="forms.classify_name" @keyup.enter.native="submitForms('forms')" ></el-input>
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
          // title:'货物分类列表',
          title_show:false
        },
        multipleSelection: [],
        tableData: [],
        show:true,
        dialogFormVisible: false,
         ruleForm: {
          classify_name:"",
        },
        forms: {
          id:"",
          classify_name:"",
        },
        
      }
    },
    created() {
      this.list();
    },
    methods:{
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
       submitForm() {
        var that=this;
        that.list()
      },
      addEvent(){
        this.dialogFormVisible = true;
        this.show = true
      },
      list(){
        var para = {
          classify_name:this.ruleForm.classify_name,
        }
       this.$axios.post(this.$baseUrl + '/cargoClassify/getClassify',para)
        .then((res) => {
          this.tableData = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })
      },
       submitForms(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          var that = this;
          that.$axios.post(this.$baseUrl +`/cargoClassify/addClassify`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.classify_name = "";
              that.list();
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
          that.$axios.post(this.$baseUrl +`/cargoClassify/updateClassify`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.classify_name = "";
              that.list();
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
         this.forms.classify_name = row.classify_name;
         this.forms.id = row.id;
      },
      handleDelete(index,row){
        this.$confirm(this.$t('public.info'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
        // var fordata = new FormData();
        // fordata.append("dept_id",row.id )
        this.$axios.post(this.$baseUrl + '/cargoClassify/delClassify',[row.id])
          .then((res) => {
            if (res.data.result) {
              this.$message({
                message: this.$t("common."+res.data.msg),
                showClose: true,
                type: 'success'
              });
              this.tableData.splice(index,1)
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
           that.multipleSelection.forEach(function(index){
              that.listId.push(index.id)
            })
        this.$axios.post(this.$baseUrl + '/cargoClassify/delClassify',that.listId)
          .then((res) => {
            if (res.data.result) {
              this.$message({
                message: this.$t("common."+res.data.msg),
                showClose: true,
                type: 'success'
              });
              this.list();
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
      }
    },
    computed:{
      titles(){
        return {title:this.$t('reception.tabulation')}
      },
      rule(){
        const rule={
         classify_name: [
            {required: true, message: this.$t('reception.goods_name'), trigger: 'blur'}
          ]
        }
        return rule
      }
    },
  }
</script>

<style scoped="scoped">

</style>
