<template>
    <div class="fillcontain">
        <canvas id="canvas" class="canvas"></canvas>
        <div class="lang">
          <my-lang></my-lang>
        </div>
        <div class="login-box">
             <div class="name">{{$t('reception.name')}}</div>
            <form>
                <div class="ipunt-wrap">
                    <label for="username" class="icon-user">
                        <img src="../assets/user.png" alt="">
                    </label>
                    <input type="text" id="username" :placeholder="$t('verification.num')" v-model="serial_number">
                </div>
                <div class="ipunt-wrap">
                    <label for="password" class="icon-password">
                        <img src="../assets/password.png" alt="">
                    </label>
                    <input type="password" id="password" :placeholder="$t('verification.password')" v-model="password">
                </div>
                <div class="button">
                    <a class="gv" href="javascript:;" @click="Login()">{{$t('verification.land')}}</a>
                </div>
            </form>
        </div>
        <div class="city"></div>
    </div>
</template>

<script>
    import language from "@/components/language.vue";
    import Stars from '../../static/js/Star'
    import Moon from '../../static/js/Moon'
    import Meteor   from '../../static/js/Meteor'
    export default {
      name: 'login',
      components: {
        "my-lang": language
      },
        data(){
            return {
                serial_number:'',
                password:"",
            }
        },
        mounted(){
            let canvas = document.getElementById('canvas'),
                ctx = canvas.getContext('2d'),
                width = window.innerWidth,
                height = window.innerHeight,
            //实例化月亮和星星。流星是随机时间生成，所以只初始化数组
                moon = new Moon(ctx, width, height),
                stars = new Stars(ctx, width, height, 200),
                meteors = [],
                count = 0
            canvas.width = width;
            canvas.height = height;
            const meteorGenerator = ()=> {
                //x位置偏移，以免经过月亮
                let x = Math.random() * width + 800
                meteors.push(new Meteor(ctx, x, height))
                //每隔随机时间，生成新流星
                setTimeout(()=> {
                    meteorGenerator()

                }, Math.random() * 2000)
            }
            const frame = ()=>{
                count++
                count % 10 == 0 && stars.blink()
                moon.draw()
                stars.draw()
                meteors.forEach((meteor, index, arr)=> {
                    //如果流星离开视野之内，销毁流星实例，回收内存
                    if (meteor.flow()) {
                    meteor.draw()
                } else {
                    arr.splice(index, 1)
                }
            })
                requestAnimationFrame(frame)
            }
            meteorGenerator()
            frame()
        },
        methods: {
            Login(){
              var that = this;
                if (!that.serial_number && !that.password) {
                  that.$message.error(that.$t('verification.infoall'))
                  return;
                }else if(!that.serial_number){
                  that.$message.error(that.$t('verification.num'))
                  return;
                }else if(!that.password){
                  that.$message.error(that.$t('verification.password'))
                  return;
                }
                var user = {
                    serial_number: that.serial_number,
                    password: that.password
                }
              that.$axios.post(that.$baseUrl+"/land", user)
                    .then(function (res) {
                        if(res.data.result == true){
                          that.$message.success(that.$t("common."+res.data.msg));
                          localStorage.setItem('name',res.data.pojo.serial_number);
                          localStorage.setItem('token',res.data.pojo.sessionid);
                          let redirect = decodeURIComponent(that.$route.query.redirect || '/warehouse');
                          that.$router.push({ path: redirect })
                        }
                         if(res.data.result == false){
                          that.$message.error(that.$t("common."+res.data.msg));
                        }
                    }) .catch(function (error) {
                    console.log(error);
                });

            },

        },

    }

</script>

<style lang="less" scoped>
    @import '../style/mixin';
    .form_contianer{
    .wh(260px, 210px);
        position: relative;
        top:100px;
        padding: 60px;
        border-radius: 5px;
        margin:0 auto;
        text-align: center;
        background-color: #fff;
        padding-bottom:100px;
    .submit_btn{
        width: 100%;
        font-size: 16px;
    }
    }
    .loginTitle{
        margin-bottom:50px;
        color:@sizeC;
        font-weight: 100;
    }
    @media screen and (max-width: 768px){
        .form_contianer{
            padding: 50px;
        }
    }
    .fillcontain{
        position: fixed;
    }
    .canvas {
        position: fixed;
        z-index: -1;
    }
    .city {
        width: 100%;
        height: 170px;
        position: fixed;
        bottom: 0px;
        z-index: 100;
        background: url(../assets/city.png) no-repeat;
        background-size: cover;
    }
    .ipunt-wrap img{
      display: inline-block;
      vertical-align: middle;
    }
    .ipunt-wrap input{
        border: none;
        outline: none;
        background: none;
        border-bottom: 1px solid #fff;
        margin-top: 30px;
        width: 200px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 14px;
        padding: 0 5px;
    }
    .button{
        margin-top: 30px;
        margin-left: 60px;
    }
    .gv {
        text-decoration: none;
        background: url('../assets/nav_gv.png') repeat 0px 0px;
        width: 130px;
        height: 43px;
        display: block;
        text-align: center;
        line-height: 43px;
        cursor: pointer;
        float: left;
        margin: 10px 2px 10px 2px;
        font: 18px/43px 'microsoft yahei';
        color: #066197;
    }
    .login-box {
        width: 600px;
        padding: 50px;
        margin: 100px auto;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        -ms-flex-direction: column;
        flex-direction: column;
        z-index: 1;
       position: fixed;
       top:50px;
       left: 0;
       right: 0;
    }
    .login-box .logos {
        width: 270px;
        height: 108px;
        margin-bottom: 20px;
        background: url(../assets/logo.png) no-repeat;
        background-size: cover;
    }
    @media screen and (max-width: 450px) {
        .login-box{
            width: 210px;
            padding: 50px;
            margin: 0px auto;
            margin-top:20px;
        }
        .ipunt-wrap input{
            width:auto;
        }
        .button{
            margin-left: 40px;
        }
    }
    .name{
      font-size:24px;
      color: #fbfbfb;
      font-weight: 500;
      letter-spacing:3px;
    }
    .lang{
       position:fixed;
       right:1px;
       top:1px;
     }
</style>
