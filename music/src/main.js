import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import vantConfig from '../src/vantConfig';
import store from './store/index'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(vantConfig)

axios.defaults.baseURL = 'http://81.69.247.168:3000'
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')