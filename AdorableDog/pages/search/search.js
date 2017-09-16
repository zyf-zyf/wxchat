const app = getApp();

Page({

  data: {
  	hasResult: true,
  	results:[]
  },

  staticData: {
  	inputValue: ""
  },

  onLoad() {
  	this.getSearchResults();
  },

  getSearchResults() {
  	wx.request({
      url: 'https://nuanwan.wekeji.cn/student/index.php/trade/get_search_list',
      method: "POST",
      data: {
        keyword: this.staticData.inputValue,
        distinct: app.globalData.distinct
      },
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      success: this.handleGetSearchSucc.bind(this)
    })
  },

  handleGetSearchSucc(res) {
    if (res.data.ret) {
      this.setData({
        hasResult: true,
        result: res.data.data
      })
    }else {
       this.setData({
        hasResult: false
      })
    }
  },

  handleInputChange(e) {
  	this.staticData.inputValue = e.detail.value;
  },

  handleSearchSubmit() {
  	this.getSearchResults();
  },

  handleDetailTap(e) {
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.dataset.index
    })
  }

})
