<template>
  <div class="my-like" :class="{ pbm: $store.state.songid }">
    <van-nav-bar title="喜欢的音乐" left-arrow @click-left="goback" />
    <div class="my-like-content">
      <div
        class="my-like-item"
        v-for="(item, index) in songs"
        :key="index"
        @click="changeSongListAndId(item.id,arry)"
      >
        <div class="img-container">
          <img :src="item.al.picUrl" alt="" class="item-img" />
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
        <div class="out-play" v-show="item.id == storesongid">
          <img src="../assets/images/isplaying.png" alt="" class="auto-img" />
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
      userId: this.$store.state.uid,
      songs: [],
      storesongid: this.$store.state.songid,
      arry: [],
    };
  },
  created() {
    this.axios(`/likelist?uid=${this.userId}&cookie=${this.musicToken}`)
      .then((res) => {
        this.arry = res.data.ids;
        return res;
      })
      .then((ress) => {
        this.axios({
          methods: "GET",
          url: "/song/detail",
          params: {
            ids: ress.data.ids.join(","),
          },
        }).then((data) => {
          
          if (data.data.code === 200) {
            this.songs = data.data.songs;
          }
        });
      });
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
  },
  watch:{
      storesongid(n) {
          this.storesongid = n
      }
  }
};
</script>

<style lang="scss" scoped>
.pbm {
    padding-bottom: 55px;
}
.my-like {
  height: 100%;
  min-height: 100vh;
  background-color: #1c1c1c;
  .van-nav-bar {
    background-color: transparent;
  }
}
::v-deep .van-nav-bar__title {
  color: #fff;
}
.my-like-content {
  margin-top: 10px;
}
.my-like-item {
  position: relative;
  padding: 5px 20px;
  height: 50px;
  width: 100%;
  color: rgb(0, 194, 253);
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
      padding-right: 5px;
    }
  }
}
</style>
