import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import {
  format
} from '../../js/formatDate'
let app = getApp()
Page({

  data: {
    typeData: [{
        text: "支出",
        type: "zhichu",
        isActive: true
      },
      {
        text: "收入",
        type: "shouru",
        isActive: false
      }
    ],

    date: "选择日期",
    amount: null,
    note: "",
    end: '',

    /* 支出图标数据 */
    typeIconData: [],

    /* 收入图标数据 */
    incomeData: [],
    payData: [{
        title: "微信",
        isAtive: false
      },
      {
        title: "支付宝",
        isAtive: false
      },
      {
        title: "现金",
        isAtive: false
      },
      {
        title: "银行卡",
        isAtive: false
      },
      {
        title: "信用卡",
        isAtive: false
      },

    ],
    toggleIndex: 0
  },

  onLoad() {
    this.getTypeIcons()
    this.getincomeData()
    this.getNowDate()
  },

  getNowDate() {
    let date = format.formatDate(new Date(), 'yyyy-MM-dd')
    this.setData({
      end: date
    })
  },

  toggle(e) {
    if (e.currentTarget.dataset.isActive == true) {
      return
    }

    for (let i = 0; i < this.data.typeData.length; i++) {
      this.data.typeData[i].isActive = false
    }

    this.data.typeData[e.currentTarget.dataset.index].isActive = true

    this.setData({
      toggleIndex: e.currentTarget.dataset.index,
      typeData: this.data.typeData
    })
  },

  /* 点击图标添加类名 */
  toggleIcons(e) {

    if (e.currentTarget.dataset.isAtive == true) {
      return
    }

    let data = this.data[e.currentTarget.dataset.name]

    for (let i = 0; i < data.length; i++) {
      data[i].isAtive = false
    }

    data[e.currentTarget.dataset.index].isAtive = true

    this.setData({
      [e.currentTarget.dataset.name]: data
    })
  },
  /* 支出类图标 */
  getTypeIcons() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })

    wx.cloud.callFunction({
      name: 'get_type_icons',
    }).then(res => {
      Toast.clear()
      this.setData({
        typeIconData: res.result.data
      })
    }).catch(err => {
      Toast.clear()
      console.error(err)
    })
  },
  /* 获取收入类图标 */
  getincomeData() {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })

    wx.cloud.callFunction({
      name: 'get_income',
    }).then(res => {
      Toast.clear()
      this.setData({
        incomeData: res.result.data
      })
    }).catch(err => {
      Toast.clear()
      console.error(err)
    })
  },

  /* 选择时间,输入金额,添加备注 */
  bindChange(e) {
    this.setData({
      [e.currentTarget.dataset.name]: e.detail.value
    })
  },

  /* 保存 */
  save() {
    let isAuth = app.globalData.isAuth
    if(!isAuth) {
      wx.switchTab({
        url: '../my/my'
      })
    }
    // 需要存储的数据集合
    let allData = {}

    // 选择支出,收入
    for (let i = 0; i < this.data.typeData.length; i++) {

      if (this.data.typeData[this.data.toggleIndex]) {
        allData.payOrIn = {
          text: this.data.typeData[this.data.toggleIndex].text,
          type: this.data.typeData[this.data.toggleIndex].type
        }
      }

      let isHad = false
      let isPay = false
      if (this.data.toggleIndex == 0) {
        for (let i = 0; i < this.data.typeIconData.length; i++) {
          if (this.data.typeIconData[i].isAtive) {
            allData.mothodType = {
              title: this.data.typeIconData[i].title,
              type: this.data.typeIconData[i].type,
              url: this.data.typeIconData[i].url
            }
            isHad = true;
            break;
          }
        }
      } else {
        for (let i = 0; i < this.data.incomeData.length; i++) {
          if (this.data.incomeData[i].isAtive) {
            allData.mothodType = {
              title: this.data.incomeData[i].title,
              type: this.data.incomeData[i].type,
              url: this.data.incomeData[i].url
            }
            isHad = true;
            break
          }
        }
      }
      // 判断是否选择记账类型
      if (!isHad) {
        return Toast('请选择记账类型')
      }

      //判断记账方式
      for (let i = 0; i < this.data.payData.length; i++) {
        if (this.data.payData[i].isAtive) {
          allData.payType = this.data.payData[i].title
          isPay = true
          break;
        }
      }

      //判断是否选择记账类型
      if (!isPay) {
        return Toast('请选择记账方式')
      }
      // 判断时候选择日期
      if (this.data.date == "选择日期") {
        return Toast('请选择日期')
      }
      //判断是否输入金额,且不能为0
      if (this.data.amount == '') {
        return Toast('输入金额')
      } else if (this.data.amount == 0) {
        return Toast('金额不能为0')
      }
      break;
    }

    allData.money = parseFloat(this.data.amount)
    let temp = {}
    temp.Year = this.data.date.substr(0,4)
    temp.Mounth = this.data.date.substr(0,7)
    temp.day = this.data.date
    allData.date = temp
    allData.note = this.data.note

    Toast.loading({
      message: '保存中...',
      forbidClick: true,
      duration: 0
    })

    wx.cloud.callFunction({
      name: 'add_allData',
      data: allData
    }).then(res => {
      //清空输入栏
      this.setData({
        note: "",
        amount: "",
        date: "选择如期"
      })
      Toast.success('保存成功');
    }).catch(err => {
      //清空输入栏
      this.setData({
        note: "",
        amount: "",
        date: "选择如期"
      })
      Toast.clear()
      console.error(err)
    })
  }
})