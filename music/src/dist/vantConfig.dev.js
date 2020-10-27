"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vant = require("vant");

var vants = [_vant.Popup, _vant.Form, _vant.Field, _vant.Button, _vant.Icon, _vant.Notify, _vant.Toast, _vant.Search, _vant.Swipe, _vant.SwipeItem, _vant.Lazyload, _vant.Tab, _vant.Tabs, _vant.Slider, _vant.Dialog, _vant.ImagePreview, _vant.List, _vant.cell, _vant.NavBar, _vant.Overlay];
var _default = {
  install: function install(Vue) {
    vants.forEach(function (Componet) {
      Vue.use(Componet);
    });
  }
};
exports["default"] = _default;