<template>
  <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
      <el-button type="success" size="small" style="background: #066197;border-color: #066197;"  icon='el-icon-plus'  @click="addEvent()">{{$t('public.add')}}</el-button>
      <el-button type="danger" size="small"   icon='el-icon-delete'  @click="delEvent()">{{$t('public.alldelete')}}</el-button>
    <div class="lists">
     <el-input v-model.trim="ruleForm.cargo_id" class="long-width" :placeholder="$t('reception.cargo_id')" clearable style="width:300px"></el-input>
     <el-input v-model.trim="ruleForm.cargo_name" class="time-left" :placeholder="$t('reception.cargo_name')" clearable></el-input>
     <el-select v-model="ruleForm.warehouse_id" :placeholder="$t('reception.warehouse_id')" clearable class="select-left">
        <el-option v-for="item in warehouseType" :key="item.id" :label="item.remark" :value="item.id"></el-option>
     </el-select>
      <el-select v-model="ruleForm.classify_id" :placeholder="$t('reception.classify_id')" clearable class="select-left">
         <el-option v-for="item in classigyType" :key="item.id" :label="item.classify_name" :value="item.id"></el-option>
      </el-select>
     <el-button type="primary tijiao" @click="submitForm('ruleForm')" class="tijiao">{{$t('public.inquire')}}</el-button>
     </div>
    </div>

    <el-table :data="tableData" stripe style="width: 100%" header-align='center' @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="ID" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="cargo_id" :label="$t('reception.cargo_id')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="cargo_name" :label="$t('reception.cargo_name')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="number" :label="$t('reception.num')" width="auto" show-overflow-tooltip align='center'></el-table-column>
      <el-table-column prop="warehouse_id" :label="$t('reception.warehouse_id')" width="auto" show-overflow-tooltip align='center' :formatter="warehouseFormat"></el-table-column>
      <el-table-column prop="classify_id" :label="$t('reception.classify_id')" width="auto" show-overflow-tooltip align='center' :formatter="classifyFormat"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">{{$t('public.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{$t('public.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="$t('reception.goods_1')" :visible.sync="dialogFormVisible" class="dia" width="30%">
      <el-form :model="forms" status-icon :rules="rule" ref="forms" label-width="80px" class="demo-ruleForm mars">
         <el-form-item :label="$t('reception.cargo_name')" prop="cargo_name">
           <el-input v-model.trim="forms.cargo_name" @keyup.enter.native="submitForms('forms')" ></el-input>
         </el-form-item>
          <el-form-item :label="$t('reception.num')" prop="number">
           <el-input v-model.trim="forms.number" @keyup.enter.native="submitForms('forms')" ></el-input>
         </el-form-item>
         <el-form-item :label="$t('reception.warehouse_id')" prop="warehouse_id">
          <el-select v-model="forms.warehouse_id" :placeholder="$t('public.please')">
            <el-option v-for="item in warehouseType" :key="item.id" :label="item.remark" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('reception.classify_id')" prop="classify_id">
          <el-select v-model="forms.classify_id" :placeholder="$t('public.please')">
            <el-option v-for="item in classigyType" :key="item.id" :label="item.classify_name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary"  @click="submitForms('forms')" v-show="show">{{$t('public.ok')}}</el-button>
        <el-button type="primary"  @click="modifyEvent('forms')" v-show="!show">{{$t('public.edit')}}</el-button>
      </div>
    </el-dialog>
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
  import yz from '../../config/validation.js'
  export default {
    components:{Title},
    data() {
      return {
        title:{
          // title:'货物列表',
          title_show:false
        },
        multipleSelection: [],
        mytotal:0,
        tableData:[],
        currentPage:1,
        pagesize:10,
        pages:0,
        pageNums:0,
        show:true,
        dialogFormVisible: false,
         ruleForm: {
          cargo_id:"", 
          cargo_name:"",          
          warehouse_id:"",      
          classify_id:"", 
        },
        warehouseType:[],
        classigyType:[],
        forms: {
          id:"",
          cargo_id:"", 
          cargo_name:"",      
          number:"",            
          warehouse_id:"",      
          classify_id:"",          
        },
        rule:{}
      }
    },
    created() {
      this.submitForm();
      this.houseEvent();
      this.classigyEvent();
    },
    methods:{
      setFormRules(){
        this.rule = {
          cargo_id: [
            {required: true, message: this.$t('reception.cargo_id'), trigger: 'blur'}
          ],
           cargo_name: [
            {required: true, message: this.$t('public.please')+this.$t('reception.cargo_name'), trigger: 'blur'}
          ],
           number: [
            {required: true, message: this.$t('public.please')+this.$t('reception.num'), trigger: 'blur'}
          ],
          warehouse_id: [
            {required: true, message: this.$t('public.please')+this.$t('reception.warehouse_id'), trigger: 'blur'}
          ],
          classify_id: [
            {required: true, message: this.$t('public.please')+this.$t('reception.classify_id'), trigger: 'blur'}
          ]
        }
      },

      //获取所有的仓库列表
      houseEvent(){
        this.$axios.post(this.$baseUrl + '/warehouse/getWareHouse')
        .then((res) => {
          this.warehouseType = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })
      },
       //仓库名称的转换
    warehouseFormat(row){
       for(var i=0,l=this.warehouseType.length;i<l;i++){
         if(row.warehouse_id==this.warehouseType[i].id){
           return this.warehouseType[i].remark
         }
       }
    },
     
     //获取所有的货物列表
      classigyEvent(){
        this.$axios.post(this.$baseUrl + '/cargoClassify/getClassify')
        .then((res) => {
          this.classigyType = res.data.pojo
          console.log(this.classigyType)
        })
        .catch((res) => {
          console.log(res)
        })
      },
      
      //货物名称的转换
      classifyFormat(row){
      for(var i=0,l=this.classigyType.length;i<l;i++){
         if(row.classify_id==this.classigyType[i].id){
           return this.classigyType[i].classify_name
         }
       }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      addEvent(){
        this.forms={};
        var that = this;
        this.dialogFormVisible = true;
        this.show = true;
        // that.forms.id = "";
        // that.forms.cargo_id = "";
        // that.forms.cargo_name = "";
        // that.forms.number = "";
        // that.forms.warehouse_id = "";
        // that.forms.classify_id = ""; 
      },
      list(a,b){
        var para = {
          cargo_id:this.ruleForm.cargo_id,
          cargo_name:this.ruleForm.cargo_name,
          warehouse_id:this.ruleForm.warehouse_id,
          classify_id:this.ruleForm.classify_id,
          page:a,
          size:b
        }
       var that = this;
       this.$axios.post(this.$baseUrl + '/cargo/getcargoPage',para)
        .then((res) => {
          if (res.data.result==true) {
            
            that.tableData = res.data.pojo.list;
            that.mytotal = res.data.pojo.total;
            that.pageNums = res.data.pojo.pageNum;
            that.pages = res.data.pojo.pages;
              if(that.pageNums > that.pages && that.currentPage!=0){
              that.currentPage = that.pages
              that.list(that.currentPage,that.pagesize)
            } 
          } 
          else{
            that.tableData = [];
            that.$message.error(that.$t("common."+res.data.msg))
          }
        })
        .catch((res) => {
          console.log(res)
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
       submitForms(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
          var that = this;
          that.$axios.post(this.$baseUrl +`/cargo/addcargo`,{
            cargo_name:this.forms.cargo_name,
            number:this.forms.number,
            warehouse_id:this.forms.warehouse_id,
            classify_id:this.forms.classify_id
          })
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.cargo_id = "";
              that.forms.cargo_name = "";
              that.forms.number = "";
              that.forms.warehouse_id = "";
              that.forms.classify_id = "";   
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
          that.$axios.post(this.$baseUrl +`/cargo/updatecargo`,{
            id:this.forms.id,
            cargo_id:this.forms.cargo_id,
            cargo_name:this.forms.cargo_name,
            number:this.forms.number,
            warehouse_id:this.forms.warehouse_id,
            classify_id:this.forms.classify_id
          })
          .then(function (res) {
            if (res.data.result== true) {
              that.$message.success(that.$t("common."+res.data.msg))
              that.dialogFormVisible = false;
              that.forms.cargo_id = "";
              that.forms.cargo_name = "";
              that.forms.number = "";
              that.forms.warehouse_id = "";
              that.forms.classify_id = "";  
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
      handleEdit(index,row){
         var that = this;
         this.dialogFormVisible = true;
         this.show = false;
         this.forms.id = row.id;
         this.forms.cargo_id = row.cargo_id;
         that.forms.cargo_name = row.cargo_name;
         that.forms.number = row.number;
        //  that.forms.warehouse_id= this.warehouseFormat(row)
        // //  that.forms.warehouse_id = row.warehouse_id;
        //  that.forms.classify_id = this.classifyFormat(row);
      },
      handleDelete(index,row){
        this.$confirm(this.$t('public.info'), this.$t('public.hint'), {
         confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
        // var fordata = new FormData();
        // fordata.append("dept_id",row.id )
        var that = this;
        this.$axios.post(this.$baseUrl + '/cargo/delcargo',[row.id])
          .then((res) => {
            if (res.data.result) {
              this.$message({
                message: this.$t("common."+res.data.msg),
                showClose: true,
                type: 'success'
              });
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
      delEvent(){
        var that = this;
         this.$confirm(this.$t('public.alldelete_info'),this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
           that.listId=[];
           that.multipleSelection.forEach(function(index){
              that.listId.push(index.id)
            })
        this.$axios.post(this.$baseUrl + '/cargo/delcargo',that.listId)
          .then((res) => {
            if (res.data.result) {
              this.$message({
                message: this.$t("common."+res.data.msg),
                showClose: true,
                type: 'success'
              });
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
      }
    },
    watch: {
      //监听语言切换
      '$i18n.locale' : function () {
        this.setFormRules();
      },
    },
    mounted(){
      this.setFormRules();
    },
    computed:{
      titles(){
        return {title:this.$t('reception.goods_list')}
      }
    },
  }
</script>

<style scoped="scoped">

</style>
