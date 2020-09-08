// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
 

//ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
 import i18n from '@/config/lang'
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

Vue.use(ElementUI)


import less from 'less'
Vue.use(less)

// //语言包
// import  LangENUS from '@/config/lang/en-us'
// import  LangZHCN from '@/config/lang/zh-cn'
// import VueI18n from 'vue-i18n'
// import  enLocale from 'element-ui/lib/locale/lang/en'
// import  zhLocale from 'element-ui/lib/locale/lang/zh-CN'
// import  locale from 'element-ui/lib/locale';
// Vue.use(VueI18n)
// // 使用多文件管理不同的语言是一个好习惯：localStorage.setItem
// const i18n = new VueI18n({
//   locale: localStorage.getItem('lang')||'zh', // 语言标识，后面会用做切换和将用户习惯存储到本地浏览器
//   messages: {
//     'en':Object.assign(LangENUS, enLocale),
//     'zh':Object.assign(LangZHCN, zhLocale)
//   }
// })
// locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换
//axios
import axios from 'axios'
Vue.prototype.$axios = axios

//url
Vue.prototype.$baseUrl = process.env.API_ROOT

import { Loading } from 'element-ui';
let loading //定义loading变量

function startLoading() { //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() { //使用Element loading-close 方法
  setTimeout(() => {
    loading.close();
  }, 100);
}

axios.interceptors.request.use(function(config) { // 每次请求时会从localStorage中获取token
  startLoading()
  let token = localStorage.getItem('token')
  if (token) {
    config.headers.token = localStorage.getItem('token')
  }
  return config
}, function(error) {
  return Promise.reject(error)
})

import { Message } from 'element-ui';


/* 响应拦截器 */
axios.interceptors.response.use(response => {
    if(response.data.msg==1100001){
      localStorage.clear()
      Message.error('该用户没有登录')
      router.push({ path: '/' })
    }
    if(response.data.msg==30000012){
      localStorage.clear()
      Message.error('该用户没有权限，请联系管理员')
      router.push({ path: '/auth' })
    }
    endLoading()
    return response;
  },
  err => {
    if(err && err.response){
      switch (err.response.status) {

      }
    }else {
      err.message = '连接服务器失败!'
    }
    Message.error(err.message)
    endLoading()
    return Promise.reject(err.message)
  })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  components: { App },
  template: '<App/>'
})
