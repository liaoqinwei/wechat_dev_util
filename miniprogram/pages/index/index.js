import SuperBrush from '../../util/SuperBrush'

Page({

  /**
   * 页面的初始数据
   */
  data: {

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
    brush.drowLineArc([
      [20, 30],
      [40, 60],
      [60, 60]
    ], '#0000ff')
    brush.drowArc(20, 20, 10, 0, Math.PI * 2, true, 'red')
    brush.drowLine([
      [20, 20],
      [30, 30]
    ], 'black')
    brush.drowText('哈哈哈哈哈', 0, 0)
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

  }
})