// 引用百度地图微信小程序JSAPI模块 
var bmap = require('../../libs/bmap-wx.js')
var globalData = getApp().globalData
var {
  message
} = require('../../data/message.js')
var {
  PmText
} = require('../../data/pm.js')
Page({
  data: {
    weatherData: '',
    searchValue: ''
  },
  onLoad: function() {
    var that = this;
    // 新建百度地图对象 
    var BMap = new bmap.BMapWX({
      ak: globalData.ak
    });
    var fail = function(data) {
      console.log(data)
    };
    var success = function(data) {
      that.success(data)
    }
    // 发起weather请求 
    BMap.weather({
      fail: fail,
      success: success
    });
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    wx.stopPullDownRefresh()
    this.init()
  },
  // 搜索城市天气事件
  searchCity(value) {
    const val = ((value.detail || {}).value || '').replace('/\s+/g', '')
    this.search(val)
  },
  search(val) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    })
    this.geocoder(val, loc => {
      this.init(`${loc.lng},${loc.lat}`)
    })
  },
  // 通过城市名获取城市经纬度
  geocoder(val, loc) {
    const that = this
    this.setData({
      searchValue: ''
    })
    if (val) {
      wx.request({
        url: getApp().setGeocoderUrl(val),
        success(res) {
          if (res.data.status === 1) return wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          loc(res.data.result.location)
        },
        fail(error) {
          wx.showToast({
            title: error
          })
        },
        complete() {
          that.setData({
            searchValue: ''
          })
        }
      })
    }
  },
  // 成功 获取城市天气
  success(data) {
    const that = this
    var weatherData = data.currentWeather[0];
    var originalData = data.originalData.results[0]
    originalData.index.forEach(v => {
      switch (v.title) {
        case '穿衣':
          v.img = '/img/clothing.png'
          break
        case '洗车':
          v.img = '/img/carwashing.png'
          break
        case '感冒':
          v.img = '/img/pill.png'
          break
        case '运动':
          v.img = '/img/running.png'
          break
        case '紫外线强度':
          v.img = '/img/sun.png'
          break
      }
    })
    var updateTime = `${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`
    // '城市： 'weatherData.currentCity 
    // 'PM2.5：'weatherData.pm25
    // '日期：' weatherData.date
    // '温度：' weatherData.temperature
    // '天气：' weatherData.weatherDesc
    // '风力：' weatherData.wind
    weatherData.curTem = weatherData.date.match(/\((\S*)\)/)[1].replace('实时：', '').trim()
    weatherData.curPmDesc = PmText(weatherData.pm25)
    that.setData({
      weatherData: weatherData,
      originalData: originalData,
      updateTime: updateTime,
      message: message()
    });
    wx.hideNavigationBarLoading()
  },
  // 失败 获取城市天气
  fail(res) {
    console.log('获取失败', res)
    wx.hideNavigationBarLoading()
  },
  init(location) {
    var BMap = new bmap.BMapWX({
      ak: globalData.ak
    })
    if (location) {
      BMap.weather({
        location: location,
        fail: this.fail,
        success: this.success
      })
    } else {
      BMap.weather({
        fail: this.fail,
        success: this.success
      })
    }
  }
})