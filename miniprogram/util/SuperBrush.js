class SuperBrush {
  initDown = false
  queuePool = []

  constructor(selector) {
    this._selector = selector
    this._init()
  }

  _init() {
    const query = wx.createSelectorQuery()
    query.select(this._selector).fields({
      node: true,
      size: true
    }).exec((res) => {
      // 获取元素
      const canvas = res[0].node
      const ctx = canvas.getContext('2d')

      this._ctx = ctx
      this._node = canvas

      // 执行

      this.initDown = true
      // 手机像素配置
      const dpr = wx.getSystemInfoSync().pixelRatio
      canvas.width = res[0].width * dpr
      canvas.height = res[0].height * dpr
      ctx.scale(dpr, dpr)
    })
  }

  /**
   * 绘制线段
   * @param {*} path 
   */
  drowLine(path) {
    if (!this.checkInitDown('drowLine', path)) return
    this._ctx.beginPath()
    path.forEach(item => {
      this._ctx.lineTo.apply(this._ctx, item)
      this._ctx.stroke()
    })
  }

  /**
   * 绘制圆形
   * @param {*} x 
   * @param {*} y 
   * @param {*} radius 
   * @param {*} startAngle 
   * @param {*} endAngle 
   * @param {*} anticlockwise 
   */
  drowArc(x, y, radius, startAngle, endAngle, anticlockwise = true) {
    if (!this.checkInitDown('drowArc', path)) return
    this._ctx.beginPath()
    this._ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    this._ctx.stroke()
  }

  /**
   * 绘制 圆点线端
   * @param {*} path 
   */
  drowLineArc(path) {
    if (!this.checkInitDown('drowLineArc', path)) return
    path.reduce((preItem, item) => {
      this.drowLine([preItem, item])
      this.drowArc(...item, 5, 0, Math.PI * 2)
      return item;
    }, path[0])
  }

  /**
   * 检测是否初始化完 所有值都绑定成功
   */
  checkInitDown(fn, params) {
    if (this.initDown) return true
    else { // 没有初始化完 存放在队列中 不执行
      this.queuePool.push({
        [fn]: params
      })
      return false
    }
  }
}

export default SuperBrush