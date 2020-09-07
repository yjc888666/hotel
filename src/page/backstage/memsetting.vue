<template>
  <div class="cont">

    <Title :title='title'></Title>
    <div class="User_list_Add_cont">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item :label="$t('backstage.least')" prop="least">
            <el-input v-model.trim="ruleForm.least" class="widthinp"></el-input>
          </el-form-item>
           <el-form-item :label="$t('backstage.increase')" prop="increase">
            <el-input v-model.trim="ruleForm.increase"  class="widthinp"></el-input>
          </el-form-item>
          <el-form-item :label="$t('backstage.score')" prop="score">
            <el-input v-model.trim="ruleForm.score"  class="widthinp"></el-input>
          </el-form-item>
          <el-form-item :label="$t('backstage.money')" prop="money">
            <el-input v-model.trim="ruleForm.money"  class="widthinp"></el-input>
          </el-form-item>
          <el-form-item :label="$t('backstage.max_score')" prop="max_score">
            <el-input v-model.trim="ruleForm.max_score"  class="widthinp"></el-input>
          </el-form-item>
           <el-form-item :label="$t('backstage.top_money')" prop="top_money">
            <el-input v-model.trim="ruleForm.top_money"  class="widthinp"></el-input>
          </el-form-item>
          <el-form-item :label="$t('backstage.give_money')" prop="give_money">
            <el-input v-model.trim="ruleForm.give_money"  class="widthinp"></el-input>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="tijiao">{{$t('backstage.setup')}}</el-button>
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
          title: '会员设置',
          title_show: false
        },
         ruleForm: {
          id:"",
          least:"",
          increase:"",
          score:"",
          money:"",
          max_score:"",
          top_money:"",
          give_money:"",
        },
        // rules: {
        //   least: [
        //     {required: true, message: this.$t('Validation.least_charge'), trigger: 'blur'},
        //     {validator: yz.validateInteger, trigger: 'blur'}
        //   ],
        //   increase:[
        //     {required: true, message: this.$t('Validation.increase'), trigger: 'blur'},
        //     {validator: yz.validateInteger, trigger: 'blur'}
        //   ],
        //    score:[
        //     {required: true, message: this.$t('Validation.integral_rule'), trigger: 'blur'},
        //     {validator: yz.validateInteger, trigger: 'blur'}
        //   ],
        //    money:[
        //     {required: true, message: this.$t('Validation.rule'), trigger: 'blur'},
        //     {validator: yz.validateInteger, trigger: 'blur'}
        //   ],
        //    max_score:[
        //     {required: true, message: this.$t('Validation.integral_limited'), trigger: 'blur'},
        //     {validator: yz.validateInteger, trigger: 'blur'}
        //   ],
        //    top_money:[
        //     {required: true, message: this.$t('Validation.gift'), trigger: 'blur'},
        //     {validator: yz.validateInteger, trigger: 'blur'}
        //   ],
        //    give_money:[
        //     {required: true, message: this.$t('Validation.charge_gift'), trigger: 'blur'},
        //     {validator: yz.validateInteger, trigger: 'blur'}
        //   ],
        // },
      };
    },
    created() {
     this.$axios.post(this.$baseUrl + '/member/setting/get')
        .then((res) => {
          this.ruleForm.id = res.data.pojo.id;
          this.ruleForm.least = res.data.pojo.least;
          this.ruleForm.increase = res.data.pojo.increase;
          this.ruleForm.score = res.data.pojo.score;
          this.ruleForm.money = res.data.pojo.money;
          this.ruleForm.max_score = res.data.pojo.max_score;
          this.ruleForm.top_money = res.data.pojo.top_money;
          this.ruleForm.give_money = res.data.pojo.give_money;
        })
        .catch((res) => {
          console.log(res)
        })
      },
      computed:{
      titles(){
        return {title:this.$t('left.memsetting')}
      },
       rules(){
        const rules={
          least: [
            {required: true, message: this.$t('Validation.least_charge'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
          increase:[
            {required: true, message: this.$t('Validation.increase'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
           score:[
            {required: true, message: this.$t('Validation.integral_rule'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
           money:[
            {required: true, message: this.$t('Validation.rule'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
           max_score:[
            {required: true, message: this.$t('Validation.integral_limited'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
           top_money:[
            {required: true, message: this.$t('Validation.gift'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
           give_money:[
            {required: true, message: this.$t('Validation.charge_gift'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
        }
        return rules
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post(this.$baseUrl + '/member/setting/do', this.ruleForm)
              .then((res) => {
                // console.log(res)
                if (res.data.result == true) {
                  this.$message({
                    message: this.$t("common."+res.data.msg),
                    showClose: true,
                    type: 'success'
                  });
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
