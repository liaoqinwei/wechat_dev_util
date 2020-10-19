// 发送登陆请求
const app = getApp()
const http = app.http

/**
 * 获取登陆需要的code码
 */
async function getCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: resolve,
      fail: reject
    })
  })
}

/**
 * 向服务器发送登陆请求
 * @param {String}} url 
 */
export async function login(url) {
  let {code} = await getCode()

  return http.request({
    url,
    method: 'post',
    data: {
      code
    }
  })
}