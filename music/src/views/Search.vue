<template>
  <div class="search">
    <!-- 头部搜索 -->
    <div class="nav-cantainer">
      <van-icon name="arrow-left" class="left-icon" @click="goBack" />
      <input
        type="text"
        class="nav-search"
        :placeholder="defaultSearchName"
        v-model="searchWord"
        @change="goSearchDetail(searchWord)"
        style="font-size:12px"
      />
    </div>
    <!-- 热搜选项展示 -->
    <div class="hots-show">
      <p class="hot-s">热搜:</p>
      <div class="hot-content">
        <!-- :class="[index % 2 == 0 ? 'fr' : 'fl']" -->
        <div
          class="hots-show-item fl"
          v-for="(item, index) in SearchList"
          :key="index"
          @click="goSearchDetail(item.first)"
        >
          <van-icon name="fire" class="hot-icon" />
          {{ item.first }}
        </div>
      </div>
    </div>
    <!-- 搜索内容展示 -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultSearchName: "",
      searchWord: "",
      SearchList: [],
    };
  },

  created() {
    this.getHotSearchName();
    this.getHotSearchList();
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
    //默认搜索关键字
    getHotSearchName() {
      this.axios("/search/default").then((sea) => {
        this.$toast.clear();
        this.defaultSearchName = sea.data.data.showKeyword;
      });
    },

    //输入搜索
    // Search() {
    //   this.axios("/search?type=100&keywords=" + this.searchWord).then((res) => {
    //     
    //   });
    // },

    //热搜词展示
    getHotSearchList() {
      this.axios("/search/hot").then((res) => {
        this.$toast.clear();
        this.SearchList = res.data.result.hots;
      });
    },

    //搜索详情
    goSearchDetail(w) {
      this.$router.push({ name: "SearchDetail", query: { w } });
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  height: 100vh;
  background-color: #1c1c1c;
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
    color: rgb(187, 187, 187);
    &:focus::-webkit-input-placeholder {
      color: transparent;
    }
  }
}
.hots-show {
  margin-top: 10px;
  width: 100%;
  .hot-s {
    padding: 2px 0 0 10px;
    color: red;
  }
  .hot-content {
    padding: 0 20px;
  }
  .hots-show-item {
    // min-width: 45%;
    color: rgb(194, 194, 194);
    text-align: left;
    background-color: rgba(122, 121, 121, 0.4);
    padding: 5px;
    border-radius: 5px;
    margin: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    .hot-icon {
      color: red;
    }
  }
}
</style>
