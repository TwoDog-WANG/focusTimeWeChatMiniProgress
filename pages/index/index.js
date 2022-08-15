const app = getApp();

Page({
  options: {
    pureDataPattern: /^_/
  },
  data: {
    isShowTimeCanvs: false,
    index: -1,
    _isQuit: false,
    isFist: true
  },
  fistLode() {
    this.setData({
      isFist: false
    })
  },
  startTime(e) {
    this.setData({
      isShowTimeCanvs: true,
      index: e.detail,
    })
  },
  quitTime(e) {
    let optionObj = {
      content: '是否退出计时',
      success: (res) => {
        if(res.confirm) {
          this.setData({
            isShowTimeCanvs: false,
            _isQuit: true,
          })
          let timeClear = app.componentData.timeClear._token;
          clearInterval(timeClear);
          app.componentData.timeClear._token = null;
        }
      }
    }
    wx.showModal(optionObj)
  },
  confimLeave() {
    if(this.data._isQuit) {
      this.setData({
        _isQuit: false,
      })
    }
    else {
      this.setData({
        isShowTimeCanvs: true,
      })
      this.__proto__.quitTime.call(this);
    }
  }
})