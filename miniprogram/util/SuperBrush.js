class SuperBrush {
  initDown = false
  pendingPool = []
  defaultConfig = {
    strokeStyle: 'black',
    fillStyle: 'black',
    textStyle: 'black',
    font: '10px sans-serif',
    textAlign: 'start',
    textBaseline: 'alphabetic',
    direction: 'inherit'
  }

  constructor(selector, config) {
    this._selector = selector
    this.defaultConfig = {
      ...this.defaultConfig,
      ...config
    }
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
      this.initDown = true
      // 手机像素配置
      const dpr = wx.getSystemInfoSync().pixelRatio
      canvas.width = res[0].width * dpr
      canvas.height = res[0].height * dpr
      ctx.scale(dpr, dpr)

      // 执行 等待池里面的所有 画笔
      this.pendingPool.forEach(item => {
        (this[item.fn]).apply(this, item.params)
      })

    })
  }

  /**
   * 绘制线段
   * @param {*} path 
   */
  drowLine(path, color) {
    if (!this.checkInitDown('drowLine', ...arguments)) return
    this._ctx.strokeStyle = color || this.defaultConfig.strokeStyle

    this._ctx.beginPath()
    path.forEach(item => {
      this._ctx.lineTo.apply(this._ctx, item)
    })
    this._ctx.stroke()
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
  drowArc(x, y, radius, startAngle, endAngle, anticlockwise = true, color) {
    if (!this.checkInitDown('drowArc', ...arguments)) return
    this._ctx.strokeStyle = color || this.defaultConfig.strokeStyle

    this._ctx.beginPath()
    this._ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    this._ctx.stroke()
  }

  /**
   * 编写文本
   * @param {*} text 
   * @param {*} x 
   * @param {*} y 
   * @param {*} config 
   */
  drowText(text, x, y, config = {}) {
    if (!this.checkInitDown('drowArc', ...arguments)) return
    this._ctx.strokeStyle = color || this.defaultConfig.strokeStyle


    let {
      type = 'fullText', // fullText || strokeText
        textStyle, font, textAlign,
        textBaseline, direction
    } = {
      ...this.defaultConfig,
      ...config
    }

    // 配置画笔
    this._ctx.fillStyle = textStyle
    this._ctx.strokeStyle = textStyle
    this._ctx.font = font
    this._ctx.textAlign = textAlign
    this._ctx.textBaseline = textBaseline
    this._ctx.direction = direction

    this._ctx[type](text, x, y)
  }

  /**
   * 绘制 圆点线端
   * @param {*} path 
   */
  drowLineArc(path, color) {
    if (!this.checkInitDown('drowLineArc', ...arguments)) return

    path.reduce((preItem, item) => {
      this.drowLine([preItem, item], color)
      this.drowArc(...item, 5, 0, Math.PI * 2, true, color)
      return item;
    }, path[0])
  }

  /**
   * 检测是否初始化完 所有值都绑定成功
   */
  checkInitDown(fn, ...params) {
    if (this.initDown) return true
    else { // 没有初始化完 存放在队列中 不执行
      this.pendingPool.push({
        fn,
        params
      })
      return false
    }
  }
}

export default SuperBrush