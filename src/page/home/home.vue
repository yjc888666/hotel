<template>
  <div class="hello">
    <div class="head">
      <div class="head_left" @click="$router.push({name:'home'})">{{$t('reception.name')}}</div>
      <div class="head_center">
        <el-tooltip class="item" effect="dark" :content="$t('reception.unfold')" placement="bottom">
          <div class="fold" @click="fold_click">
            <i class="el-icon-s-fold"></i>
          </div>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" :content="$t('reception.full')" placement="bottom">
          <div class="fold" @click="handleFullScreen">
            <i class="el-icon-picture-outline-round"></i>
          </div>
        </el-tooltip>
      </div>
     
      <div class="head_right">
        <el-popover placement="bottom" width="auto" trigger="hover">
          <p class="txk" @click="editpass"><i class="el-icon-edit txkd_i"></i>{{$t('reception.password')}}</p>
          <p class="txk" @click="Cancellation"><i class="el-icon-caret-left txkd_i"></i>{{$t('reception.log_off')}}</p>
          <div class="tx" slot="reference">
            <img src="../../assets/default.png" alt="">
            <p>{{name}}</p>
          </div>
        </el-popover>
      </div>
       <div class="langs">  
         <my-lang></my-lang>
       </div>
    </div>

    <el-dialog :title="$t('reception.password')" :visible.sync="dialogVisible" width="30%" class="dia">
      <div class="bt">
        <h5>{{$t('reception.old_password')}}：</h5><span>
          <el-input v-model="form.oldpsd" :placeholder="$t('reception.im_old_password')" type="password"></el-input>
        </span>
      </div>
      <div class="bt">
        <h5>{{$t('reception.new_password')}}：</h5><span>
          <el-input v-model="form.newpsd" :placeholder="$t('reception.im_new_password')" type="password"></el-input>
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">{{$t('public.cancel')}}</el-button>
        <el-button type="primary" @click="btn()" class="tijiao">{{$t('public.ok')}}</el-button>
      </span>
    </el-dialog>

    <div class="home_cont">
      <!-- 左侧菜单 -->
      <div class="home_left">
        <headleft :fold='fold'></headleft>
      </div>

      <!-- 右侧菜单 -->
      <div class="home_right" :style="{left:left}">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
  import language from "../../components/language.vue";
  import screenfull from 'screenfull'
  import headleft from '../../components/home_left.vue'
  export default {
    name: 'HelloWorld',
    data() {
      return {
        left: '',
        fold: false,
        name: '',
        dialogVisible: false,
        form: {
          oldpsd: '',
          newpsd: ''
        },
        isFullscreen: false
      }
    },
    components: {
      headleft,
       "my-lang": language
    },
    methods: {
      fold_click() {
        // console.log('锁紧')
        this.fold = !this.fold
        if (this.fold) {
          this.left = '65px'
        } else {
          setTimeout((res) => {
            this.left = '200px'
          }, 200)
        }
      },
      handleFullScreen() {
        screenfull.toggle()
    },
    Cancellation() {

      this.$confirm(this.$t('public.info2'), this.$t('public.hint'), {
          confirmButtonText: this.$t('public.ok'),
          cancelButtonText: this.$t('public.cancel'),
          type: 'warning'
        }).then(() => {
          var that = this;
          that.$axios.post(this.$baseUrl + `/exit`).then(function (res) {
          if (res.data.result== true){
             that.$message({
              message: that.$t("common."+res.data.msg),
              showClose: true,
              type: 'success'
            });
            // that.$message.success(that.$t("common."+res.data.msg))
            // localStorage.clear();
            localStorage.removeItem("name");
            localStorage.removeItem("token");
            that.$router.push({ path: '/' })
          }
        }).catch(function (error) {
          console.log('逻辑错误')
        })
      }).catch(() => {
          this.$message({
          type: 'info',
          message: this.$t('public.cancel')
        });
      });
    },
    editpass() {
      this.dialogVisible = true;
    },
    btn() {
      // let data = {
      //   oldpsd:this.form.pass,
      //   newpsd:this.form.pass2
      // }
      // console.log(data)
      var that = this;
      if(this.form.oldpsd == ""){
         that.$message.error(this.$t('reception.im_old_password'))
         return;
      }
       if(this.form.newpsd == ""){
         that.$message.error(this.$t('reception.im_new_password'));
         return;
      }
      var fordata = new FormData();
      fordata.append("oldpsd",this.form.oldpsd);
      fordata.append("newpsd",this.form.newpsd)
      this.$axios.post(this.$baseUrl + '/staff/repsd',fordata)
        .then((res) => {
          console.log(res)
          if (res.data.result) {
            this.$message({
              message: that.$t("common."+res.data.msg),
              showClose: true,
              type: 'success'
            });
            this.form.oldpsd = ''
            this.form.newpsd = ''
            this.dialogVisible = false;
          } else {
            this.$message({
              message: that.$t("common."+res.data.msg),
              showClose: true,
              type: 'error'
            });
          }
        })
    }
  },
  created() {
    this.name = localStorage.getItem('name')
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .head {
    width: 100%;
    height: 60px;
    background: #fff;
    position: fixed;
    top: 0;
    z-index: 999;
    color: #333;
    overflow:hidden;
    box-shadow: rgb(232, 232, 232) 0px 4px 10px;
  }

  .head_left {
    width: 200px;
    line-height: 60px;
    font-weight: bold;
    /* text-indent: 20px; */
    text-align: center;
    float: left;
    cursor: pointer;
    font-size: 16px;
    margin-right:30px;
  }

  .head_center {
    /* width: 80%; */
    float: left;
  }

  .home_left{
    float: left;
  }

  .head_right {
    height: 60px;
    padding: 0 30px;
    float: right;
  }

  .head_right .tx {
    width: 100%;
    display: flex;
  }

  .head_right .tx img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 10px;
    cursor: pointer;
  }

  .head_right .tx p {
    /* width: 120px; */
    margin-left:10px;
    height: 40px;
    margin-top: 10px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
  }

  .fold {
    width: 30px;
    height: 30px;
    background: #066197;
    color: white;
    margin-top: 15px;
    line-height: 30px;
    border-radius: 5px;
    text-align: center;
    float: left;
    margin-right: 15px;
    cursor: pointer;
    transition: .5s;
  }

  .fold:hover {
    background: #0f6161;
  }

  .home_right {
    height: auto;
    /* border: darkcyan solid 1px; */
    background: #fff;
    margin-top: 60px;
    position: absolute;
    left: 200px;
    right: 0;
    transition: .3s;
    /* width: 75%; */
  }

  .home_cont {
    width: 100%;
  }

  .txk {
    line-height: 40px;
    transition: .5s;
    text-align: center;
    cursor: pointer;
  }

  .txk:hover {
    background: #f1f1f1;
  }

  .txkd_i {
    margin-right: 10px;
  }
  .langs{
     float:right;
     margin-top: 15px;
  }

</style>
