<template>
  <div class="daily">
    <span class="left-incon" @click="goback"
      ><van-icon name="arrow-left"
    /></span>
    <div class="bg" :style="{ backgroundImage: `url(${bgImg})` }"></div>
    <div class="daily-recommend" :class="{ pbm: $store.state.songid }">
      <h2 class="daily-recommend-title">
        每日推荐<span class="day-img"
          ><span class="day">{{ day }}</span
          ><img :src="dayImg" class="auto-img"
        /></span>
      </h2>
      <div
        class="daily-recommend-item"
        v-for="(item, index) in arry"
        :key="index"
        @click="changeSongListAndId(item.id, songList)"
      >
        <div class="img-container">
          <img
            :src="item.al.picUrl"
            alt=""
            class="item-img"
            v-lazy="item.al.picUrl"
          />
        </div>
        <div class="item-text">
          <div class="item-songs-name van-ellipsis">{{ item.name }}</div>
          <div class="item-author-name van-ellipsis">
            <span
              v-for="(item, i) in item.ar"
              :key="i"
              class="item-author-name-item"
              >{{ item.name }}</span
            >
          </div>
        </div>
        <div class="out-play" v-if="item.id == storesongid">
          <img :src="outPlay" alt="" class="auto-img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicToken: this.$store.state.musicToken,
      bgImg: "",
      outPlay: require("../assets/images/isplaying.png"),
      dayImg: require("../assets/images/day.png"),
      storesongid:"",
      arry: [],
      songsAva: "",
      songList: [],
      day: null,
    };
  },
  created() {
    this.getRecommendSongs();
    this.getDay();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },

    changeSongListAndId(id, arry) {
      this.storesongid = id;
      this.$store.commit("changeSongid", id);
      this.$store.commit("changeSongList", arry);
    },
    getDay() {
      this.day = new Date().getDate();
    },
    getRecommendSongs() {
      this.axios(`/recommend/songs?cookie=${this.musicToken}`).then((res) => {
        let i = Math.floor(Math.random() * res.data.data.dailySongs.length - 1);
        this.bgImg = res.data.data.dailySongs[i].al.picUrl;
        this.arry = res.data.data.dailySongs;
        res.data.data.dailySongs.map((v) => {
          this.songList.push(v.id);
        });
      });
    },
  },
  watch: {
    storesongid(n) {
      this.storesongid = n;
    },
  },
};
</script>

<style lang="scss" scoped>
.daily {
  height: 100vh;
  background-color: #1c1c1c;
}
.pbm {
  padding-bottom: 55px;
}
.bg {
  height: 200px;
  width: 100%;
  background-size: cover;
  filter: brightness(50%);
}
.left-incon {
  position: fixed;
  left: 20px;
  top: 20px;
  color: #fff;
  z-index: 2;
}
.daily-recommend {
  background-color: #000000;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 0 20px 0;
  transform: translateY(-20px);
  .daily-recommend-title {
    font-size: 20px;
    color: #fff;
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;
    .day-img {
      margin-left: 20px;
      height: 30px;
      width: 30px;
      position: relative;
      .day {
        font-size: 12px;
        position: absolute;
        left: 50%;
        top: 43%;
        transform: translateX(-50%);
      }
    }
  }
  .daily-recommend-item {
    position: relative;
    padding: 5px 0;
    height: 50px;
    width: 100%;
    color: #fff;
    display: flex;
    align-items: center;
    .img-container {
      height: 100%;
      text-align: center;
      width: 40px;
    }
    .item-img {
      height: 100%;
      width: auto;
    }
    .item-text {
      padding-right: 50px;
      margin-left: 20px;
      .item-songs-name {
        margin-bottom: 5px;
      }
      .item-author-name {
        color: rgba(221, 221, 221, 0.3);
        font-size: 14px;
      }
      .item-author-name-item {
        padding-right:5px;
      }
    }
  }
}
</style>
