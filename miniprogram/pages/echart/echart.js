import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
import * as echarts from '../../js/ec-canvas/echarts';
var option = {
  tooltip: {
    trigger: 'item',
    formatter: '{b} : ¥{c} ({d}%)'
  },
  label: {
    formatter: '{b} : ¥{c}',
  },

};
let chart = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  chart.setOption(option);
  return chart;
}
// let wxCharts = require('../../js/wxcharts')
import {
  format
} from '../../js/formatDate'

Page({
  data: {
    ec: {
      onInit: initChart
    },
    series: {
      name: '面积模式',
      type: 'pie',
      radius: [10, 100],
      center: ['50%', '50%'],
      roseType: 'area',
      labelLine: {
        length: 8,
        length2: 8,
        smooth: .6
      },
      data: []
    },
    show: false,
    xxx: {
      shouru: {
        details: {}
      },
      zhichu: {
        details: {}
      }
    },
    YMDarry: ['日', '月', '年'],
    YMDindex: 0,
    YMD: '',
    setDate: '',
    end: "",
    //下标
    tableIndex: 0,
    shouru: [],
    zhichu: [],
    pieData: {},
    itemLists:{},
  },
  //细节

  onShow() {
    this.setData({
        YMD: this.data.YMDarry[this.data.YMDindex],
      }),
      this.getNowDate()
    this.getAllData(this.data.YMDindex)
  },
  //绘制canvas

  pie(typeData) {
    this.setData({
      series: {
        ...this.data.series,
        data: typeData
      }
    }, () => {
      chart.setOption({
        ...option,
        series: this.data.series
      })
    })
  },

  //关闭弹出层
  onClose() {
    this.setData({
      show: false
    });
  },
  //支出收入tab
  tabClick(e) {
    let data = this.data.xxx
    if (e.detail.index == 0) {
      let shouru = []
      for (const k in data.shouru.details) {
        shouru.push(data.shouru.details[k])
      }
      this.setData({
        tableIndex: 0,
        shouru: shouru
      })
      this.pie(this.data.pieData.shouru)
    } else {
      let zhichu = []
      for (const k in data.zhichu.details) {
        zhichu.push(data.zhichu.details[k])
      }
      this.setData({
        tableIndex: 1,
        zhichu: zhichu,
      })
      this.pie(this.data.pieData.zhichu)
    }
  },
  //选择日期
  bindChange(e) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    this.getAllData(this.data.YMDindex)
    this.setData({
      setDate: e.detail.value,
    })
    if (this.data.tableIndex == 0) {
      this.pie(this.data.pieData.shouru)
    } else {
      this.pie(this.data.pieData.zhichu)
    }
  },
  //获取当前时间
  getNowDate() {
    let date = format.formatDate(new Date(), 'yyyy-MM-dd')
    this.setData({
      end: date,
      setDate: date
    })
  },
  //点击切换选择年,月,日,
  changeDateBtn(e) {
    this.setData({
      YMDindex: e.currentTarget.dataset.index,
      YMD: this.data.YMDarry[e.currentTarget.dataset.index]
    })
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    this.getAllData(e.currentTarget.dataset.index)
  },
  //根据年月人日获取数据
  getAllData(data) {
    this.setData({
      xxx: {
        shouru: {
          details: {}
        },
        zhichu: {
          details: {}
        }
      },
      pieData: {}
    })
    //日
    if (data == 0) {
      wx.cloud.callFunction({
        name: 'get_allData_date',
        data: {
          date: {
            day: this.data.setDate
          }
        }
      }).then(res => {
        Toast.clear()
        res.result.data.map(v => {
          //日总金额
          if (!this.data.xxx[v.payOrIn.type].total) {
            this.data.xxx[v.payOrIn.type].total = Number(v.money)
          } else {
            this.data.xxx[v.payOrIn.type].total += Number(v.money)
          }
          let r = Math.ceil(Math.random() * 255)
          let g = Math.ceil(Math.random() * 255)
          let b = Math.ceil(Math.random() * 255)
          if (!this.data.xxx[v.payOrIn.type].details[v.mothodType.type]) {
            this.data.xxx[v.payOrIn.type].details[v.mothodType.type] = {
              title: v.mothodType.title,
              count: 1,
              total: v.money,
              imgs: v.mothodType.url,
              dec: [v],
              proportion: 0,
              color: `rgb(${r},${g},${b})`,
              name: v.mothodType.title,
              value: v.money,
            }
          } else {
            this.data.xxx[v.payOrIn.type].details[v.mothodType.type].count++
            this.data.xxx[v.payOrIn.type].details[v.mothodType.type].total += Number(v.money)
            this.data.xxx[v.payOrIn.type].details[v.mothodType.type].value += Number(v.money)
            this.data.xxx[v.payOrIn.type].details[v.mothodType.type].dec.push(v)
          }

        })
        for (let k in this.data.xxx) {
          for (const o in this.data.xxx[k]) {
            for (const j in this.data.xxx[k][o]) {
              if (j == "total") {
                continue;
              }
              this.data.xxx[k][o][j].proportion = this.data.xxx[k][o][j].total / this.data.xxx[k].total * 100 + '%'
            }
          }
        }
        for (let key in this.data.xxx) {
          for (const o in this.data.xxx[key].details) {
            for (const j in this.data.xxx[key]) {
              if (j == "total") {
                continue;
              }
              if (!this.data.pieData[key]) {
                this.data.pieData[key] = [this.data.xxx[key].details[o]]
              } else {
                this.data.pieData[key].push(this.data.xxx[key].details[o])
              }
            }
          }
        }
        this.setData({
          xxx: this.data.xxx,
          pieData: this.data.pieData
        }, () => {
          if (this.data.tableIndex == 0) {
            this.pie(this.data.pieData.shouru)
          } else {
            this.pie(this.data.pieData.zhichu)
          }
        })
      }).catch(err => {
        Toast.clear()
        console.error(err)
      })
    } else if (data == 1) { //月
      wx.cloud.callFunction({
        name: 'get_allData_date',
        data: {
          date: {
            Mounth: this.data.setDate.substr(0, 7)
          }
        }
      }).then(res => {
        Toast.clear()
        res.result.data.map(v => {
          //日总金额
          if (!this.data.xxx[v.payOrIn.type].total) {
            this.data.xxx[v.payOrIn.type].total = Number(v.money)
          } else {
            this.data.xxx[v.payOrIn.type].total += Number(v.money)
          }
          let r = Math.ceil(Math.random() * 255)
          let g = Math.ceil(Math.random() * 255)
          let b = Math.ceil(Math.random() * 255)
          if (!this.data.xxx[v.payOrIn.type].details[v.mothodType.type]) {
            this.data.xxx[v.payOrIn.type].details[v.mothodType.type] = {
              title: v.mothodType.title,
              count: 1,
              total: v.money,
              imgs: v.mothodType.url,
              dec: [v],
              proportion: 0,
              color: `rgb(${r},${g},${b})`,
              name: v.mothodType.title,
              value: v.money,
            }
          } else {
            this.data.xxx[v.payOrIn.type].details[v.mothodType.type].count++
            this.data.xxx[v.payOrIn.type].details[v.mothodType.type].total += Number(v.money)
            this.data.xxx[v.payOrIn.type].details[v.mothodType.type].value += Number(v.money)
            this.data.xxx[v.payOrIn.type].details[v.mothodType.type].dec.push(v)
          }

        })
        for (let k in this.data.xxx) {
          for (const o in this.data.xxx[k]) {
            for (const j in this.data.xxx[k][o]) {
              if (j == "total") {
                continue;
              }
              this.data.xxx[k][o][j].proportion = this.data.xxx[k][o][j].total / this.data.xxx[k].total * 100 + '%'
            }
          }
        }
        for (let key in this.data.xxx) {
          for (const o in this.data.xxx[key].details) {
            for (const j in this.data.xxx[key]) {
              if (j == "total") {
                continue;
              }
              if (!this.data.pieData[key]) {
                this.data.pieData[key] = [this.data.xxx[key].details[o]]
              } else {
                this.data.pieData[key].push(this.data.xxx[key].details[o])
              }
            }
          }
        }

        this.setData({
          xxx: this.data.xxx,
          pieData: this.data.pieData
        }, () => {
          if (this.data.tableIndex == 0) {
            this.pie(this.data.pieData.shouru)
          } else {
            this.pie(this.data.pieData.zhichu)
          }
        })
      }).catch(err => {
        Toast.clear()
        console.error(err)
      })
    } else { //年
      wx.cloud.callFunction({
        name: 'get_allData_date',
        data: {
          date: {
            Year: this.data.setDate.substr(0, 4)
          }
        }
      }).then(res => {
        Toast.clear()
        res.result.data.map(v => {
          //日总金额
          if (!this.data.xxx[v.payOrIn.type].total) {
            this.data.xxx[v.payOrIn.type].total = Number(v.money)
          } else {
            this.data.xxx[v.payOrIn.type].total += Number(v.money)
          }
          let r = Math.ceil(Math.random() * 255)
          let g = Math.ceil(Math.random() * 255)
          let b = Math.ceil(Math.random() * 255)
          if (!this.data.xxx[v.payOrIn.type].details[v.mothodType.type]) {
            this.data.xxx[v.payOrIn.type].details[v.mothodType.type] = {
              title: v.mothodType.title,
              count: 1,
              total: v.money,
              imgs: v.mothodType.url,
              dec: [v],
              proportion: 0,
              color: `rgb(${r},${g},${b})`,
              name: v.mothodType.title,
              value: v.money,
            }
          } else {
            this.data.xxx[v.payOrIn.type].details[v.mothodType.type].count++
            this.data.xxx[v.payOrIn.type].details[v.mothodType.type].total += Number(v.money)
            this.data.xxx[v.payOrIn.type].details[v.mothodType.type].value += Number(v.money)
            this.data.xxx[v.payOrIn.type].details[v.mothodType.type].dec.push(v)
          }

        })
        for (let k in this.data.xxx) {
          for (const o in this.data.xxx[k]) {
            for (const j in this.data.xxx[k][o]) {
              if (j == "total") {
                continue;
              }
              this.data.xxx[k][o][j].proportion = this.data.xxx[k][o][j].total / this.data.xxx[k].total * 100 + '%'
            }
          }
        }
        for (let key in this.data.xxx) {
          for (const o in this.data.xxx[key].details) {
            for (const j in this.data.xxx[key]) {
              if (j == "total") {
                continue;
              }
              if (!this.data.pieData[key]) {
                this.data.pieData[key] = [this.data.xxx[key].details[o]]
              } else {
                this.data.pieData[key].push(this.data.xxx[key].details[o])
              }
            }
          }
        }

        this.setData({
          xxx: this.data.xxx,
          pieData: this.data.pieData
        }, () => {
          if (this.data.tableIndex == 0) {
            this.pie(this.data.pieData.shouru)
          } else {
            this.pie(this.data.pieData.zhichu)
          }
        })
      }).catch(err => {
        Toast.clear()
        console.error(err)
      })
    }
  },
  //
  getDetail(e) {
    this.setData({
      itemLists:e.currentTarget.dataset.detail,
      show: true
    });
  }
})