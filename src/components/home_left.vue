<template>
  <div>
    <el-menu :default-active='Active_Index' router class="el-menu-vertical-demo" @select="handleOpen" @close="handleClose"
      background-color="#393D49" text-color="#fff" active-text-color="#04ead6" :collapse="isCollapse" :unique-opened='true'>
      <el-submenu index="/warehouse" v-if="grantList[1].grant">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span slot="title">{{$t('left.warehouse')}}</span>
        </template>
        <el-menu-item-group >
          <el-menu-item index='/warehouse' v-if="grantList[1].children[0].grant">
            <router-link to='/warehouse' tag='div'>{{$t('left.warehouse')}}</router-link>
          </el-menu-item>
          <el-menu-item index="/cargoclass" v-if="grantList[1].children[1].grant">
            <router-link to='/cargoclass' tag='div'>{{$t('left.cargoclass')}}</router-link>
          </el-menu-item>
         <el-menu-item index="/cargo"  v-if="grantList[1].children[2].grant">
            <router-link to='/cargo' tag='div'>{{$t('left.cargo')}}</router-link>
          </el-menu-item>
          <el-menu-item index="/entryapply" v-if="grantList[1].children[3].grant">
            <router-link to='/entryapply' tag='div'>{{$t('left.entryapply')}}</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/cooperator" v-if="grantList[2].grant">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">{{$t('left.cooperator')}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index='/cooperator' v-if="grantList[2].children[0].grant">
            <router-link to='/cooperator' tag='div'>{{$t('left.cooperator')}}</router-link>
          </el-menu-item>
          <el-menu-item index="/tactic" v-if="grantList[2].children[1].grant">
            <router-link to='/tactic' tag='div'>{{$t('left.tactic')}}</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!--  -->

       <el-submenu index="/checkin" v-if="grantList[3].grant">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">{{$t('left.Menu_management')}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index='/checkin'  v-if="grantList[3].children[1].grant">
            <router-link to='/checkin' tag='div'>{{$t('left.chechin')}}</router-link>
          </el-menu-item>
          <el-menu-item index="/teamCheckin" v-if="grantList[3].children[0].grant">
            <router-link to='/teamCheckin' tag='div'>{{$t('left.teamCheckin')}}</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>


      <!-- <el-menu-item index="/checkin">
        <i class="el-icon-date"></i>
        <span slot="title">{{$t('left.Menu_management')}} </span>
      </el-menu-item> -->
      <el-menu-item-group v-if="grantList[0].grant">
         <el-menu-item index='/reservation'> 
            <i class="el-icon-takeaway-box"></i>
            <span slot="title">{{$t('left.Booking')}}</span>
              <!-- <router-link to='/reservation' tag='div'>预定列表</router-link> -->
         </el-menu-item>
     </el-menu-item-group>
        <el-submenu index="/restReserve" v-if="grantList[4].grant">
        <template slot="title">
          <i class="el-icon-s-unfold"></i>
          <span slot="title">{{$t('left.restautant')}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index='/restReserve' v-if="grantList[4].children[0].grant">
            <router-link to='/restReserve' tag='div'>{{$t('left.restReserve')}}</router-link>
          </el-menu-item>
          <el-menu-item index="/order" v-if="grantList[4].children[1].grant">
            <router-link to='/order' tag='div'>{{$t('left.order')}}</router-link>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- jcs开始 -->
      <el-submenu index="/vipInfo" v-if="grantList[5].grant" >
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">{{$t('left.customer')}}</span>
        </template>
        <el-menu-item index="/vipInfo" v-if="grantList[5].children[0].grant">
          <router-link to="/vipInfo" tag="div">{{$t('left.members')}}</router-link>
        </el-menu-item>
        <el-menu-item index="/integral" v-if="grantList[5].children[1].grant">
          <router-link to="/integral" tag="div">{{$t('left.integral')}}</router-link>
        </el-menu-item>
        <el-menu-item index="/storedBill" v-if="grantList[5].children[2].grant">
          <router-link to="/storedBill" tag="div">{{$t('left.stored')}}</router-link>
        </el-menu-item>
        <el-menu-item index="/operationLog" v-if="grantList[5].children[3].grant">
          <router-link to="/operationLog" tag="div">{{$t('left.operation')}}</router-link>
        </el-menu-item>
        <el-menu-item index="/guestList" v-if="grantList[5].children[4].grant"> 
          <router-link to="/guestList" tag="div">{{$t('left.guest')}}</router-link>
        </el-menu-item>
      </el-submenu>
      <!-- jcs结束 -->
        <el-submenu index="2" v-if="grantList[6].grant" >
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>{{$t('left.setting')}}</span>
          </template>
          <el-submenu index="/department" v-if="grantList[6].children[2].grant" >
            <template slot="title">{{$t('left.department')}}</template>
            <el-menu-item index="/department" v-if="grantList[6].children[2].children[0].grant">
              <router-link to='/department' tag='div'>{{$t('left.department_1')}}</router-link>
            </el-menu-item>
            <el-menu-item index="/userlist" v-if="grantList[6].children[2].children[1].grant">
              <router-link to='/userlist' tag='div'>{{$t('left.userlist')}}</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="/role"  v-if="grantList[6].children[3].grant"  >
            <template slot="title">{{$t('left.role')}}</template>
            <el-menu-item index="/role" 
              v-if="grantList[6].children[3].children[0].grant"
            >{{$t('left.role_1')}}</el-menu-item>
            <el-menu-item index="/permissions"
             v-if="grantList[6].children[3].children[1].grant"
            >{{$t('left.permissions')}}</el-menu-item>
          </el-submenu>
          <el-menu-item index="/member" v-if="grantList[6].children[1].grant">
            <span slot="title">{{$t('left.member')}}</span>
          </el-menu-item>
            <el-submenu index="/restautant"  v-if="grantList[6].children[4].grant" >
            <template slot="title">{{$t('left.restautant')}}</template>
            <el-menu-item index="/restautant"  v-if="grantList[6].children[4].children[0].grant">
              <router-link to='/restautant' tag='div'>{{$t('left.restautant')}}</router-link>
            </el-menu-item>
            <el-menu-item index="/tables" v-if="grantList[6].children[4].children[1].grant">
              <router-link to='/tables' tag='div'>{{$t('left.tables')}}</router-link>
            </el-menu-item>
            <el-menu-item index="/dishes" v-if="grantList[6].children[4].children[2].grant">
              <router-link to='/dishes' tag='div'>{{$t('left.dishes')}}</router-link>
            </el-menu-item>
              <el-menu-item index="/menu" v-if="grantList[6].children[4].children[3].grant">
              <router-link to='/menu' tag='div'>{{$t('left.menu')}}</router-link>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="/house" v-if="grantList[6].children[5].grant">
            <template slot="title">{{$t('left.house')}}</template>
            <el-menu-item index="/house" v-if="grantList[6].children[5].children[0].grant">
              <router-link to='/house' tag='div'>{{$t('left.house_1')}}</router-link>
            </el-menu-item>
            <el-menu-item index="/room"  v-if="grantList[6].children[5].children[1].grant">
              <router-link to='/room' tag='div'>{{$t('left.room')}}</router-link>
            </el-menu-item>        
          </el-submenu>
          <el-submenu index="/idType"  v-if="grantList[6].children[6].grant">
            <template slot="title">{{$t('left.idType')}}</template>
            <el-menu-item index="/idType" v-if="grantList[6].children[6].children[0].grant">
              <router-link to='/idType' tag='div'>{{$t('left.idType_1')}}</router-link>
            </el-menu-item>
            <el-menu-item index="/memsetting" v-if="grantList[6].children[6].children[1].grant">
              <router-link to='/memsetting' tag='div'>{{$t('left.memsetting')}}</router-link>
            </el-menu-item>  
            <el-menu-item index="/printsetting" v-if="grantList[6].children[6].children[2].grant">
              <router-link to='/printsetting' tag='div'>{{$t('left.printsetting')}}</router-link>
            </el-menu-item>      
          </el-submenu>
           <el-submenu index="/enteracc" v-if="grantList[6].children[7].grant">
            <template slot="title">{{$t('left.enteracc')}}</template>
            <el-menu-item index="/enteracc" v-if="grantList[6].children[7].children[0].grant" >
              <router-link to='/enteracc' tag='div'>{{$t('left.enteracc_1')}}</router-link>
            </el-menu-item>
            <el-menu-item index="/statistics" v-if="grantList[6].children[7].children[1].grant">
              <router-link to='/statistics' tag='div'>{{$t('left.statistics')}}</router-link>
            </el-menu-item>   
          </el-submenu>
          <el-menu-item index="/record"  v-if="grantList[6].children[0].grant">
            <span slot="title">{{$t('left.record')}}</span>
          </el-menu-item>
         </el-submenu>
    </el-menu>



  </div>
</template>

<style >
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width:200px;
    min-height:400px;
   
  }
   .el-menu-vertical-demo .el-menu-item-group__title{
    padding:0!important;
    }

  .el-menu-item{
    padding: none !important;
  }
  .is-active {
    background: #066197 !important;
    color: white !important;
    transition: .5s;
  }

  .el-menu-vertical-demo {
    
    height: 100%;
    margin-top: 60px!important;
    position: fixed!important;
    overflow: hidden;
    z-index: 999;
    
  }
  .el-submenu__title  {
    overflow: hidden;/*内容超出后隐藏*/
    text-overflow: ellipsis;/* 超出内容显示为省略号*/
    white-space: nowrap;/*文本不进行换行*/
}
.el-menu-item * {
   overflow: hidden;/*内容超出后隐藏*/
    text-overflow: ellipsis;/* 超出内容显示为省略号*/
    white-space: nowrap;/*文本不进行换行*/

}
</style>

<script>
  export default {
    props: {
      fold: {
        type: Boolean,
        require: true
      },
      title: '',
    },
    data() {
      return {
        isCollapse: false,
        grantList:[
          {},
          {},
          {},
          {},
          {},
          {},
          {}
        ],
      };
    },

    computed: {
      Active_Index(){
        // 员工
         if(this.$route.path.indexOf('userlist')==1){
          return '/userlist'
        }
        // 角色
         if(this.$route.path.indexOf('role')==1){
          return '/role'
        }
         // 会员
         if(this.$route.path.indexOf('member')==1){
          return '/member'
        }
        else{
          return this.$route.path
        }
      }
    },

    created() {
        this.authEvent();
    },

    watch: {
   
      fold(val){
          this.isCollapse = val
      },
    },

    methods: {
      //展示不同的菜单栏
          authEvent(){
          this.$axios.post(this.$baseUrl + '/permissions/userList')
          .then((res) => {
              this.grantList=res.data.pojo;
              console.log(this.grantList)
          })
          .catch(err=>{
            console.log(err)
          })
          }, 


      handleOpen(key, keyPath) {
   
      },
      handleClose(key, keyPath) {
        
      }
    }
  }
</script>
