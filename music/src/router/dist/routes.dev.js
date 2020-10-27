"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var routes = [{
  //登录
  path: '/login',
  name: 'Login',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Login.vue'));
    });
  },
  meta: {
    keepAlive: true
  }
}, {
  //主页
  path: '/',
  name: 'Home',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Home.vue'));
    });
  }
}, {
  //歌单
  path: '/songSheet',
  name: 'SongSheet',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/SongSheet.vue'));
    });
  }
}, {
  //搜索
  path: '/search',
  name: 'Search',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Search.vue'));
    });
  }
}, {
  //搜索详情 
  path: '/searchDetail',
  name: 'SearchDetail',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/SearchDetail.vue'));
    });
  }
}, {
  //歌手详情 
  path: '/songer',
  name: 'Songer',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Songer.vue'));
    });
  }
}, {
  //我的个人资料
  path: '/my',
  name: 'My',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/My.vue'));
    });
  }
}, {
  //我的关注
  path: '/concern',
  name: 'Concern',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Concern.vue'));
    });
  }
}, {
  //我的粉丝
  path: '/fan',
  name: 'Fan',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Fan.vue'));
    });
  }
}, {
  //我的粉丝
  path: '/mycolletion',
  name: 'Mycolletion',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/Mycolletion.vue'));
    });
  }
}, {
  //每日推荐
  path: '/dailyRecommend',
  name: 'DailyRecommend',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/DailyRecommend.vue'));
    });
  }
}, {
  //我喜欢的音乐
  path: '/myLikeMusic',
  name: 'MyLikeMusic',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/MyLikeMusic.vue'));
    });
  }
}, {
  //我的歌单
  path: '/mySongSheet',
  name: 'MySongSheet',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/MySongSheet.vue'));
    });
  }
}];
exports.routes = routes;