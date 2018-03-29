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
    toPage(url){
      console.log(url)
      this.$router.push(url);
    }
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
