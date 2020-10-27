"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _vueAxios = _interopRequireDefault(require("vue-axios"));

var _axios = _interopRequireDefault(require("axios"));

var _vantConfig = _interopRequireDefault(require("../src/vantConfig"));

var _index = _interopRequireDefault(require("./store/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].config.productionTip = false;

_vue["default"].use(_vueAxios["default"], _axios["default"]);

_vue["default"].use(_vantConfig["default"]);

_axios["default"].defaults.baseURL = 'http://81.69.247.168:3000';
new _vue["default"]({
  store: _index["default"],
  router: _router["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');