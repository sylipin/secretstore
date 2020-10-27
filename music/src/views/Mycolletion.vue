<template>
  <div class="my-colletion">
    <van-nav-bar title="关注的歌手" left-arrow @click-left="goback" />
    <div class="colletion-songer">
      <div
        class="songer-item"
        v-for="(item, i) in colletionArr"
        :key="i"
        @click="goSonger(item.id)"
      >
        <img :src="item.img1v1Url" alt="" />
        <div class="songer-text">
          <div class="songer-name">{{ item.name }}</div>
          <div class="nick-name" v-show="item.alias.length > 0">
            <span>昵称:</span>{{ item.alias[0] }}
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
      colletionArr: [],
    };
  },
  created() {
    this.getMyColletion();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    goSonger(id) {
      this.$router.push({ name: "Songer", query: { id } });
    },
    getMyColletion() {
      this.axios(`/artist/sublist?cookie=${this.musicToken}`).then((res) => {
        this.colletionArr = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.my-colletion {
  height: 100vh;
  background-color: #1c1c1c;
  .van-nav-bar {
    background-color: transparent;
  }
  .songer-item {
    display: flex;
    height: 50px;
    width: 100%;
    margin: 5px 0 5px 10px;
    align-items: center;
    img {
      height: 100%;
      border-radius: 50%;
    }
    .songer-text {
      margin-left: 20px;
      .songer-name {
        color: #fff;
      }
      .nick-name {
        color: rgba(255, 255, 255, 0.4);
        font-size: 12px;
        margin-top: 5px;
      }
    }
  }
}
::v-deep .van-nav-bar__title {
  color: #fff;
}
</style>
