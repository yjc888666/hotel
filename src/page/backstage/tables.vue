<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
      <el-button type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus'  @click="addEvent()">{{$t('public.add')}}</el-button>
     <div class="lists">
     <el-input v-model.trim="ruleForm.serial_number" class="select-left" :placeholder="$t('backstage.serialss_number')" clearable></el-input>
     <el-select v-model.trim="ruleForm.restaurant_id" :placeholder="$t('backstage.restaurant')" class="select-left" clearable>
        <el-option v-for="item in restauranType" :key="item.id" :label="item.restaurant" :value="item.id"></el-option>
     </el-select>
     <el-select v-model.trim="ruleForm.status" :placeholder="$t('public.status')" class="select-left" clearable>
         <el-option key="0" label="空闲" value="0">{{$t('backstage.idle_0')}}</el-option>
         <el-option key="2" label="预定" value="2">{{$t('backstage.idle_2')}}</el-option>
         <el-option key="1" label="有客" value="1">{{$t('backstage.idle_1')}}</el-option>
      </el-select>
      <el-button type="primary tijiao" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
     </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" header-align='center'>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="serial_number" :label="$t('backstage.serialss_number')" width="auto" show-overflow-tooltip align='center'></el-table-column>
       <el-table-column prop="capacity" :label="$t('backstage.capacity')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="status" :label="$t('public.status')" width="auto" align='center'> 
        <template slot-scope='scope'>
          <el-tag  v-if="scope.row.status==0" type="danger">{{$t('backstage.idle_0')}}</el-tag>
          <el-tag v-if="scope.row.status==2">{{$t('backstage.idle_2')}}</el-tag>
          <el-tag v-if="scope.row.status==1">{{$t('backstage.idle_1')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('public.delete')}}</el-button>
          <el-button size="mini" @click="statealert(scope.$index, scope.row)">{{$t('public.status')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="$t('backstage.table_name')" :visible.sync="dialogFormVisible" class="dia" width="30%">
      <el-form :model="forms" status-icon :rules="rule" ref="forms" label-width="80px" class="demo-ruleForm mars">
         <el-form-item :label="$t('backstage.serialss_number')" prop="serial_number">
           <el-input v-model.trim="forms.serial_number"></el-input>
         </el-form-item>
          <el-form-item :label="$t('backstage.capacity')" prop="capacity"> 
           <el-input v-model.trim="forms.capacity" ></el-input>
         </el-form-item>
          <el-form-item :label="$t('backstage.restaurant_id')" prop="restaurant_id">
            <el-select v-model.trim="forms.restaurant_id" :placeholder="$t('backstage.restaurant_id')" clearable>
              <el-option v-for="item in restauranType" :key="item.id" :label="item.restaurant" :value="item.id"></el-option>
            </el-select>
         </el-form-item>
          <el-form-item :label="$t('public.status')" prop="status" v-if="!show">
            <el-select v-model.trim="forms.status" :placeholder="$t('public.status')"  clearable>
              <el-option key="0" :label="$t('backstage.idle_0')" value="0">{{$t('backstage.idle_0')}}</el-option>
              <el-option key="2" :label="$t('backstage.idle_2')" value="2">{{$t('backstage.idle_2')}}</el-option>
              <el-option key="1" :label="$t('backstage.idle_1')" value="1">{{$t('backstage.idle_1')}}</el-option>
            </el-select>
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
            <el-select v-model.trim="forms1.status" :placeholder="$t('public.status')"  clearable>
              <el-option key="0" :label="$t('backstage.idle_0')" value="0">{{$t('backstage.idle_0')}}</el-option>
              <el-option key="2" :label="$t('backstage.idle_2')" value="2">{{$t('backstage.idle_2')}}</el-option>
              <el-option key="1" :label="$t('backstage.idle_1')" value="1">{{$t('backstage.idle_1')}}</el-option>
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
          serial_number:"",
          status:"",
          restaurant_id:""
        },
        dialogFormVisible: false,
        forms: {
          serial_number:"",
          capacity:"",
          restaurant_id:"",
          status:""
        },
        // rule: {
         
        // },
        dialogFormVisible1: false,
        forms1: {
          id:"",
          status:""
        },
        // rule1: {
         
        // },
        restauranType:[],
      }
    },
    created() {
      this.submitForm();
      this.$axios.post(this.$baseUrl + '/restaurant/getList')
        .then((res) => {
          this.restauranType = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })
    },
    computed:{
      titles(){
        return {title:this.$t('backstage.table_list')}
      },
      rule(){
        const rule={
          serial_number: [
            {required: true, message: this.$t('Validation.table.table_num'), trigger: 'blur'}
          ],
           capacity: [
            {required: true, message: this.$t('Validation.table.table_people'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
          restaurant_id: [
            {required: true, message: this.$t('Validation.table.res'), trigger: 'blur'}
          ],
           status: [
            {required: true, message: this.$t('Validation.table.table_st'), trigger: 'blur'}
          ]
        }
        return rule
      },
       rule1(){
        const rule1={
           status: [
            {required: true, message: this.$t('Validation.table.table_st'), trigger: 'blur'}
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
        this.$axios.post(this.$baseUrl + '/table/updateStatus',this.forms1)
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
      fordata.append("serial_number",this.ruleForm.serial_number)
      fordata.append("restaurant_id",this.ruleForm.restaurant_id)
      fordata.append("status",this.ruleForm.status)
       this.$axios.post(this.$baseUrl + '/table/getList',fordata)
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
             var para = {
              serial_number:this.forms.serial_number,
              capacity:this.forms.capacity,
              restaurant_id:this.forms.restaurant_id,
           }
          that.$axios.post(this.$baseUrl +`/table/add`,para)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.serial_number = "";
              that.forms.capacity = "";
              that.forms.restaurant_id = "";
              that.forms.status = "";
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
          that.$axios.post(this.$baseUrl +`/table/edit`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.serial_number = "";
              that.forms.capacity = "";
              that.forms.restaurant_id = "";
              that.forms.status = "";
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
         that.forms.capacity = row.capacity;
         that.forms.restaurant_id = String(row.restaurant_id);
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
        this.$axios.post(this.$baseUrl + '/table/delete',fordata)
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


        
      }
    }
  }
</script>

<style scoped="scoped">
.el-select{
  width:100%;
}
</style>
