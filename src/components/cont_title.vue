<template>
  <div>
    <p class="cont_title">
    <span class="cont_title_i" v-show="Ttile_show" @click="Fh">
      <i class="el-icon-caret-left"></i>
      </span>
      {{Title}}
    </p>
  </div>
</template>

<script>
  export default {
    props:{
      title:{
        type:Object,
        require: true
      }
    },
    data() {
      return {
        Title: '',
        Ttile_show:false
      }
    },
    created() {
      // console.log(this._props.title.title)
      this.Title = this._props.title.title
      this.Ttile_show = this._props.title.title_show
    },
    watch:{
      title(){
        this.Title = this._props.title.title
      }
    },
    methods:{
      Fh(){
        window.history.go(-1)
      }
    }
  }
</script>

<style scoped>
  /* 内容顶部title */
  .cont_title {
    line-height: 40px;
    font-size: 15px;
    font-weight: bold;
    text-indent: 0px;
    color: #066197;
    border-bottom: #066197 dotted 1px;
  }
  .cont_title_i{
    width: 35px;
    display: block;
    float: left;
    /* background: darkblue; */
  }
  .cont_title_i i{
       font-weight: bold;
       font-size: 30px;
       margin-top: 5px;
  }
</style>
