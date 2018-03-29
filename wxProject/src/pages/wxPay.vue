<template>
  <div id="wxPay">
    <div class="top-up">
      <span>金额</span><input type="text" placeholder="请输入充值金额">
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
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang='scss' scoped>
@import "../assets/mixin.scss";
#wxPay{
  padding-top: ptr(60);
}
.top-up{
  display: flex;
  @include lh(120);
  span{
    flex:1;
    text-align: center;
    background-color: #fff;
  }
  input{
    flex:4;
    padding: 0 ptr(20);
  }
}

.pay{
  padding-left: ptr(100);
  margin-top: ptr(80);
  height: ptr(120);
  background-color: #fff;
  position: relative;
  >img{
    @include patl(40,30);
    @include wh(48,39);
  }
  span{
    display: inline-block;
   @include lh(120);
  }
}
.rule{
  margin-top: ptr(60);
  padding-left: ptr(30);
  color: #0030ff;
  .rule-note{
    @include lh(80);
    font-size: ptr(32);
    font-weight: 900;
  }
  ul{
    li{
      padding-right: ptr(60);
    font-size: ptr(26);
      display: flex;
      span{
        width: ptr(40);
      }
      p{
         flex: 1;
      }
    }
  }
}
</style>

