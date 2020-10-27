<template>
  <div class="Fan">
   <h2 class="Fan-title">我的粉丝</h2>
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
.Fan {
  background-color: #1c1c1c;
  height: 100vh;
  position: relative;
  .Fan-title {
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
