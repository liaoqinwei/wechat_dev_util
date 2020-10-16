import Http from './network/Http'
import Event from './util/Event'

const event = new Event
const http = new Http('http://192.168.200.247:10052')

//app.js
let wechartConfig = {
  lang: 'zh_CN'
}
App({
  onLaunch: function () {
  },
  // 全局事件
  event ,
  http
  
})
