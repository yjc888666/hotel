<template>
  <!-- 客人历史 -->
  <div class="integral-box">
    <div class="menber-box">
      <Title :title="titles"></Title>
     
      <div class="menber-list">
        <el-table :data="listData" stripe style="width: 100%" header-align="center">
          <el-table-column
            prop="room_number"
            :label="$t('reception.room_number')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="username"
            :label="$t('reception.username2')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="checkin_time"
            :label="$t('reception.check_time')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="total_price"
           :label="$t('reception.total_price')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column :label="$t('reception.pay_status')" width="auto" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.pay_status==0">{{$t('reception.no_pay')}}</div>
              <div v-if="scope.row.pay_status==1">{{$t('reception.is_pay')}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="day"
           :label="$t('reception.days')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column :label="$t('reception.source_type')" width="auto" show-overflow-tooltip align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.source_type==1">散客</div>
              <div v-if="scope.row.source_type==2">会员</div>
              <div v-if="scope.row.source_type==3">单位</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="toghther_guest"
             :label="$t('reception.together')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="id_number"
            :label="$t('reception.id')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>

          <el-table-column
            prop="isteam"
           :label="$t('reception.is_team')"
            width="auto"
            show-overflow-tooltip
            align="center"
          >
          <template slot-scope="scope">
          <el-tag v-if="scope.row.isteam===0"  type="danger">{{$t('reception.no_team')}}</el-tag>
          <el-tag v-if="scope.row.isteam===1">{{$t('reception.is_team_yes')}}</el-tag>
          </template>
          
          </el-table-column>         
 
          <el-table-column
            prop="team_id"
            :label="$t('reception.team_name')"
            width="auto"
            show-overflow-tooltip
            align="center"
            :formatter="teamFormat"
          ></el-table-column>
          <el-table-column
            prop="staff_number"
            :label="$t('reception.staff_name')"
            width="auto"
            show-overflow-tooltip
            align="center"
            :formatter="workerFormat"
          ></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChangeCont"
          @current-change="handleCurrentChangeCont"
          :current-page="currentPage"
          :page-sizes="[5,10, 20, 30, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="toltal"
          v-if="toltal!=0"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../../components/cont_title";
export default {
  components: {
    Title
  },
  created() {
    this.getList(this.getData);
     this.queryWorker();
     this.queryTeam();
  },
  data() {
    return {
      title: {
        title: "客户",
        title_show: true
      },
      time: "", 
      currentPage: 1,
      pagesize: 10,
      toltal: 0,
      pageNums:0,
      pages:0,
      listData: [],
      evocation: false,
        //操作员列表
      workerList:[],
      //团队列表
      teamList:[],
    };
  },
  computed:{
    titles(){
     return {title:this.$t('left.guest'),
     title_show:true
     }
    }
  },
  
  methods: {
        //查询团队列表
        queryTeam(){
            this.$axios.post(this.$baseUrl+ `/team/getList`)
           .then(res=>{
              this.teamList=res.data.pojo;
           })
           .catch(res=>{
               console.log(err)
           })
        },

      //团队名称的转换
       teamFormat(row,column){
        for(var i=0,l=this.teamList.length;i<l;i++){
         if(row.team_id==this.teamList[i].id){
           return this.teamList[i].teamname
         }
       }
      },

        //查询操作员列表
       queryWorker(){
           this.$axios.post(this.$baseUrl+ `/staff/getpage`)
           .then(res=>{
              this.workerList=res.data.pojo.list;
           })
           .catch(res=>{
               console.log(err)
           })
       },

      //操作员类型的转换
      workerFormat(row,column){
        for(var i=0,l=this.workerList.length;i<l;i++){
         if(row.staff_number==this.workerList[i].id){
           return this.workerList[i].username
         }
       }
      },

    handleSizeChangeCont(val) {
      this.pagesize = val;
      this.getList(this.currentPage,val);
    },
    handleCurrentChangeCont(val) {
      this.currentPage = val;
      this.getList(val,this.pagesize);
    },
    // 查询
    integralQuery() {
      this.getList(this.getData);
    },
    getList(a,b) {
      var that=this;
      let el = this.$route.query.id;
       var para = {
        page: a,
        size: b,
        id_number: that.$route.query.id,

      };

      let formData = new FormData()
      formData.append('el',el)
      that.$axios
        .post(this.$baseUrl + `/customer/history`, para)
        .then(res => {
          if (res.data.result == true) {
          console.log(res)
          that.listData = res.data.pojo.list;
          that.toltal = res.data.pojo.total;
          that.pageNums = res.data.pojo.pageNum;
          that.pages = res.data.pojo.pages;
           if (that.pageNums > that.pages && that.currentPage != 0) {
              that.currentPage = that.pages;
              that.list(that.currentPage, that.pagesize);
            }
          }
          else{
            that.listData=[];
              that.$message.error(that.$t("common." + res.data.msg));
          } 
        })
        .catch(err=>{
           console.log("逻辑错误");
        }) 
    }
  }
};
</script>

<style lang="less" scoped>
.integral-box {
  width: 100%;
  height: 100%;
  .menber-box {
    width: 97%;
    background: #fff;
    height: auto;
    margin: 0 auto;
  }
  .top-search {
    height: 70px;
    display: flex;
    align-items: center;
    .el-input {
      margin: 0 5px 0 5px;
    }
    .tijiao {
      margin-left: 10px;
    }
  }
  .input-parent {
    width: 100%;
    .input-box {
      width: 50%;
      float: left;
    }
  }
}
</style>