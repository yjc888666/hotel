<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
      <el-button type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus'  @click="addEvent()">{{$t('public.add')}}</el-button>
      <div class="lists">
     <el-input v-model.trim="ruleForm.room_number" class="time-left" :placeholder="$t('backstage.room_number')" clearable></el-input>
     <!-- <el-input v-model.trim="ruleForm.house_type" class="time-left" placeholder="房型" clearable></el-input> -->
      <el-select v-model.trim="ruleForm.house_type" :placeholder="$t('backstage.house_type')" clearable>
        <el-option v-for="item in houseType" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
     <el-select v-model.trim="ruleForm.comp" :placeholder="$t('backstage.comp')" clearable>
          <el-option v-for="item in sta" :key="item.value" :label="item.label" :value="item.value"></el-option>
       </el-select>
      <el-select v-model.trim="ruleForm.aircondition" :placeholder="$t('backstage.aircondition')" clearable>
          <el-option v-for="item in sta" :key="item.value" :label="item.label" :value="item.value"></el-option>
       </el-select>
       <el-select v-model.trim="ruleForm.status" :placeholder="$t('public.status')" clearable>
          <el-option v-for="item in statustype" :key="item.value" :label="item.label" :value="item.value"></el-option>
       </el-select>
      <el-button type="primary tijiao" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
     </div>
    </div>
    <el-table :data="tableData" stripe style="width: 100%" header-align='center'>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="room_number" :label="$t('backstage.room_number')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="peoples" :label="$t('backstage.peoples')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="house_type" :label="$t('backstage.house_type')" width="auto" show-overflow-tooltip align='center'  :formatter="houseTypeFormat"></el-table-column>
      <el-table-column prop="beds" :label="$t('backstage.beds')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="floor" :label="$t('backstage.floor')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="tv1" :label="$t('backstage.tv1')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="tel" :label="$t('backstage.tel')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="toli1" :label="$t('backstage.toli1')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="comp1" :label="$t('backstage.comp')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="aircondition1" :label="$t('backstage.aircondition')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="status1" :label="$t('public.status')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="cash_pledge" :label="$t('backstage.cash_pledge')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="prices" :label="$t('backstage.prices')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="remark" :label="$t('public.remark')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column :label="$t('public.operate')" align="center" fixed="right" width="350px">  
        <template slot-scope="scope">
          <!-- <el-button size="mini" @click="groupByHouseType(scope.$index, scope.row)">分组</el-button> -->
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('public.delete')}}</el-button>
          <el-button size="mini" @click="handleEmpty(scope.$index, scope.row)">{{$t('reception.empty')}}</el-button>
          <el-button size="mini" @click="handleForward(scope.$index, scope.row)">{{$t('reception.forward')}}</el-button>
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
    <el-dialog :title= "$t('public.room_info')" :visible.sync="dialogFormVisible" class="dia" width="40%">
      <el-form :model="forms" status-icon :rules="rule" ref="forms" label-width="80px" class="demo-ruleForm mars">
         <el-form-item :label="$t('backstage.room_number')" prop="room_number"  class="floatleft">
           <el-input v-model.trim="forms.room_number" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('backstage.tv1')" prop="tv" class="floatleft">
             <el-select v-model.trim="forms.tv" :placeholder="$t('public.please_select')">
              <el-option v-for="item in sta" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
         </el-form-item>
          <el-form-item :label="$t('backstage.peoples')" prop="peoples" class="floatleft">
           <el-input v-model.trim="forms.peoples" ></el-input>
         </el-form-item>
          <el-form-item :label="$t('backstage.comp')" prop="comp" class="floatleft">
            <el-select v-model.trim="forms.comp" :placeholder="$t('public.please_select')">
              <el-option v-for="item in sta" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
         </el-form-item>
         <el-form-item :label="$t('backstage.beds')" prop="beds" class="floatleft">
           <el-input v-model.trim="forms.beds" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('backstage.aircondition')" prop="aircondition" class="floatleft">
           <el-select v-model.trim="forms.aircondition" :placeholder="$t('public.please_select')">
              <el-option v-for="item in sta" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
         </el-form-item>
         <el-form-item :label="$t('backstage.floor')" prop="floor" class="floatleft">
           <el-input v-model.trim="forms.floor" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('backstage.toli1')" prop="toli" class="floatleft">
            <el-select v-model.trim="forms.toli" :placeholder="$t('public.please_select')">
              <el-option v-for="item in sta" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
         </el-form-item>
         <el-form-item :label="$t('backstage.cash_pledge')" prop="cash_pledge" class="floatleft">
           <el-input v-model.trim="forms.cash_pledge" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('backstage.house_type')" prop="house_type" class="floatleft">
            <el-select v-model.trim="forms.house_type" :placeholder="$t('public.please_select')" @change="queryRoomList">
              <el-option v-for="item in houseType" :key="item.id" :label="item.name" :value="item.id"  ></el-option>
            </el-select>
          </el-form-item>
        <el-form-item :label="$t('backstage.prices')" prop="prices" class="floatleft">
           <el-input v-model.trim="forms.prices" disabled ></el-input>
         </el-form-item>
         <el-form-item :label="$t('backstage.tel')" prop="tel" class="floatleft">
           <el-input v-model.trim="forms.tel" ></el-input>
         </el-form-item>
          <el-form-item :label="$t('public.status')" prop="status" class="floatleft">
            <el-select v-model.trim="forms.status" :placeholder="$t('public.please_select')">
              <el-option v-for="item in statustype" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
         </el-form-item>
        <el-form-item label="备注" prop="remark" class="floatleft">
        <el-input  type="textarea" :rows="2" v-model.trim="forms.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary"  @click="submitForms('forms')" v-show="show">{{$t('public.ok')}}</el-button>
        <el-button type="primary"  @click="modifyEvent('forms')" v-show="!show">{{$t('public.edit')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="$t('backstage.house_type')" :visible.sync="dialogFormVisible1" class="dia" width="30%">
      <el-form :model="forms1" status-icon :rules="rule1" ref="forms1" label-width="80px" class="demo-ruleForm mars">
          <el-form-item :label="$t('backstage.room_number')" prop="room_number">
            <el-input v-model.trim="forms1.room_number" ></el-input>
          </el-form-item>
          <el-form-item :label="$t('public.status')" prop="status">
            <el-select v-model.trim="forms1.status" :placeholder="$t('public.please_select')">
              <el-option v-for="item in statustype" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
         </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary"  @click="submitForms1('forms1')" >{{$t('public.ok')}}</el-button>   
      </div>
    </el-dialog>

      <el-dialog :title="$t('backstage.house_type')" :visible.sync="dialogFormVisible2" class="dia" width="30%">
      <el-form :model="forms2" status-icon :rules="rule2" ref="forms2" label-width="80px" class="demo-ruleForm mars">
          <el-form-item :label="$t('backstage.room_number')" prop="room_number">
            <el-input v-model.trim="forms2.room_number" ></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary"  @click="submitForms2('forms2')">{{$t('public.ok')}}</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
  import Title from '../../components/cont_title.vue'
  import yz from '../../config/validation.js'
  import qs from "qs";
  export default {
    components:{Title},
    data() {
      return {
        title:{
          // title:'后台房型列表',
          title_show:false
        },
        tableData: [],
        show:true,
        dialogFormVisible: false,
        sta:[{
          value: '1',
          label: this.$t('Validation.room.sta.item_1')
        }, {
          value: '2',
          label: this.$t('Validation.room.sta.item_2')
        }, {
          value: '3',
          label: this.$t('Validation.room.sta.item_3')
        }],
        statustype:[{
          value: '1',
          label: this.$t('Validation.room.sta.item_4')
        }, {
          value: '2',
          label: this.$t('Validation.room.sta.item_6')
        }, {
          value: '3',
          label: this.$t('Validation.room.sta.item_7')
        },{
          value: '4',
          label: this.$t('Validation.room.sta.item_8')
        }],
        forms:{
          room_number:"",
          peoples:"",
          beds:"",
          floor:"",
          tv:"",
          tel:"",
          toli:"",
          house_type:"",
          comp:"",
          aircondition:"",
          status:"",
          cash_pledge:"",
          prices:"",
          remark:"",
          comp:""
        },
        // rule: {
         
          
        // },
        dialogFormVisible1:false,
        forms1:{
          room_number:"",
          status:""
        },
        // rule1: {
          
        // },
        dialogFormVisible2:false,
        forms2:{
          room_number:"",
          status:""
        },
        // rule2: {
           
        // },
        mytotal:0,
        tableData:[],
        currentPage:1,
        pagesize:10,
        pages:0,
        pageNums:0,
        ruleForm: {
          room_number:"",
          house_type:"", 
          comp:"",
          aircondition:"",
          status:"",    
        },
        houseType:[],
      }
    },
    created() {
      this.submitForm();
      this.houseEvent();
    },
    computed:{
      titles(){
        return {title:this.$t('left.room')}
      },
      rule(){
        const rule={
          comp: [
            {required: true, message: this.$t('Validation.room.com_status'), trigger: 'blur'}
          ],
          room_number: [
            {required: true, message: this.$t('Validation.room.room_num'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
          peoples: [
            {required: true, message: this.$t('Validation.room.lives_people'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
           beds: [
            {required: true, message:  this.$t('Validation.room.bads'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
           floor: [
            {required: true, message: this.$t('Validation.room.floors'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
          tv: [
            {required: true, message: this.$t('Validation.room.tv_status'), trigger: 'blur'}
          ],
          tel: [
            {required: true, message:this.$t('Validation.room.tel'), trigger: 'blur'},
            {validator: yz.validatePhTelNumber, trigger: 'blur'}
          ],
          toli: [
            {required: true, message: this.$t('Validation.room.hot_wat'), trigger: 'blur'}
          ],
          house_type: [
            {required: true, message: this.$t('Validation.room.house_type'), trigger: 'blur'}
          ],
          omp: [
            {required: true, message: this.$t('Validation.room.com_status'), trigger: 'blur'}
          ],
           aircondition: [
            {required: true, message: this.$t('Validation.room.air_status'), trigger: 'blur'}
          ],
           status: [
            {required: true, message: this.$t('Validation.room.room_status'), trigger: 'blur'}
          ],
           cash_pledge: [
            {required: true, message: this.$t('Validation.room.room_cas'), trigger: 'blur'},
            {validator: yz.validateMoney, trigger: 'blur'}
          ],
          prices: [
            {required: true, message: this.$t('Validation.room.room_price'), trigger: 'blur'},
            {validator: yz.validateMoney, trigger: 'blur'}
          ],
        }
        return rule
      },
      rule1(){
        const rule1={
          room_number: [
            {required: true, message: this.$t('Validation.room.room_num'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
          status: [
            {required: true, message: this.$t('Validation.room.room_status'), trigger: 'blur'}
          ],
        }
        return rule1
      },
      rule2(){
        const rule2={
          room_number: [
            {required: true, message: this.$t('Validation.room.room_num'), trigger: 'blur'},
            {validator: yz.validateInteger, trigger: 'blur'}
          ],
        }
        return rule2
      }
    },
    methods:{
        // //根据房型分组显示的接口
        // groupByHouseType(index,row){
        //      this.$axios.post(this.$baseUrl+'/room/roomType',{
        //        house_type:row.house_type
        //      })
        //      .then(res=>{
        //        console.log(res)
        //      })
        //      .catch(err=>{
        //        console.log(err)
        //      })
        // },

        //房型的转换
    houseTypeFormat(row,column){
        for(var i=0,l=this.houseType.length;i<l;i++){
         if(row.house_type==this.houseType[i].id){
           return this.houseType[i].name
         }
       }
    },

      //根据选择的房型id,自动把房型价格返回来
         queryRoomList(val){
            let obj = {};
            obj = this.houseType.find((item)=>{
                return item.id === val;
            });
             
               this.forms.prices= obj.prices;
         },

      houseEvent(){
          this.$axios.post(this.$baseUrl + '/houseType/getlist')
        .then((res) => {
          this.houseType = res.data.pojo
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
          room_number:that.ruleForm.room_number,
          house_type:that.ruleForm.house_type,
          comp :that.ruleForm.comp ,
          aircondition:that.ruleForm.aircondition,
          status:that.ruleForm.status,		  
        }
        that.$axios.post(this.$baseUrl +`/room/getPage`,para)
          .then(function (res) {
            if (res.data.result==true) {
              that.sta.forEach(function(items){
                 res.data.pojo.list.forEach(function(item){
                     if(items.value == item.toli){
                       item.toli1 = items.label
                     }
                      if(items.value == item.tv){
                       item.tv1 = items.label
                     }
                     if(items.value == item.comp){
                       item.comp1 = items.label
                     }
                      if(items.value == item.aircondition){
                       item.aircondition1 = items.label
                     }
                 })
              })
              that.houseType.forEach(function(items){
                 res.data.pojo.list.forEach(function(item){
                     if(items.id == item.house_type){
                       item.house_type1 = items.name
                     }
                 })
              })
               that.statustype.forEach(function(items){
                 res.data.pojo.list.forEach(function(item){
                     if(items.value == item.status){
                       item.status1 = items.label
                     }
                 })
              })
              that.tableData = res.data.pojo.list;
              that.mytotal = res.data.pojo.total;
              that.pageNums = res.data.pojo.pageNum;
              that.pages = res.data.pojo.pages;
               if(that.pageNums > that.pages && that.currentPage!=0){
                that.currentPage = that.pages
                that.list(that.currentPage,that.pagesize)
              }
            }else{
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
      addEvent(){
        this.dialogFormVisible = true;
        this.show = true
      },
       submitForms(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          var that = this;
          that.$axios.post(this.$baseUrl +`/room/insert`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.name = "";
              that.forms.prices = "";
              that.list(that.currentPage,that.pagesize)
            }else {
              that.$message.error(that.$t("common."+res.data.msg))
            }
          }).catch(function (error) {
          console.log('逻辑错误')
        })

          }
        })
       },
       modifyEvent(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          var that = this;
          that.$axios.post(this.$baseUrl +`/room/update`,this.forms)
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.name = "";
              that.forms.prices = "";
              that.list(that.currentPage,that.pagesize)
              console.log(this.currentPage,this.pagesize)          
            }else {
              that.$message.error(that.$t("common."+res.data.msg))
            }
          }).catch(function (error) {
          console.log('逻辑错误')
        })

          }
        })
       },
      handleEdit(index,row){
        this.dialogFormVisible = true;
        this.show = false;
        this.forms.id = row.id;
        this.forms.room_number = row.room_number;
        this.forms.peoples = row.peoples;
        this.forms.beds = row.beds;
        this.forms.floor = row.floor;
        this.forms.tv = String(row.tv);
        this.forms.tel = row.tel;
        this.forms.toli = String(row.toli);
        this.forms.house_type = row.house_type;
        this.forms.comp = String(row.comp);
        this.forms.aircondition = String(row.aircondition);
        this.forms.status = String(row.status);
        this.forms.cash_pledge = row.cash_pledge;
        this.forms.prices = row.prices;
        this.forms.remark = row.remark;
      },
      handleDelete(index,row){
        this.$confirm(this.$t('public.info'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
        var fordata = new FormData();
        fordata.append("id",row.id )
        var that = this;
        this.$axios.post(this.$baseUrl + '/room/del',fordata)
          .then((res) => {
            if (res.data.result) {
              this.$message({
                message: this.$t("common."+res.data.msg),
                showClose: true,
                type: 'success'
              });
              // this.tableData.splice(index,1)
               that.list(that.currentPage,that.pagesize)
            }else{
              this.$message({
                message: this.$t("common."+res.data.msg),
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
      handleEmpty(index,row){
        this.dialogFormVisible1 = true;
        this.forms1.status = String(row.status);
        this.forms1.room_number = row.room_number;
    },
    submitForms1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          var that = this;
          //  var fordata = new FormData();
          //  fordata.append("status",this.forms1.status  )
          //  fordata.append("room_number",this.forms1.room_number  )
          that.$axios.post(this.$baseUrl +`/room/empty`,qs.stringify({
            room_number:this.forms1.room_number,
            status:this.forms1.status
          }))
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible1 = false;
              that.forms1.status = "";
              that.forms1.room_number = "";
              that.list(that.currentPage,that.pagesize)
            }else {
              that.$message.error(that.$t("common."+res.data.msg))
            }
          }).catch(function (error) {
          console.log('逻辑错误')
        })

          }
        })
       },
     
       handleForward(index,row){
        this.dialogFormVisible2 = true;
        this.forms2.room_number = row.room_number;
    },
     submitForms2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          var that = this;
          that.$axios.post(this.$baseUrl +`/room/forward`,{
            number:this.forms2.room_number
          })
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible2 = false;
              that.forms2.room_number = "";
              that.list(that.currentPage,that.pagesize)
            }else {
              that.$message.error(that.$t("common."+res.data.msg))
            }
          }).catch(function (error) {
          console.log('逻辑错误')
        })

          }
        })
       },
     
    }
  }
</script>

<style scoped="scoped">
.floatleft{
  width:47.5%;
  float:left;
}
.floatleft:nth-child(odd){
  margin-right:5%;
}
.dia .el-select {
  width: 100%;
}
</style>
