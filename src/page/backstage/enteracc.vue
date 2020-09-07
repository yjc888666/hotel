<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
     <div class="lists">
     <el-select v-model.trim="ruleForm.item" :placeholder="$t('backstage.item')" clearable>
          <el-option v-for="item in itemtype" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
     <el-date-picker v-model="ruleForm.startTime" type="date" :placeholder="$t('backstage.startTime')" value-format="timestamp" clearable></el-date-picker>
     <el-date-picker v-model="ruleForm.endTime" type="date" :placeholder="$t('backstage.endTime') " value-format="timestamp" clearable></el-date-picker>
      <el-button type="primary tijiao" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
     </div>
    </div>
   
    <el-table :data="tableData" stripe style="width: 100%" header-align='center'>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="item1" :label="$t('backstage.item')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="money" :label="$t('backstage.moneys')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="create_time" :label="$t('backstage.create_time')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="staffName" :label="$t('backstage.staffName')" width="auto" align='center'></el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChangeCont"
        @current-change="handleCurrentChangeCont"
        :current-page="currentPage"
        :page-sizes="[5,10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="mytotal"
        v-if="mytotal!=0">
      </el-pagination>
        
  </div>
</template>

<script>
  import Title from '../../components/cont_title.vue'
  export default {
    components:{Title},
    data() {
      return {
        title:{
          // title:'入账记录',
          title_show:false
        },
        mytotal:0,
        tableData:[],
        currentPage:1,
        pagesize:10,
        pages:0,
        pageNums:0,
        ruleForm: {
          item:"",
          startTime:"",        
          endTime:"", 
        },
        rules: {
         
        },
        itemtype:[{
          value: '1',
          label: this.$t('Validation.item_type.item_1')
        }, {
          value: '2',
          label: this.$t('Validation.item_type.item_2')
        },{
          value: '3',
          label: this.$t('Validation.item_type.item_3')
        }, {
          value: '4',
          label: this.$t('Validation.item_type.item_4')
        },{
          value: '5',
          label: this.$t('Validation.item_type.item_5')
        }, {
          value: '6',
          label: this.$t('Validation.item_type.item_6')
        },{
          value: '7',
          label: this.$t('Validation.item_type.item_7')
        }, {
          value: '8',
          label: this.$t('Validation.item_type.item_8')
        },]
      }
    },
    computed:{
      titles(){
        return {title:this.$t('left.enteracc_1')}
      }
    },
    methods:{
      list(a,b) {
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
        var that=this;
        var para ={
          page:a,
          size:b,
          item:that.ruleForm.item,	
          startTime:this.startTime,        
          endTime:this.endTime
        }
        that.$axios.post(this.$baseUrl +`/entry/bypage`,para)
          .then(function (res) {
            if (res.data.result==true) {
              that.itemtype.forEach(function(val){
                res.data.pojo.list.forEach(function(vals){
                  if(val.value == vals.item){
                    vals.item1 = val.label
                  }
                })
              })
              that.tableData = res.data.pojo.list
              that.mytotal = res.data.pojo.total;
              that.pageNums = res.data.pojo.pageNum;
              that.pages = res.data.pojo.pages;
               if(that.pageNums > that.pages && that.currentPage!=0){
                that.currentPage = that.pages
                that.list(that.currentPage,that.pagesize)
              }
            } else {
              that.tableData = [];
              that.mytotal = 0;
              that.$message.error(that.$t("common."+res.data.msg))
            }
          }).catch(function (error) {
          console.log('逻辑错误')
        })
      },
       submitForm() {
        var that=this;
        that.list(1,this.pagesize)
      },
      handleSizeChangeCont: function(size) {
        this.pagesize = size;
         this.list(this.currentPage,size)
      },
      handleCurrentChangeCont: function(currentPage) {
        this.currentPage = currentPage;
        this.list(currentPage,this.pagesize)
      },
    },
    created() {
      this.submitForm();
    }
  }
</script>

<style scoped="scoped">
.is-active{
  background:none!important;;
}
</style>
