<template>
  <div class="cont shouquan">

    <Title :title="titles"></Title>

    <div style="width: 90%;margin: 0 auto;margin-top: 20px;">
     <el-tree :data="tableData" show-checkbox default-expand-all node-key="id" ref="tree"
         @check-change="handleCheckChange"  :default-checked-keys="xz_id" :props="defaultProps">
    </el-tree>
    
        <div class="buttons" style="margin-top: 50px;">
         <el-button @click="submitForm()" type='primary'>{{$t('public.ok')}}</el-button>
        </div>
    </div>
       
    </div>
</template>

<script>
  import Title from '../../components/cont_title.vue'
  import yz from '../../config/validation.js'
  export default {
    components: {
      Title
    },
    data() {
      return {
        
        tableData:[],
        xz_id:[],
        // defaultProps: {
        //      children: 'children',    //字段里的children
        //       label: 'name'    //这里我是按照title循环
        //  },
      };
    },
    //  watch:{
    //    defaultProps:{
    //      handler(val){
    //        console.log(val)
    //      }
    //    }
    //  },

    created() {
     this.authEvent();
    },
    computed:{
      titles(){
       return {
       title:this.$t('left.permissions'),
       title_show:true
       }
      },
      defaultProps(){
        console.log(localStorage.lang)
         if(localStorage.lang==='zh'){
                 return{
                   children: 'children',
                    label: 'name' 
                 }  
                }
        else {
                 return {
                    children: 'children',
                    label: 'language' 
                 }
         }
      }

    },
    methods: {
     handleCheckChange(data, checked, indeterminate) {
      },
      authEvent(){
        var fordata = new FormData();
        fordata.append("role_id",this.$route.query.id)
        this.$axios.post(this.$baseUrl + '/permissions/grant',fordata)
          .then((res) => {
            if (res.data.result) {
               this.tableData = res.data.pojo
               
            var a = []
            function func (data) {
                for(var i =0;i<data.length;i++){
                        if(data[i].children){ //判断childrenChapterList下是否还有数据，避免进入死循环
                            // console.log(data[i].grant)
                            if(data[i].grant){
                              a.push(data[i].id)
                            }

                            // console.log(a)
                                func(data[i].children)
                        }
                }
            }
             func(this.tableData)
             this.xz_id = a
            }else{
              this.$message({
                message: this.$t("common."+res.data.msg),
                showClose: true,
                type: 'error'
              });
            }
          })
      },
      submitForm(formName) {
            let para = {
            id:this.$route.query.id,
            permissions:this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
          }
            this.$axios.post(this.$baseUrl + '/role/grant', para)
              .then((res) => {
                // console.log(res)
                if (res.data.result == true) {
                  this.$message({
                    message: this.$t("common."+res.data.msg),
                    showClose: true,
                    type: 'success'
                  });
                  this.$router.push({name:'role'})
                }else{
                   this.$message({
                    message: this.$t("common."+res.data.msg),
                    showClose: true,
                    type: 'error'
                  });
                }
              })
      },
    }
  }
</script>

<style>
   .shouquan .el-tree-node__content {
    width: 140px !important;
    float: left !important;
    margin-left: 5px !important;
  }

  .shouquan .el-tree>div {
    margin: 30px 0 !important;
    background: #fff !important;
  }

  .shouquan .el-tree-node.is-current>.el-tree-node__content:hover {
    background: #fff !important;
  }

  .shouquan .el-tree-node__content:hover {
    /* background: #fff !important; */
  }

  .shouquan .el-tree-node__expand-icon.is-leaf {
    display: none;
  }

  .shouquan .el-tree-node__expand-icon.expanded {
    display: none;
  }


  .shouquan .el-tree>div {
    margin: 10px 0 !important;
    background: #ccc !important;
  }

  .shouquan .el-tree-node.is-current>.el-tree-node__content:hover {
    background: #fff !important;
  }

  .shouquan .el-tree-node__content:hover {
    /* background: #fff !important; */
  }

  .shouquan .el-tree-node__expand-icon.is-leaf {
    display: none;
  }

  .shouquan .el-tree-node__expand-icon.expanded {
    display: none;
  }

  .shouquan .el-tree-node__content {
    width: 140px !important;
    /* background: darkcyan; */
    float: left !important;
    margin-left: 5px !important;
  }

  .shouquan .el-tree>div {
    padding: 5px 0 !important;
    height: auto;
    overflow: hidden;
    background: #fff !important;
    border-bottom: #F0F0F0 dotted 1px;
  }

  /* .el-tree-node.is-current>.el-tree-node__content:hover {
    background: #fff !important;
  } */

  .shouquan .el-tree-node__content:hover {
    /* background: #fff !important; */
  }

  .shouquan .el-tree-node__expand-icon.is-leaf {
    display: none;
  }

  .shouquan .el-tree-node__expand-icon.expanded {
    display: none;
  }

  .shouquan .el-tree-node__children {
    border-left: #ccc dotted 1px;
  }

  .shouquan .el-tree-node:hover {
    background: #F5F7FA !important;
  }
</style>
