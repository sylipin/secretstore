import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import { 
  NavBar,
  Form,
  Field,
  Button,
  Popup ,
  Cell,
  Tabbar,
  TabbarItem,
  Notify,
  Swipe,
  SwipeItem,
  Search,
  Icon,
  Toast,
  Skeleton,
  Stepper,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  SwipeCell,
  SubmitBar,
  Checkbox,
  Empty,
  AddressEdit ,
  AddressList,
  Card,
  Tabs,
  Tab,
  Uploader,
  CouponCell,
  CouponList,
} from 'vant';

import 'lib-flexible/flexible'
Vue.config.productionTip = false

//配置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'

//全局注册
Vue.use(NavBar)
.use(Form)
.use(Field)
.use(Button)
.use(Popup)
.use(Cell)
.use(Tabbar)
.use(TabbarItem)
.use(Swipe)
.use(SwipeItem)
.use(Search)
.use(Notify)
.use(Toast)
.use(Skeleton)
.use(Stepper)
.use(GoodsAction)
.use(GoodsActionIcon)
.use(GoodsActionButton)
.use(SwipeCell)
.use(SubmitBar)
.use(Checkbox)
.use(Empty)
.use(AddressEdit)
.use(AddressList)
.use(Card)
.use(Tabs)
.use(Tab)
.use(Uploader)
.use(CouponCell)
.use(CouponList)

Vue.use(Icon);
Vue.use(VueAxios, axios)

//设置请求基础路径
axios.defaults.baseURL = 'http://www.kangliuyong.com:10002'
Vue.prototype.appkey = 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='


Vue.filter('formatDate', (value, format) => {
  //value: 需要格式化的数据
  //format: 指定格式 yyyy-MM-dd hh:mm:ss

  // 

  let date = new Date(value);

  //获取年份
  let year = date.getFullYear();
  // 
  if (/(y+)/.test(format)) {
    //获取匹配组的内容
    let content = RegExp.$1;
    // 
    format = format.replace(content, year.toString().slice(4 - content.length));

    // 
  }

  let o = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };

  for (let key in o) {
    //构造动态正则
    let reg = new RegExp(`(${key}+)`);
    // 
    if (reg.test(format)) {
      //获取匹配组的内容
      let content = RegExp.$1;
      // 
      let k =  o[key] >= 10 ? o[key] : content.length == 2 ? '0' + o[key] : o[key];
      // 
      format = format.replace(content, k);
      // 
    }
  }

  return format;
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
