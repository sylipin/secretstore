<template>
  <div class="concern">
    <h2 class="concern-title">我的关注</h2>
    <van-icon name="arrow-left" class="left-icon" @click="goback" />
  </div>
</template>

<script>
export default {
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.concern {
  background-color: #1c1c1c;
  height: 100vh;
  position: relative;
  .concern-title {
    padding-top: 20px;
    text-align: center;
    color: #fff;
    font-size: 16px;
  }
}

.left-icon {
  position: absolute;
  left: 10px;
  top: 20px;
  z-index: 3;
  font-size: 16px;
  color: #fff;
}
</style>
