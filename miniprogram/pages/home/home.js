import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import {
  format
} from '../../js/formatDate'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    end: "",
    currentDate: '',
    todayData: [],
    spendingData: 0,
    incomeData: 0,
    daily: 0,
    // 月结
    yuejie: {
      int: 0,
      decimal: 0
    },
    incomeBymonth: 0,
    spendingBymonth: 0
  },
  onShow() {
    this.getCurrentDate()
    this.getAllDataDate(this.data.end)
    this.getMonthData(this.data.end)
    format.formatThousand(-1234.78)
  },
  getCurrentDate() {
    let date = new Date()
    let year = date.getFullYear()
    let M = (date.getMonth() + 1).toString().padStart(2, 0)
    let d = date.getDate().toString().padStart(2, 0)
    this.setData({
      end: `${year}-${M}-${d}`,
      currentDate: `${M}-${d}`
    })
  },

  //改变时间
  bindchange(e) {
    //判断是否时间相同,相同return ,减少数据请求
    let temp = e.detail.value.substr(5, 5)
    if (temp == this.data.currentDate) {
      return;
    }
    this.setData({
      currentDate: e.detail.value.substr(5, 5),
    })
    this.getAllDataDate(e.detail.value)
  },

  //获取对应天时间的数据
  getAllDataDate(data) {
    this.setData({
      spendingData: 0,
      incomeData: 0
    })
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    wx.cloud.callFunction({
      name: 'get_allData_date',
      data: {
        date: {
          day: data
        }
      }
    }).then(res => {
      Toast.clear()

      let spending = 0
      let income = 0
      for (let i = 0; i < res.result.data.length; i++) {
        if (res.result.data[i].payOrIn.type == "zhichu") {
          spending += res.result.data[i].money;
          this.setData({
            spendingData: format.formatThousand(spending.toFixed(2), 2)
          })
        } else {
          income += res.result.data[i].money;
          this.setData({
            incomeData: format.formatThousand(income.toFixed(2), 2)
          })
        }
      }
      this.setData({
        daily: format.formatThousand((income - spending).toFixed(2), 2)
      })
      let tempData = res.result.data
      for(let i =0;i<tempData.length;i++) {
        tempData[i].money = format.formatThousand(tempData[i].money,2)
      }
      this.setData({
        todayData: tempData
      })
    }).catch(err => {
      Toast.clear()
      console.error(err)
    })
  },

  //获取本月数据 
  getMonthData(data) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    wx.cloud.callFunction({
      name: 'get_allData_date',
      data: {
        date: {
          Mounth: data.substr(0, 7)
        }
      }
    }).then(res => {
      let tempSpending = 0
      let tempIncome = 0
      res.result.data.map(v => {
        if (v.payOrIn.type == "zhichu") {
          tempSpending += Number(v.money)
          this.setData({
            spendingBymonth: format.formatThousand(tempSpending.toFixed(2), 2)
          })
        } else {
          tempIncome += Number(v.money)
          this.setData({
            incomeBymonth: format.formatThousand(tempIncome.toFixed(2), 2)
          })
        }
      })
      let tempyuejie = (tempIncome - tempSpending).toFixed(2)
      this.setData({
        yuejie: {
          int: format.formatThousand(tempyuejie.toString().split('.')[0], 1),
          decimal: tempyuejie.toString().split('.')[1]
        }
      })
      Toast.clear()
    }).catch(err => {
      Toast.clear()
      console.error(err)
    })
  }

})