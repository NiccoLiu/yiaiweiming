<template>
  <div id="wxPay">
    <div class="top-up">
      <span>金额</span><input type="number" v-model="totalAmount" placeholder="请输入充值金额">
    </div>
    <div class="pay">
      <img src="../assets/imgs/wx-icon.png" alt="">
      <span>微信支付</span>
    </div>
    <div class="rule">
      <div class="rule-note">充值说明</div>
      <ul>
        <li><span>1、</span><p>充值成功后，不可提现</p></li>
        <li><span>2、</span><p>如出现无法充值、充值失败等清空，请联系客服帮你解决问题</p></li>
      </ul>
    </div>
    <div class="btn">
      <button @click="initPayEnv">确认充值</button>
    </div>
  </div>
</template>

<script>
import { getDevUrl } from "../assets/js/env";
import axios from "axios";
export default {
  data() {
    return {
      sessionKey: "",
      openId: "",
      totalAmount: "",
      wxPay: {
        appId: "", //公众号名称，由商户传入
        timeStamp: "", //时间戳，自1970年以来的秒数
        nonceStr: "", //随机串
        package: "",
        signType: "MD5", //微信签名方式：
        paySign: "" //微信签名
      }
    };
  },
  methods: {
    //获取URL里参数
    getUrlParam(name, noDecode, url) {
      let re = new RegExp("[?#&]" + name + "=([^&#]*)", "i");
      let _url = url || window.location.href;
      let m = re.exec(_url);
      let ret = m ? m[1] : "";
      ret = ret.replace(/[+]/gi, "%20");
      return !noDecode ? decodeURIComponent(ret) : ret;
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
          this.openId = data.openId;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //初始化微信支付环境
    initPayEnv() {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.onBridgeReady,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady);
          document.attachEvent("onWeixinJSBridgeReady", this.onBridgeReady);
        }
      } else {
        this.toPay();
      }
    },
    //微信支付
    toPay() {
      let url = getDevUrl("/wxpay/order");
      axios
        .post(url, {
          totalAmount: this.totalAmount,
          sessionKey: this.sessionKey,
          openid: this.openid
        })
        .then(res => {
          console.log(res.data.data);
          let data = res.data.data;
          this.wxPay.appId = data.appid; //公众号名称，由商户传入
          this.wxPay.timeStamp = data.mch_id; //时间戳，自1970年以来的秒数
          this.wxPay.nonceStr = data.nonce_str; //随机串
          this.wxPay.package = `prepay_id=${data.prepay_id}`;
          this.wxPay.paySign = data.sign;
          this.onBridgeReady();
        })
        .catch(err => {
          console.log(err);
        });
    },
    onBridgeReady() {
      let wxPayParams = this.wxPay;
      console.log(wxPayParams);
      WeixinJSBridge.invoke("getBrandWCPayRequest", wxPayParams, function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          alert("支付成功");
        } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
      });
    }
  },
  mounted() {
    this.sessionKey = this.getUrlParam("sessionKey");
    this.getUserInfo(this.sessionKey);
  }
};
</script>

<style lang='scss' scoped>
@import "../assets/mixin.scss";
#wxPay {
  padding-top: ptr(60);
}
.top-up {
  display: flex;
  @include lh(120);
  span {
    flex: 1;
    text-align: center;
    background-color: #fff;
  }
  input {
    flex: 4;
    padding: 0 ptr(20);
  }
}

.pay {
  padding-left: ptr(100);
  margin-top: ptr(80);
  height: ptr(120);
  background-color: #fff;
  position: relative;
  > img {
    @include patl(40,30);
    @include wh(48,39);
  }
  span {
    display: inline-block;
    @include lh(120);
  }
}
.rule {
  margin-top: ptr(60);
  padding-left: ptr(30);
  color: #0030ff;
  .rule-note {
    @include lh(80);
    font-size: ptr(32);
    font-weight: 900;
  }
  ul {
    li {
      padding-right: ptr(60);
      font-size: ptr(26);
      display: flex;
      span {
        width: ptr(40);
      }
      p {
        flex: 1;
      }
    }
  }
}

.btn {
  width: 100%;
  margin-top: ptr(100);
  text-align: center;
  button {
    width: 92%;
    @include lh(100);
    border-radius: ptr(20);
    background-color: #1aad19;
    color: #fff;
    font-size: ptr(40);
    font-weight: 900;
    letter-spacing: 3px;
  }
}
</style>

