<template>
  <div id="index">
    <div class="banner">
      <img src="../assets/imgs/banner.jpg">
      <div class="user">
        <img :src="userImg" alt="">
        <div class="name">{{userName}}</div>
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
import { getDevUrl } from "../assets/js/env";
import axios from "axios";
export default {
  data() {
    return {
      wxData: {
        title: "徒步有益，健康你我他",
        desc: "健康传递你我他，爱他分享她！",
        link: getDevUrl("/index.html?sessionKey="),
        imgUrl: getDevUrl( "/static/img/share-icon.png")
      },
      userName: "爱之名",
      userImg: "../assets/imgs/header.jpg",
      openId: "",
      sessionKey: "",
      title: "理财中心",
      menuList: [
        { title: "充值", imgUrl: "./assets/imgs/import.png" },
        { title: "申请提现", imgUrl: "./assets/imgs/export.png" },
        { title: "爱分享", imgUrl: "./assets/imgs/import.png" }
      ]
    };
  },
  methods: {
    toPage(url) {
      this.$router.push(url);
    },
    //获取用户信息
    getUserInfo(sessionKey) {
      let url = getDevUrl("/user/query");
      console.log(url);
      axios
        .post(url, { sessionKey })
        .then(res => {
          console.log(res.data.data);
          let data = res.data.data;
          this.userName = data.name;
          this.userImg = data.imageUrl;
          this.openId = data.openId;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取sdk配置
    getShareData(sessionKey) {
      let url = getDevUrl("/config/jssdk");
      axios
        .post(url, { sessionKey })
        .then(res => {
          let data = res.data.data;
          let appid = data.appId;
          let timestamp = data.timestamp;
          let nonceStr = data.nonceStr;
          let signature = data.signature;
          this.wxConfig(appid, timestamp, nonceStr, signature);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //微信配置分享
    wxConfig(appid, timestamp, nonceStr, signature) {
      wx.config({
        debug: false, //false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appid, //data.appId, // 必填，公众号的唯一标识
        timestamp: timestamp, //data.timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, //data.nonceStr, // 必填，生成签名的随机串
        signature: signature, //data.signature, // 必填，签名，见附录1
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage","chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      wx.ready(() => {
        //分享给朋友
        wx.onMenuShareAppMessage(this.wxData);
        //分享给朋友圈
        wx.onMenuShareTimeline({
          title: this.wxData.desc,
          desc: this.wxData.desc,
          link: this.wxData.link,
          imgUrl: this.wxData.imgUrl
        });
      });
    },
    //微信授权
    authorization(url) {
      let appid = "wx9b06c3a33f05ecdf";
      let redirect_uri = encodeURIComponent(url);
      let response_type = "code";
      let scope = "snsapi_userinfo";
      let state = "STATE";
      let wechat_redirect = "#wechat_redirect";

      let locationUrl =
        "https://open.weixin.qq.com/connect/oauth2/authorize?" +
        "appid=" +
        appid +
        "&" +
        "redirect_uri=" +
        redirect_uri +
        "&" +
        "response_type=" +
        response_type +
        "&" +
        "scope=" +
        scope +
        "&" +
        "state=" +
        state +
        "&" +
        wechat_redirect;
      window.location.href = locationUrl;
    },
    //获取URL里参数
    getUrlParam(name, noDecode, url) {
      let re = new RegExp("[?#&]" + name + "=([^&#]*)", "i");
      let _url = url || window.location.href;
      let m = re.exec(_url);
      let ret = m ? m[1] : "";
      ret = ret.replace(/[+]/gi, "%20");
      return !noDecode ? decodeURIComponent(ret) : ret;
    }
  },
  mounted() {
    this.sessionKey = this.getUrlParam("sessionKey");
    if (this.sessionKey == "") {
      let authorUrl =
        "http://iot.1000mob.com/dev/config/menu/index?source=wx&backUrl=http://iot.1000mob.com/dev/index.html#/";
      this.authorization(authorUrl);
    } else {
      this.getUserInfo(this.sessionKey);
      this.getShareData(this.sessionKey);
    }
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/mixin.scss";
#index {
  font-size: ptr(36);
}
.banner {
  width: 100%;
  position: relative;
  > img {
    display: block;
    width: 100%;
    // height: ptr(360);
  }
  .user {
    @include patl(200,180);
    // @include sc();
    img {
      @include wh(160,160);
      border-radius: 50%;
      background-color: #dcd7d7;
    }
    .name {
      text-align: center;
      font-size: ptr(40);
      font-weight: 900;
      color: #fff;
    }
  }
}
.info {
  background-color: rgba(0, 0, 0, 0.6);
  ul {
    display: flex;
    li {
      flex: 1;
      color: #fff;
    }
    p {
      @include lh(50);
      font-size: ptr(26);
      text-align: center;
    }
    p:nth-child(1) {
      font-weight: 900;
    }
    p:nth-child(2) {
      line-height: ptr(30);
    }
  }
}
.main {
  padding-top: ptr(20);
  background-color: #f3f0f0;
  .title {
    @include lh(80);
    padding-left: ptr(20);
    font-size: ptr(26);
    color: #6d6a6a;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
  }
  .menu_title {
    @include lh(100);
    padding-left: ptr(120);
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    position: relative;
    > img {
      @include patl(10 ,20);
      width: ptr(80);
    }
    i {
      @include patr(0 ,30);
      font-size: ptr(50);
      color: #9c9b9b;
    }
  }
}
.qiaodao {
  margin-top: ptr(50);
  text-align: center;
  span {
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
