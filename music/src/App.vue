<template>
  <div id="app">
      <MinPlay v-show="!$route.meta.keepAlive"></MinPlay>
    <keep-alive include="SongSheet DailyRecommend">
      <router-view ></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MinPlay from "./components/MinPlay";
export default {
  components: {
    MinPlay,
  },
};
</script>

<style lang="scss">
#app {
  background-color: #1c1c1c;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.epblock{
  padding: 0 3px;
}
.auto-img {
  width: 100%;
  display: block;
}
.out-play {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  height: 30px;
  width: 30px;
}
</style>
