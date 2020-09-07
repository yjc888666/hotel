<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
      <el-button type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus'  @click="addEvent()">{{$t('public.add')}}</el-button>
     <div class="lists">
     <el-input v-model.trim="ruleForm.dishes" class="select-left" :placeholder="$t('backstage.dishes')" clearable></el-input>
      <el-button type="primary tijiao" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
    </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" header-align='center'>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="dishes" :label="$t('backstage.dishes')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column :label="$t('public.operate')" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('public.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="$t('backstage.dishes_d')" :visible.sync="dialogFormVisible" class="dia" width="30%">
      <el-form :model="forms" status-icon :rules="rule" ref="forms" label-width="110px" class="demo-ruleForm mars">
         <el-form-item :label="$t('backstage.dishes_d')" prop="dishes">
           <el-input v-model.trim="forms.dishes" ></el-input>
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
          // title:'后台菜品分类列表',
          title_show:false
        },
        ruleForm:{
          dishes:""
        },
        tableData: [],
        show:true,
        dialogFormVisible: false,
        forms: {
          id:"",
          dishes:"",
        },
        // rule: {
        //   dishes: [
        //     {required: true, message: this. $t('Validation.dish_name'), trigger: 'blur'}
        //   ]
        // },
      }
    },
    created() {
      this.submitForm();
    },
    computed:{
      titles(){
        return {title:this.$t('left.dishes')}
      },
      rule(){
        const rule={
          dishes: [
            {required: true, message: this. $t('Validation.dish_name'), trigger: 'blur'}
          ]
        }
        return rule
      }
    },
    methods:{
      addEvent(){
        this.dialogFormVisible = true;
        this.show = true
      },
      submitForm(){
        this.list();
      },
      list(){
        var fordata = new FormData();
        fordata.append("dishes",this.ruleForm.dishes)
       this.$axios.post(this.$baseUrl + '/dishes/getList',fordata)
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
          that.$axios.post(this.$baseUrl +`/dishes/add`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.dishes = "";
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
          that.$axios.post(this.$baseUrl +`/dishes/edit`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.dishes = "";
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
         this.forms.dishes = row.dishes;
         this.forms.id = row.id;
      },
      handleDelete(index,row){
        this.$confirm(this.$t('public.info'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
        var fordata = new FormData();
        fordata.append("id",row.id )
        this.$axios.post(this.$baseUrl + '/dishes/delete',fordata)
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

</style>
