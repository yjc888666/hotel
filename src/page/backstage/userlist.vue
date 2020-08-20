<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
     <el-button class="adds" type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus' @click="$router.push({name:'userlist_add'})">{{$t('public.add')}}</el-button>
     <div class="lists">
     <el-input v-model.trim="ruleForm.username" class="time-left" :placeholder="$t('public.username')" clearable></el-input>
     <el-input v-model.trim="ruleForm.serial_number" class="time-left" :placeholder="$t('backstage.serial_number')" clearable></el-input>
     <el-input v-model.trim="ruleForm.phone" class="time-left" :placeholder="$t('public.phone')" clearable></el-input>
     <el-date-picker v-model="ruleForm.entry_time" type="date" :placeholder="$t('backstage.entry_time')" value-format="yyyy-MM-dd" clearable></el-date-picker>
     <el-select v-model.trim="ruleForm.gender" :placeholder="$t('public.gender')" class="select-left" clearable>
         <el-option key="1" label="男" value="1">{{$t('public.man')}}</el-option>
         <el-option key="2" label="女" value="2">{{$t('public.woman')}}</el-option>
      </el-select>
     <el-select v-model.trim="ruleForm.dept_id" :placeholder="$t('backstage.dept_name')" class="select-left" clearable>
        <el-option v-for="item in deptType" :key="item.id" :label="item.dept_name" :value="item.id"></el-option>
      </el-select>
      <el-button type="primary tijiao" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
     </div>
    </div>
   
    <el-table :data="tableData" stripe style="width: 100%" header-align='center'>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="username" :label="$t('public.username')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="serial_number" :label="$t('backstage.serial_number')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="entry_time" :label="$t('backstage.entry_time')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="gender" :label="$t('public.gender')" width="auto" align='center'>
        <template slot-scope='scope'>
          <el-tag  v-if="scope.row.gender==1">{{$t('public.man')}}</el-tag>
          <el-tag v-if="scope.row.gender==2" type="danger">{{$t('public.woman')}}</el-tag>
          <!-- <span v-if="scope.row.gender==2" style="color:#1AA094;">女</span> -->
        </template>
      </el-table-column>
     
      <el-table-column prop="birthday" :label="$t('backstage.birthday')" width="auto" align='center'></el-table-column>
      <el-table-column prop="phone" :label="$t('public.phone')" width="auto" align='center'></el-table-column>
      <el-table-column prop="email" :label="$t('public.email')" width="auto" align='center'></el-table-column>
      <el-table-column prop="dept_name" :label="$t('backstage.dept_name')" width="auto" align='center'></el-table-column>
      <el-table-column prop="status" :label="$t('public.status') " width="200px" align='center'>
        <template slot-scope='scope' >
           <el-tag  v-if="scope.row.status==1" @click="stateEvent(scope.$index, scope.row)">{{$t('backstage.status_1')}}</el-tag>
            <!-- <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="按月付费"
              inactive-text="按年付费">
             </el-switch> -->
           <el-tag type="danger" v-if="scope.row.status==2" @click="stateEvent(scope.$index, scope.row)">{{$t('backstage.status_2')}}</el-tag>
        </template>
      </el-table-column>
       <!-- <el-table-column prop="delete_status" label="删除状态 " width="auto" align='center'>
        <template slot-scope='scope'>
           <el-tag type="danger" v-if="scope.row.delete_status==1">删除</el-tag>
           <el-tag  v-if="scope.row.delete_status==2">未删除</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" align="center" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('public.delete')}}</el-button>
          <el-button size="mini" @click="restpass(scope.$index, scope.row)">{{$t('backstage.resetting')}}</el-button>
        </template>
      </el-table-column>
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
        deptType:[],
        ruleForm: {
          username:"",		  
          serial_number:"",	
          entry_time:"",   
          gender:"",        
          phone:"", 
          dept_id:""        
        },
        rules: {
         
        },
      }
    },
    methods:{
      handleEdit(index,row){
         this.$router.push({name:'userlist_edit',query:{id:row.id}})
      },
      restpass(index,row){
       this.$confirm(this.$t('public.restpass'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
          var that = this;
          var fordata = new FormData();
          fordata.append("user_id",row.id )
          that.$axios.post(this.$baseUrl + `/staff/reset`,fordata).then(function (res) {
          if (res.data.result== true){
             that.$message({
              message: that.$t("common."+res.data.msg),
              showClose: true,
              type: 'success'
            });
          }else{
             that.$message({
                message: that.$t("common."+res.data.msg),
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
      },
      handleDelete(index,row){
       this.$confirm(this.$t('public.info'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
          var that = this;
          var para = {
            id:row.id
          }
          that.$axios.post(this.$baseUrl + `/staff/delete`,para).then(function (res) {
          if (res.data.result== true){
             that.$message({
              message: that.$t("common."+res.data.msg),
              showClose: true,
              type: 'success'
            });
           that.tableData.splice(index,1)
          }else{
             that.$message({
                message: that.$t("common."+res.data.msg),
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
      },
      stateEvent(index,row){
        var that = this;
         var fordata = new FormData();
          fordata.append("user_id",row.id)
        this.$axios.post(this.$baseUrl + '/staff/state',fordata)
        .then((res) => {
         if (res.data.result== true){
             that.$message({
              message: that.$t("common."+res.data.msg),
              showClose: true,
              type: 'success'
            });
            that.list(that.currentPage,that.pagesize)
          }else{
             that.$message({
                message: that.$t("common."+res.data.msg),
                showClose: true,
                type: 'error'
              });
          }
        })
        .catch((res) => {
          console.log(res)
        })
      },
      // 部門
      deptList(){
         this.$axios.post(this.$baseUrl + '/department/list')
        .then((res) => {
          this.deptType = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })
      },
      list(a,b) {
        var that=this;
        var para ={
          page:a,
          size:b,
          username:that.ruleForm.username,		  
          serial_number:that.ruleForm.serial_number,	
          entry_time:that.ruleForm.entry_time,  
          gender:that.ruleForm.gender,        
          phone:that.ruleForm.phone,
          dept_id:that.ruleForm.dept_id,
        }
        that.$axios.post(this.$baseUrl +`/staff/getpage`,para)
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
    computed:{
      titles(){
        return {title:this.$t('left.userlist')}
      }
    },
    created() {
      this.deptList();
      this.submitForm();
    }
  }
</script>

<style scoped="scoped">
.is-active{
  background:none!important;;
}
</style>
