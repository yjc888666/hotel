<template>
  <div class="cont">

    <Title :title='title'></Title>

    <div class="User_list_Add_cont">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item :label="$t('public.username')" prop="username">
            <el-input v-model.trim="ruleForm.username" class="widthinp"></el-input>
          </el-form-item>
          <el-form-item :label="$t('backstage.serial_number')" prop="serial_number">
            <el-input v-model.trim="ruleForm.serial_number"  class="widthinp"></el-input>
          </el-form-item>
           <el-form-item :label="$t('public.gender')" prop="gender">
             <el-radio v-model="ruleForm.gender" label="1">男</el-radio>
             <el-radio v-model="ruleForm.gender" label="2">女</el-radio>
          </el-form-item>
           <el-form-item :label="$t('backstage.birthday')" prop="birthday">
            <el-date-picker
             class="widthinp"
              v-model="ruleForm.birthday"
              value-format="yyyy-MM-dd"
              type="date"
              :placeholder="$t('backstage.birthday')">
          </el-date-picker>
           </el-form-item>
          <el-form-item :label="$t('public.phone')" prop="phone">
            <el-input v-model.trim="ruleForm.phone"  class="widthinp"></el-input>
          </el-form-item>
          <el-form-item :label="$t('public.email')" prop="email">
            <el-input v-model.trim="ruleForm.email"  class="widthinp"></el-input>
          </el-form-item>
          <el-form-item :label="$t('backstage.entry_time')" prop="entry_time">
            <el-date-picker
             class="widthinp"
             v-model="ruleForm.entry_time"
             type="date"
             value-format="yyyy-MM-dd"
             :placeholder="$t('backstage.entry_time')">
          </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('backstage.dept_name')" prop="dept_id">
            <el-select v-model.trim="ruleForm.dept_id" :placeholder="$t('public.please_select')"  class="widthinp">
              <el-option v-for="item in deptType" :key="item.id" :label="item.dept_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('backstage.role_id')" prop="role_id">
            <el-select v-model.trim="ruleForm.role_id" :placeholder="$t('public.please_select')"  class="widthinp">
              <el-option v-for="item in roleType" :key="item.id" :label="item.role_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item :label="$t('public.status')" prop="status">
          <el-radio v-model="ruleForm.status" label="1">{{$t('backstage.status_1')}}</el-radio>
          <el-radio v-model="ruleForm.status" label="2">{{$t('backstage.status_2')}}</el-radio>
          <!-- <el-switch v-model="ruleForm.status" active-color="#13ce66" inactive-color="#ccc"></el-switch> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="tijiao">{{$t('backstage.alter')}}</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>


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
          title: '后台员工修改',
          title_show: true
        },
         ruleForm: {
          id:"",
          username:"",		  
          serial_number:"",	
          entry_time:"",   
          gender:"1",        
          phone:"", 
          dept_id:"",
          birthday:"",
          status:"1",
          role_id:"",
          email:""
        },
        // rules: {
         
        // },
        deptType:[],
        roleType:[],
        options: [],
        value: '',
      };
    },
    created() {
      this.deptList();
      this.roleList();
        // 查询信息
      let fordata = new FormData();
      fordata.append("id",this.$route.query.id)
      this.$axios.post(this.$baseUrl + '/staff/get',fordata)
        .then((res) => {  

          this.ruleForm.username = res.data.pojo.username
          this.ruleForm.status = String(res.data.pojo.status);
          this.ruleForm.serial_number = res.data.pojo.serial_number
          this.ruleForm.entry_time = res.data.pojo.entry_time
          this.ruleForm.gender = String(res.data.pojo.gender)
          this.ruleForm.phone = res.data.pojo.phone
          this.ruleForm.dept_id = res.data.pojo.dept_id
          this.ruleForm.birthday = res.data.pojo.birthday
          this.ruleForm.role_id = res.data.pojo.role_id
          this.ruleForm.email = res.data.pojo.email
        })
        .catch((res)=>{
          console.log(res)
        })
    },
    computed:{
       rules(){
        const rules={
           username: [
            {required: true, message: this.$t('Validation.user_list.username'), trigger: 'blur'},
          ],
          serial_number:[
            {required: true, message: this.$t('Validation.user_list.staff_num'), trigger: 'blur'},
          ],
          entry_time:[
            {required: true, message: this.$t('Validation.user_list.entry_time'), trigger: 'blur'},
          ],
          gender:[
            {required: true, message: this.$t('Validation.user_list.gender'), trigger: 'blur'},
          ],
           phone:[
            {required: true, message: this.$t('Validation.user_list.phone'), trigger: 'blur'},
            {validator: yz.validatePhTelNumber, trigger: 'blur'}
          ],
           dept_id:[
            {required: true, message: this.$t('Validation.user_list.depart'), trigger: 'blur'},
          ],
           birthday:[
            {required: true, message: this.$t('Validation.user_list.birthday'), trigger: 'blur'},
          ],
           status:[
            {required: true, message: this.$t('Validation.user_list.user_status'), trigger: 'blur'},
          ],
           email:[
            // {required: true, message: '请输入邮箱', trigger: 'blur'},
            {validator: yz.validateEmail, trigger: 'blur'}
          ],
          role_id:[
            {required: true, message: this.$t('Validation.user_list.roles'), trigger: 'blur'},
          ],
        }
        return rules
      }
    },
    methods: {
      // 角色列表查询
      roleList(){
       this.$axios.post(this.$baseUrl + '/role/list')
        .then((res) => {
          this.roleType = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })

      },
      deptList(){
         this.$axios.post(this.$baseUrl + '/department/list')
        .then((res) => {
          this.deptType = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.id = this.$route.query.id
            this.$axios.post(this.$baseUrl + '/staff/edit', this.ruleForm)
              .then((res) => {
                // console.log(res)
                if (res.data.result) {
                  this.$message({
                    message: this.$t("common."+res.data.msg),
                    showClose: true,
                    type: 'success'
                  });
                  this.$router.push({name:'userlist'})
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
