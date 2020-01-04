//app.js
App({
  onLaunch: function () {
    // 小程序启动之后 触发
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    // 查询答题批次信息
    this.onQueryBatch();

    this.globalData = {
      count : 0
    }
  },

  // 查询答题批次信息
  onQueryBatch: function() {
    const db = wx.cloud.database()
    db.collection('batch').where({

    })
    .orderBy('batchcode', 'desc')
    .skip(0)
    .limit(1)
    .get({
      success: res => {
        
        console.log('[数据库] [查询记录] 成功: ', res);
        this.globalData.batch = res.data[0];
        //console.log(this.globalData.batch);
        // 查询答题题目信息
        this.onQueryQuestion();
        
      },
      fail: err => {
        // wx.showToast({
        //   icon: 'none',
        //   title: '查询记录失败'
        // })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  // 查询答题题目信息
  onQueryQuestion: function() {
    const db = wx.cloud.database()
    db.collection('question').where({
      batchcode : this.globalData.batch.batchcode
    }).get({
      success: res => {
        
        console.log('[数据库] [查询记录] 成功: ', res);
        this.globalData.questions = res.data;
        //console.log(this.globalData.questions);
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


//题目
var questions = [
  {
    questiontitle : '地方应当根据当地实际提高基础养老金标准，对____岁及以上参保城乡老年居民予以适当倾斜；对长期缴费、超过最低缴费年限的，应当适当加发____基础养老金。',
    questionright : 'A',
    questionitems : [
      {
        itemtext  : 'A. 65 年限',
        itemvalue : 'A'
      },{
        itemtext  : 'B. 70 老龄',
        itemvalue : 'B'
      },{
        itemtext  : 'C. 75 补充',
        itemvalue : 'C'
      },{
        itemtext  : 'D. 80 长期',
        itemvalue : 'D'
      }
    ]
  },{
    questiontitle : ' 2019年3月16日,第十三届全国人民代办大会第二次会议表决通过了____。',
    questionright : 'C',
    questionitems : [
      {
        itemtext  : '《中华人民共和国物权法》',
        itemvalue : 'A'
      },{
        itemtext  : '《中华人民共和国国家安全法》',
        itemvalue : 'B'
      },{
        itemtext  : '《中华人民共和国外商投资法》',
        itemvalue : 'C'
      },{
        itemtext  : '《中华人民共和国反分裂国家法》',
        itemvalue : 'D'
      }
    ]
  },{
    questiontitle : '“三过家门而不入”说的人物是____。',
    questionright : 'C',
    questionitems : [
      {
        itemtext  : '尧',
        itemvalue : 'A'
      },{
        itemtext  : '舜',
        itemvalue : 'B'
      },{
        itemtext  : '禹',
        itemvalue : 'C'
      },{
        itemtext  : '鲧',
        itemvalue : 'D'
      }
    ]
  },{
    questiontitle : '我们经常使用手机扫描二维码，“扫一扫”这一功能使用了____识别方式。',
    questionright : 'A',
    questionitems : [
      {
        itemtext  : '图像',
        itemvalue : 'A'
      },{
        itemtext  : '文字识别',
        itemvalue : 'B'
      },{
        itemtext  : '语音识别',
        itemvalue : 'C'
      },{
        itemtext  : '人脸识别',
        itemvalue : 'D'
      }
    ]
  },{
    questiontitle : '用人单位不得因女职工____降低其工资、予以辞退、与其解除劳动或者聘用合同。',
    questionright : 'D',
    questionitems : [
      {
        itemtext  : '怀孕、生育、哺乳、经期',
        itemvalue : 'A'
      },{
        itemtext  : '怀孕、生育、经期',
        itemvalue : 'B'
      },{
        itemtext  : '怀孕、经期、哺乳',
        itemvalue : 'C'
      },{
        itemtext  : '怀孕、生育、哺乳',
        itemvalue : 'D'
      }
    ]
  }
];