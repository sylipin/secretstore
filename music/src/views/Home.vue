<template>
  <div class="home" :class="{ pbm: $store.state.songid }">
    <!-- 头部 -->
    <div class="nav-cantainer">
      <!-- <van-icon name="arrow-down" class="left-icon" @click="changShow" /> -->
      <input
        type="text"
        class="nav-search"
        :placeholder="hotSearchName"
        @focus="goSearch"
      />
      <span class="img-cantainer" @click="changShow"
        ><img
          :src="[userHeadortraitP ? userHeadortraitP : defaultHeadprtraip]"
          class="auto-img"
          alt=""
      /></span>
    </div>
    <!-- 侧边登录 -->
    <van-popup
      v-model="show"
      position="left"
      :style="{ height: '100%', width: '45%' }"
      class="side-login"
    >
      <div class="side-text">
        <h2 class="login-item" @click="goLogin">
          <img
            :src="[userHeadortraitP ? userHeadortraitP : defaultHeadprtraip]"
            alt=""
            class="avat-img auto-img"
          />
          <div class="use-name">{{ nickName ? nickName : "请登录" }}</div>
        </h2>
        <ul class="side-text-ul">
          <li @click="goMy">
            <van-icon name="user-o" color="#1989fa" /><span class="li-text"
              >个人资料</span
            >
          </li>
          <li>
            <van-icon name="orders-o" color="#1989fa" /><span
              class="li-text"
              @click="goMySongSheet"
              >我的歌单</span
            >
          </li>
          <li>
            <van-icon name="star-o" color="#1989fa" /><span
              class="li-text"
              @click="goColletion"
              >我的关注</span
            >
          </li>
          <li>
            <van-icon name="like-o" color="#1989fa" /><span
              class="li-text"
              @click="goMyLikeMusic"
              >我的音乐</span
            >
          </li>
          <li>
            <van-icon name="warning-o" color="#1989fa" /><span
              class="li-text"
              @click="logout"
              >退出登录</span
            >
          </li>
        </ul>
      </div>
    </van-popup>
    <!-- 确认退出框 -->
    <van-dialog
      v-model="confirmShow"
      title="是否退出登录"
      show-cancel-button
      :before-close="comfirmlogout"
    >
    </van-dialog>
    <!-- 轮播图 -->
    <div class="swipe">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
        <van-swipe-item
          class="swipe-item"
          v-for="(image, index) in bannersData"
          :key="index"
        >
          <img :src="image.pic" />
          <span
            class="type-title"
            :style="`background-color:${image.titleColor}`"
            >{{ image.typeTitle }}</span
          >
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 轮播图结束 -->

    <!-- 分类导航 -->
    <div class="classify-nav">
      <van-swipe
        :loop="false"
        :width="60"
        :show-indicators="false"
        class="classify-nav-swipe"
      >
        <van-swipe-item
          class="classify-nav-swipe-item"
          v-for="(item, index) in classifyNavData"
          :key="index"
        >
          <div class="classify-item-container" @click="goDaily(index)">
            <div class="img-container">
              <img :src="item.iconUrl" />
              <span class="data-nav-today" v-if="item.id === -1">{{
                today
              }}</span>
            </div>
            <div class="classify-nav-title">{{ item.name }}</div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 分类导航结束 -->
    <!-- 私人推荐 -->
    <div class="popular-song-list" v-if="musicToken">
      <h2 class="popular-song-title">
        私人推荐
        <span class="popular-song-more" @click="getMore">查看更多</span>
      </h2>
      <!-- 歌单推荐item -->
      <div class="popular-song-nav">
        <van-swipe :loop="false" :width="100" :show-indicators="false">
          <van-swipe-item
            v-for="(item, index) in personRecommended"
            :key="index"
            @click="goSongSheet(item.id)"
          >
            <div class="popular-song-item">
              <div class="picUrl-container">
                <img :src="item.picUrl" v-lazy="item.picUrl" />
                <span class="play-count"
                  ><van-icon name="play-circle-o" class="play-count-icon" />{{
                    item.playcount | million
                  }}</span
                >
              </div>
              <div class="popular-song-name">{{ item.name }}</div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 私人推荐结束 -->
    <!-- 人气歌单推荐 -->
    <div class="popular-song-list">
      <h2 class="popular-song-title">
        人气歌单推荐
        <span class="popular-song-more" @click="getsentiments">查看更多</span>
      </h2>
      <!-- 歌单推荐item -->
      <div class="popular-song-nav">
        <van-swipe :loop="false" :width="100" :show-indicators="false">
          <van-swipe-item
            v-for="(item, index) in recommendedData"
            :key="index"
            @click="goSongSheet(item.id)"
          >
            <div class="popular-song-item">
              <div class="picUrl-container">
                <img :src="item.picUrl" v-lazy="item.picUrl" />
                <span class="play-count"
                  ><van-icon name="play-circle-o" class="play-count-icon" />
                  <span v-if="item.playCount">
                    {{ item.playCount | million }}
                  </span>
                </span>
              </div>
              <div class="popular-song-name">{{ item.name }}</div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 人气歌单推荐结束 -->

    <!-- 推荐切换 -->
    <div class="recommended-tab">
      <van-tabs
        v-model="active"
        animated
        background="#1c1c1c"
        color="white"
        :sticky="true"
        :swipeable="true"
        title-active-color="white"
        :lazy-render="true"
      >
        <van-tab title="热门歌手">
          <div
            class="container-one"
            v-for="(item, index) in topArtistsData"
            :key="index"
            @click="goSonger(item.id)"
          >
            <img
              :src="item.img1v1Url"
              alt=""
              v-lazy="item.img1v1Url"
              class="l-ava"
            />
            <div class="recommended-newsong-item-text">
              <h2 class="recommended-newsong-item-hotArtists-name">
                {{ item.name }}
              </h2>
              <p class="recommended-newsong-item-song-count">
                <span>歌曲:{{ item.musicSize }}</span
                ><span>专辑:{{ item.albumSize }}</span>
              </p>
            </div>
          </div>
        </van-tab>

        <!-- 新歌速递 -->
        <van-tab title="新歌速递" @click="getRandomNewSong">
          <div
            class="container-one"
            v-for="(item, index) in RandomNewSongData"
            :key="index"
            @click="changeSongListAndId(item.id, randomArry)"
          >
            <img
              :src="item.album.picUrl"
              alt=""
              v-lazy="item.album.picUrl"
              class="l-ava"
            />
            <div class="recommended-newsong-item-text">
              <h2 class="recommended-newsong-item-song-name">
                {{ item.name }}
              </h2>
              <p class="recommended-newsong-item-artists-name">
                {{ item.artists[0].name }}
              </p>
            </div>
            <div class="out-play " v-if="storesongid == item.id">
              <img :src="outPlay" class="auto-img" />
            </div>
          </div>
        </van-tab>

        <van-tab title="新歌榜单">
          <div
            class="container-one"
            v-for="(item, index) in newSongData"
            :key="index"
            @click="changeSongListAndId(item.id, arry)"
          >
            <img :src="item.picUrl" alt="" v-lazy="item.picUrl" class="l-ava" />
            <div class="recommended-newsong-item-text">
              <h2 class="recommended-newsong-item-song-name">
                {{ item.name }}
              </h2>
              <p class="recommended-newsong-item-artists-name">
                {{ item.song.artists[0].name }}
              </p>
            </div>
            <div class="out-play " v-if="storesongid == item.id">
              <img :src="outPlay" class="auto-img" />
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannersData: [],
      classifyNavData: [],
      recommendedData: [],
      today: "",
      active: 0,
      topArtistsData: [],
      RandomNewSongData: [],
      hotSearchName: "",
      newSongData: [],
      musicToken: this.$store.state.musicToken,
      show: false,
      arry: [],
      randomArry: [],
      personRecommended: [],
      morePerson: false,
      getsentiment: false,
      xxx: true,
      userid: this.$store.state.uid,
      userHeadortraitP: "",
      defaultHeadprtraip: require("../assets/images/defaultata.jpg"),
      nickName: "",
      timer: null,
      confirmShow: false,
      storesongid: this.$store.state.songid,
      outPlay: require("../assets/images/isplaying.png"),
    };
  },

  beforeRouteEnter(to, from, next) {
    if (from.name == "Login") {
      next((vm) => {
        vm.$router.go(0);
      });
    }
    next();
  },

  created() {
    //获取当天日期
    this.today = new Date().getDate();
    this.getPersonalized();
    this.getTopArtists();
    this.getRandomNewSong();
    this.getPersonalizedNewSong();
    this.defaultSearch();
    this.getBanner();
    if (this.userid) {
      this.getPersonRecommended();
      this.getHomepage();
      this.getUserInfo();
    }
  },
  methods: {
    changShow() {
      this.show = true;
    },

    goSonger(id) {
      this.$router.push({ name: "Songer", query: { id } });
    },

    goMy() {
      if (this.userid) {
        this.$router.push({ name: "My" });
      } else {
        this.$toast("请先登录");
      }
    },
    goMyLikeMusic() {
      if (this.userid) {
        this.$router.push({ name: "MyLikeMusic" });
      } else {
        this.$toast("请先登录");
      }
    },
    goMySongSheet() {
      if (this.userid) {
        this.$router.push({ name: "MySongSheet" });
      } else {
        this.$toast("请先登录");
      }
    },
    goDaily(index) {
      if (index == 0) {
        this.$router.push({ name: "DailyRecommend" });
      }
    },

    goColletion() {
      if (this.musicToken) {
        this.$router.push({ name: "Mycolletion" });
      } else {
        this.$toast("请先登录");
      }
    },

    //获取用户信息
    getUserInfo() {
      if (this.userid) {
        this.axios("/user/detail?uid=" + this.userid).then((userid) => {
          this.userHeadortraitP = userid.data.profile.avatarUrl;
          this.nickName = userid.data.profile.nickname;
        });
      } else {
        this.userHeadortraitP = "";
        this.nickName = "";
      }
    },
    getMore() {
      if (!this.morePerson) {
        this.$toast.loading({
          duration: 0,
          message: "加载中...",
          forbidClick: true,
        });
      }

      this.morePerson = true;
    },
    //获取更多人气推荐
    getsentiments() {
      if (!this.getsentiment) {
        this.$toast.loading({
          duration: 0,
          message: "加载中...",
          forbidClick: true,
        });
      }
      this.getsentiment = true;
    },
    getBanner() {
      this.axios("/banner?type=2").then((res) => {
        this.bannersData = res.data.banners;
      });
    },
    //跳转登录
    goLogin() {
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      if (this.userid) {
        this.$toast.clear();
        return;
      } else {
        this.timer = setTimeout(() => {
          this.$router.push({ name: "Login" });
          this.$toast.clear();
        }, 600);
      }
    },
    //退出登录

    //清除定时器
    beforeDestroy() {
      clearTimeout(this.timer);
    },

    //退出登录

    //确认退出
    comfirmlogout(action, done) {
      if (action === "confirm") {
        this.axios("/logout?cookie=" + this.musicToken).then((res) => {
          if (res.data.code === 200) {
            window.localStorage.clear();
            //  this.getUserInfo()
            this.$router.go(0);
          }
        }),
          (this.timer = setTimeout(done, 1000));
      } else {
        done();
      }
    },

    logout() {
      if (!this.userid) {
        this.$toast("未登录");
        return;
      }
      this.confirmShow = true;
    },
    
    getHomepage() {
      this.axios({
        method: "GET",
        url: "/homepage/dragon/ball",
        params: {
          cookie: this.musicToken,
        },
      }).then((res) => {
        this.classifyNavData = res.data.data;
      });
    },
    //私人推荐
    getPersonRecommended() {
      if (this.musicToken) {
        this.axios("/recommend/resource?cookie=" + this.musicToken).then(
          (res) => {
            this.$toast.clear();
            if (this.morePerson) {
              this.personRecommended = res.data.recommend;
            } else {
              this.personRecommended = res.data.recommend.splice(0, 6);
            }
          }
        );
      }
    },

    //人气推荐
    getPersonalized() {
      if (this.getsentiment) {
        this.axios("/personalized").then((res) => {
          this.recommendedData = res.data.result;
        });
        this.$toast.clear();
      } else {
        this.axios("/personalized?limit=6").then((res) => {
          this.recommendedData = res.data.result;
          this.$toast.clear();
        });
      }
    },

    getTopArtists() {
      this.axios(`/top/artists?offset=0&limit=10`).then((res) => {
        this.topArtistsData = res.data.artists;
      });
    },

    //新歌速递
    getRandomNewSong() {
      this.axios("/top/song?type=0").then((topmv) => {
        //随机从新歌中获取10首
        for (let i = 0; i < 10; i++) {
          let count = Math.floor(Math.random() * topmv.data.data.length);
          this.RandomNewSongData.push(topmv.data.data.splice(count, 1)[0]);
        }
        this.RandomNewSongData.map((v) => {
          this.randomArry = [];
          return (this.randomArry = [...this.randomArry, v.id]);
        });
      });
    },

    defaultSearch() {
      this.axios("/search/default").then((sea) => {
        this.hotSearchName = sea.data.data.realkeyword;
      });
    },

    //推荐
    getPersonalizedNewSong() {
      this.axios("/personalized/newsong").then((res) => {
        this.newSongData = res.data.result;
        res.data.result.map((v) => {
          this.arry = [];
          return (this.arry = [...this.arry, v.id]);
        });
      });
    },

    goSongSheet(id) {
      this.$router.push({ name: "SongSheet", query: { id } });
    },

    goSearch() {
      this.$router.push({ name: "Search" });
    },

    changeSongListAndId(id, arry) {
      this.storesongid = id;
      this.$store.commit("changeSongid", id);
      this.$store.commit("changeSongList", arry);
    },
  },
  filters: {
    million: function(value) {
      //播放量数值处理
      let num;
      if (value > 99999999) {
        num = Math.floor(value / 10000000) / 10 + "亿";
      } else if (value > 9999) {
        num = Math.floor(value / 1000) / 10 + "万";
      } else if (value < 9999 && value > -9999) {
        num = value;
      }
      return num;
    },
  },

  watch: {
    morePerson(n, o) {
      if (n != o) {
        this.getPersonRecommended();
      }
    },
    getsentiment(n, o) {
      if (n != o) {
        this.getPersonalized();
      }
    },
    // userHeadortraitP(n,o){
    //   if(n != o){
    //     this.getUserInfo()
    //   }
    // }
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  background-color: #1c1c1c;
}
.pbm {
  padding-bottom: 55px;
}
.side-login {
  background-color: #1c1c1c;
  .side-text {
    padding: 0 10px;
    .side-text-ul {
      color: #fff;
      margin-top: 50px;
      li {
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        &:last-of-type {
          color: #0f59a4;
        }
      }
      .li-text {
        padding-left: 10px;
      }
    }
  }
  .login-item {
    text-align: center;
    margin-top: 50px;
    .avat-img {
      display: inline-block;
      width: 80px;
      height: 80px;
      border-radius: 8px;
    }
    .use-name {
      padding-top: 10px;
      font-size: 20px;
      color: #0f59a4;
    }
  }
}
.swipe {
  margin: 10px 10px;
  overflow: hidden;
  border-radius: 10px;
  overflow: hidden;

  .my-swipe {
    border-radius: 10px;

    .swipe-item {
      img {
        display: block;
        width: 100%;
      }

      .type-title {
        display: inline-block;
        position: absolute;
        border-top-left-radius: 10px;
        padding: 0 10px;
        height: 20px;
        line-height: 20px;
        font-weight: 200;
        font-size: 12px;
        right: 0;
        bottom: 0;
        color: #fff;
      }
    }
  }
}

.classify-nav {
  padding: 10px 10px 0 10px;
  .classify-item-container {
    .img-container {
      position: relative;
      margin: 0 auto;
      border-radius: 50%;
      overflow: hidden;
      width: 35px;
      height: 35px;
      background-color: #ff0d00;
      img {
        height: 35px;
        width: 100%;
      }
      .data-nav-today {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -30%);
        font-size: 12px;
        color: #ff0d00;
      }
    }

    .classify-nav-title {
      margin-top: 10px;
      font-size: 12px;
      color: #7f7f7f;
      text-align: center;
    }
  }
}

.nav-cantainer {
  padding: 20px 10px 0;
  text-align: center;
  .left-icon {
    float: left;
    line-height: 30px;
    color: #fff;
  }

  .nav-search {
    text-align: center;
    border-radius: 30px;
    padding: 0 20px;
    height: 30px;
    outline: 0;
    border: none;
    background-color: #202020;
    &:focus::-webkit-input-placeholder {
      color: transparent;
    }
  }
  .img-cantainer {
    height: 30px;
    width: 30px;
    float: left;
    border-radius: 50%;
    left: 5px;
    img {
      border-radius: 50%;
    }
  }
}
.popular-song-list {
  padding: 20px 10px 0;
  .popular-song-title {
    height: 30px;
    color: #fff;
    line-height: 30px;
    .popular-song-more {
      float: right;
      font-size: 12px;
      padding: 5px 10px;
      border: 1px solid #7f7f7f;
      border-radius: 16px;
      line-height: 16px;
    }
  }
}
.popular-song-nav {
  margin-top: 10px;
  .popular-song-item {
    margin-right: 8px;
    .popular-song-name {
      color: #fff;
      line-height: 16px;
      font-size: 12px;
      font-weight: 100;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; //控制行数
      overflow: hidden;
    }
  }
  .picUrl-container {
    position: relative;
    height: 100px;
    width: 100%;
    .play-count {
      position: absolute;
      right: 0;
      top: 3px;
      color: #fff;
      font-size: 12px;
      transform: scale(0.9);
      .play-count-icon {
        vertical-align: bottom;
        margin-right: 3px;
      }
    }
    img {
      border-radius: 10px;
      display: block;
      width: 100%;
    }
  }
}
.recommended-tab {
  padding: 10px;
  .container-one {
    margin-bottom: 10px;
    border: 1px solid #2d2d2d;
    height: 57px;
    border-radius: 57px;
    display: flex;
    overflow: hidden;
    position: relative;
    &:first-of-type {
      margin-top: 20px;
    }
    .l-ava {
      display: block;
      height: 55px;
      width: 55px;
      border-radius: 50%;
      float: left;
    }
  }
}

.recommended-newsong-item-text {
  width: 100%;
  padding: 5px 20px;
  .recommended-newsong-item-song-name {
    width: 100%;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap;
    flex: 1;
    padding: 5px 50px 0 0;
    color: #ff0c46;
    font-size: 14px;
  }
  .recommended-newsong-item-artists-name {
    font-size: 12px;
    color: #fff;
    padding-top: 10px;
  }

  .recommended-newsong-item-hotArtists-name {
    font-size: 16px;
    color: #ff0c46;
  }

  .recommended-newsong-item-song-count {
    color: #fff;
    font-size: 12px;
    padding: 10px 5px;
    span {
      display: inline-block;
      padding: 0 10px 0 0;
      min-width: 60px;
    }
  }
  .white-block {
    display: inline-block;
    width: 10px;
  }
}
</style>
