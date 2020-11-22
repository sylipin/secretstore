let app = getApp()
Page({
  data: {
    isLogin: false,
    userInfo: {},
    isAuth: false
  },
  onShow() {
    this.getUserInfo()
  },
  getUserInfo() {
    wx.getUserInfo({
      success: (res)=> {
        this.setData({
          userInfo: {
            url:res.userInfo.avatarUrl,
            nickName:res.userInfo.nickName,
          },
          isAuth: true
        })
        app.globalData.isAuth = true
      }
    })
  }
});