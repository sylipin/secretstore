<template>
  <div class="main">
    <keep-alive include="Home,Menu">
    <router-view />
    </keep-alive>

    <van-tabbar route v-model="active"  active-color='#13227a'>
      <van-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :to="item.url"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      tabbarData: [
        {
          title: "首页",
          icon: {
            active: require("../assets/imgs/inhome.png"),
            inactive: require("../assets/imgs/home.png"),
          },
          url: {
            name: "Home",
          },
        },
        {
          title: "菜单",
          icon: {
            active: require("../assets/imgs/inmenu.png"),
            inactive: require("../assets/imgs/menu.png"),
          },
          url: {
            name: "Menu",
          },
        },
        {
          title: "购物袋",
          icon: {
            active: require("../assets/imgs/inshopbag.png"),
            inactive: require("../assets/imgs/shopbag.png"),
          },
          url: {
            name: "Shopbag",
          },
        },
        {
          title: "我的",
          icon: {
            active: require("../assets/imgs/inmy.png"),
            inactive: require("../assets/imgs/my.png"),
          },
          url: {
            name: "My",
          },
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
