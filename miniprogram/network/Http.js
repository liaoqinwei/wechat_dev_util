 /**
  * 响应对象
  */
class Reponse{
  constructor(config={}){
    this.data = config.data
    this.url = config.url
    this.code = config.statusCode
    this.header = config.header
    this.cookies = config.cookies
  }
}

/**
 * 封装发送请求的 类
 */
class Http {
  defaultConfig = {
    baseUrl: '',
    method: 'get',
    params: {},
    data: {},
    cache: true,
    header: {},
    timeout: 1000 * 10,
    dataType: 'json',
    responseType: 'text',
  }

  constructor(baseUrl = '') {
    // 处理baseURL
    this.defaultConfig.baseUrl = baseUrl.lastIndexOf('/') === baseUrl.length - 1 ? baseUrl : baseUrl + '/';
  }
  // 初始化参数
  _init(){
    ['get','head','option','trace','connect','post','put','delete'].forEach(item=>{
      this[item] = function(config={}){
        config.method = item
        this.request(config)
      }
    })
  }
  /**
   * 合并参数
   */
  mergeConfig() {
    this.url = this.config.url
    this.config = {
      ...this.defaultConfig,
      ...this.config
    }
    this.params = {
      ...this.defaultConfig.params,
      ...this.config.params
    }
    this.data = {
      ...this.defaultConfig.data,
      ...this.config.data
    }
    this.header = {
      ...this.defaultConfig.header,
      ...this.config.header
    }
  }

  /**
   * @param {*} config 传入的配置 
   */
  request(config) {
    if (!config.url) throw new SyntaxError('必须传入URL作为配置参数')
    // 合并 配置
    this.config = config
    this.mergeConfig()
    // URL 配置
    this.mergeAndParseURL()
    return new Promise((resovle, reject) => {
      // 发送请求
      wx.request({
        url: this.url,
        data: this.data,
        header: this.header,
        timeout: this.defaultConfig.timeout,
        dataType: this.defaultConfig.dataType,
        responseType: this.config.responseType,
        success:(res)=>{
          resovle(new Reponse({...res,url:this.url}))
        },
        fail:reject
      })
    })
  }

  /**
   * 解析合并 baseURL和参数
   */
  mergeAndParseURL() {
    let baseUrl = this.config.baseUrl,
      url = this.url.indexOf('/') === 0 ? this.url.substring(1) : this.url

    url = baseUrl + url
    // 参数增加
    url += this.parseParams()
    this.url = url
  }

  /**
   * PARAMS 参数的解析 
   */
  parseParams() {
    let paramStr = ''

    if (!this.config.cache) this.params._ = Date.now();
    if (Object.keys(this.params).length <= 0) return ''
    for (let key in this.params) {
      paramStr += `${key}=${this.params[key]}&`;
    }
    paramStr = paramStr.substring(0, paramStr.length - 1)
    return this.url.indexOf('?') > -1 ? '&' + paramStr : '?' + paramStr
  }
}


export default Http