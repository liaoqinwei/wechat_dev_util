import SuperBrush from '../../util/SuperBrush'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canvaOffset:550,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let brush = new SuperBrush('#my-canvas', {
      strokeStyle: 'red', // 默认颜色
      fillStyle: 'red'
    })
    brush.drowLineArcText([
      [20, 30, '张三'],
      [80, 60, '李四'],
      [140, 60, '王五'],
      [200, 100, '赵六']
    ], {
      lineColor: '#f7e9a9',
      arcColor: '#ff9d03',
      textColor: 'black',
      arcType: 'fill'
    })
    brush.drowLineArcText([
      [20, 80, '10'],
      [80, 90, '20'],
      [140, 80, '30'],
      [200, 120, '10']
    ], {
      lineColor: '#beddec',
      arcColor: '#3a92f7',
      textColor: 'black',
      arcType: 'fill',
      textTop: -20
    })
    /*brush.drowArc(20, 20, 10, 0, Math.PI * 2, true, 'red')
    brush.drowLine([
      [20, 20],
      [30, 30]
    ], 'black')
    brush.drowText('哈哈哈哈哈', 20, 30, {
      textAlign: 'center'
    })*/



    let brush2 = new SuperBrush('#my-canvas2')
    let path = []
    for (let i = 0; i < 600; i += 100) {
      path.push([i, 50+i/50, i + ''])
    }
    brush2.drowLineArcText(path, {color:'#ff0000',arcType:'fill'})


    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})