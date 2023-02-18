// app.js
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('login:', res);
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
