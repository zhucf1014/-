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
    indexqes : app.globalData.count,//计数
    question : app.globalData.questions[app.globalData.count],//问题
    types : itemtypes(app.globalData.questions[app.globalData.count])
  },
  
  //itemclick
  itemclick : function (e){
    //console.log(e.currentTarget.dataset.itemvalue);
    //console.log(e.currentTarget.dataset.itemvalue==this.data.question.questionright);
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
      }
    }else{
      //错，则按钮为红色
      this.data.types[e.currentTarget.dataset.itemindex] = 'warn';
      this.setData({types : this.data.types});
      //跳主入口
      app.globalData.count = 0;
      wx.redirectTo({url : '../../answerLottery/answerLottery'});
    }
  },

  //onLoad
  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      });
    }
    if(this.data.indexqes!=app.globalData.count){
      this.setData({
        indexqes : app.globalData.count,//计数
        question : app.globalData.questions[app.globalData.count],//问题
        types : itemtypes(app.globalData.questions[app.globalData.count])
      });
    }
    
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
  }

})

