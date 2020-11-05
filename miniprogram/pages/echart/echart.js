import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import {format} from '../../js/formatDate'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalData: {
      totalIncome: 0,
      totalSpending: 0
    },
    YMDarry: ['日', '月', '年'],
    YMDindex: 2,
    YMD: '',
    setDate: '',
    end: ""
  },

  onShow() {
    this.setData({
        YMD: this.data.YMDarry[this.data.YMDindex],
      }),
      this.getNowDate()
  },

  //选择日期
  bindChange(e) {  
      this.setData({
        setDate:e.detail.value
      })
  },
  //获取当前时间
  getNowDate() {
    let date = format.formatDate(new Date(), 'yyyy-MM-dd')
    this.setData({
      end: date,
      setDate:date
    })
  },
  //点击切换选择年,月,日,
  changeDateBtn(e) {
    this.setData({
      YMDindex: e.currentTarget.dataset.index,
      YMD: this.data.YMDarry[e.currentTarget.dataset.index]
    })
    this.getAllData(e.currentTarget.dataset.index)
  },
  //根据年月人日获取数据
  getAllData(data) {
    if (data == 0) {
      wx.cloud.callFunction({
        name: 'get_allData_date',
        data: {
          date: {
            day: this.data.setDate
          }
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        Toast.clear()
        console.error(err)
      })
    } else if (data == 1) {
      wx.cloud.callFunction({
        name: 'get_allData_date',
        data: {
          date: {
            Mounth: this.data.setDate.substr(0, 7)
          }
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        Toast.clear()
        console.error(err)
      })
    } else {
      wx.cloud.callFunction({
        name: 'get_allData_date',
        data: {
          date: {
            Year: this.data.setDate.substr(0, 4)
          }
        }
      }).then(res => {
        console.log(res)
      }).catch(err => {
        Toast.clear()
        console.error(err)
      })
    }
  }
})