<template>
  <div id="withdrawal">
    <div class="detail-box">
      <div class="total">
        <p><i class="iconfont icon-huobi"></i>0.00</p>
        <p>累计提现</p>
      </div>
      <div class="detail"><span>提现记录</span></div>
    </div>
    <div class="num">
      <p>提现金额：</p>
      <div class="input"><i class="iconfont icon-huobi"></i><input type="text"></div>
      <div class="notes">最大提现金额为<span class="assets">0.00</span>元，<span class="all">全部提现</span></div>
    </div>
    <div class="methods">
      <p>提现方式：</p>
      <div class="select">
        <i class="iconfont icon-iconfontjiantou"></i>
        <div class="result">微信钱包</div>
      </div>
    </div>
    <div class="btn">
      <button>确认提现</button>
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
.detail-box {
  display: flex;
  height: ptr(200);
  background-color: #fff;
  .total {
    flex: 1;
    padding-top: ptr(50);
    p {
      padding-left: ptr(40);
      i {
        font-size: ptr(40);
        font-weight: 900;
      }
    }
    p:nth-child(1){
      font-size: ptr(40);
    }
    p:nth-child(2){
      @include lh(50);
      font-size: ptr(30);
    }
  }
  .detail {
    flex: 1;
    text-align: right;
    padding-top: ptr(30);
    padding-right: ptr(50);
    color:#3788ec;
  }
}
.num{
  margin-top: ptr(10);
  background-color: #fff;
  p{
    @include lh(80);
  padding-left: ptr(20);
    color: #9c9b9b;
  }
  .input{
    @include lh(100);
  padding-left: ptr(20);
    font-size: ptr(60);
    i{
      font-size: ptr(60);
      font-weight: 900;
    }
    input{
      @include lh(100);
      font-size: ptr(60);
      font-weight: 900;
    }
  }
  .notes{
  padding-left: ptr(20);
    border-top: 1px solid #F5F5F5;
    @include lh(80);
    color: #9c9b9b;
    .assets{
      color:red;
    }
    .all{
      color: #3788ec;
    }
  }
}
.methods{
  margin-top: ptr(10);
  padding:0 ptr(30) ptr(20);
  background-color: #fff;
  p{
  @include lh(80);
  padding-left: ptr(20);
    color: #9c9b9b;
  }
  .select{
    width: 100%;
    padding-top: ptr(30);
    border-top: 1px solid #f5f5f5;
    position: relative;
    i{
      @include lh(80);
      @include patr(30,30);
    }
    .result{
      @include lh(80);
      padding-left: ptr(20);
      border: 1px solid #b5b3b3;
      border-radius: 5px;
    }
  }
}
.btn{
  margin-top: ptr(40);
  text-align: center;
  button{
    width: 92%;
    @include lh(100);
    border-radius: ptr(20);
    background-color: #3788ec;
    color: #fff;
    font-size: ptr(40);
    font-weight: 900;
    letter-spacing: 3px;
  }
}
</style>

