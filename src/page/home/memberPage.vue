<template>
  <!-- 会员管理 -->
 <div class="cont">
      <Title :title="titles"></Title>
      <div class="cont_top_btn">
        <el-button
          type="success"
          size="small"
          style="background: #066197;border-color: #066197;"
          icon="el-icon-plus"
          @click="addButton"
        >{{$t('public.add')}}</el-button>
        <div class="lists">
        <el-input v-model.trim="searchData.phone" class="time-left" :placeholder="$t('reception.phone2')" clearable></el-input>
        <el-input
          v-model.number="searchData.member_card"
          class="time-left"
          :placeholder="$t('reception.vip_card')"
          clearable
        ></el-input>
        <el-input
          v-model.trim="searchData.username"
          class="time-left"
          :placeholder="$t('reception.username2')"
          clearable
        ></el-input>
        <el-input v-model.trim="searchData.level" class="time-left" :placeholder="$t('reception.vip_type')" clearable></el-input>
        <el-button size="small" type="primary tijiao" @click="searchLevel()" class="tijiao">{{$t('public.inquire')}}</el-button>
        <!-- <el-button size="small" @click="recharge()" class="tijiao el-button--primary">充值</el-button> -->
      </div>
       </div>
        <el-table :data="listData" stripe style="width: 100%" header-align="center">
          <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align="center"></el-table-column>
          <el-table-column
            prop="phone"
            :label="$t('reception.phone2')"
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
            prop="idType"
             :label="$t('reception.idType')"
            show-overflow-tooltip
            width="auto"
            align="center"
            :formatter="idTypeFormat"
          ></el-table-column>
          <el-table-column
            prop="idcard"
            :label="$t('reception.id')"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="member_card"
           :label="$t('reception.vip_card')"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="levelName"
            :label="$t('reception.vip_type')"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="addtime"
           :label="$t('reception.add_time')"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="gender"
            :label="$t('public.gender')"
            show-overflow-tooltip
            width="auto"
            align="center"
          >
          <template slot-scope="scope">
          <el-tag v-if="scope.row.gender===1">{{$t('public.man')}}</el-tag>
          <el-tag v-if="scope.row.gender===2" type="danger">{{$t('public.woman')}}</el-tag>
          </template>
          </el-table-column>
          <el-table-column
            prop="birthday"
            :label="$t('backstage.birthday')"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="lose"
            :label="$t('reception.card_status')"
            show-overflow-tooltip
            width="auto"
            align="center"
          >
           <template slot-scope="scope">
          <el-tag v-if="scope.row.lose===1">{{$t('backstage.status_1')}}</el-tag>
          <el-tag v-if="scope.row.lose===0" type="danger">{{$t('reception.gua_shi')}}</el-tag>
          </template>
          </el-table-column>
           <el-table-column
            prop="status"
           :label="$t('reception.vip_status')"
            show-overflow-tooltip
            width="auto"
            align="center"
          >
           <template slot-scope="scope">
          <el-tag v-if="scope.row.status===1">{{$t('backstage.status_1')}}</el-tag>
          <el-tag v-if="scope.row.status===0" type="danger">{{$t('reception.logout')}}</el-tag>
          </template>
          </el-table-column>
          <el-table-column
            prop="score"
            :label="$t('reception.ji_fen')"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="balance"
             :label="$t('reception.balance')"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="amount"
            :label="$t('reception.amount')"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="num"
           :label="$t('reception.amount_num')"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="staffName"
             :label="$t('reception.staff_name')"
            show-overflow-tooltip
            width="auto"
            align="center"
          ></el-table-column>
          <el-table-column :label="$t('public.operate')" align="center" fixed="right" width="380">
            <template slot-scope="scope">
              <el-button size="mini" @click="getDiscount(scope.row)">{{$t('backstage.discount')}}</el-button>
              <el-button size="mini" @click="detailsButton(scope.row)">{{$t('reception.vip_details')}}</el-button>
              <el-button size="mini" @click="alterButton(scope.row)">{{$t('public.edit')}}</el-button>
              <el-button class="el-button--danger" size="mini" @click="deleteButton(scope.row)">{{$t('public.delete')}}</el-button>
              <el-button size="mini" @click="logoutButton(scope.row.id)">{{$t('reception.logout')}}</el-button>
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
        ></el-pagination>
       <!-- //弹出折扣的信息详情 -->
       <el-dialog
        :title="$t('backstage.discount')"
       :visible.sync="discountVisible"
          width="30%"
         center>
        <div style="">
          {{$t('reception.discount_info')}}:<span style="color:#409EFF">{{discount}}</span>
        </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="discountVisible = false">{{$t('public.cancel')}}</el-button>
    <el-button type="primary" @click="discountVisible = false">{{$t('public.ok')}}</el-button>
  </span>
 </el-dialog>
 </div>
</template>
<script>
import Title from "../../components/cont_title";
import yz from "../../config/validation.js";
import qs from "qs";
export default {
  components: {
    Title
  },
  data() {
    return {
     
      searchData: {
        level: "",
        phone: "",
        member_card: "",
        username: ""
      },
      listData: [],
      currentPage: 1,
      pagesize: 10,
      mytotal: 0,
     
      dialogPassword: false,
      idtype:[],
      discountVisible:false,
      discount:'',
    };
  },
  created() {
    this.idTypeEvent();
    let pro = this.searchData;
    this.getData(
      this.currentPage,
      this.pagesize,
      pro.level,
      pro.phone,
      pro.member_card,
      pro.username
    );
  },
  computed: {
    titles() {
     return {title:this.$t('left.members')}
    }
    },
  methods: {
   
   //证件类型的获取
    idTypeEvent() {
      this.$axios
        .post(this.$baseUrl + "/idType/list")
        .then((res) => {
          this.idtype = res.data.pojo;
        })
        .catch((err) => {
          console.log(err);
        });
    },
     //证件类型的转换
    idTypeFormat(row,column){
       for(var i=0,l=this.idtype.length;i<l;i++){
         if(row.idType==this.idtype[i].id){
           return this.idtype[i].name
         }
         else{
           console.log('找不到匹配的证件类型')
         }
       }
    },

   //会员折扣信息
   getDiscount(row){
     var that=this;
      this.$axios.post(this.$baseUrl+"/member/discount",qs.stringify(
      {
        member_card:row.member_card
      }
      ))
      .then(res=>{
        if(res.data.result==true){
         that.$message.success(that.$t("common."+res.data.msg))
          this.discount=res.data.pojo;
          this.discountVisible=true;
         
        }
        else {
           that.$message.error(that.$t("common."+res.data.msg))
        }
      })
      .catch(err=>{
        console.log('逻辑错误')
      })
   },

    // 搜索接口
    searchLevel() {
      let pro = this.searchData;
      this.getData(
        this.currentPage,
        this.pagesize,
        pro.level,
        pro.phone,
        pro.member_card,
        pro.username
      );
    },
    // 每页多少条
    handleSizeChangeCont(val) {
      let pro = this.searchData;
      this.getData(
        this.currentPage,
        val,
        pro.level,
        pro.phone,
        pro.member_card,
        pro.username
      );
    },
    // 切换页数
    handleCurrentChangeCont(val) {
      let pro = this.searchData;
      this.getData(
        val,
        this.pagesize,
        pro.level,
        pro.phone,
        pro.member_card,
        pro.username
      );
    },
    // 初始化数据
    getData(page, size, level, phone, member_card, username) {
      let obj = {
        page: page,
        size: size,
        level: level,
        phone: phone,
        member_card: member_card,
        username: username
      };
      this.$axios.post(this.$baseUrl + `/member/bypage`, obj).then(res => {
        this.listData = res.data.pojo.list;
        this.mytotal = parseInt(res.data.pojo.total);
      });
    },
    // 新增跳转传参
    addButton() {
      this.$router.push({ name: "memberFrom", query: { paicheNo: true } });
    },
    // 详情跳转传参
    detailsButton(val) {
      this.$router.push({
        name: "memberFrom",
        query: { details: true, id: val.id, showButton: true }
      });
    },
    // 点击修改跳转传参
    alterButton(val) {
      this.$router.push({
        name: "memberAlter",
        query: { aletrShow: true, id: val.id }
      });
    },
    // 点击删除
    deleteButton(val) {
      let formData = new FormData();
      formData.append("id", val.id);
      this.$axios.post(this.$baseUrl + `/member/delete`, formData).then(res => {
        if (res.data.result == true) {
           this.searchLevel();
           this.$message.success(this.$t("common."+res.data.msg))
        } else {
          this.$message.error(this.$t("common."+res.data.msg))
        }
      });
    },
    // 注销接口
    logoutButton(val) {
      let formData = new FormData();
      formData.append("id", val);
      this.$axios.post(this.$baseUrl + `/member/cancel`, formData).then(res => {
        if (res.data.result == true) {
           this.$message.success(this.$t("common."+res.data.msg))
        } else {
           this.$message.error(this.$t("common."+res.data.msg))
        }
      });
    },
  },

};
</script>
<style lang="less" scoped>
.menber-boss {
  height: 100%;
  width: 100%;
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
      margin-right: 5px;
    }
  }
  .menber-list {
    // display: flex;
    // flex-direction: column;
    // align-items: center;
  }
}
</style>