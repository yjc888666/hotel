<template>
  <div class="cont">

    <Title :title='titles'></Title>
   
  
      <el-table :data="tableData" stripe style="width: 100%" header-align='center' class="mars">
        <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
        <el-table-column prop="name" :label="$t('backstage.document_name')" width="auto" show-overflow-tooltip align='center'></el-table-column>
        <el-table-column prop="phone" :label="$t('public.phone')" width="auto" show-overflow-tooltip align='center'></el-table-column>
        <el-table-column prop="address" :label="$t('backstage.address')" width="auto" show-overflow-tooltip align='center'></el-table-column>
        <el-table-column prop="remark" :label="$t('public.remark')" width="auto" show-overflow-tooltip align='center'></el-table-column>
        <el-table-column :label="$t('public.operate')" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" type="danger">{{$t('backstage.setup')}}</el-button>
          </template>
        </el-table-column>
    </el-table>
  
       <el-dialog :title="$t('left.department_1')" :visible.sync="dialogFormVisible" class="dia" width="30%">
         <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm mars">
            <el-form-item :label="$t('backstage.document_name')" prop="name">
              <el-input v-model.trim="ruleForm.name"  disabled></el-input>
            </el-form-item>
            <el-form-item :label="$t('public.phone')" prop="phone">
              <el-input v-model.trim="ruleForm.phone"  ></el-input>
            </el-form-item>
            <el-form-item :label="$t('backstage.address')" prop="address">
              <el-input v-model.trim="ruleForm.address" ></el-input>
            </el-form-item>
            <el-form-item :label="$t('public.remark')" prop="remark">
              <el-input type="textarea" :rows="2" v-model.trim="ruleForm.remark"></el-input>
            </el-form-item>
           </el-form>
             <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">{{$t('public.cancel')}}</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')" class="tijiao">{{$t('backstage.setup')}}</el-button>
            </div>             
        </el-dialog>

    


  </div>
</template>

<script>
  import Title from '../../components/cont_title.vue'
  import yz from '../../config/validation.js'
  export default {
    components: {
      Title
    },
    data() {
      return {
        title: {
          title: '打印设置',
          title_show: false
        },
         ruleForm: {
          id:"",
          name:"",
          remark:"",
          phone:"",
          address:"",
        },
        rules: {
          name: [
            {required: true, message: '请输入单据名称', trigger: 'blur'},
          ],
          remark:[
            {required: true, message: '请输入单据备注', trigger: 'blur'},
          ],
           phone:[
            {required: true, message: '请输入电话', trigger: 'blur'},
            // {validator: yz.validatePhTelNumber, trigger: 'blur'}
          ],
           address:[
            {required: true, message: '请输入地址', trigger: 'blur'},
          ],
        },
        tableData:[],
        dialogFormVisible:false,

      };
    },
    created() {
       this.list()
      },
      computed:{
      titles(){
        return {title:this.$t('left.printsetting')}
      }
    },
    methods: {
      list(){
       this.$axios.post(this.$baseUrl + '/print/setting/list')
          .then((res) => {
            this.tableData = res.data.pojo;
          })
          .catch((res) => {
            console.log(res)
          })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this;
            this.$axios.post(this.$baseUrl + '/print/setting/do', this.ruleForm)
              .then((res) => {
                // console.log(res)
                if (res.data.result == true) {
                  this.$message({
                    message: this.$t("common."+res.data.msg),
                    showClose: true,
                    type: 'success'
                  });
                  this.dialogFormVisible = false;
                  that.list();
                }else{
                   this.$message({
                    message: this.$t("common."+res.data.msg),
                    showClose: true,
                    type: 'error'
                  });
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       handleEdit(index,row){
         this.dialogFormVisible = true;
         this.ruleForm.id = row.id;
         this.ruleForm.name = row.name;
         this.ruleForm.remark = row.remark;
         this.ruleForm.phone = row.phone;
         this.ruleForm.address = row.address;
      },
    }
  }
</script>

<style scoped="scoped">
  .User_list_Add_cont {
    width: 400px;
    margin-top: 50px;
    margin-left: 50px;
  }

  .el-form-item {
    margin-bottom: 56px;
  }
</style>
