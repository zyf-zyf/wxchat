function sendRequest(path, data, method, callback) {

  wx.request({
      url: 'https://nuanwan.wekeji.cn/student/index.php/trade/' + path, 
      data: data,
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      method: method,
      success: callback
    })
}

function sendRequestNew(path, data, method, callback) {

  wx.request({
      url: 'https://nuanwan.wekeji.cn/student/index.php/wechat/' + path, 
      data: data,
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },
      method: method,
      success: callback
    })
}

module.exports = {
  sendRequest: sendRequest,
  sendRequestNew: sendRequestNew
}
