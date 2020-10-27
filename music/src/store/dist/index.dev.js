"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  state: {
    musicToken: localStorage.getItem('musicToken'),
    uid: localStorage.getItem('uid'),
    songid: '',
    storesongList: []
  },
  mutations: {
    changeSongid: function changeSongid(state, id) {
      state.songid = id;
    },
    changeSongList: function changeSongList(state, sl) {
      state.storesongList = sl;
    }
  }
});

exports["default"] = _default;