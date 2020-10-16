<template>
  <div class="adduser">
  <el-form :rules="rules" :model="model"  ref="teamplayer">
    <!-- 表格布局 -->
    <el-table :data="model.tableData" border stripe style="width: 100%;" header-align="center"
    >
      <el-table-column  :label="$t('reception.house_type')"  show-overflow-tooltip  align="center">
        <template slot-scope="scope">
          <el-form-item :prop="'tableData.'+scope.$index+'.house_type'" :rules='model.rules.house_type'>
           <el-select
            v-if="scope.row.edit"
            v-model="scope.row.house_type"
            :placeholder="$t('reception.house_type')"
            @change="queryRoomList(scope.row.house_type,scope.$index)"
          >
            <el-option v-for="item in housetype" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          </el-form-item>
       
        </template>
      </el-table-column>
      <el-table-column  :label="$t('reception.room_number')"   align="center" >
        <template slot-scope="scope"  >
          <el-form-item :prop="'tableData.'+scope.$index+'.room_number'" :rules='model.rules.room_number'>
          <el-select
            v-model.trim="scope.row.room_number"
            :placeholder="$t('reception.room_number')"
            clearable
            v-if="scope.row.edit"
          >
            <el-option v-for="(item,index) in roomList" :value="item"  :key="index"></el-option>
          </el-select>
          <span v-else>{{scope.row.room_number}}</span>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column  :label="$t('reception.username2')" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <el-form-item :prop="'tableData.'+scope.$index+'.username'" :rules='model.rules.username'>
          <el-input v-if="scope.row.edit" v-model="scope.row.username" :placeholder="$t('reception.username2')"></el-input>
          <span v-else>{{scope.row.username}}</span>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column prop="phone" :label="$t('reception.phone2')" show-overflow-tooltip align="center">
        <template slot-scope="scope">
            <el-form-item :prop="'tableData.'+scope.$index+'.phone'" :rules='model.rules.phone'>
          <el-input v-if="scope.row.edit" v-model="scope.row.phone" :placeholder="$t('reception.phone2')"></el-input>
          <span v-else>{{scope.row.phone}}</span>
            </el-form-item>
        </template>
      </el-table-column>

      <el-table-column  :label="$t('public.gender')" show-overflow-tooltip align="center">
        <template slot-scope="scope">
            <el-form-item :prop="'tableData.'+scope.$index+'.gender'" :rules='model.rules.gender'>
          <el-select v-if="scope.row.edit" v-model="scope.row.gender" :placeholder="$t('public.gender')">
            <el-option label="男" value="1">{{$t('public.man')}}</el-option>
            <el-option label="女" value="2">{{$t('public.woman')}}</el-option>
          </el-select>
          <span v-else>
            <p v-if="scope.row.gender==1">{{$t('public.man')}}</p>
            <p v-if="scope.row.gender==2">{{$t('public.woman')}}</p>
          </span>
            </el-form-item>
        </template>
      </el-table-column>

      <el-table-column prop="certificate_type" :label="$t('reception.card_type')" show-overflow-tooltip align="center">
        <template slot-scope="scope">
            <el-form-item :prop="'tableData.'+scope.$index+'.certificate_type'" :rules='model.rules.certificate_type'>
          <el-select v-if="scope.row.edit" v-model="scope.row.certificate_type" :placeholder="$t('reception.card_type')">
            <el-option v-for="item in idtype" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column prop="id_number" :label="$t('reception.id')" show-overflow-tooltip align="center">
        <template slot-scope="scope">
           <el-form-item :prop="'tableData.'+scope.$index+'.id_number'" :rules='model.rules.id_number'>
          <el-input v-if="scope.row.edit" v-model="scope.row.id_number" :placeholder="$t('reception.id')"></el-input>
          <span v-else>{{scope.row.id_number}}</span>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column :label="$t('reception.together')" show-overflow-tooltip align="center" prop="guest_info">

        
        <template slot-scope="scope">
          <el-form-item>
            <el-button
            size="mini"
            v-if="scope.row.edit"
            v-model="scope.row.guest_info"
            type="primary"
            @click="addEvent(scope.$index)"
          >
            {{$t('reception.together')}}
            <i class="el-icon-plus el-icon--right"></i>
          </el-button>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column :label="$t('public.operate')" show-overflow-tooltip align="center">
        <template slot-scope="scope">
          <el-form-item>
          <el-button type="text" size="medium" @click="deleteData(scope.row,scope.$index)">
            <i class="el-icon-delete" aria-hidden="true"></i>
          </el-button>
          </el-form-item>
        </template>
      </el-table-column>
    </el-table>
     </el-form>
    <el-button type="text" @click="addData">{{$t('reception.add_member')}}</el-button>
    <el-divider></el-divider>
    <el-button @click="submitData('teamplayer')">{{$t('public.ok')}}</el-button>
    <el-button @click="cancelData">{{$t('public.cancel')}}</el-button>

    <el-dialog title="info" :visible.sync="dialogFormVisible" class="dia" width="30%">
      <el-form
        :model="forms"
        status-icon
        :rules="model.rules"
        ref="forms"
        label-width="80px"
        class="demo-ruleForm mars"
      >
        <el-form-item :label="$t('reception.username2')" prop="username" class="floatleft">
          <el-input v-model.trim="forms.username"></el-input>
        </el-form-item>
        <el-form-item :label="$t('reception.phone2')" prop="phone" class="floatleft">
          <el-input v-model.trim="forms.phone"></el-input>
        </el-form-item>
        <el-form-item :label="$t('public.gender')" prop="gender" class="floatleft">
          <el-radio v-model="forms.gender" label="1">{{$t('public.man')}}</el-radio>
          <el-radio v-model="forms.gender" label="2">{{$t('public.woman')}}</el-radio>
        </el-form-item>
        <el-form-item :label="$t('reception.card_type')" prop="card_type" class="floatleft">
          <el-select v-model.trim="forms.card_type " :placeholder="$t('reception.card_type')" clearable>
            <el-option v-for="item in idtype" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('reception.id')" prop="card_num" class="floatleft">
          <el-input v-model.trim="forms.card_num"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary" @click="submitForms('forms')" v-show="show">{{$t('public.ok')}}</el-button>
        <el-button type="primary" @click="modifyEvent('forms')" v-show="!show">{{$t('public.edit')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import yz from "../../config/validation.js";
export default {
  name: "demo",
  props: {
    teamData: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      teamDataByFather: {},
      model:{
       tableData: [],
       rules: {
       checkout_time: [
          { required: true, message: this.$t('Validation.check_in.out_time'), trigger: "blur" },
        ],
        day: [{ required: true, message: this.$t('Validation.check_in.days'), trigger: "blur" }],
        house_type: [
          { required: true, message: this.$t('Validation.check_in.house_type'), trigger: "blur" },
        ],
        source_type: [
          { required: true, message: this.$t('Validation.check_in.source_type'), trigger: "blur" },
        ],
        username: [{ required: true, message: this.$t('Validation.check_in.username'), trigger: "blur" }],
        phone: [{ required: true, message: this.$t('Validation.check_in.phone'), trigger: "blur" },
        {validator: yz.validateMobilePhone, trigger: 'blur'}],
        card_type: [
          { required: true, message: this.$t('Validation.check_in.card_type'), trigger: "blur" },
        ],
        certificate_type:[{ required: true, message: this.$t('Validation.check_in.card_type'), trigger: "blur" }],
        id_number:[ { required: true, message: this.$t('Validation.check_in.card_num'), trigger: "blur" },
             {validator: yz.validatenum, trigger: 'blur'}
        ],
        gender: [{ required: true, message: this.$t('Validation.check_in.gender'), trigger: "blur" }],
        card_num: [
          { required: true, message: this.$t('Validation.check_in.card_num'), trigger: "blur" },
          {validator: yz.validatenum, trigger: 'blur'}
        ],
      },
      },
    
      forms: {},
      forms2: {
          //团队的信息和入住时间
          teamname:"",
          leave_time:"",
          day_num:"",
          type:null,
        },

      formData: [],
      show: true,
      dialogFormVisible: false,

      index: 0,
      index2:0,
      
      idtype: [],
      housetype: [],
      //  房间的列表
      roomList: [],
    };
  },
  computed:{
    rules(){
      const rules={
         checkout_time: [
          { required: true, message: this.$t('Validation.check_in.out_time'), trigger: "blur" },
        ],
        day: [{ required: true, message: this.$t('Validation.check_in.days'), trigger: "blur" }],
        house_type: [
          { required: true, message: this.$t('Validation.check_in.house_type'), trigger: "blur" },
        ],
        source_type: [
          { required: true, message: this.$t('Validation.check_in.source_type'), trigger: "blur" },
        ],
        username: [{ required: true, message: this.$t('Validation.check_in.username'), trigger: "blur" }],
        phone: [{ required: true, message: this.$t('Validation.check_in.phone'), trigger: "blur" },
        {validator: yz.validateMobilePhone, trigger: 'blur'}],
        card_type: [
          { required: true, message: this.$t('Validation.check_in.card_type'), trigger: "blur" },
        ],
        certificate_type:[{ required: true, message: this.$t('Validation.check_in.card_type'), trigger: "blur" }],
        id_number:[ { required: true, message: this.$t('Validation.check_in.card_num'), trigger: "blur" },
             {validator: yz.validatenum, trigger: 'blur'}
        ],
        gender: [{ required: true, message: this.$t('Validation.check_in.gender'), trigger: "blur" }],
        card_num: [
          { required: true, message: this.$t('Validation.check_in.card_num'), trigger: "blur" },
          {validator: yz.validatenum, trigger: 'blur'}
        ],
      }
      return rules
    }
  },
  created() {
    console.log(this.teamData);
    this.idTypeEvent();
    this.houseEvent();
    // this.teamDataByFather = this.teamData;
    // console.log(this.teamDataByFather)
    // console.log(this.teamDataByFather.leave_time)
    // this.teamDataByFather.leave_time /= 1000;
  },
   //监听路由的变化，清除输入框的值
    watch:{
      //方法2
    '$route'(to, from) {
       /// 判断条件   监听路由名 监听你从什么路由跳转过来的
     if (from.path == "/teamCheckin/teamlist") { 
      this.model.tableData=[];
     }
  }
      },
  methods: {
    //房间号列表查询
    queryRoomList(value,index) {
      this.index2=index;
      // console.log(this.index2);
      // console.log(this.model.tableData[this.index2])
       
      this.$axios
        .post(this.$baseUrl + `/room/getlist`, {
          house_type: value,
          status: 1,
        })
        .then((res) => {
           
          if(res.data.result==true){
          var that = this;
          var arr = [];
          var rooms = [];
          arr = res.data.pojo;
          arr.forEach((item) => {
            rooms.push(item.room_number);
          });
          this.roomList = rooms;
          console.log(this.roomList);
          
          }
          else {
            this.roomList=[];
          } 
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //添加
    addData() {
       
         this.model.tableData.push({
        edit: true,
        });
    },

    //删除
    deleteData(row, index) {
      this.model.tableData.splice(index, 1);
      console.log(this.model.tableData);
    },

    //显示同客来宾对话框
    addEvent(index) {
      this.index = index;
      console.log(this.index);
      this.dialogFormVisible = true;
      this.show = true;
    },

    // 房型查询
    houseEvent() {
      this.$axios
        .post(this.$baseUrl + "/houseType/getlist")
        .then((res) => {
           var arr=[];
          arr = res.data.pojo;
          this.housetype=arr.filter(item=>item.rooms>0)
        })
        .catch((res) => {
          console.log(res);
        });
    },
    //证件类型查询
    idTypeEvent() {
      this.$axios
        .post(this.$baseUrl + "/idType/list")
        .then((res) => {
          this.idtype = res.data.pojo;
        })
        .catch((res) => {
          console.log(res);
        });
    },

    submitForms(forms) {
      console.log(this.index)
       this.$refs[forms].validate((valid)=>{
          if(valid){
         this.model.tableData[this.index].guest_info = [];
      this.model.tableData[this.index].guest_info.push(this.forms);
      this.forms={};
      this.dialogFormVisible = false;
      this.show = false;
          }})
      
    },

    //提交表单，并且向服务器发送入住请求
   submitData(teamplayer) {
    //  this.teamDataByFather=this.teamData;
    // console.log(this.teamData)
    //  console.log(this.teamDataByFather)
        this.$refs[teamplayer].validate((valid)=>{
          if(valid){
            let datefa= this.teamDataByFather.leave_time
       this.teamDataByFather.leave_time=(datefa/1000)+4*3600;
      //  this.teamDataByFather.leave_time+=4*3600;
      this.teamDataByFather.room = this.model.tableData;
      //遍历收到子组件传过来的数据，去除掉room数组中的edit字段
      this.teamDataByFather.room.forEach((item) => {
        this.$delete(item, "edit");
      });
      // console.log(this.teamDataByFather);

      var that = this;
       var para={
         day_num:this.teamData.day_num,
         leave_time:this.teamData.leave_time/1000+4*3600,
         public_pays:this.teamData.public_pays,
         remark:this.teamData.remark,
         room:this.teamDataByFather.room,
         teamname:this.teamData.teamname,
         type:this.teamData.type
       }
       console.log(para)
     that.$axios.post(this.$baseUrl + `/team/live`,para)
        .then(function (res) {
          if (res.data.result === true) {
            that.$message.success(that.$t("common." + res.data.msg));
            that.$message.success("操作成功");
            that.dialogFormVisible = false;

            // that.forms='';
            console.log(res);
             that.$router.replace("/teamCheckin");
            
          } else {
            that.$message.error(that.$t("common." + res.data.msg));
            console.log(res.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
          }
        })


    },
    cancelData() {
      this.$router.replace("/teamCheckin");
    },
  },
};
</script>
<style  scoped>
</style>
