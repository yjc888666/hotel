<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
     <div class="lists">
     <el-select v-model.trim="ruleForm.phase" :placeholder="$t('backstage.phase')" clearable>
          <el-option v-for="item in phasetype" :key="item.name" :label="item.name" :value="item.name"></el-option>
        </el-select>
     <el-date-picker v-model="ruleForm.startTime" type="date" :placeholder="$t('backstage.startTime')" value-format="timestamp" clearable></el-date-picker>
     <el-date-picker v-model="ruleForm.endTime" type="date" :placeholder="$t('backstage.endTime') " value-format="timestamp" clearable></el-date-picker>
      <el-button type="primary tijiao" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
     </div>
    </div>
  
    <el-table :data="tableData" stripe style="width: 100%" header-align='center'>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="payment_time" :label="$t('backstage.payment_time')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="profit" :label="$t('backstage.profit')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="cash_deposit" :label="$t('backstage.cash_deposit')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="cash_receipts" :label="$t('backstage.cash_receipts')" width="auto" align='center'></el-table-column>
      <el-table-column prop="cash_payment" :label="$t('backstage.cash_payment')" width="auto" align='center'></el-table-column>
      <el-table-column prop="cash_refund" :label="$t('backstage.cash_refund')" width="auto" align='center'></el-table-column>
      <el-table-column prop="card_deposit" :label="$t('backstage.card_deposit')" width="auto" align='center'></el-table-column>
      <el-table-column prop="cash_receipts" :label="$t('backstage.cash_receiptss')" width="auto" align='center'></el-table-column>
      <el-table-column prop="card_payment" :label="$t('backstage.card_payment')" width="auto" align='center'></el-table-column>
      <el-table-column prop="card_refund" :label="$t('backstage.card_refund')" width="auto" align='center'></el-table-column>
      <el-table-column prop="create_time" :label="$t('backstage.create_time')" width="auto" align='center'></el-table-column>
    </el-table>      
  </div>
</template>

<script>
  import Title from '../../components/cont_title.vue'
  export default {
    components:{Title},
    data() {
      return {
        title:{
          // title:'流水账记录',
          title_show:false
        },
        mytotal:0,
        tableData:[],
        currentPage:1,
        pagesize:10,
        pages:0,
        pageNums:0,
        ruleForm: {
          phase:"",
          startTime:"",        
          endTime:"", 
        },
        rules: {
           phase: [
            {required: true, message: '请输入账期', trigger: 'blur'}
          ],
        },
        phasetype:[]
      }
    },
    methods:{
      list() {
        var that=this;
        if(that.ruleForm.phase == ""){
          that.$message.error(this.$t('backstage.in'))
          return;
        }
         if(this.ruleForm.startTime==""||this.ruleForm.startTime==null||this.ruleForm.startTime==0){
           this.startTime = ""
        }else{
          this.startTime = (this.ruleForm.startTime)/1000
        }
        if(this.ruleForm.endTime==""||this.ruleForm.endTime==null||this.ruleForm.endTime==0){
          this.endTime = ""
        }else{
          this.endTime = (this.ruleForm.endTime)/1000
        }

        var para ={
          phase:that.ruleForm.phase,	
          startTime:this.startTime,        
          endTime:this.endTime
        }
        that.$axios.post(this.$baseUrl +`/statistics/list`,para)
          .then(function (res) {
            if (res.data.result==true) {
              that.tableData = res.data.pojo
            } else {
              that.tableData = [];
              that.$message.error(that.$t("common."+res.data.msg))
            }
          }).catch(function (error) {
          console.log('逻辑错误')
        })
      },
       submitForm() {
        var that=this;
        that.list();
      },
     
      lists(){
       this.$axios.post(this.$baseUrl + '/phase/list')
        .then((res) => {
          this.phasetype = res.data.pojo
          // this.ruleForm.phase = res.data.pojo[0].name
        })
        .catch((res) => {
          console.log(res)
        })
      }
    },
    computed:{
      titles(){
        return {title:this.$t('left.statistics')}
      }
    },
    created() {
      // this.submitForm();
      this.lists();
    }
  }
</script>

<style scoped="scoped">
.is-active{
  background:none!important;;
}
</style>
