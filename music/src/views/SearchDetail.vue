<template>
  <div class="search-detail" :class="{ pbm: $store.state.songid }">
    <!-- 头部搜索 -->
    <div class="nav-cantainer">
      <van-icon
        name="arrow-left"
        class="left-icon"
        @click="goBack"
        v-model="keyword"
        :placeholder="keyword"
      />
      <input
        type="text"
        class="nav-search"
        @input="getSearch()"
        v-model="searchValue"
        style="font-size:12px"
        @focus="emptyValue"
        @blur="loseFoucs"
      />
    </div>

    <!-- 展示搜索内容 -->
    <van-tabs
      color="#ff0c46"
      background="#1c1c1c"
      :sticky="true"
      :lazy-render="true"
      title-active-color="#fff"
      @click="onClick"
    >
      <van-tab title="单曲">
        <div
          class="search-data"
          v-for="(item, index) in singleSong"
          :key="index"
          @click="changeSongListAndId(item.id, arry)"
        >
          <span class="song-name">{{ item.name }}</span
          >-
          <span class="songer-name" v-for="(v, i) in item.artists" :key="i">{{
            v.name
          }}</span>
        </div>
      </van-tab>
      <van-tab title="歌手">
        <div
          class="search-data"
          v-for="(item, index) in songerData"
          :key="index"
          @click="goSonger(item.id)"
        >
          {{ item.name }}
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      searchData: [],
      type: 1,
      searchValue: "",
      singleSong: [],
      songerData: [],
      id: null,
      arry: [],
    };
  },

  created() {
    this.keyword = this.$route.query.w;
    this.searchValue = this.keyword;
    this.getSearchContent();
    this.$toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
    });
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },

     goSonger(id) {
      this.$router.push({ name: "Songer" ,query:{id}});
    },

    emptyValue() {
      this.searchValue = '';
    },
    loseFoucs(){
      this.searchValue =  this.keyword;
    },
    onClick(name, type) {
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      this.type = 1;
      if (type == "单曲") {
        if (!this.searchValue) {
          this.getSearchContent();
        } else {
          this.getSearch();
        }
      }

      if (type == "歌手") {
        this.type = 100;
        if (!this.searchValue) {
          this.getSearchContent();
        } else {
          this.getSearchContent();
        }
      }
    },

    //通过传入的关键词搜索
    getSearchContent() {
      this.axios(`/search?type=${this.type}&keywords=${this.keyword}`)
        .then((res) => {
          this.$toast.clear();
          if (this.type == 1) {
            return res.data.result.songs;
          }
          if (this.type == 100) {
            return res.data.result.artists;
          }
        })
        .then((data) => {
          if (this.type == 1) {
            data.map((v) => {
              this.arrr = [];
              this.arry = [...this.arry, v.id];
            });
            this.singleSong = data;
          }
          if (this.type == 100) {
            this.songerData = data;
          }
        });
    },

    //本页面搜索
    getSearch() {
      if (!this.searchValue) {
        this.$toast.clear();
        return;
      }
      this.axios(`/search?type=${this.type}&keywords=${this.searchValue}`).then(
        (res) => {
          this.$toast.clear();
          if (this.type == 1) {
            this.singleSong = res.data.result.songs;
          }
          if (this.type == 100) {
            this.songerData = res.data.result.artists;
          }
        }
      );
    },

    //跳转播放页面
    goPlay(id) {
      this.$router.push({ name: "Play", query: { id } });
    },

    changeSongListAndId(id, arry) {
      this.$store.commit("changeSongid", id);
      this.$store.commit("changeSongList", arry);
    },
  },

  //   watch: {
  //     type(n) {
  //       
  //     },
  //   },

  // computed: {
  //   searchD() {
  //     return this.searchData.map((v) => {
  //       if (this.type === 0) {
  //         return (this.computedData = v.song.songs);
  //       }
  //     });
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.search-detail {
  min-height: 100vh;
  background-color: #1c1c1c;
}
.pbm {
  padding-bottom: 55px;
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
    background-color: #494949;
    color: rgb(187, 187, 187);
  }
}
.display-content {
  margin-top: 20px;
}
.search-data {
  padding: 10px 0 10px 5px;
  margin: 0 15px;
  border-bottom: 1px solid #3f3f3f;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #ddd;
}
.van-tab__pane {
  margin-top: 10px;
}
.songer-name {
  font-size: 12px;
  color: rgba(221, 221, 221, 0.623);
  margin: 0 2px;
}
.song-name {
  color: rgb(0, 150, 255);
  margin-right: 5px;
}
</style>
