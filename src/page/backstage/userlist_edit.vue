<template>
  <div class="cont">

    <Title :title='title'></Title>

    <div class="User_list_Add_cont">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model.trim="ruleForm.username" class="widthinp"></el-input>
          </el-form-item>
          <el-form-item label="员工编号" prop="serial_number">
            <el-input v-model.trim="ruleForm.serial_number"  class="widthinp"></el-input>
          </el-form-item>
           <el-form-item label="性别" prop="gender">
             <el-radio v-model="ruleForm.gender" label="1">男</el-radio>
             <el-radio v-model="ruleForm.gender" label="2">女</el-radio>
          </el-form-item>
           <el-form-item label="生日" prop="birthday">
            <el-date-picker
             class="widthinp"
              v-model="ruleForm.birthday"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择生日">
          </el-date-picker>
           </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model.trim="ruleForm.phone"  class="widthinp"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model.trim="ruleForm.email"  class="widthinp"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" prop="entry_time">
            <el-date-picker
             class="widthinp"
             v-model="ruleForm.entry_time"
             type="date"
             value-format="yyyy-MM-dd"
             placeholder="选择入职时间">
          </el-date-picker>
          </el-form-item>
          <el-form-item label="部门名称" prop="dept_id">
            <el-select v-model.trim="ruleForm.dept_id" placeholder="请选择"  class="widthinp">
              <el-option v-for="item in deptType" :key="item.id" :label="item.dept_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色" prop="role_id">
            <el-select v-model.trim="ruleForm.role_id" placeholder="请选择"  class="widthinp">
              <el-option v-for="item in roleType" :key="item.id" :label="item.role_name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="ruleForm.status" label="1">正常</el-radio>
          <el-radio v-model="ruleForm.status" label="2">禁用</el-radio>
          <!-- <el-switch v-model="ruleForm.status" active-color="#13ce66" inactive-color="#ccc"></el-switch> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="tijiao">立即修改</el-button>
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
        rules: {
          username: [
            {required: true, message: '请输入用户姓名', trigger: 'blur'},
          ],
          serial_number:[
            {required: true, message: '请输入员工编号', trigger: 'blur'},
          ],
          entry_time:[
            {required: true, message: '请输入入职时间', trigger: 'blur'},
          ],
          gender:[
            {required: true, message: '请输入性别', trigger: 'blur'},
          ],
           phone:[
            {required: true, message: '请输入电话', trigger: 'blur'},
            {validator: yz.validatePhTelNumber, trigger: 'blur'}
          ],
           dept_id:[
            {required: true, message: '请输入部门', trigger: 'blur'},
          ],
           birthday:[
            {required: true, message: '请输入生日', trigger: 'blur'},
          ],
           status:[
            {required: true, message: '请输入状态', trigger: 'blur'},
          ],
           email:[
            // {required: true, message: '请输入邮箱', trigger: 'blur'},
            {validator: yz.validateEmail, trigger: 'blur'}
          ],
          role_id:[
            {required: true, message: '请输入角色', trigger: 'blur'},
          ],
        },
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
