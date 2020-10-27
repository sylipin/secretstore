<template>
  <div class="my">
      <van-icon name="arrow-left" class="left-icon" @click="goback" />
    <div
      class="head-bg"
      :style="{ backgroundImage: `url(${userBgUrl})` }"
      @click="showBg = !showBg"
    >
      <div class="personal-data">
        <div class="personal-ava">
          <img
            :src="userAvaL"
            alt=""
            class="auto-img"
            @click.stop="showAva = !showAva"
          />
        </div>
        <h2 class="user-name">{{ userNickName }}</h2>
        <div class="user-fan">
          <span><span @click="goConcern">关注<span class="epblock" />{{ concernNumber}}</span><span
              ><span class="epblock" />|<span @click="goFan"><span class="epblock" />粉丝<span
                class="epblock"
              />{{ fanCount }}</span></span
            ></span
          >
        </div>
        <div class="user-vip">
          <div class="isVip" :class="[vipType == 0 ? 'is-orno-vip' : '']">
            vip
          </div>
          <div class="userLevel">Lv.{{ userLevel }}</div>
          <div class="userAge">{{ birthdayFormat }}</div>
        </div>
      </div>
    </div>

    <!-- 头像展示 -->
    <van-image-preview v-model="showAva" :images="[userAvaL]" />
    <van-image-preview v-model="showBg" :images="[userBgUrl]" />
    <!-- 用户信息展示 -->
    <div class="user-info">
      <div class="display-content">
        <van-tabs
          animated
          background="#1c1c1c"
          v-model="active"
          :sticky="true"
          :swipeable="true"
          title-active-color="#ee0a24"
        >
          <van-tab title="主页">
            <div class="home-content">
              <div class="item-list">
                <div class="home-content-img">
                  <img :src="recentlyImg" alt="" class="auto-img" />
                </div>
                <div class="list-text">
                  最近播放
                  <div class="list-text-sm">累计播放{{ allPlayCount }}首</div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="动态"></van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid: this.$store.state.uid,
      userBgUrl: "",
      userAvaL: "",
      userNickName: "",
      userLevel: null,
      vipType: "",
      birthday: null,
      concernNumber: 0,
      fanCount: 0,
      showAva: false,
      showBg: false,
      active: 0,
      recentlyImg: require("../assets/images/recently.png"),
      allPlayCount: 0,
    };
  },

  created() {
    this.getUserInfo();
    this.getUserConcern();
    this.getUserFan();
    // this.getUserrecord();
  },
  methods: {
    getUserInfo() {
      this.axios(`/user/detail?uid=${this.userid}`).then((res) => {
        // 
        this.userBgUrl = res.data.profile.backgroundUrl;
        this.userAvaL = res.data.profile.avatarUrl;
        this.userNickName = res.data.profile.nickname;
        this.userLevel = res.data.level;
        this.vipType = res.data.profile.vipType;
        this.birthday = res.data.profile.birthday;
        this.allPlayCount = res.data.listenSongs;
      });
    },
    goback() {
      this.$router.go(-1);
    },
    goConcern(){
      this.$router.push({name:"Concern"});
    },
    goFan(){
      this.$router.push({name:"Fan"});
    },
    getUserConcern() {
      this.axios(`user/follows?uid=${this.userid}`).then((res) => {
        this.concernNumber = res.data.follow.length;
      });
    },

    getUserFan() {
      this.axios(`/user/followeds?uid=${this.userid}`).then((res) => {
        // 
        this.fanCount = res.data.followeds.length;
      });
    },

    //获取用户最近播放
    // getUserrecord() {
    //   this.axios(`/user/record?uid=${this.userid}&type=1`).then((res) => {
    //     
    //   });
    // },
  },

  computed: {
    birthdayFormat() {
      let data = new Date(this.birthday);
      let year = data
        .getFullYear()
        .toString()
        .substr(2, 1);
      return year + "0后";
    },
  },
};
</script>

<style lang="scss" scoped>
.my {
  height: 100vh;
  position: relative;
}
.left-icon {
  position: absolute;
  left: 10px;
  top: 20px;
  z-index: 3;
  font-size: 16px;
  color: #fff;
}
.head-bg {
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  position: relative;
  height: 300px;
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
}
.personal-data {
  position: absolute;
  z-index: 99;
  width: 100%;

  left: 20px;
  bottom: 40px;
  .personal-ava {
    width: 60px;
    height: 60px;
    img {
      border-radius: 50%;
    }
  }
  .user-name {
    color: #fff;
    margin-top: 15px;
    font-size: 18px;
  }
  .user-fan {
    font-size: 12px;
    color: #ddd;
    margin-top: 5px;
  }
  .user-vip {
    font-size: 12px;
    margin-top: 10px;
    .isVip {
      display: inline-block;
      background-color: #ff0c46;
      padding: 4px 10px;
      border-radius: 18px;
      color: #fff;
    }
    .userLevel,
    .userAge {
      margin-left: 5px;
      display: inline-block;
      background-color: rgba(153, 153, 153, 0.4);
      padding: 4px 10px;
      border-radius: 18px;
      color: #fff;
    }
  }
  .is-orno-vip {
    opacity: 0.3;
  }
}
.user-info {
  background-color: #1c1c1c;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: relative;
  transform: translateY(-20px);
  height: calc(100% - 280px);
  z-index: 99;
  padding: 0 10px;
}
.item-list {
  display: flex;
  align-items: center;
  .list-text {
    margin-left: 20px;
    .list-text-sm {
      font-size: 12px;
      padding-top: 5px;
      color: rgba(170, 170, 170, 0.4);
    }
  }
}
.home-content {
  margin-top: 15px;
  color: #fff;
  .home-content-img {
    width: 40px;
    height: 40px;
    background-image: linear-gradient(to left top, #ff0099, #e03030);
    border-radius: 8px;
    padding: 5px;
  }
}
</style>
