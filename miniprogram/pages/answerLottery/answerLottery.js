const app = getApp()

Page({
  data: {
    record : app.globalData.record
  },

  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    //console.group('数据库"实时数据推送"文档')
    //console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database/realtime.html')
    //console.groupEnd()
    this.setData({
      record : app.globalData.record
    })
  },

  //onShow
  onShow() { //返回显示页面状态函数
    //错误处理
    //this.onLoad()//再次加载，实现返回上一页页面刷新
    //正确方法
    //只执行获取地址的方法，来进行局部刷新
    this.onQueryRecord();
    app.globalData.count = 0;
  },

  // 查询答题记录
  onQueryRecord: function() {
    const db = wx.cloud.database()
    db.collection('record').where({
      _openid : this.data.openid,
      batchcode : app.globalData.batchcode
    }).get({
      success: res => {
        
        console.log('[数据库] [查询记录] 成功: ', res);
        app.globalData.record = res.data;
        this.setData({
          record : res.data
        });
        
        //console.log(app.globalData.record);
      },
      fail: err => {
        // wx.showToast({
        //   icon: 'none',
        //   title: '查询记录失败'
        // })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  }
})
