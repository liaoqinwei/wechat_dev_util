// 发送登陆请求
const app = getApp()
const http = app.http

export function login(url, code) {
  return http.request({
    url,
    method: 'post',
    data: {
      code
    }
  })
}