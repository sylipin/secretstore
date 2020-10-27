<template>
  <div class="home">
    <!-- <div class="home-title">{{timeText}}<span>, 猫卷</span> </div> -->
    <div class="home-search">
      <van-search shape="round" background="none" placeholder="搜索" @focus="goSearch" />
    </div>
    <div class="banner-box">
      <van-swipe :autoplay="3000" indicator-color="#ffffff">
        <van-swipe-item
          v-for="(item, index) in bannerData"
          :key="index"
          @click="viewProductInfo(item.pid)"
        >
          <img class="auto-img" :src="item.bannerImg" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="hot-product">
      <div class="clearfix">
        <div class="hot-product-title fl">热门推荐</div>
        <div class="home-title fr" v-if='isLogin'>{{ timeText }} <span v-show="isLogin">,</span><span class="nick-name">{{NickName}}</span></div>
        <div class="home-title fr" v-else>{{ timeText }}<span class="pleaseLogin" @click="goLogin">&nbsp;&nbsp;&nbsp;请登录</span></div>
      </div>
      <div class="product-box clearfix">
        <div
          class="product-item fl"
          :class="[index % 2 == 0 ? 'p-left' : 'p-right']"
          v-for="(item, index) in hotProducts"
          :key="index"
        >
          <div class="p-img" @click="viewProductInfo(item.pid)">
            <img class="auto-img" :src="item.smallImg" alt="" />
          </div>
          <div class="pro-name one-text">{{ item.name }}</div>
          <div class="clearfix">
            <!-- <div class="en-pro-name one-text fl">heitangbobo</div> -->
            <div class="pro-price fl">￥{{ item.price }}</div>
            <div class="fr shopcar clearfix auto-img">
              <img src="../../assets/imgs/shopcar.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/less/home.less";

export default {
  name: "Home",
  data() {
    return {
      timeText: "",
      bannerData: [],
      hotProducts: [],
      NickName:'',
      isLogin:false,
    };
  },

  created() {
    // 
    this.getTime();
    this.getbannerData();
    this.getHotProducts();
    this.getnickName();
  },

  methods: {
    //点击搜索进入搜索页面
    goSearch(){
      this.$router.push({name:'Search'})
    },

    //点击去登录界面
    goLogin(){
      this.$router.push({name:'Login'})
    },
    //获取时间段
    getTime() {
      let hours = new Date().getHours();
      if (hours >= 6 && hours < 12) {
        this.timeText = "早上好";
      } else if (hours >= 12 && hours < 18) {
        this.timeText = "下午好";
      } else if (hours >= 18 && hours < 24) {
        this.timeText = "晚上好";
      } else {
        this.timeText = "深夜好";
      }
    },

    //获取banner
    getbannerData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/banner",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        params: {
          appkey: this.appkey,
        },
      })
        .then((result) => {
          this.$toast.clear();
          // 
          if (result.data.code == 300) {
            this.bannerData = result.data.result;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          // 
        });
    },

    //获取推荐商品数据
    getHotProducts() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/typeProducts",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        params: {
          appkey: this.appkey,
          key: "isHot",
          value: 1,
        },
      })
        .then((result) => {
          this.$toast.clear();
          // 
          if (result.data.code == 500) {
            this.hotProducts = result.data.result;
          }
        })
        .catch((err) => {
          this.$toast.clear();
          // 
        });
    },
    //查看商品详情
    viewProductInfo(pid) {
      this.$router.push({ name: "Detail", query: { pid } });
    },

    //获取昵称
    getnickName() {

      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/findMy",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();
          this.NickName = result.data.result[0].nickName;
          this.isLogin = true;
          
        })
    },
  },
};
</script>
