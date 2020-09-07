<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
      <el-button type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus'  @click="addEvent()">{{$t('public.add')}}</el-button>
     <div class="lists">
     <el-input v-model.trim="ruleForm.restaurant" class="select-left" :placeholder="$t('backstage.restaurant')" clearable></el-input>
     <el-input v-model.trim="ruleForm.phone" class="select-left" :placeholder="$t('public.phone')" clearable></el-input>
     <el-input v-model.trim="ruleForm.serial_number" class="select-left" :placeholder="$t('backstage.serials_number')" clearable></el-input>
     <el-select v-model.trim="ruleForm.status" :placeholder="$t('public.status')" class="select-left" clearable>
         <el-option key="0" :label="$t('backstage.business_0')" value="0">{{$t('backstage.business_0')}}</el-option>
         <el-option key="1" :label="$t('backstage.business_1')" value="1">{{$t('backstage.business_1')}}</el-option>
      </el-select>
      <el-button type="primary tijiao" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
     </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" header-align='center'>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="serial_number" :label="$t('backstage.serials_number')" width="auto" show-overflow-tooltip align='center'></el-table-column>   
      <el-table-column prop="restaurant" :label="$t('backstage.restaurant')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="phone" :label="$t('public.phone')" width="auto" show-overflow-tooltip align='center'></el-table-column>
       <el-table-column prop="status" :label="$t('public.status')" width="auto" align='center'> 
        <template slot-scope='scope'>
          <el-tag  v-if="scope.row.status==0" type="danger">{{$t('backstage.business_0')}}</el-tag>
          <el-tag v-if="scope.row.status==1">{{$t('backstage.business_1')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="table_number" :label="$t('backstage.table_number')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column :label="$t('public.operate')" align="center" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('public.delete')}}</el-button>
          <el-button size="mini" @click="statealert(scope.$index, scope.row)">{{$t('public.status')}}</el-button>
        </template>
      </el-table-column>
    </el-table>



    <el-dialog :title="$t('backstage.table_name')" :visible.sync="dialogFormVisible" class="dia" width="30%">
      <el-form :model="forms" status-icon :rules="rule" ref="forms" label-width="130px" class="demo-ruleForm mars">
         <el-form-item :label="$t('backstage.restaurant')" prop="restaurant">
           <el-input v-model.trim="forms.restaurant"></el-input>
         </el-form-item>
          <el-form-item :label="$t('public.phone')" prop="phone"> 
           <el-input v-model.trim="forms.phone" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('public.status')" prop="status"> 
           <el-select v-model.trim="forms.status" :placeholder="$t('public.status')" class="select-left" clearable>
             <el-option key="0" :label="$t('backstage.business_0')" value="0">{{$t('backstage.business_0')}}</el-option>
             <el-option key="1" :label="$t('backstage.business_1')" value="1">{{$t('backstage.business_1')}}</el-option>
           </el-select>
         </el-form-item>
          <el-form-item :label="$t('backstage.table_number')" prop="table_number"> 
           <el-input v-model.trim="forms.table_number" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('backstage.serials_number')" prop="serial_number"> 
           <el-input v-model.trim="forms.serial_number" ></el-input>
         </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary"  @click="submitForms('forms')" v-show="show">{{$t('public.ok')}}</el-button>
        <el-button type="primary"  @click="modifyEvent('forms')" v-show="!show">{{$t('public.edit')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('public.status')" :visible.sync="dialogFormVisible1" class="dia" width="30%">
      <el-form :model="forms1" status-icon :rules="rule1" ref="forms1" label-width="80px" class="demo-ruleForm mars">
          <el-form-item :label="$t('public.status')" prop="status">
            <el-select v-model.trim="forms1.status" :placeholder="$t('public.status')" class="select-left" clearable>
             <el-option key="0" :label="$t('backstage.business_0')" value="0">{{$t('backstage.business_0')}}</el-option>
             <el-option key="1" :label="$t('backstage.business_1')" value="1">{{$t('backstage.business_1')}}</el-option>
           </el-select>
         </el-form-item>
  
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary"  @click="stateEvent('forms1')">{{$t('public.ok')}}</el-button>
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
          // title:'后台餐桌列表',
          title_show:false
        },
        tableData: [],
        show:true,
        ruleForm:{
          restaurant:"",
          phone:"",
          status:"",
          serial_number:""
        },
        dialogFormVisible: false,
        forms: {
          id:"",
          restaurant:"",
          phone:"",
          status:"",
          table_number:"",
          serial_number:""
        },
        // rule: {
        //   serial_number: [
        //     {required: true, message: this.$t('Validation.res_num'), trigger: 'blur'}
        //   ],
        //    table_number: [
        //     {required: true, message: this.$t('Validation.res_count'), trigger: 'blur'},
        //     {validator: yz.validateInteger, trigger: 'blur'}
        //   ],
        //   restaurant: [
        //     {required: true, message:  this.$t('Validation.res_name'), trigger: 'blur'}
        //   ],
        //   phone: [
        //     // {required: true, message: '请输入餐厅负责人电话', trigger: 'blur'},
        //     {validator: yz.validatePhone, trigger: 'blur'}
        //   ],
        //    status: [
        //     {required: true, message: this.$t('Validation.res_status'), trigger: 'blur'}
        //   ],
        // },
        dialogFormVisible1: false,
        forms1: {
          id:"",
          status:""
        },
        // rule1: {
        //    status: [
        //     {required: true, message: this.$t('Validation.res_status'), trigger: 'blur'}
        //   ]
        // },
      }
    },
    created() {
      this.submitForm()
    },
    computed:{
      titles(){
        return {title:this.$t('backstage.table_list')}
      },
      rule(){
        const rule={
          serial_number: [
            {required: true, message: this.$t('Validation.res_num'), trigger: 'blur'}
          ],
           table_number: [
            {required: true, message: this.$t('Validation.res_count'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
          restaurant: [
            {required: true, message:  this.$t('Validation.res_name'), trigger: 'blur'}
          ],
          phone: [
            // {required: true, message: '请输入餐厅负责人电话', trigger: 'blur'},
            {validator: yz.validatePhone, trigger: 'blur'}
          ],
           status: [
            {required: true, message: this.$t('Validation.res_status'), trigger: 'blur'}
          ],
        }
        return rule
      },
       rule1(){
        const rule1={
          status: [
            {required: true, message: this.$t('Validation.res_status'), trigger: 'blur'}
          ]
        }
        return rule1
      }
    },
    methods:{
      addEvent(){
        this.dialogFormVisible = true;
        this.show = true
      },
      statealert(index,row){
        this.forms1.status = String(row.status);
        this.forms1.id = row.id;
        this.dialogFormVisible1 = true;
      },
      stateEvent(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
        this.$axios.post(this.$baseUrl + '/restaurant/updateStatus',this.forms1)
          .then((res) => {
            if (res.data.result) {
              this.$message({
                message: this.$t("common."+res.data.msg),
                showClose: true,
                type: 'success'
              });
              this.dialogFormVisible1 =false;
              this.list();
            }else{
              this.$message({
                message: this.$t("common."+res.data.msg),
                showClose: true,
                type: 'error'
              });
            }
          })
            }
        })
      },
      list(){
      let fordata = new FormData();
      fordata.append("restaurant",this.ruleForm.restaurant)
      fordata.append("phone",this.ruleForm.phone)
      fordata.append("status",this.ruleForm.status)
      fordata.append("serial_number",this.ruleForm.serial_number)
      this.$axios.post(this.$baseUrl + '/restaurant/getList',fordata)
        .then((res) => {
          this.tableData = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })
      },
      submitForm(){
        this.list();
      },
       submitForms(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this;
          that.$axios.post(this.$baseUrl +`/restaurant/add`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.restaurant = "";
              that.forms.phone = "";
              that.forms.table_num = "";
              that.forms.status = "";
              that.forms.serial_number = "";
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
          that.$axios.post(this.$baseUrl +`/restaurant/edit`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.restaurant = "";
              that.forms.phone = "";
              that.forms.table_num = "";
              that.forms.status = "";
              that.forms.serial_number = "";
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
        var that = this;
         this.dialogFormVisible = true;
         this.show = false;
         that.forms.serial_number = row.serial_number;
         that.forms.phone = row.phone;
         that.forms.restaurant = row.restaurant;
         that.forms.table_num = row.table_num;
         that.forms.status = String(row.status);
         that.forms.id = row.id;
      },
      handleDelete(index,row){
        this.$confirm(this.$t('public.info'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
        var fordata = new FormData();
        fordata.append("id",row.id )
        this.$axios.post(this.$baseUrl + '/restaurant/delete',fordata)
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
          message:  this.$t('public.cancel')
        });
      });


        
      }
    }
  }
</script>

<style scoped="scoped">
.dia .el-select{
  width:100%!important;
}
</style>
