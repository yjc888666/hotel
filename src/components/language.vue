<template>
  <ul class="lang" @click="changeLang">
    <li :class="isActive?'active':''">中文</li>
    <li :class="!isActive?'active':''">英文</li>
  </ul>
</template>

<script>
  export default {
    data() {
      return {
        isActive: true
      }
    },
    methods:{
      changeLang(e) {
        let lang = e.target.innerText;
        if(lang == "中文"){
          lang = "zh";
        }
        if(lang == "英文"){
          lang = "en";
        }
        this.$i18n.locale = lang;
        localStorage.setItem("lang", lang);
        this.toActive(lang);
      },
      toActive(lang) {
        this.isActive = lang == "zh" ? true : false;
      }
    },
    created() {     
        if(localStorage.getItem("lang") == "zh" ||localStorage.getItem("lang") == "en"){
         var lang = localStorage.getItem("lang");
        }else{
          var lang = document.documentElement.lang;
          localStorage.setItem("lang", lang);
        }
        this.toActive(lang);
       if(lang==""||lang=="zh"){
          this.isActive = true
       }
      else{
         this.isActive = false
       }
      }
  }
</script>

<style scoped>
  .lang li{
    width:40px;
    height:20px;
    padding:5px 10px;
    border:1px solid #b5b5b5;
    line-height:20px;
    color:#777;
    float:left;
    font-size:14px;
    text-align: center;
    font-weight: bold;
  }
  .lang .active{
    border:1px solid #066197;
    color:#066197;
  }
</style>
