import {
  BASE_URL
} from './config'
import Http from './network/Http'

let http = new Http(BASE_URL)
http.defaultConfig.cache = false
http.request({
  url: 'recommend'
}).then(res => {
  console.log(res)
})
http.request({
  url: '/tolist',
  cache: true
})

console.log(http);