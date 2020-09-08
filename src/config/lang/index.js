import Vue from 'vue'
import VueI18n from 'vue-i18n'
import  LangENUS from '@/config/lang/en-us'
import  LangZHCN from '@/config/lang/zh-cn'
import  enLocale from 'element-ui/lib/locale/lang/en'
import  zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import  locale from 'element-ui/lib/locale';
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: localStorage.getItem('lang')||'zh', // 语言标识，后面会用做切换和将用户习惯存储到本地浏览器
  messages: {
    'en':Object.assign(LangENUS, enLocale),
    'zh':Object.assign(LangZHCN, zhLocale)
  }
})
locale.i18n((key, value) => i18n.t(key, value)) //为了实现element插件的多语言切换
export default i18n