//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '近31天的运动数据',
    userInfo: {},
    runData: [],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  onLoad: function (options) {
    var that = this
    var timestampToTime = function (timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return Y + M + D;
    };
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://iot.1000mob.com/dev/config/getSessionKey',
          data: {},
          header: {
            "X-WX-Code": res.code
          },
          method: "get",
          success: function (res) {
            const rdSession = res.data.data.rdSession
            that.setData({
              rdSession: rdSession
            })
            wx.getWeRunData({
              success(res) {
                const iv = res.iv
                const encryptedData = res.encryptedData
                that.setData({
                  iv: iv,
                  encryptedData: encryptedData
                })
                wx.request({ // 获取运动数据
                  url: 'https://iot.1000mob.com/dev/user/synchroStep',
                  data: {
                    iv: iv,
                    encryptedData: encryptedData,
                    rdSession: rdSession
                  },
                  method: "post",
                  success: function (res) {
                    var runDatas = res.data.data.stepInfoList
                    var runData = []
                    for(var i = runDatas.length-1;i>=0;i-- ){
                      runDatas[i]['timestamp']=timestampToTime(runDatas[i]['timestamp']);
                      runData.push(runDatas[i])
                    }
                    that.setData({
                      runData: runData
                    })
                  }
                })
              }
            })
          }
        })
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})