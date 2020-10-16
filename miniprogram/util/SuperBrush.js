class SuperBrush {
  initDown = false
  pendingPool = []
  defaultConfig = {
    strokeStyle: 'black', // 线段颜色
    fillStyle: 'black', // 上色颜色
    textColor: 'black', // 文字颜色
    font: '10px sans-serif', // 文字配置
    textAlign: 'start', // 文字居中模式
    textBaseline: 'alphabetic', // 文字
    direction: 'inherit', // 文字的下划线配置
  }

  /**
   * 构造函数
   * @param {String}} selector 必传选择器 
   * @param {Object} config 可选配置
   */
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
  drowArc(x, y, radius, startAngle, endAngle, anticlockwise = true, color, type) {
    if (!this.checkInitDown('drowArc', ...arguments)) return
    this._setColor(color)
    console.log(arguments);


    this._ctx.beginPath()
    this._ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
    if (type === 'fill') {
      this._ctx.fill()
      return
    }
    this._ctx.stroke()
  }

  /**
   * 编写文本
   * @param {*} text 
   * @param {*} x 
   * @param {*} y 
   * @param {*} config 配置可选
   */
  drowText(text, x, y, config = {}) {
    if (!this.checkInitDown('drowText', ...arguments)) return

    // 可优化
    let {
      type = 'fill', // fillText || strokeText
        textColor, font, textAlign,
        textBaseline, direction
    } = {
      ...this.defaultConfig,
      ...config
    }

    this._ctx.beginPath()

    // 配置画笔
    this._setColor(textColor)
    this._ctx.font = font
    this._ctx.textAlign = textAlign
    this._ctx.textBaseline = textBaseline
    this._ctx.direction = direction

    if (type === 'stroke') {
      this._ctx.strokeText(text, x, y)
      return
    }
    this._ctx.fillText(text, x, y)
  }

  /**
   * 绘制 圆点线端
   * @param {*} path 
   */
  drowLineArc(path, {
    color,
    circleSize = 3,
    arcType = 'stroke',
    lineColor,
    arcColor
  }) {
    if (!this.checkInitDown('drowLineArc', ...arguments)) return

    // 绘制线
    path.reduce((preItem, item, index) => {
      if (index === 0) return item
      this.drowLine([preItem, item], lineColor || color)
      return item;
    }, path[0])
    // 绘制 圆形
    path.forEach(item => {
      this.drowArc(...item, circleSize, 0, Math.PI * 2, true, arcColor || color, arcType)
    })
  }

  /**
   * 
   * @param {*} path [[x,y,text]]
   * @param {*} param1 
   */
  drowLineArcText(path, {
    color,
    circleSize = 3,
    arcType = 'stroke',
    textType = 'fill',
    lineColor,
    arcColor,
    textColor,
  }) {
    if (!this.checkInitDown('drowLineArcText', ...arguments)) return
    let tempPath = path.map(item => [item[0], item[1]])
    console.log(tempPath);

    this.drowLineArc(tempPath, arguments[1])
    path.forEach(item => {
      this.drowText(String(item[2]) || '', item[0], item[1] - circleSize - 10, {
        type: textType,
        textAlign: 'center',
        textColor
      })
    })
  }

  /**
   * 设置颜色
   * @param {String}} color 
   */
  _setColor(color) {
    this._ctx.strokeStyle = color
    this._ctx.fillStyle = color
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