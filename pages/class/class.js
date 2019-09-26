var app = getApp();
Page({
  data: {
    BASE: app.globalData.BASE,
    winHeight: "400",
    currentTab: 1,
    scrollLeft: 0,
    cookNav: [],
    expertList: [{
      img: "avatar.png",
      name: "欢顔",
      tag: "知名情感博主",
      answer: 134,
      listen: 2234
    }]
  },
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  swichNav: function (e) {
    console.log(e)
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    var data = {
      cateid : that.data.currentTab
    };
    that.data.BASE.request.post("/cook.php?action=cookcate",data).then((res)=>{
      if (res.result) {
        that.setData({
          cookNav : res.data
        })
      }
    });
  },
  footerTap: app.footerTap
})
