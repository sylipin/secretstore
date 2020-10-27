<template>
  <div class="search">
    <div>
      <van-nav-bar
        title="搜索页"
        left-text="返回"
        left-arrow
        :fixed="true"
        @click-left="back"
      />
    </div>

    <div class="search-search">
      <van-search
        placeholder="请输入商品名称"
        shape="round"
        v-model="searchValue"
        @input="getSearchProductByPid"
      />
      <ul class="searchResult" v-if="isShow">
        <li
          v-for="(item, index) in nameData"
          :key="index"
          @click="viewProductInfo(item.pid)"
        >
          <van-icon name="search" />&nbsp;&nbsp;&nbsp;{{ item.name }}
        </li>
      </ul>
      <ul class="searchResult" v-if="!isShow">
        <li>
          无该商品
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import "../assets/less/search.less";
export default {
  data() {
    return {
      searchValue: "",
      searchData: [],
      nameData: [],
      isShow: true,
    };
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
    getSearchProductByPid() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/search",
        params: {
          appkey: this.appkey,
          name: this.searchValue,
        },
      }).then((result) => {
        if (result.data.result.length < 1) {
          this.nameData = [];
          this.isShow = false;
        }
        this.$toast.clear();
        //
        this.nameData = [];

        if (this.searchValue == "") {
          this.nameData = [];
          this.isShow = false;
        }

        for (let i = 0; i < result.data.result.length; i++) {
          if (result.data.result[i].name.search(this.searchValue) != -1) {
            this.isShow = true;
            this.nameData.push(result.data.result[i]);
          }
        }
      });
    },

    viewProductInfo(pid) {
      this.$router.push({ name: "Detail", query: { pid } });
    },
  },
};
</script>
