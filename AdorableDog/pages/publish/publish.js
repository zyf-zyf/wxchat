const app = getApp();

Page({

  data: {
  	address: "请选择地址",
  	success: false
  },

  staticData: {
  	latitude: "",
  	longitude: "",
  	type: "",
  	message: "",
  	contact: ""
  },

  handleSelectAddress() {
  	wx.chooseLocation({
  		success: this.handleAddressSucc.bind(this)
  		// complete: function() {
  		// 	console.log("complete");
  		// }
  	});
  },

  handleAddressSucc(res) {
  	this.setData({
  		address: res.address
  	});

  	Object.assign(this.staticData, {
  		latitude: res.latitude,
  		longitude: res.longitude
  	})
  },

  handleTypeChange(e) {
  	this.staticData.type = e.detail.value;
  },

  handleMessageChange(e) {
  	this.staticData.message = e.detail.value;
  },

  handleContactChange(e) {
      let reg = /^1[3|4|5|8][0-9]\d{4,8}$/;
      if (e.detail.value.length == 11) {
          let num = e.detail.value;
          let bool = reg.test(num);
          if(bool == true) {
              this.staticData.contact = num;
          }
      }
  },

  handleSubmit() {
  	
  	if (this.data.address == "请选择地址" || !this.data.address) {
			this.showToast('请您选择地址');
			return;
  	}
    
    // 调用接口，判断经纬度是否在数据库中已存在，如果已存在
    // 提示用户重新选择一个位置

  	if (!this.staticData.type) {
  		this.showToast('请选择交易类型');
			return;
  	}

  	if (!this.staticData.message) {
  		this.showToast('请填写说明内容');
			return;
  	}
  
    if (!this.staticData.contact) {
        this.showToast('手机号码输入格式不正确，请验证后再重新输入！');
		return;
  	}

  	this.sendPostInfo();
  },

  showToast(title) {
  	wx.showToast({
			title: title,
			icon: 'loading',
			duration: 2000
		})
  },

  sendPostInfo() {

    const data = Object.assign({}, this.staticData, {
      address: this.data.address,
      distinct: app.globalData.distinct
    })

  	wx.request({
		  url: 'https://nuanwan.wekeji.cn/student/index.php/trade/add_item', 
		  data: data,
		  header: {
		      'content-type': 'application/x-www-form-urlencoded'
		  },
		  method: "POST",
		  success: this.handleSubmitSucc.bind(this)
		})
  },

  handleSubmitSucc() {
  	this.setData({
  		success: true
  	})
  }

})
