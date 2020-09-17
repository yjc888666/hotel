<template>
 
  
     <div class="cont">

    <Title :title='titles'></Title>

    <div class="cont_top_btn">
      
     </div>
     </div>  
</template>
<script>
  import Title from '../../components/cont_title.vue'
export default {
   components:{Title},
  data(){
    return {
     pricelist:[]
    }
  },
  created(){
    this.getRoomSetPrice();
  },
   computed:{
      titles(){
        return {title:this.$t('left.roomCharge')}
      }
   },
  methods:{
    getRoomSetPrice(){
      var that=this;
      this.$axios.post(this.$baseUrl + '/charge/list')
        .then((res) => {
          this.pricelist = res.data.pojo
        })
        .catch((res) => {
          console.log(res)
        })
    }
  }
}
</script>
<style scoped>

</style>