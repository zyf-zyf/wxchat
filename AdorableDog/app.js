const util = require('./utils/util.js');

App({

	globalData: {
		deviceHeight: 0,
		deviceWidth: 0,
        distinct: "@zhangxiaozhai"
	},

  onLaunch() {
  	this.getDeviceInfo();
    this.login();
  },

  login() {
    wx.login({
      success: this.handleLoginSucc.bind(this)
    })
  },

  handleLoginSucc(res) {
    let code = res.code;
    util.sendRequestNew("get_user_info", {code:code}, "POST", this.handleGetOpenIdSucc.bind(this))
  },

  handleGetOpenIdSucc(res){
    console.log(res);
  },

  getDeviceInfo(){

    let deviceWidth = wx.getStorageSync("deviceWidth");
    let deviceHeight = wx.getStorageSync("deviceHeight");

    if (deviceWidth && deviceHeight) {
      // 直接从本地存储取
      this.globalData.deviceHeight = deviceHeight;
      this.globalData.deviceWidth = deviceWidth;
    }else {
      // 调用api获取设备信息，同时，存入本地存储
      try {
        var res = wx.getSystemInfoSync();
        this.globalData.deviceHeight = res.windowHeight;
        this.globalData.deviceWidth = res.windowWidth;
        wx.setStorageSync('deviceHeight', res.windowHeight);
        wx.setStorageSync('deviceWidth', res.windowWidth);
      } catch (e) {}
    }
  
  }
})
