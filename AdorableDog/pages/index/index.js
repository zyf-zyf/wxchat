const app = getApp();
const utils = require("../../utils/util.js");
const tab = require("../../components/tab/tab.js");
const data = {
		"longitude": "113.324520",
		"latitude": "23.099994",
		"markers":[],
		"controls":[{
			id: 1,
		    iconPath: '/resources/pin.png',
		    position: {
	        left: (app.globalData.deviceWidth / 2) - 11,
	        top: ((app.globalData.deviceHeight - 42) / 2) - 31,
	        width: 22,
	        height: 31
      		}
			},{
			id: 2,
		    iconPath: '/resources/center.png',
		    clickable: true,
		    position: {
	        left: 20,
	        top: app.globalData.deviceHeight - 82 ,
	        width: 24,
	        height: 24
	      }
		}]
	}

Page({

	data: Object.assign({}, data, tab),

	onShow() {
		this.getLocation();
		this.getPoints();
	},

	onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap');
  },

	getLocation() {
		wx.getLocation({
  		type: 'gcj02',
		  success: this.handlePosSucc.bind(this)
		})
	},

	handlePosSucc(res) {
		this.setData({
			"longitude": res.longitude,
			"latitude": res.latitude
		})
	},

	controlTap() {
		this.mapCtx.moveToLocation();
	},

  onShareAppMessage() {
    return {
        title: 'AdorableDog',
      path: '/pages/index/index'
    }
  },

  getPoints() {
  	const data = {
  		distinct: app.globalData.distinct
  	};
  	utils.sendRequest("get_list", data, "GET", this.handleGetPointsSucc.bind(this))
  },

  handleGetPointsSucc(res) {

  	const points = res.data.data;
  	const arr = [];

  	for (var i = 0; i < points.length; i++) {
  		let item = points[i];
  		arr.push({
  			iconPath: "/resources/" + item.type + ".png",
  			id: item.id,
  			latitude: item.latitude,
        longitude: item.longitude,
        width: 40,
        height: 40
  		})
  	}

  	this.setData({
  		markers: arr
  	})
  },

  handleMarkerTap(e) {
  	wx.navigateTo({
  		url: '/pages/detail/detail?id='+ e.markerId
		})
  }
})
