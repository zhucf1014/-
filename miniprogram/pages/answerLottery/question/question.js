const app = getApp()

//itemtypes
function itemtypes (question){
  var array = [];
  //按钮type
  for(var i in question.questionitems){
    //console.log(question.questionitems[i]);//默认type
    array.push('default');
  }
  //console.log(array);
  return array;
}

Page({
  data: {
    record : app.globalData.record
    // indexqes : app.globalData.count,//计数
    // question : app.globalData.questions[app.globalData.count],//问题
    // types : itemtypes(app.globalData.questions[app.globalData.count])
  },
  
  //itemclick
  itemclick : function (e){
    //console.log(e.currentTarget.dataset.itemvalue);
    //console.log(e.currentTarget.dataset.itemvalue==this.data.question.questionright);
    //判断record
    if(this.data.record.length>=2){
      //跳主入口
      app.globalData.count = 0;
      wx.redirectTo({url : '../../answerLottery/answerLottery'});
    }
    //判断对错
    if(e.currentTarget.dataset.itemvalue==this.data.question.questionright){
      //对，则按钮为绿色
      this.data.types[e.currentTarget.dataset.itemindex] = 'primary';
      this.setData({types : this.data.types});
      if(this.data.indexqes<app.globalData.questions.length-1){
        //跳下一题
        app.globalData.count++;
        wx.redirectTo({url : '../question/question'});
      }else{
        //跳成功页
        wx.redirectTo({url : '../answersucc/answersucc'});
        //添加一次答题记录
        this.onAddRecord();
      }
    }else{
      //错，则按钮为红色
      this.data.types[e.currentTarget.dataset.itemindex] = 'warn';
      this.setData({types : this.data.types});
      //跳主入口
      app.globalData.count = 0;
      wx.redirectTo({url : '../../answerLottery/answerLottery'});
      //添加一次答题记录
      this.onAddRecord();
    }
  },

  //onLoad
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid,
        total : app.globalData.questions.length
      });
    }
    if(this.data.indexqes!=app.globalData.count){
      this.setData({
        indexqes : app.globalData.count,//计数
        question : app.globalData.questions[app.globalData.count],//问题
        types : itemtypes(app.globalData.questions[app.globalData.count])
      });
    }
    if(app.globalData.record!=null){
      this.setData({
        record : app.globalData.record
      })
    }
    console.log(app.globalData.count);
    console.log(this.data.indexqes);
    //高度自适应
    var that = this;
    wx.getSystemInfo({
        success: function (res) {
            var clientHeight = res.windowHeight,
              clientWidth = res.windowWidth,
              rpxR = 750 / clientWidth;
            var winHeight = clientHeight *1.0* rpxR;
            //console.log(winHeight);console.log('winHeight');
            that.setData({
              winHeight: winHeight
            });
        }
    })

    //console.log(app.globalData.count);
    //console.log(this.data.indexqes);
  },

  //onShow
  onShow() { //返回显示页面状态函数
    //错误处理
    //this.onLoad()//再次加载，实现返回上一页页面刷新
    //正确方法
    //只执行获取地址的方法，来进行局部刷新
    this.setData({
      record : app.globalData.record
    })
  },

  // 新增答题记录
  onAddRecord: function () {
    console.log((app.globalData.count+1) == app.globalData.questions.length)
    const db = wx.cloud.database()
    db.collection('record').add({
      data: {
        //_openid : this.data.openid, //默认自带，无需再带
        batchcode : app.globalData.batch.batchcode,
        success : (app.globalData.count+1) == app.globalData.questions.length,
        addtime : new Date()
      },
      success: res => {

        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        // 查询答题记录
        this.onQueryRecord();
      },
      fail: err => {

        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
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
        console.log(this.data.record);
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

