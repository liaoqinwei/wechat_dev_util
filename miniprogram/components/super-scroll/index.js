// components/super-scroll/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    scrollFn:{
      type:Function,
      value:function(){}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    offsetLeft:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    scrollHandle(res){
      this.setData({offsetLeft:res.detail.scrollLeft})
    }
  }
})
