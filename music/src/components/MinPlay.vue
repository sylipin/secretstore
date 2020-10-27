<template>
  <div class="min-play">
    <div class="play-content" @click="showPopup" v-show="id">
      <!-- 进度条 -->
      <div class="min-process">
        <div class="process">
          <van-slider
            v-model="value"
            active-color="#ff0c46"
            bar-height="1px"
            @drag-start="dragEnd"
            @drag-end="onChange(value)"
          >
            <template #button>
              <div
                class="custom-button"
                :class="{ buttonActive: isPlaying }"
              ></div>
            </template>
          </van-slider>
        </div>
      </div>
      <div class="min-avatar">
        <img
          :src="avatar"
          alt=""
          class="minAvatarActive"
          :style="{ 'animation-play-state': isPlaying ? 'running' : 'paused' }"
        />
      </div>
      <span class="min-name van-ellipsis"
        >{{ name
        }}<span v-for="(item, i) in author" :key="i" class="min-author">{{
          item.name
        }}</span></span
      >
      <span class="min-play-pause" @click.stop="playing"
        ><img :src="isPlaying ? pause : play" alt=""
      /></span>
      <span class="min-next" @click="next"
        ><img src="../assets/images/next.png" alt=""
      /></span>
    </div>

    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <div class="play">
        <div class="bg" :style="{ backgroundImage: `url(${avatar})` }"></div>

        <!-- 头部导航 -->
        <div class="content">
          <div class="nav">
            <h2 class="nav-title">
              <van-icon
                name="arrow-left"
                class="lef-icon"
                @click="closePopup"
              />
              <h3 class="song-name">
                {{ name }}
              </h3>
              <div class="authors">
                <span class="author" v-for="(item, i) in author" :key="i"
                  >{{ item.name }}<span class="epblock"></span
                ></span>
              </div>
            </h2>
          </div>

          <div v-show="!fullLyr" class="main-container">
            <div
              class="needle"
              :class="[isPlaying ? 'needleActive' : 'needleUactive']"
            >
              <img src="../assets/images/needle.png" alt="" />
            </div>
            <div
              class="img-container"
              :style="{
                'animation-play-state': isPlaying ? 'running' : 'paused',
              }"
            >
              <img :src="avatar" alt="" class="playImg" v-lazy="avatar" />
              <img
                src="../assets/images/record.png"
                alt=""
                class="bg-play-img"
              />
            </div>

            <!-- 歌词部分 -->
            <div class="lryics">
              <ul class="lryics-ul" :style="{ top: -offsettop + 'px' }">
                <li
                  class="lryics-li"
                  v-for="(item, i) in formatLyric"
                  :id="i"
                  :key="i"
                  ref="lyric"
                  :class="[
                    currentIdex === i
                      ? 'active'
                      : currentIdex === i - 1
                      ? 'opactive'
                      : '',
                  ]"
                >
                  {{ item.lyric }}
                </li>
              </ul>
            </div>

            <div class="audio-container">
              <audio
                :src="url"
                ref="audio"
                @timeupdate="updateTime($event)"
                autoplay
              ></audio>
              <div class="control-btn">
                <img
                  :src="playType == 0 ? suiji : playType == 1 ? danqu : xunhuan"
                  class="control-btn-img"
                  @click="changePlayModel(playType)"
                />
                <img
                  src="../assets/images/punglun.png"
                  class="control-btn-img"
                />
                <van-icon
                  name="like-o"
                  size="20"
                  :color="isLike ? '#ff0c46' : '#ccc'"
                  @click="likeThisSong(!isLike)"
                />
              </div>
              <div class="play-control">
                <div class="process">
                  <span class="process-text-l"
                    >{{ integerCurrenTime | formatTime }}
                  </span>
                  <van-slider
                    v-model="value"
                    bar-height="4px"
                    active-color="#ff0c46"
                    button-size="10px"
                    @drag-start="dragEnd"
                    @drag-end="onChange(value)"
                  />
                  <span class="process-text-r">
                    <span v-if="integerDurationSeconds">
                      {{ integerDurationSeconds | formatTime }}
                    </span>
                    <span v-else>00:00</span>
                  </span>
                </div>
                <span class="pre-btn" @click="prev"
                  ><img src="../assets/images/pre.png" alt=""
                /></span>
                <span class="play-pause" @click="playing"
                  ><img :src="isPlaying ? pause : play" alt=""
                /></span>
                <span class="next-btn" @click="next"
                  ><img src="../assets/images/next.png" alt=""
                /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      show: false,
      value: 0,
      isPlaying: false,
      avatar: "",
      url: "",
      play: require("../assets/images/play.png"),
      pause: require("../assets/images/pause.png"),
      xunhuan: require("../assets/images/xunhuan.png"),
      danqu: require("../assets/images/danquxunhuan.png"),
      suiji: require("../assets/images/suiji.png"),
      name: "",
      author: [],
      integerCurrenTime: 0,
      integerDurationSeconds: 0,
      flag: true,
      lyrics: [],
      currentIdex: 0,
      offsettop: 0,
      currentTime: 0,
      fullLyr: false,
      index: null,
      //默认0,为随机播放上下首
      playType: 0,
      id: null,
      songsList: [],
      isLike: false,
      musicToken: this.$store.state.musicToken,
      userId: this.$store.state.uid,
    };
  },

  created() {
    if (this.id) {
      this.int();
    }

    if (this.userId) {
      this.getMyLikeList();
    }
  },
  mounted() {
    if (this.id) {
      this.playing();
    }
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    //我的喜欢列表
    getMyLikeList() {
      this.axios(`/likelist?uid=${this.userId}&cookie=${this.musicToken}`).then(
        (res) => {
          if (res.data.ids.indexOf(this.songid) > -1) {
            this.isLike = true;
          } else {
            this.isLike = false;
          }
        }
      );
    },

    //喜欢该歌曲
    likeThisSong(c) {
      if (this.musicToken) {
        this.isLike = !this.isLike;
        if (c) {
          this.axios(
            `/like?like=${c}&id=${this.songid}&cookie=${this.musicToken}`
          ).then((res) => {
            if (res.data.code === 200) {
              this.$toast("加入喜欢");
              this.isLike = true;
            }
          });
        } else {
          this.axios(
            `/like?like=${c}&id=${this.songid}&cookie=${this.musicToken}`
          ).then((res) => {
            if (res.data.code === 200) {
              this.$toast("取消喜欢");
              this.isLike = false;
            }
          });
        }
      }else {
        this.$toast("请先登录")
      }
    },
    //改变播放模式
    changePlayModel(playType) {
      this.playType = (playType + 1) % 3;

      if (this.playType == 0) {
        this.$toast({
          message: "随机播放",
          position: "bottom",
        });
      } else if (this.playType == 1) {
        this.$toast({
          message: "单曲播放",
          position: "bottom",
        });
      } else {
        this.$toast({
          message: "顺序播放",
          position: "bottom",
        });
      }
    },
    closePopup() {
      this.show = false;
    },
    goback() {
      this.$router.go(-1);
    },

    int() {
      this.getSongUrl();
      this.getLyric();
      this.getDetail();
    },

    playing() {
      let audio = this.$refs.audio;
      this.isPlaying = !this.isPlaying;
      if (this.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    },
    //上下首切歌封装
    toggleSong(type) {
      switch (this.playType) {
        case 0:
          var newIndex = Math.floor(Math.random() * this.storesongList.length);
          //判断是否随机到同一个歌曲ID
          while (this.index == newIndex) {
            newIndex = Math.floor(Math.random() * this.storesongList.length);
          }

          this.index = newIndex;
          break;
        case 1:
          if (type == "next") {
            this.index = (this.index + 1) % this.storesongList.length;
          } else {
            this.index =
              this.index == 0
                ? this.storesongList.length - 1
                : (this.index - 1) % this.storesongList.length;
          }
          break;
        case 2:
          if (type == "next") {
            this.index = (this.index + 1) % this.storesongList.length;
          } else {
            this.index =
              this.index == 0
                ? this.storesongList.length - 1
                : (this.index - 1) % this.storesongList.length;
          }
          break;
      }

      this.id = this.storesongList[this.index];
      this.int();
    },

    next() {
      if (this.playType == 1) {
        this.$toast({
          message: "目前为单曲播放",
          position: "bottom",
        });
        return;
      }
      if (this.storesongList) {
        this.toggleSong("next");
        this.isPlaying = true;
      } else {
        this.$toast({
          message: "单曲播放,无下一首",
          position: "bottom",
        });
      }
    },

    prev() {
      if (this.playType == 1) {
        this.$toast({
          message: "目前为单曲播放",
          position: "bottom",
        });
        return;
      }
      if (this.storesongList) {
        this.toggleSong("prev");
        this.isPlaying = true;
      } else {
        this.$toast({
          message: "单曲播放,无上一首",
          position: "bottom",
        });
      }
    },

    //拖动进度条
    onChange(values) {
      this.flag = true;
      this.$refs.audio.currentTime = (values / 100) * this.$refs.audio.duration;
    },
    //防止拖动进度条是进度条抖动
    dragEnd() {
      this.flag = false;
    },

    //控制播放器的播放状态
    updateTime(e) {
      this.getCurrtentTime();
      //总时间
      let duration = e.target.duration;
      //当前时间
      let currentTime = e.target.currentTime;
      this.currentTime = currentTime;
      let values = (currentTime / duration) * 100;
      this.integerCurrenTime = Math.floor(currentTime);
      this.integerDurationSeconds = Math.floor(duration);
      if (e.target.ended) {
        if (this.playType == 0) {
          //随机播放
          this.currentTime = 0;
          this.index = Math.floor(Math.random() * this.storesongList.length);
          this.id = this.storesongList[this.index];
          this.int();
          e.target.play();
        } else if (this.playType == 1) {
          //循环播放
          this.currentTime = 0;
          this.id = this.songid;
          e.target.play();
        } else {
          this.currentTime = 0;
          this.index = (this.index + 1) % this.storesongList.length;
          this.int();
          e.target.play();
        }
      }
      if (this.flag) {
        this.value = values;
      }
    },

    //获取歌曲的url
    getSongUrl() {
      this.axios(`/song/url?id=${this.id}`).then((res) => {
        this.url = res.data.data[0].url;
      });
    },

    //获取歌词
    getLyric() {
      this.axios("/lyric?id=" + this.id).then((lyric) => {
        if (lyric.data.lrc) {
          this.lyrics = lyric.data.lrc.lyric.split("\n");
        } else {
          this.lyrics = [];
        }
      });
    },

    //获取歌曲详情
    getDetail() {
      this.axios("/song/detail?ids=" + this.id).then((res) => {
        this.avatar = res.data.songs[0].al.picUrl;
        this.name = res.data.songs[0].name;
        this.author = res.data.songs[0].ar;
      });
    },

    //判断当前行
    getCurrtentTime() {
      for (let i = 0; i < this.formatLyric.length; i++) {
        if (this.currentTime > parseInt(this.formatLyric[i].time)) {
          if (this.$refs.lyric[i]) {
            if (i == this.$refs.lyric[i].id) {
              this.currentIdex = i;
            }
          }
        }
      }
    },
  },

  computed: {
    formatLyric() {
      let lrcArry = this.lyrics;
      let flrc = lrcArry.map((v) => {
        /\[(\d+):(\d+\.\d+)\](.+)?/.test(v);
        let obj = {};
        if (RegExp.$3) {
          obj.time = parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2);
          obj.lyric = RegExp.$3;
        }
        return obj;
      });
      return flrc;
    },
    ...mapState(["songid", "storesongList"]),
  },

  watch: {
    currentIdex(n, o) {
      if (n != o) {
        this.offsettop = this.$refs.lyric[n].offsetTop;
      }
    },
    songid(n, o) {
      if (n !== o) {
        this.id = n;
        this.index = this.storesongList.indexOf(n);
        this.int();
        this.isPlaying = true;
        this.show = true;
      }
    },
  },

  //补零
  filters: {
    formatTime(time) {
      let m =
        Math.floor(time / 60) >= 10
          ? Math.floor(time / 60)
          : "0" + Math.floor(time / 60);
      let s =
        Math.floor(time % 60) >= 10
          ? Math.floor(time % 60)
          : "0" + Math.floor(time % 60);
      return m + ":" + s;
    },
  },
};
</script>

<style lang="scss" scoped>
.play-content {
  width: 100%;
  height: 55px;
  background-color: #1c1c1c;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  position: fixed;
  bottom: 0;
  z-index: 999;
  .min-avatar {
    height: 100%;
    display: inline-block;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 10px;
    img {
      width: 40px;
      height: 40px;
      display: inline-block;
      border-radius: 50%;
      position: relative;
    }
  }
}
.minAvatarActive {
  animation: rotate 20s linear infinite;
}
.min-name {
  width: 100%;
  display: inline-block;
  font-size: 14px;
  margin-left: 60px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  padding-right: 160px;
}
.min-author {
  padding: 0 5px 0 10px;
  font-size: 12px;
  color: rgba(221, 221, 221, 0.568);
}
.min-play-pause {
  img {
    position: absolute;
    right: 50px;
    width: 30px;
    height: 30px;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid #ff0c46;
    border-radius: 50%;
    padding: 5px;
  }
}
.min-next {
  img {
    position: absolute;
    right: 10px;
    width: 30px;
    height: 30px;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid #ff0c46;
    border-radius: 50%;
    padding: 5px;
  }
}

@keyframes rotate {
  0% {
    transform: rotateZ(0deg); /*从0度开始*/
  }
  100% {
    transform: rotateZ(360deg); /*360度结束*/
  }
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
.play {
  height: 100vh;
  position: relative;
  overflow: hidden;
  z-index: 99999;
  padding-top: 10px;
}
.bg {
  float: left;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transform: scale(1.2);
  filter: blur(15px);
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.6;
  }
}

.content {
  position: absolute;
  width: 100%;
}

.custom-button {
  width: 10px;
  height: 10px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  background-image: url(../assets/images/logo.png);
  background-size: cover;
  display: inline-block;
  border-radius: 100px;
}
.buttonActive {
  animation: scale 2s infinite;
  position: relative;
}
.nav {
  .nav-title {
    padding: 0 55px;
    // margin-top: 15px;
    font-size: 16px;
    color: #fff;
    position: relative;
    border-bottom: 1px solid #ddd;
    padding-bottom: 5px;
    .lef-icon {
      position: absolute;
      font-size: 24px;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
    }
    text-align: center;
    .authors {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .author {
      margin-top: 5px;
      font-size: 12px;
    }
    .song-name {
      font-size: 16px;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap;
    }
  }
}
.main-container {
  overflow: hidden;
  position: relative;
}
.needle {
  img {
    width: 70px;
    height: 100%;
  }
  position: absolute;
  top: -11px;
  left: 48%;
  z-index: 99;
  transition: all 0.5s;
  transform-origin: 10px 10px;
}
//播放唱针
.needleActive {
  transform: rotate(-15deg);
}
//暂定唱针
.needleUactive {
  transform: rotate(-45deg);
}
.img-container {
  width: 100%;
  height: 300px;
  position: relative;
  animation: rotate 40s linear infinite;
  overflow: hidden;
  .playImg {
    position: absolute;
    width: 184px;
    height: 184px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .bg-play-img {
    position: absolute;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
}

.lryics {
  text-align: center;
  overflow: hidden;
  width: 100%;
  height: 120px;
  position: relative;
  padding-top: 30px;
  .lryics-ul {
    position: relative;
    transition: all 0.5s;
    padding: 0 50px;
    overflow: hidden;
    li {
      line-height: 30px;
      font-size: 14px;
      opacity: 0.5;
      text-align: center;
      color: #7c7c7c;
      &.opactive {
        color: #fff;
      }
      &.active {
        transform: scale(1.3);
        color: #ff0c46;
        transition: all 0.5s;
        font-weight: 700;
      }
    }
  }
}
.control-btn {
  display: flex;
  padding: 20px 80px;
  justify-content: space-between;
  .control-btn-img {
    height: 20px;
  }
}

.audio-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  .play-control {
    position: relative;
    padding: 0 80px 20px;
    text-align: center;
    .process {
      height: 30px;
      font-size: 12px;
      position: relative;
      .process-text-l {
        color: #fff;
        position: absolute;
        left: -40px;
        transform: translateY(-40%);
      }
      .process-text-r {
        color: #fff;
        position: absolute;
        right: -40px;
        transform: translateY(-80%);
      }
    }

    .pre-btn {
      float: left;
      transform: translateY(20%);
      img {
        width: 24px;
        height: 24px;
      }
    }

    .play-pause {
      img {
        width: 30px;
        height: 30px;
      }
    }

    .next-btn {
      transform: translateY(20%);
      float: right;
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>
