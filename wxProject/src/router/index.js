import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import index from '../pages/index.vue'
import withdrawal from '../pages/withdrawal.vue'
import wxPay from '../pages/wxPay.vue'

const routes = [
  {
    path: "/",
    component: index
  },{
    path: "/withdrawal",
    component: withdrawal
  },{
    path: "/wxPay",
    component: wxPay
  }
];

export default new Router({
  routes
});