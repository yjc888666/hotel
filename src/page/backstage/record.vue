<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
     <!-- <el-button class="adds" type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus' @click="$router.push({name:'userlist_add'})">后台员工新增</el-button> -->
     <div class="lists">
     <!-- <el-input v-model.trim="ruleForm.username" class="time-left" placeholder="用户名" clearable></el-input> -->
     <el-input v-model.trim="ruleForm.serial_number" class="time-left" :placeholder="$t('backstage.serial_number')" clearable></el-input>
     <!-- <el-input v-model.trim="ruleForm.action" class="time-left" :placeholder="$t('backstage.action')" clearable></el-input> -->


      <el-select 
          v-model.trim="ruleForm.action "
          :placeholder="$t('backstage.action')"
          clearable
          class="time-left"
        >
          <el-option v-for="item in setType" :key="item.id" :label="item.label" :value="item.value"></el-option>
        </el-select>

     <el-date-picker v-model="ruleForm.startTime" type="date" :placeholder="$t('backstage.startTime')" value-format="timestamp" clearable></el-date-picker>
     <el-date-picker v-model="ruleForm.endTime" type="date" :placeholder="$t('backstage.endTime') " value-format="timestamp" clearable></el-date-picker>
      <el-button type="primary tijiao" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
     </div>
    </div>
   
    <el-table :data="tableData" stripe style="width: 100%" header-align='center'>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="serial_number" :label="$t('backstage.serial_number')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="time" :label="$t('backstage.time')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="action" :label="$t('backstage.action')" width="auto" show-overflow-tooltip align='center'>
        <template slot-scope="scope">
          <el-tag v-if="scope.row.action===1" type="danger">{{$t('backstage.grant')}}</el-tag>
          <el-tag v-if="scope.row.action===2" type="danger">{{$t('backstage.vip_push')}}</el-tag>
          <el-tag v-if="scope.row.action===3" type="danger">{{$t('backstage.vip_del')}}</el-tag>
          <el-tag v-if="scope.row.action===4" type="danger">{{$t('backstage.setBill')}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column prop="remark" :label="$t('public.remark')" width="auto" align='center'></el-table-column>
      <el-table-column prop="staff" :label="$t('left.userlist')" width="auto" align='center'></el-table-column>
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
          // title:'员工列表',
          title_show:false
        },
        mytotal:0,
        tableData:[],
        currentPage:1,
        pagesize:10,
        pages:0,
        pageNums:0,
        ruleForm: {
          serial_number:"",	
          action:"",   
          startTime:"",        
          endTime:"", 
        },
        rules: {
         
        },
         setType: [{                                                   
          value: '1',
          label: this.$t('backstage.grant')
        }, {
          value: '2',
          label: this.$t('backstage.vip_push')
        }, {
          value: '3',
          label: this.$t('backstage.vip_del')
        }, {
          value: '4',
          label: this.$t('backstage.setBill')
        }],
      }
    },
    computed:{
      titles(){
        return {title:this.$t('left.record')}
      }
    },
    methods:{
      list(a,b) {
        var that=this;
        var time='';
        var end='';
        time=that.ruleForm.startTime/1000;
        end=that.ruleForm.endTime/1000
        if(time!=0||end!=0){
          var para ={
          page:a,
          size:b,
          serial_number:that.ruleForm.serial_number,	
          action:that.ruleForm.action,  
          startTime:time,        
          endTime:end,
        }
        that.$axios.post(this.$baseUrl +`/action/bypage`,para)
          .then(function (res) {
            if (res.data.result==true) {
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
        }
        else {
         var para ={
          page:a,
          size:b,
          serial_number:that.ruleForm.serial_number,	
          action:that.ruleForm.action,  
          startTime:that.ruleForm.startTime,        
          endTime:that.ruleForm.endTime,
        }
        that.$axios.post(this.$baseUrl +`/action/bypage`,para)
          .then(function (res) {
            if (res.data.result==true) {
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
        }
       
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
