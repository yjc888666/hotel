<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
      <el-button type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus'  @click="addEvent()">{{$t('public.add')}}</el-button>
     <div class="lists">
     <el-input v-model.trim="ruleForm.serial_number" class="select-left" :placeholder="$t('backstage.serialsss_number')" clearable></el-input>
     <el-input v-model.trim="ruleForm.menu_name" class="select-left" :placeholder="$t('backstage.dishes')" clearable></el-input>
     <el-select v-model.trim="ruleForm.status" :placeholder="$t('public.status')" clearable>
        <el-option key="1" :label="$t('backstage.on_sale_1')" value="1">{{$t('backstage.on_sale_1')}}</el-option>
        <el-option key="2" :label="$t('backstage.on_sale_2')" value="2">{{$t('backstage.on_sale_2')}}</el-option>
      </el-select>
      <el-select v-model.trim="ruleForm.dishes_id" :placeholder="$t('backstage.dishes_id')"  clearable>
          <el-option v-for="item in dishesType" :key="item.id" :label="item.dishes" :value="item.id"></el-option>
       </el-select>
      <el-button type="primary tijiao" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
    </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" header-align='center'>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="menu_name" :label="$t('backstage.dishes')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="serial_number" :label="$t('backstage.serialsss_number')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="price" :label="$t('backstage.price')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="status" :label="$t('public.status')" width="auto" align='center'> 
        <template slot-scope='scope'>
          <el-tag v-if="scope.row.status==1" type="danger" @click="handlestatus(scope.$index, scope.row,scope.row.status)">{{$t('backstage.on_sale_1')}}</el-tag>
          <el-tag v-if="scope.row.status==2" @click="handlestatus(scope.$index, scope.row,scope.row.status)">{{$t('backstage.on_sale_2')}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('public.operate')" align="center" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('public.delete')}}</el-button>
          <el-button size="mini" @click="statealert(scope.$index, scope.row)">{{$t('public.status')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="$t('backstage.food_dishes')" :visible.sync="dialogFormVisible" class="dia" width="30%">
      <el-form :model="forms" status-icon :rules="rule" ref="forms" label-width="80px" class="demo-ruleForm mars">
         <el-form-item :label="$t('backstage.serialsss_number')" prop="serial_number">
           <el-input v-model.trim="forms.serial_number" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('backstage.dishes')" prop="menu_name">
           <el-input v-model.trim="forms.menu_name" ></el-input>
         </el-form-item>
          <el-form-item :label="$t('public.status')" prop="status" v-if="!show">
            <el-select v-model.trim="forms.status" :placeholder="$t('backstage.status')" clearable>
              <el-option key="1" :label="$t('backstage.on_sale_1')" value="1" >{{$t('backstage.on_sale_1')}}</el-option>
              <el-option key="2" :label="$t('backstage.on_sale_2')" value="2">{{$t('backstage.on_sale_2')}}</el-option>
            </el-select>
         </el-form-item>
         <el-form-item :label="$t('backstage.price')" prop="price">
           <el-input v-model.trim="forms.price" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('backstage.dishes_id')" prop="dishes_id">
            <el-select v-model.trim="forms.dishes_id" :placeholder="$t('backstage.dishes_id')"  clearable>
              <el-option v-for="item in dishesType" :key="item.id" :label="item.dishes" :value="item.id"></el-option>
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
              <el-option key="2" :label="$t('backstage.on_sale_2')" value="2">{{$t('backstage.on_sale_2')}}</el-option>
              <el-option key="1" :label="$t('backstage.on_sale_1')" value="1">{{$t('backstage.on_sale_1')}}</el-option>
            </el-select>
         </el-form-item>
  
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary"  @click="handlestatus('forms1')">{{$t('public.ok')}}</el-button>
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
          // title:'后台菜品列表',
          title_show:false
        },
        dishesType:[],
        ruleForm:{
          serial_number:"",
          menu_name:"",
          status:"",
          dishes_id:"",
        },
        tableData: [],
        show:true,
        dialogFormVisible: false,
        forms: {
          serial_number:"",
          menu_name:"",
          status:"",
          dishes_id:"",
          price:""
        },
        // rule: {
        //   serial_number: [
        //     {required: true, message: this.$t('Validation.dish_num'), trigger: 'blur'}
        //   ],
        //    menu_name: [
        //     {required: true, message: this.$t('Validation.dish_name'), trigger: 'blur'}
        //   ],
        //    status: [
        //     {required: true, message: this.$t('Validation.dish_status'), trigger: 'blur'}
        //   ],
        //   price: [
        //     {required: true, message:  this.$t('Validation.dish_price'), trigger: 'blur'},
        //     {validator: yz.validateMoney, trigger: 'blur'}
        //   ],
        //   dishes_id: [
        //     {required: true, message: this.$t('Validation.dish_sort'), trigger: 'blur'}
        //   ]
        // },
        dialogFormVisible1: false,
        forms1: {
          id:"",
          status:""
        },
        // rule1: {
        //    status: [
        //     {required: true, message: this.$t('Validation.status'), trigger: 'blur'}
        //   ]
        // },
      }
    },
    created() {
      this.submitForm();
        this.$axios.post(this.$baseUrl + '/dishes/getList')
        .then((res) => {
          this.dishesType = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })
    },
    computed:{
      titles(){
        return {title:this.$t('left.menu')}
      },
       rule(){
        const rule={
          serial_number: [
            {required: true, message: this.$t('Validation.dish_num'), trigger: 'blur'}
          ],
           menu_name: [
            {required: true, message: this.$t('Validation.dish_name'), trigger: 'blur'}
          ],
           status: [
            {required: true, message: this.$t('Validation.dish_status'), trigger: 'blur'}
          ],
          price: [
            {required: true, message:  this.$t('Validation.dish_price'), trigger: 'blur'},
            {validator: yz.validateMoney, trigger: 'blur'}
          ],
          dishes_id: [
            {required: true, message: this.$t('Validation.dish_sort'), trigger: 'blur'}
          ]
        }
        return rule
      },
      rule1(){
        const rule1={
           status: [
            {required: true, message: this.$t('Validation.status'), trigger: 'blur'}
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
      submitForm(){
        this.list();
      },
      list(){
        var fordata = new FormData();
        fordata.append("serial_number",this.ruleForm.serial_number)
        fordata.append("menu_name",this.ruleForm.menu_name)
        fordata.append("status",this.ruleForm.status)
        fordata.append("dishes_id",this.ruleForm.dishes_id)
       this.$axios.post(this.$baseUrl + '/menu/getList',fordata)
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
           var para = {
              serial_number:this.forms.serial_number,
              menu_name:this.forms.menu_name,
              dishes_id:this.forms.dishes_id,
              price:this.forms.price,
           }
          that.$axios.post(this.$baseUrl +`/menu/add`,para)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.serial_number = "";
              that.forms.menu_name = "";
              that.forms.status = "";
              that.forms.dishes_id = "";
              that.forms.price = "";
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
          that.$axios.post(this.$baseUrl + `/menu/edit`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.serial_number = "";
              that.forms.menu_name = "";
              that.forms.status = "";
              that.forms.dishes_id = "";
              that.forms.price = "";
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
         this.forms.menu_name = row.menu_name;
         this.forms.serial_number = row.serial_number;
         this.forms.status = String(row.status);
         this.forms.id = row.id;
         this.forms.dishes_id = row.dishes_id;
         this.forms.price = row.price;
      },
      statealert(index,row){
        this.forms1.status = String(row.status);
        this.forms1.id = row.id;
        this.dialogFormVisible1 = true;
      },

       handlestatus(formName){
        this.$refs[formName].validate((valid) => {
       if(valid) {
        this.$axios.post(this.$baseUrl + '/menu/updateStatus',this.forms1)
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
       handleDelete(index,row){
        this.$confirm(this.$t('public.info'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
        var fordata = new FormData();
        fordata.append("id",row.id )
        this.$axios.post(this.$baseUrl + '/menu/delete',fordata)
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

</style>
