import Http from './network/Http'
import Event from './util/Event'

const event = new Event

//app.js
let wechartConfig = {
  lang: 'zh_CN'
}
App({
  onLaunch: function () {
    wx.getLocation({
      altitude: 'altitude',
    })
  },
  // 全局事件
  event  
  
})
