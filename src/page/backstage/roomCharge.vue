<template>
  <div class="cont">
    <Title :title="titles"></Title>

    <div class="cont_top_btn">
      <el-table
        :data="pricelist"
        stripe
        style="width: 100%"
        header-align="center"
        type="flex"
      >
        <el-table-column
          type="index"
          label="ID"
          width="auto"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="remark"
          :label="$t('backstage.roomChargeName')"
          width="auto"
          show-overflow-tooltip
          align="center"
        ></el-table-column>
        <el-table-column
          prop="time"
          :label="$t('backstage.roomChargeTime')"
          width="auto"
          show-overflow-tooltip
          align="center"
          :formatter="timeFormmat"
        >
        </el-table-column>
        <el-table-column :label="$t('public.operate')" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              plain
              @click="AlterPriceTime(scope.$index, scope.row)"
            >
             {{$t('public.edit')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="$t('public.edit')" :visible.sync="dialogVisible" width="20%">
        <el-time-picker v-model="time" :placeholder="$t('backstage.editTimePlaceholder')"
        size="small"
        value-format="HH:mm"
         :picker-options="{selectableRange: '00:00:00 - 23:59:59'}"
        >
        </el-time-picker>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">{{$t('public.cancel')}}</el-button>
          <el-button type="primary" @click="submit">{{$t('public.ok')}}</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Title from "../../components/cont_title.vue";
export default {
  components: { Title },
  data() {
    return {
      dialogVisible: false,
      pricelist: [],
      time: "",
      id: ""
    };
  },
  created() {
    this.getRoomSetPrice();
  },
  computed: {
    titles() {
      return { title: this.$t("left.roomCharge") };
    }
  },
  methods: {
    AlterPriceTime(index,row) {
      this.dialogVisible = true;
      this.id=row.id
    },
    //对服务器发过来的时间格式化
    timeFormmat(val) {
     var str=this.$t('backstage.timeDetail')

      console.log(val);
      var hour = val.time / 3600 < 10 ? "0" + val.time / 3600 : val.time / 3600;
      var min =
        (val.time % 3600) * 6 < 10
          ? "0" + (val.time % 3600) * 6
          : (val.time % 3600) * 6;
      return hour + ":" + min+str;
    },

    //获取设置的列表
    getRoomSetPrice() {
      var that = this;
      this.$axios
        .post(this.$baseUrl + "/charge/list")
        .then(res => {
          this.pricelist = res.data.pojo;
          this.pricelist.time /= 3600;
          console.log(this.pricelist.time);
        })
        .catch(res => {
          console.log(res);
        });
    },
    submit() {
      // var time=new Date()
        var that=this
      // console.log(Date.parse(this.time));
       var ss = this.time.split(":");
       var second=parseInt(ss[0])*3600+parseInt(ss[1])*60
       this.$axios.post(this.$baseUrl+'/charge/update',
       {
         id:this.id,
         time:second
       }
       )
       .then(res=>{
         if(res.data.result==true){
           this.getRoomSetPrice();
          this.$message.success(that.$t("common." + res.data.msg));
          this.dialogVisible=false;
         }
         else{
           this.$message.error(that.$t("common." + res.data.msg));
         }
       })
       .catch(err=>{
         console.log(err)
       })
    }
  }
};
</script>
<style scoped></style>
