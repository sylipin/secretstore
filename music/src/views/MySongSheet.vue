<template>
  <div class="my-like" :class="{ pbm: $store.state.songid }">
    <van-nav-bar title="我的歌单" left-arrow @click-left="goback" />
    <div class="my-like-content">
      <div
        class="my-like-item"
        v-for="(item,index) in userSongSheet" :key="index"
        @click="goSongsSheet(item.id)"
      >
        <div class="img-container">
          <img :src="item.creator.avatarUrl" alt="" class="item-img" />
        </div>
        <div class="item-text">
          <div class="item-songs-name van-ellipsis">{{item.name}}</div>
          <div class="item-author-name van-ellipsis">
            <span
              class="item-author-name-item van-ellipsis"
              >{{item.creator.nickname}}</span
            >
          </div>
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
      userSongSheet:[]
    };
  },
  created() {
      this.axios(`/user/playlist?uid=${this.userId}`).then(res=>{
         this.userSongSheet = res.data.playlist
      })
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    
    goSongsSheet(id) {
      this.$router.push({ name: "SongSheet", query: { id } });
    },
  },
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
    width: 100%;
    padding-right: 50px;
    margin-left: 20px;
    .item-songs-name {
      padding-right: 20px;
      margin-bottom: 5px;
    }
    .item-author-name {
      color: rgba(221, 221, 221, 0.3);
      font-size: 14px;
    }
    .item-author-name-item {
      padding-right: 5px;
      font-size: 14px;
    }
  }
}
</style>
