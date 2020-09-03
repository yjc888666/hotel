<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
      <el-button type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus'  @click="addEvent()">{{$t('public.add')}}</el-button>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" header-align='center'>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="role_name" :label="$t('backstage.role_name')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="status" :label="$t('public.status')" width="auto" align='center'>
        <template slot-scope='scope'>
          <el-tag  v-if="scope.row.status==1">{{$t('backstage.status_1')}}</el-tag>
          <el-tag v-if="scope.row.status==2" type="danger">{{$t('backstage.status_2')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.inquire')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('public.delete')}}</el-button>
          <el-button size="mini" type="success"  style="background: #066197;border-color: #066197;"  @click="handleAuth(scope.$index, scope.row)" >{{$t('backstage.auth')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="$t('backstage.role_id')" :visible.sync="dialogFormVisible" class="dia" width="30%">
      <el-form :model="forms" status-icon :rules="rule" ref="forms" label-width="80px" class="demo-ruleForm mars">
         <el-form-item :label="$t('backstage.role_name')" prop="role_name">
           <el-input v-model.trim="forms.role_name" ></el-input>
         </el-form-item>
          <el-form-item :label="$t('public.status')" prop="status">
          <el-radio v-model="forms.status" label="1">{{$t('backstage.etc_1')}}</el-radio>
          <el-radio v-model="forms.status" label="2">{{$t('backstage.status_2')}}</el-radio>
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
          // title:'后台角色新增',
          title_show:false
        },
        tableData: [],
        show:true,
        dialogFormVisible: false,
        forms: {
          role_name:"",
          status:"1",
        },
        rule: {
          role_name: [
            {required: true, message: '请输入角色名称', trigger: 'blur'}
          ],
          status : [
            {required: true, message: '请输入状态', trigger: 'blur'}
          ],
        },
      }
    },
    created() {
      this.list();
    },
    computed:{
      titles(){
        return {title:this.$t('left.role_1')}
      }
    },
    methods:{
       handleAuth(index,row){
         
         this.$router.push({name:'role_auth',query:{id:row.id}})
      },
      addEvent(){
        this.dialogFormVisible = true;
        this.show = true
      },
      list(){
       this.$axios.post(this.$baseUrl + '/role/list')
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
          that.$axios.post(this.$baseUrl +`/role/set`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.role_name = "";
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
          that.$axios.post(this.$baseUrl +`/role/edit`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.role_name = "";
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
          var fordata = new FormData();
          fordata.append("role_id",row.id )
        this.$axios.post(this.$baseUrl + '/role/get',fordata)
          .then((res) => {
            if (res.data.result) {
              this.forms.role_name = res.data.pojo.role_name;
              this.forms.status = String(res.data.pojo.status);
              this.forms.id = res.data.pojo.id;
              this.dialogFormVisible = true;
              this.show = false;
            }else{
              this.$message({
                message: res.data.msg,
                showClose: true,
                type: 'error'
              });
            }
          })
      },
      handleDelete(index,row){
        this.$confirm(this.$t('public.info'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
        var fordata = new FormData();
        fordata.append("role_id",row.id )
        this.$axios.post(this.$baseUrl + '/role/delete',fordata)
          .then((res) => {
            if (res.data.result) {
              this.$message({
                message:this.$t("common."+res.data.msg),
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

</style>
