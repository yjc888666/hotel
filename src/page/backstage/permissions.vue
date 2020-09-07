<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
      <el-button type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus'  @click="addEvent()">{{$t('public.add')}}</el-button>
      <el-button type="success" size="small" style="background: #066197;border-color: #066197;" icon="el-icon-arrow-down" @click="Open_click">{{$t('backstage.arrow_down')}}</el-button>
    </div>

    <!-- :default-expand-all='Open'
       :tree-props="{children: 'children', hasChildren: 'hasChildren'}" -->
    <el-table :data="tableData" stripe style="width: 100%" header-align='center' row-key="id" >
      <!-- <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column> -->
      <el-table-column prop="name" :label="$t('backstage.name')" width="auto" show-overflow-tooltip align='left'></el-table-column>
      <el-table-column prop="permissions" :label="$t('backstage.permissions')" width="auto" show-overflow-tooltip align='left'></el-table-column>
       <el-table-column prop="status" :label="$t('public.status') " width="200px" align='center'>
        <template slot-scope='scope' >
           <el-tag  v-if="scope.row.status==1" type="danger">{{$t('backstage.delete_1')}}</el-tag>
           <el-tag  v-if="scope.row.status==0">{{$t('backstage.delete_0')}}</el-tag>
        </template>
       </el-table-column>
       <el-table-column prop="grant" :label="$t('backstage.auth')" width="200px" align='center'>
        <template slot-scope='scope' >
           <el-tag  v-if="scope.row.grant==1" type="danger">{{$t('backstage.grant_1')}}</el-tag>
           <el-tag  v-if="scope.row.grant==0">{{$t('backstage.grant_0')}}</el-tag>
        </template>
       </el-table-column>
      <el-table-column :label="$t('public.operate')" align="center">         

        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.inquire')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('public.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="$t('backstage.power')" :visible.sync="dialogFormVisible" class="dia" width="30%">
      <el-form :model="forms" status-icon :rules="rule" ref="forms" label-width="80px" class="demo-ruleForm mars">
         <el-form-item :label="$t('backstage.name')" prop="name">
           <el-input v-model.trim="forms.name" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('backstage.permissions')" prop="permissions">
           <el-input v-model.trim="forms.permissions" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('backstage.pid')" prop="pid">
          <!-- <el-select v-model="forms.pid" placeholder="请选择">
            <el-option v-for="item in tableData" :key="item.id" :label="item.title" :value="item.id">
            </el-option>
          </el-select> -->
            <SelectTree
               :props="props"
               :options="tableData"
               :value="forms.pid"
               :clearable="isClearable"
               :accordion="isAccordion"
               @getValue="getValue($event)"/>
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
  import SelectTree from "../../components/treeSelect.vue";
  import yz from '../../config/validation.js'
  export default {
    components:{Title,SelectTree},
    data() {
      return {
        title:{
          // title:'后台权限新增',
          title_show:false
        },
        tableData: [],
        show:true,
        dialogFormVisible: false,
        isClearable:true,      // 可清空（可选）
        isAccordion:false,      // 可收起（可选）
        // valueId:'0',            
        props:{                // 配置项（必选）
          value: 'id',         // 初始ID（可选）
          label: 'name',
          children: 'children',
          // disabled:true
        },
        forms: {
          name:"",
          permissions:"",
          pid:"0"
        },
        // rule: {
        //   name: [
        //     {required: true, message: this.$t('Validation.permission_name'), trigger: 'blur'}
        //   ],
        //   permissions: [
        //     {required: true, message: this.$t('Validation.permission_rule'), trigger: 'blur'}
        //   ],
        //   pid: [
        //     {required: true, message: this.$t('Validation.permission_father'), trigger: 'blur'}
        //   ]
        // },
      }
    },
    created() {
      this.list();
    },
    computed:{
      titles(){
        return {title:this.$t('left.permissions')}
      },
      rule(){
        const rule={
         name: [
            {required: true, message: this.$t('Validation.permission_name'), trigger: 'blur'}
          ],
          permissions: [
            {required: true, message: this.$t('Validation.permission_rule'), trigger: 'blur'}
          ],
          pid: [
            {required: true, message: this.$t('Validation.permission_father'), trigger: 'blur'}
          ]
        }
        return rule
      }
    },
    methods:{
       Open_click(){
        var els = document.getElementsByClassName('el-table__expand-icon') //获取点击的箭头元素
        // console.log(els)
        for (let i = 0; i < els.length; i++) {
          els[i].click()
        }
      },
       // 取值
      getValue(value){
        this.forms.pid = value
        // console.log(value);
      },
      addEvent(){
        this.dialogFormVisible = true;
        this.show = true
      },
      list(){
       this.$axios.post(this.$baseUrl + '/permissions/list')
        .then((res) => {
          this.tableData = res.data.pojo;
        })
        .catch((res) => {
          console.log(res)
        })
      },
       submitForms(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this;
          that.$axios.post(this.$baseUrl +`/permissions/set`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.dept_name = "";
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
          that.$axios.post(this.$baseUrl +`/permissions/edit`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.dept_name = "";
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
          fordata.append("id",row.id )
        this.$axios.post(this.$baseUrl + '/permissions/get',fordata)
          .then((res) => {
            if (res.data.result) {
              this.forms.name = res.data.pojo.name;
              this.forms.permissions = res.data.pojo.permissions;
              this.forms.pid = res.data.pojo.pid;
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
        fordata.append("id",row.id )
        this.$axios.post(this.$baseUrl + '/permissions/delete',fordata)
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
    }
  }
</script>

<style scoped="scoped">
.el-select{
  width:100%;
}
</style>
