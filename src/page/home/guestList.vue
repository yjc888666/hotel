<template>
  <!-- 客人历史 -->
  <div class="cont">
    <Title :title="titles"></Title>
    <div class="cont_top_btn">
      <div class="lists">
        <el-input
          v-model.trim="getData.memberName"
          class="time-left"
          :placeholder="$t('reception.username2')"
          clearable
        ></el-input>
        <el-input
          v-model.trim="getData.phone"
          class="time-left"
          :placeholder="$t('reception.phone2')"
          clearable
        ></el-input>
        <el-input
          v-model.trim="getData.member_card"
          class="time-left"
          :placeholder="$t('reception.vip_card')"
          clearable
        ></el-input>
        <el-button
          type="primary tijiao"
          @click="integralQuery()"
          class="tijiao"
        >{{$t('public.inquire')}}</el-button>
      </div>
      </div>
        <el-table :data="listData" stripe style="width: 100%" header-align="center">
          <el-table-column
            prop="username"
            :label="$t('reception.username2')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="gender"
            :label="$t('public.gender')"
            width="auto"
            show-overflow-tooltip
            align="center"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.gender===1">{{$t('public.man')}}</el-tag>
              <el-tag v-if="scope.row.gender===2" type="danger">{{$t('public.woman')}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            :label="$t('reception.phone2')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="card_type"
            :label="$t('reception.idType')"
            width="auto"
            show-overflow-tooltip
            align="center"
            :formatter="idTypeFormat"
          ></el-table-column>
          <el-table-column
            prop="card_num"
            :label="$t('reception.id')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="birthday"
            :label="$t('backstage.birthday')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="userType_name"
            :label="$t('reception.user_type')"
            width="auto"
            show-overflow-tooltip
            align="center"
            :formatter="userType"
          ></el-table-column>
          <el-table-column
            prop="member_card"
            :label="$t('reception.vip_card')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="create_time"
            :label="$t('backstage.create_time')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="consume_num"
            :label="$t('reception.consume_num')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column
            prop="total_consume"
            :label="$t('reception.total_consume')"
            width="auto"
            show-overflow-tooltip
            align="center"
          ></el-table-column>
          <el-table-column :label="$t('public.operate')" align="center" fixed="right" width="80">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="historyButton(scope.row)"
              >{{$t('reception.cus_history')}}</el-button>
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
          :total="toltal"
           v-if="toltal!=0"
        ></el-pagination>
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
  },
  data() {
    return {
      title: {
        title: "客人列表",
        title_show: false
      },
      time: "",
      getData: {
        memberName: "",
        phone: "",
        member_card: ""
      },
       
      currentPage: 1,
      pagesize: 10,
      pages: 0,
      pageNums: 0,

      toltal: 0,
      listData: [],
      evocation: false,
      idtype: []
    };
  },
  created() {
    this.idTypeEvent();
    this.integralQuery();
  },
  computed: {
    titles() {
      return { title: this.$t("left.guest") };
    }
  },
  methods: {
    //用户类型的转换
    userType(row, column) {
      if (row.userType_name == null) {
        return this.$t('Validation.guest_list.common');
      } else {
        return row.userType_name;
      }
    },

    idTypeEvent() {
      this.$axios
        .post(this.$baseUrl + "/idType/list")
        .then(res => {
          this.idtype = res.data.pojo;
        })
        .catch(res => {
          console.log(res);
        });
    },
    //证件类型的转换
    idTypeFormat(row, column) {
      for (var i = 0, l = this.idtype.length; i < l; i++) {
        if (row.card_type == this.idtype[i].id) {
          return this.idtype[i].name;
        }
      }
    },

    handleSizeChangeCont: function (size) {
      this.pagesize = size;
      this.getList(this.currentPage, size);
    },
    handleCurrentChangeCont: function (currentPage) {
      this.currentPage = currentPage;
      this.getList(currentPage, this.pagesize);
    },
    // 查询
    integralQuery() {
     var that = this;
      that.getList(1, this.pagesize);
    },
    getList(a,b) {
     var that = this;
      var para = {
        page: a,
        size: b,
        username: that.getData.memberName,
        phone: that.getData.phone,
        member_card: that.getData.member_card,
      };
      this.$axios
        .post(this.$baseUrl + `/customer/bypage`, para)
        .then(res => {
          if (res.data.result == true) {
          that.listData = res.data.pojo.list;
          that.toltal = res.data.pojo.total;
          that.pageNums = res.data.pojo.pageNum;
          that.pages = res.data.pojo.pages;
            if (that.pageNums > that.pages && that.currentPage != 0) {
              that.currentPage = that.pages;
              that.getList(that.currentPage, that.pagesize);
            }
          } else {
            that.listData = [];
            that.$message.error(that.$t("common." + res.data.msg));
          }
        })
        .catch(function (error) {
          console.log("逻辑错误");
        });
    },
    historyButton(val) {
      console.log(val, 222);
      this.$router.push({
        name: "guestHistory",
        query: { id: val.card_num }
      });
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