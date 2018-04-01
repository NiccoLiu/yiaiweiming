<template>
  <div id="index">
    <div class="banner">
      <img src="../assets/imgs/banner.jpg">
      <div class="user">
        <img src="../assets/imgs/header.jpg" alt="">
        <div class="name">爱之名</div>
        <p><p/>
      </div>
    </div>
    <div class="info">
      <ul>
        <li><p>234.00</p><P>余额</P></li>
        <li><p>386.00</p><P>累计奖励</P></li>
        <li><p>10587</p><P>今日步数</P></li>
        <li><p>20.00</p><P>分享奖励</P></li>
      </ul>
    </div>
    <div class="main">
      <div class="title">{{title}}</div>
      <ul>
        <li class="menu_title" @click="toPage('/wxPay')"><img src="../assets/imgs/gold.png" alt="">充值<i class="iconfont icon-jiantou"></i></li>
        <li class="menu_title" @click="toPage('/withdrawal')"><img src="../assets/imgs/money.png" alt="">申请提现<i class="iconfont icon-jiantou"></i></li>
        <li class="menu_title"><img src="../assets/imgs/share.png" alt="">爱分享<i class="iconfont icon-jiantou"></i></li>
      </ul>
    </div>
    <div class="qiaodao"><span>点击签到</span></div>
  </div>
</template>

<script>
  import axios from 'axios'
export default {
  data(){
    return{
      title:'理财中心',
      menuList:[
        {title:"充值1",imgUrl:'./assets/imgs/import.png'},
        {title:"申请提现",imgUrl:'./assets/imgs/export.png'},
        {title:"爱分享",imgUrl:'./assets/imgs/import.png'},
        ]
    }
  },
  methods:{
    initPage(){
      this.getaccessToken()
      this.getAuth()
    },
    getAuth() {
      var self = this
      var appid = ''
      var redirect_uri= 'http://iot.1000mob.com/dev/index.html'  // 授权后，回调页面
      //2 用户网页授权access_token 获取
      var authUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ appid +
      '&redirect_uri='+ redirect_uri +'&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect'
      var getUserInfoUrl = 'http://iot.1000mob.com/dev/config/oauth/getUserInfo'
      var authParam = {}
      self.axiosGetData(authUrl,authParam,function (res) {
        self.code = res.code
        var param = self.code
        self.axiosPostData(getUserInfoUrl,param,function (result) {
          console.log(result)
        },function (errs) {
          console.log(errs)
        })
      },function (err) {
        alert('请求openid失败，请稍后再试')
      })
    },
    getOpenid() {
      var self = this
      //获取用户信息 获取openid
      // var usermsg = 'https://qyapi.weixin.qq.com/cgi-bin/user/convert_to_openid?access_token=ACCESS_TOKEN'
      var openidUrl = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=OPENID'
      var openidParam = {}
      self.axiosGetData(openidUrl,openidParam,function (res) {
        self.openid = res.openid
      },function (err) {
        alert('请求openid失败，请稍后再试')
      })
    },
    getaccessToken () {
      var self = this
      // 1初始化页面 得到 基础接口的token
      var accessToken = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET'
      var accessParam = {}
      self.axiosGetData(accessToken,accessParam,function (res) {
        self.accessToken = res.access_token
      },function (err) {
        alert('请求accessToken失败，请稍后再试')
      })
    },
    toPage(url){
      console.log(url)
      this.$router.push(url);
    },
    getData(){
      let url = this.getUrl('/config/jssdk');
      console.log(url)
      axios.post(url,{}).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    },
    // post 请求方式
    axiosPostData(url,param,susscesCallback,faildCallback){
      axios.post(url,param).then(res=>{
        console.log(res)
        susscesCallback()
      }).catch(err=>{
        console.log(err)
        faildCallback()
      })
    },
    // get请求方式
    axiosGetData(param,susscesCallback,faildCallback){
      axios.get(url,param).then(res=>{
        console.log(res)
        susscesCallback()
      }).catch(err=>{
        console.log(err)
        faildCallback()
      })
    }
  },
  mounted () {
    this.initPage()
    this.getData();
  }
}
</script>

<style lang='scss' scoped>
@import "../assets/mixin.scss";
#index{
  font-size: ptr(36);
}
.banner{
  width: 100%;
  position: relative;
  >img{
    display: block;
    width: 100%;
    // height: ptr(360);
  }
  .user{
    @include patl(200,180);
    // @include sc();
    img{
      @include wh(160,160);
      border-radius: 50%;
      background-color: #dcd7d7;;
    }
    .name{
      text-align: center;
      font-size: ptr(40);
      font-weight: 900;
      color:#fff;
    }
  }
}
.info{
  background-color: rgba(0,0,0,0.6);
  ul{
    display: flex;
    li{
      flex: 1;
      color: #fff;
    }
    p{
      @include lh(50);
      font-size: ptr(26);
      text-align: center;
    }
    p:nth-child(1){
      font-weight: 900;
    }
    p:nth-child(2){
      line-height: ptr(30);
    }
  }
}
.main{
  padding-top: ptr(20);
  background-color:#f3f0f0;
  .title{
    @include lh(80);
    padding-left: ptr(20);
    font-size: ptr(26);
    color: #6d6a6a;
    border-bottom: 1px solid #ddd;
    background-color:#FFF;
  }
  .menu_title{
   @include lh(100);
    padding-left: ptr(120);
    border-bottom: 1px solid #ddd;
    background-color:#FFF;
    position: relative;
    >img{
      @include patl(10 ,20);
      width: ptr(80);
    }
    i{
      @include patr(0 ,30);
      font-size: ptr(50);
      color: #9c9b9b;
    }
  }
}
.qiaodao{
  margin-top: ptr(50);
  text-align: center;
  span{
    display: inline-block;
    @include wlh(200,200);
    background-color: red;
    border-radius: 50%;
    font-weight: 900;
    color: #fff;
    animation: scaleRun 2s 1s ease infinite;
    -webkit-animation: scaleRun 2s 1s ease infinite;
    -moz-animation: scaleRun 2s 1s ease infinite;
  }
}

@keyframes scaleRun {
    0% {
       transform: scale(0.8);
    }
    50% {
        transform: scale(1);
    }
    100% {
        transform: scale(0.8);
    }
}

@-webkit-keyframes scaleRun {
    0% {
       transform: scale(0.8);
    }
    50% {
        transform: scale(1);
    }
    100% {
        transform: scale(0.8);
    }
}
</style>
