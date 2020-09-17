import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//连续点击多次路由报错解决方法
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  mode :'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['@/page/login'], resolve),
    },
    {
      path: '/home',
      component: resolve => require(['@/page/home/home'], resolve),
      meta: ['酒店管理'],
      children: [
       // 后台管理
        {
          path: '/department',
          name: 'department',
          component: resolve => require(['@/page/backstage/department'], resolve),
          meta: ['后台管理',"部门管理"],
        },
        {
          path: '/userlist',
          name: 'userlist',
          component: resolve => require(['@/page/backstage/userlist'], resolve),
          meta: ['后台管理','员工管理'],
        },
        {
          path: '/userlist/userlist_add',
          name: 'userlist_add',
          component: resolve => require(['@/page/backstage/userlist_add'], resolve),
          meta: ['后台管理','员工新增'],
        },
        {
          path: '/userlist/userlist_edit',
          name: 'userlist_edit',
          component: resolve => require(['@/page/backstage/userlist_edit'], resolve),
          meta: ['后台管理','员工修改'],
        },
        {
          path: '/role',
          name: 'role',
          component: resolve => require(['@/page/backstage/role'], resolve),
          meta: ['后台管理',"角色管理"],
        },
        {
          path: '/role/role_auth',
          name: 'role_auth',
          component: resolve => require(['@/page/backstage/role_auth'], resolve),
          meta: ['后台管理',"角色授权"],
        },
        {
          path: '/permissions',
          name: 'permissions',
          component: resolve => require(['@/page/backstage/permissions'], resolve),
          meta: ['后台管理',"权限管理"],
        },
        {
          path: '/record',
          name: 'record',
          component: resolve => require(['@/page/backstage/record'], resolve),
          meta: ['后台管理',"操作记录管理"],
        },
        {
          path: '/member',
          name: 'member',
          component: resolve => require(['@/page/backstage/member'], resolve),
          meta: ['后台管理',"会员管理"],
        },
        {
          path: '/member/member_add',
          name: 'member_add',
          component: resolve => require(['@/page/backstage/member_add'], resolve),
          meta: ['后台管理',"会员增加"],
        },
        {
          path: '/member/member_edit',
          name: 'member_edit',
          component: resolve => require(['@/page/backstage/member_edit'], resolve),
          meta: ['后台管理',"会员修改"],
        },
        {
          path: '/restautant',
          name: 'restautant',
          component: resolve => require(['@/page/backstage/restautant'], resolve),
          meta: ['后台管理',"餐厅管理"],
        },
        {
          path: '/tables',
          name: 'tables',
          component: resolve => require(['@/page/backstage/tables'], resolve),
          meta: ['后台管理',"餐桌管理"],
        },
        {
          path: '/dishes',
          name: 'dishes',
          component: resolve => require(['@/page/backstage/dishes'], resolve),
          meta: ['后台管理',"菜品分类管理"],
        },
        {
          path: '/menu',
          name: 'menu',
          component: resolve => require(['@/page/backstage/menu'], resolve),
          meta: ['后台管理',"菜品管理"],
        },
        {
          path: '/house',
          name: 'house',
          component: resolve => require(['@/page/backstage/house'], resolve),
          meta: ['后台管理',"房型管理"],
        },
        {
          path: '/room',
          name: 'room',
          component: resolve => require(['@/page/backstage/room'], resolve),
          meta: ['后台管理',"房间管理"],
        },
        {
          path: '/roomCharge',
          name: 'roomCharge',
          component: resolve => require(['@/page/backstage/roomCharge'], resolve),
          meta: ['后台管理',"房屋计价管理"],
        },
        {
          path: '/idType',
          name: 'idType',
          component: resolve => require(['@/page/backstage/idType'], resolve),
          meta: ['后台管理',"证件类型"],
        },
        {
          path: '/memsetting',
          name: 'memsetting',
          component: resolve => require(['@/page/backstage/memsetting'], resolve),
          meta: ['后台管理',"会员设置"],
        },
        {
          path: '/printsetting',
          name: 'printsetting',
          component: resolve => require(['@/page/backstage/printsetting'], resolve),
          meta: ['后台管理',"打印设置"],
        },
        {
          path: '/enteracc',
          name: 'enteracc',
          component: resolve => require(['@/page/backstage/enteracc'], resolve),
          meta: ['后台管理',"入账记录"],
        },
        {
          path: '/statistics',
          name: 'statistics',
          component: resolve => require(['@/page/backstage/statistics'], resolve),
          meta: ['后台管理',"流水账记录"],
        },
        // 前台
        {
          path: '/warehouse',
          name: 'warehouse',
          component: resolve => require(['@/page/home/warehouse'], resolve),
          meta: ['前台管理',"房间管理"],
        },
        {
          path: '/cargoclass',
          name: 'cargoclass',
          component: resolve => require(['@/page/home/cargoclass'], resolve),
          meta: ['前台管理',"货物分类"],
        },
        {
          path: '/cargo',
          name: 'cargo',
          component: resolve => require(['@/page/home/cargo'], resolve),
          meta: ['前台管理',"货物管理"],
        },
        {
          path: '/entryapply',
          name: 'entryapply',
          component: resolve => require(['@/page/home/entryapply'], resolve),
          meta: ['前台管理',"出入库管理"],
        }, 
        {
          path: '/tactic',
          name: 'tactic',
          component: resolve => require(['@/page/home/tactic'], resolve),
          meta: ['协议单位',"协议单位价格策略管理"],
        },
        {
          path: '/cooperator',
          name: 'cooperator',
          component: resolve => require(['@/page/home/cooperator'], resolve),
          meta: ['协议单位',"协议单位"],
        },
        {
          path: '/restReserve',
          name: 'restReserve',
          component: resolve => require(['@/page/home/restReserve'], resolve),
          meta: ['前台管理','餐厅管理',"预订管理"],
        },
        {
          path: '/order',
          name: 'order',
          component: resolve => require(['@/page/home/order'], resolve),
          meta: ['前台管理','餐厅管理',"订单管理"],
         
        },
        {
          path: '/checkin',
          name: 'checkin',
          component: resolve => require(['@/page/home/checkin'], resolve),
          meta: ['前台管理',"入住管理","普通入住管理"],
        },
        {
          path: '/teamCheckin',
          name: 'teamCheckin',
          component: resolve => require(['@/page/home/teamCheckin'], resolve),
          meta: ['前台管理',"入住管理","团队入住管理"],
          children:[
            {path:'/',redirect:'teamlist'},
            {path:'teamlist',name:'teamlist',component:resolve => require(['@/page/home/teamCheckList'], resolve)},
            {path:'teamuser',name:'teamuser',component:resolve => require(['@/page/home/teamCheckUser'], resolve)},
            {path:'teamOrder/:teamId/:teamName',name:'teamOrder',component:resolve => require(['@/page/home/teamPlayersOrder'], resolve),
            meta: {
              keepAlive: true, //此组件需要被缓存
           }},
          ]
        },

       

        {
          path: '/reservation',
          name: 'reservation',
          component: resolve => require(['@/page/home/reservation'], resolve),
          meta: ['前台管理',"预定列表"],
        },
        // -----------------jcs开始
        {
          path: '/vipInfo',
          name: 'vipInfo',
          component: resolve => require(['@/page/home/vipInfo'], resolve),
          meta: ['客户管理','会员信息'],
          children:[
            {path:'/',redirect:'memberPage'},
            {path:'memberPage',name:'memberPage',component:resolve => require(['@/page/home/memberPage'], resolve)},
            {path:'memberAlter',name:'memberAlter',component:resolve => require(['@/page/home/memberAlter'], resolve)},
            {path:'memberFrom',name:'memberFrom',component:resolve => require(['@/page/home/memberFrom'], resolve)},
          ]
        },
        {
          path: '/integral',
          name: 'integral',
          component: resolve => require(['@/page/home/integral'], resolve),
          meta: ['客户管理','积分查询'],
        },
        {
          path: '/storedBill',
          name: 'storedBill',
          component: resolve => require(['@/page/home/storedBill'], resolve),
          meta: ['客户管理','储存账单'],
        },
        {
          path: '/operationLog',
          name: 'operationLog',
          component: resolve => require(['@/page/home/operationLog'], resolve),
          meta: ['客户管理','操作日志'],
        },
        {
          path: '/guestList',
          name: 'guestList',
          component: resolve => require(['@/page/home/guestList'], resolve),
          meta: {
            keepAlive: true, //此组件需要被缓存
         }
        },
        {
          path: '/guestHistory',
          name: 'guestHistory',
          component: resolve => require(['@/page/home/guestHistory'], resolve),
          meta: ['客户管理','客人列表','客史'],
        }
        // --------------------jcs结束

      ]
    },
    {
      path: '/auth',
      component: resolve => require(['@/page/errorPage/auth'], resolve),
    },
    {
      path: '/error',
      component: resolve => require(['@/page/errorPage/error'], resolve),
    },
    {
      path: '/*',
      component: resolve => require(['@/page/errorPage/error'], resolve),
    },
 
 
  ]
})


import {
  Message
} from 'element-ui';

router.beforeEach((to, from, next) => {
  let login = localStorage.getItem('token') ? true : false
  if (to.path == '/') {
    next()
  } else {
    if (login) {
      next()
    } else {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
      Message({
        showClose: true,
        message: '请登录!',
        type: 'error'
      });
    }
  }
})


export default router

