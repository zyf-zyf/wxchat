const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "",
    type: "sell",
    textType: "",
    message: "",
    contact: ""
  },

  staticData: {
    id: ""
  },

  onLoad: function (options) {
    this.staticData.id = options.id;
    this.getDetailInfo();
  },

  getDetailInfo() {
    wx.request({
      url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_item',
      method: "POST",
      data: {
        id: this.staticData.id,
        distinct: app.globalData.distinct
      },
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: this.handleGetDetailSucc.bind(this)
    })
  },

  handleGetDetailSucc(res) {
    const result = res.data.data;
    this.setData({
      address: result.address,
      type: result.type,
      textType: result.type == "buy" ? "求购" : "转让",
      message: result.message,
      contact: result.contact
    })
    console.log(res);
  }

  
})