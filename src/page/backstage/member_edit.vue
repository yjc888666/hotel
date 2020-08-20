<template>
  <div class="cont">

    <Title :title='title'></Title>

    <div class="User_list_Add_cont">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="会员名称 " prop="name">
            <el-input v-model.trim="ruleForm.name" class="widthinp"></el-input>
          </el-form-item>
         
          <el-form-item label="享有折扣" prop="discount">
            <el-input v-model.trim="ruleForm.discount"  class="widthinp"></el-input>
          </el-form-item>
         
          <el-form-item label="单次充值" prop="recharge">
            <el-input v-model.trim="ruleForm.recharge"  class="widthinp"></el-input>
          </el-form-item>
          <el-form-item label="最少消费" prop="consume_mix">
            <el-input v-model.trim="ruleForm.consume_mix"  class="widthinp"></el-input>
          </el-form-item>
          <el-form-item label="消费上限" prop="consume_max">
            <el-input v-model.trim="ruleForm.consume_max"  class="widthinp"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input class="widthinp" type="textarea" :rows="2" v-model.trim="ruleForm.remark"></el-input>
            <!-- <el-input v-model.trim="ruleForm.score"  class="widthinp"></el-input> -->
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
          title: '后台会员修改',
          title_show: true
        },
         ruleForm: {
          name:"",
          remark:"",
          discount:"",
          recharge:"",
          consume_mix:"",
          consume_max:""
        },
        rules: {
          name: [
            {required: true, message: '请输入会员等级名称', trigger: 'blur'},
          ],
          discount:[
            {required: true, message: '请输入享有折扣', trigger: 'blur'},
            {validator: yz.validateInp, trigger: 'blur'}
          ],
          consume_mix:[
            {required: true, message: '请输入最少消费', trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
           recharge:[
            {required: true, message: '请输入单次充值', trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
           consume_max:[
            {required: true, message: '请输入消费上限', trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
        },
      };
    },
    created() {
         // 查询信息
      let fordata = new FormData();
      fordata.append("id",this.$route.query.id)
      this.$axios.post(this.$baseUrl + '/memberLevel/get',fordata)
        .then((res) => {  
          this.ruleForm.id = res.data.pojo.id;
          this.ruleForm.name = res.data.pojo.name;
          this.ruleForm.remark = res.data.pojo.remark
          this.ruleForm.discount = res.data.pojo.discount
          this.ruleForm.consume_mix = res.data.pojo.consume_mix
          this.ruleForm.recharge = res.data.pojo.recharge
          this.ruleForm.consume_max = res.data.pojo.consume_max
        })
        .catch((res)=>{
          console.log(res)
        })
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(this.$baseUrl + '/memberLevel/edit', this.ruleForm)
              .then((res) => {
                // console.log(res)
                if (res.data.result == true) {
                  this.$message({
                    message: this.$t("common."+res.data.msg),
                    showClose: true,
                    type: 'success'
                  });
                  this.$router.push({name:'member'})
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
