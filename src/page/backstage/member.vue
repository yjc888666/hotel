<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
     <el-button class="adds" type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus' @click="$router.push({name:'member_add'})">{{$t('public.add')}}</el-button>
    </div>
    <el-table :data="tableData" stripe style="width: 100%" header-align='center'>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="name" :label="$t('backstage.name_level')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="recharge" :label="$t('backstage.recharge')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="consume_mix" :label="$t('backstage.consume_mix')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="consume_max" :label="$t('backstage.consume_max')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="remark" :label="$t('public.remark')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="discount" :label="$t('backstage.discount')" width="auto" align='center'></el-table-column>
      <el-table-column :label="$t('public.operate')" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('public.delete')}}</el-button>
        </template>
      </el-table-column>
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
          // title:'会员列表',
          title_show:false
        },    
        tableData:[],
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
    computed:{
      titles(){
        return {title:this.$t('left.member')}
      }
    },
    methods:{
      handleEdit(index,row){
         this.$router.push({name:'member_edit',query:{id:row.id}})
      },
      handleDelete(index,row){
       this.$confirm(this.$t('public.info'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
          var that = this;
           let fordata = new FormData();
           fordata.append("id",row.id)
          that.$axios.post(this.$baseUrl + `/memberLevel/delete`,fordata).then(function (res) {
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
      list() {
        var that=this;
        that.$axios.post(this.$baseUrl +`/memberLevel/list`)
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
    },
    created() {
      this.list();
    }
  }
</script>

<style scoped="scoped">
.is-active{
  background:none!important;;
}
</style>
