import {
  login
} from '../../network/login'

// components/login.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url:{
      type:String, 
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    userInfoHandle(res) {
      let isSucess = !!res.detail.rawData
      /* 成功授权的 逻辑
       * 1、发送登陆请求
       * 2、存储用户 的头像 、名字、uid到本地 
       *
       */
      if (isSucess) {
        wx.login({
          timeout: 2000,
          success:(res)=> {
            let code = res.code
            login(this.url, code).then(res => {
              console.log(res);
            })

          },
          fail() {

          }
        })
      } else {
        wx.showToast({
          title: '授权失败，请重新授权',
        })
      }
    }

  }
})