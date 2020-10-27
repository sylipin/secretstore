<template>
  <div class="songer" :class="{ pbm: $store.state.songid }">
    <div class="head-bg" :style="{ backgroundImage: `url(${songerImg})` }">
      <van-icon name="arrow-left" class="left-icon" @click="goback" />
      <div class="introduce-text">
        <h2 class="zh-name">{{ artist.name }}</h2>
        <p class="EnglishName">{{ EnglishName }}</p>
        <div
          class="btn-concern noActive"
          v-show="!isOrNoColletion"
          @click="getCollectionSonger"
        >
          <van-icon name="plus" />收藏
        </div>
        <div
          class="btn-concern active-concern"
          v-show="isOrNoColletion"
          @click="cancelColletion"
        >
          已收藏
        </div>
      </div>
    </div>

    <!-- 歌手详情 -->
    <div class="user-info">
      <div class="display-content">
        <van-tabs
          animated
          background="#1c1c1c"
          v-model="active"
          sticky
          :swipeable="true"
          title-active-color="#ee0a24"
        >
          <van-tab title="主页">
            <div class="homepage">
              <div class="homepage-title">
                <van-icon name="fire-o" class="homepage-icon" />近期热门
                <span class="more-hot-songs" @click="getMoreHotSongs"
                  >更多热歌</span
                >
              </div>

              <div
                class="recently-hot-songs"
                v-for="(item, i) in recentlyHotSongs"
                :key="i"
              >
                <div
                  class="recently-hot-songs-item"
                  @click="changeSongListAndId(item.id, arry)"
                >
                  <div class="recently-hot-songs-name">{{ item.name }}</div>
                  <div class="recently-hot-songs-alname" v-if="item.al">
                    <span class="sq">SQ</span>{{ item.al.name }}
                  </div>
                </div>
                <div class="out-play" v-show="storesongid == item.id">
                  <img :src="outPlay" alt="" class=" auto-img" />
                </div>
              </div>
              <div class="songer-dec">
                <div class="songer-dec-title">歌手简介:</div>
                <p class="songer-info">{{ briefDesc }}</p>
              </div>
            </div>
          </van-tab>
          <van-tab :title="'歌曲' + [maxLength ? maxLength : '']">
            <div class="homepage">
              <div class="homepage-title">
                <van-icon name="music-o" class="homepage-icon" />全部歌曲
              </div>
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getMoreSongs"
                offset="20"
              >
                <van-cell v-for="(item, index) in list" :key="index">
                  <div
                    class="recently-hot-songs"
                    @click="changeSongListAndId(item.id, arry)"
                  >
                    <div class="recently-hot-songs-item">
                      <span class="hot-index">{{ index + 1 }}</span>
                      <div class="recently-hot-songs-name">{{ item.name }}</div>
                      <div class="recently-hot-songs-alname" v-if="item.al">
                        <span class="sq">SQ</span>{{ item.al.name }}
                      </div>
                    </div>
                  </div>
                  <div class="out-play" v-if="storesongid == item.id">
                    <img :src="outPlay" alt="" class="auto-img" />
                  </div>
                </van-cell>
              </van-list>
            </div>
          </van-tab>
          <van-tab title="专辑"></van-tab>
          <van-tab title="视频"></van-tab>
          <van-tab title="动态"></van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicToken: this.$store.state.musicToken,
      briefDesc: "",
      songerImg: "",
      artist: "",
      songId: "",
      EnglishName: "",
      songerDec: "",
      active: 0,
      recentlyHotSongs: [],
      loading: false,
      finished: false,
      offsetIndex: 0,
      list: [],
      arry: [],
      maxLength: 0,
      userId: this.$store.state.uid,
      isOrNoColletion: false,
      outPlay: require("../assets/images/isplaying.png"),
      storesongid: this.$store.state.songid,
    };
  },
  created() {
    this.songId = this.$route.query.id;
    this.getSongerInfo();
    // this.getUserConcern();
    this.axios(`/artist/songs?limit=100000&id=${this.songId}`).then((res) => {
      this.maxLength = res.data.songs.length;
    });
    if (this.musicToken) {
      this.getMyColletion();
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    //下拉刷新
    getMoreSongs() {
      this.$store.commit("changeSongList", this.arry);
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      this.offsetIndex = this.offsetIndex + 1;
      this.axios(
        `/artist/songs?limit=10&offset=${(this.offsetIndex - 1) * 10}&id=${
          this.songId
        }`
      )
        .then((result) => {
          this.$toast.clear();
          if (result.data.code === 200) {
            this.list = [...this.list, ...result.data.songs];
            result.data.songs.map((v) => {
              this.arry = [...this.arry, v.id];
            });
            this.loading = false;
            // 数据全部加载完成
            // let a = 0;
            if (this.list.length == this.maxLength) {
              this.$toast.clear();
              this.finished = true;
            }
          }
        })
        .catch((err) => {
          this.$toast.clear();
          console.error(err);
        });
    },

    //获取用户信息
    getSongerInfo() {
      this.axios("/artists?id=" + this.songId).then((res) => {
        this.briefDesc = res.data.artist.briefDesc;
        this.songerImg = res.data.artist.img1v1Url;
        this.artist = res.data.artist;
        this.EnglishName = res.data.artist.alias[0];
        this.songerDec = res.data.artist.briefDesc;
        this.recentlyHotSongs = res.data.hotSongs.slice(0, 5);
      });
    },

    //收藏歌手
    getCollectionSonger() {
      if (this.musicToken) {
        this.isOrNoColletion = true;
        this.axios(
          `/artist/sub?id=${this.songId}&t=1&cookie=${this.musicToken}`
        ).then((res) => {
          if (res.data.code === 200) {
            this.$toast.success("收藏成功");
          }
        });
      } else {
        this.$toast("请先登录");
      }
    },

    //取消歌手收藏
    cancelColletion() {
      if (this.musicToken) {
        this.isOrNoColletion = false;
        this.axios(
          `/artist/sub?id=${this.songId}&t=0&cookie=${this.musicToken}`
        ).then((res) => {
          if (res.data.code === 200) {
            this.$toast.success("已取消");
          }
        });
      } else {
        this.$toast("请先登录");
      }
    },

    getMoreHotSongs() {
      this.active = 1;
    },

    //获取我的歌手收藏
    getMyColletion() {
      this.axios(`/artist/sublist?cookie=${this.musicToken}`).then((res) => {
        let a = [];
        res.data.data.map((v) => {
          a.push(v.id);
        });
        if (a.indexOf(this.songId) != -1) {
          this.isOrNoColletion = true;
        } else {
          this.isOrNoColletion = false;
        }
      });
    },

    changeSongListAndId(id, arry) {
      this.storesongid = id;
      this.$store.commit("changeSongid", id);
      this.$store.commit("changeSongList", arry);
    },
  },
};
</script>

<style lang="scss" scoped>
.songer {
  // position: relative;
  z-index: 10;
}
.left-icon {
  padding: 20px 0 0 10px;
  float: left;
  color: #fff;
  position: fixed;
  z-index: 3;
}
.pbm {
  padding-bottom: 55px;
}
.head-bg {
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  position: relative;
  height: 360px;
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
}
.songer-dec {
  .songer-dec-title {
    border-top: 1px solid rgb(177, 177, 177);
    color: #fff;
    padding: 10px;
  }
  .songer-info {
    text-indent: 2em;
    padding: 5px 10px 10px 10px;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.3);
  }
}
.introduce-text {
  position: absolute;
  width: 100%;
  color: #fff;
  z-index: 2;
  left: 20px;
  bottom: 60px;
  .zh-name {
    font-weight: 700;
    color: #fff;
    font-size: 18px;
  }
  .EnglishName {
    font-size: 14px;
    font-weight: 400;
    margin-left: 5px;
    margin-top: 10px;
    color: rgba(170, 170, 170, 0.6);
  }
  .btn-concern {
    position: absolute;
    display: flex;
    font-size: 14px;
    color: #fff;
    padding: 6px;
    border-radius: 28px;
    right: 60px;
    align-items: center;
  }
  .active-concern {
    background-color: rgba(99, 99, 99, 0.4);
  }
  .noActive {
    background-color: #ee0a24;
  }
}
.user-info {
  min-height: 300px;
  padding: 0 10px;
  background-color: #1c1c1c;
}
.item-list {
  display: flex;
  align-items: center;
  .list-text {
    margin-left: 20px;
    .list-text-sm {
      padding-top: 5px;
      color: rgba(170, 170, 170, 0.4);
      font-size: 12px;
    }
  }
}
.homepage {
  min-height: 300px;
  .homepage-title {
    display: flex;
    align-items: center;
    color: #fff;
    padding: 10px;
    position: relative;
    .homepage-icon {
      margin-right: 10px;
      font-size: 22px;
    }
    .more-hot-songs {
      font-size: 12px;
      padding: 4px;
      color: rgba(221, 221, 221, 0.322);
      border: 1px solid rgba(221, 221, 221, 0.322);
      border-radius: 20px;
      transform: scale(0.9);
      position: absolute;
      right: 0;
    }
  }
  .recently-hot-songs {
    position: relative;
  }
  .recently-hot-songs-item {
    position: relative;
    .hot-index {
      color: rgba(221, 221, 221, 0.322);
      float: left;
      width: 30px;
      margin-right: 10px;
      margin-left: 5px;
      padding-top: 10px;
    }
    padding: 10px;
    .recently-hot-songs-name {
      color: #fff;
      font-size: 14px;
    }
    .recently-hot-songs-alname {
      color: rgba(221, 221, 221, 0.322);
      font-size: 12px;
      .sq {
        color: #ee0a24;
        display: inline-block;
        font-size: 12px;
        border: 1px solid #ee0a24;
        border-radius: 2px;
        transform: scale(0.7);
        line-height: 12px;
      }
    }
  }
}
::v-deep .van-cell {
  background-color: transparent;
  font-size: inherit;
  padding: 0;
  line-height: 16px;
}
</style>
