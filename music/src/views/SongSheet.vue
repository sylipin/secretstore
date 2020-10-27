<template>
  <div class="song-sheet" :class="{ pbm: $store.state.songid }">
    <!-- 头部 -->
    <div class="head-bg" :style="{ backgroundImage: `url(${bgImg})` }">
      <div class="nav-cantainer">
        <van-icon name="arrow-left" class="left-icon" @click="goback" />
        <h2 class="song-sheet-name">
          {{ playList.name }}
        </h2>
      </div>
      <!-- 歌单详情 遮罩层 -->
      <van-overlay :show="show" z-index="9999">
        <div class="wrapper" @click.stop="show = false">
          <div
            class="filter-bg"
            :style="{ backgroundImage: `url(${playList.coverImgUrl})` }"
          ></div>
          <div class="info-content">
            <div class="wrapper-img">
              <img :src="playList.coverImgUrl" />
            </div>
            <div class="wrapper-song-sheet-name">{{ playList.name }}</div>
            <div class="tag">
              <div class="tag-name">
                标签:
                <span class="tag-type" v-for="(item, i) in tags" :key="i">{{
                  item
                }}</span>
                <div class="song-sheet-dec">{{ playList.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </van-overlay>

      <!-- 描述详情 -->
      <div class="song-sheet-details">
        <div class="t-content" @click="show = true">
          <div class="l-img">
            <img :src="playList.coverImgUrl" alt="" />
          </div>
          <div class="r-text">
            <h2 class="van-multi-ellipsis--l2">{{ playList.name }}</h2>
            <div class="song-sheet-author">
              <img :src="avatarUrl" alt="" />{{ nickname }}
            </div>
            <p class="song-describe">{{ playList.description }}</p>
          </div>
        </div>
        <div class="comment">
          <van-swipe
            style="height: 40px;"
            vertical
            :autoplay="3000"
            loop
            :show-indicators="false"
          >
            <van-swipe-item v-for="(item, index) in comments" :key="index">
              <div class="comment-content">
                <img
                  :src="
                    item.pendantData ? item.pendantData.imageUrl : defaultavatar
                  "
                  alt=""
                /><span class="comment-text">{{ item.content }}</span>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </div>

    <!-- 歌单歌曲 -->
    <div class="songs">
      <div class="clearfix">
        <div
          class="colletion-btn is-colletion fr"
          @click="colletionSongList"
          v-show="!isOrNoColletion"
        >
         <van-icon name="plus" />收藏({{ colletionCount }})
        </div>
        <div
          class="colletion-btn no-colletion fr"
          @click="cancelSongList"
          v-show="isOrNoColletion"
        >
          <van-icon name="success" />已收藏({{ colletionCount }})
        </div>
      </div>
      <div
        class="songs-list"
        v-for="(item, index) in songs"
        :key="index"
        @click="changeSongListAndId(item.id)"
      >
        <div class="song-list-content van-ellipsis">
          <img
            :src="item.al.picUrl"
            alt=""
            v-lazy="item.al.picUrl"
            class="l-ava"
          />
          <div class="item-content">
            <div class="song-list-content-song-name van-ellipsis">
              {{ item.name }}
            </div>
            <div class="van-ellipsis">
              <span
                v-for="(v, i) in item.ar"
                :key="i"
                class="song-list-content-name"
                >{{ v.name }}</span
              >
            </div>
          </div>
          <div class="out-play" v-show="storesongid == item.id">
            <img :src="outPlay" alt="" class=" auto-img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/scss/dist/songSheet.css";
export default {
  data() {
    return {
      songSheetId: "",
      playList: "",
      avatarUrl: "",
      nickname: "",
      songs: "",
      bgImg: "",
      comments: "",
      defaultavatar: require("../assets/images/defaultata.jpg"),
      arry: [],
      colletionCount: null,
      musicToken: this.$store.state.musicToken,
      uid: this.$store.state.uid,
      isOrNoColletion: false,
      show: false,
      tags: [],
      storesongid: this.$store.state.songid,
      outPlay: require("../assets/images/isplaying.png"),
    };
  },

  created() {
    this.songSheetId = this.$route.query.id;
    this.getSongDetail();
    this.getComments();
    this.$toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
    });
    if (this.musicToken) {
      this.getUserSongsSheet();
    }
  },
  methods: {
    //获取详情
    getSongDetail() {
      this.axios("/playlist/detail?id=" + this.songSheetId).then((song) => {
        this.tags = song.data.playlist.tags;
        this.colletionCount = song.data.playlist.subscribedCount;
        this.$toast.clear();
        this.avatarUrl = song.data.playlist.creator.avatarUrl;
        this.playList = song.data.playlist;
        this.nickname = song.data.playlist.creator.nickname;
        this.bgImg = song.data.playlist.creator.backgroundUrl;
        this.arry = song.data.privileges.map((v) => {
          return v.id;
        });
        this.axios({
          methods: "GET",
          url: "/song/detail",
          params: {
            ids: this.arry.join(","),
          },
        }).then((ids) => {
          this.songs = ids.data.songs;
        });
      });
    },

    //收藏歌单
    colletionSongList() {
      if (this.uid) {
        this.axios(
          `/playlist/subscribe?t=1&id=${this.songSheetId}&cookie=${this.musicToken}`
        ).then((res) => {
          if (res.data.code === 200) {
            this.isOrNoColletion = true;
            this.$toast("收藏成功");
          }
        });
      } else {
        this.$toast("请先登录");
      }
    },

    //取消收藏歌单
    cancelSongList() {
      if (this.uid) {
        this.axios(
          `/playlist/subscribe?t=2&id=${this.songSheetId}&cookie=${this.musicToken}`
        ).then((res) => {
          if (res.data.code === 200) {
            this.isOrNoColletion = false;
            this.$toast("已取取消");
          }
        });
      } else {
        this.$toast("请先登录");
      }
    },

    //获取用户收藏的歌单
    getUserSongsSheet() {
      this.axios(`/user/playlist?uid=${this.uid}`).then((res) => {
        this.$toast.clear()
        let a = [];
        res.data.playlist.map((v) => {
          a.push(v.id);
        });
        if (a.indexOf(this.songSheetId) != -1) {
          this.isOrNoColletion = true;
        } else {
          this.isOrNoColletion = false;
        }
      }).catch(err=>{
        console.error(err)
        this.$toast.clear()
      });
    },

    getComments() {
      this.axios("/comment/playlist?id=" + this.songSheetId).then((res) => {
        this.comments = res.data.comments;
      });
    },

    goback() {
      this.$router.go(-1);
    },
    changeSongListAndId(id) {
      this.storesongid = id;
      this.$store.commit("changeSongid", id);
      this.$store.commit("changeSongList", this.arry);
    },
  },
};
</script>
