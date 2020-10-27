<template>
  <div class="my">
    <div class="my-bg" :style="{ backgroundImage: `url(${userInfo.userBg})` }">
      <van-uploader v-if="isLogin" class="uploader-box" :after-read="upload" />
    </div>
    <div class="my-content">
      <div class="my-boxing">
        <div v-if="isLogin" class="my-box">
          <div class="my-img">
            <div class="img-box" :style="{ backgroundImage: `url(${userInfo.userImg})` }">
              <van-uploader
                v-if="isLogin"
                class="uploader-box"
                :after-read="uploadAva"
              />
            </div>
            <div class="my-info">
              <div class="nickname">{{ userInfo.nickName }}</div>
              <div class="desc">
                {{
                  userInfo.desc == ""
                    ? "这个家伙很懒，什么都没留下"
                    : userInfo.desc
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="not-login" v-else  @click="goLogin">
          <div class="img-box"><img src="../../assets/imgs/defaultata.jpg" alt="" class="auto-img"></div>
          <span>请先登录</span>
        </div>

        <div class="lists">
          <van-cell
            :icon="item.icon"
            :title="item.title"
            :to="item.to"
            size="large"
            is-link
            v-for="(item, index) in lists"
            :key="index"
          />
        </div>
        <!-- <div class="LogOut"><van-icon name="question-o" />退出登录<van-icon name="arrow" /></div> -->
        <van-cell
          class="LogOut"
          icon="question-o"
          title="退出登录"
          size="large"
          is-link
          @click="LogOut"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "../../assets/less/my.less";
import { utils } from "../../assets/js/utils";
import { Dialog } from "vant";
export default {
  data() {
    return {
      lists: [
        { title: "个人资料", to: { name: "Account" }, icon: "user-o" },
        { title: "我的订单", to: { name: "Order" }, icon: "shopping-cart-o" },
        { title: "我的收藏", to: { name: "Like" }, icon: "like-o" },
        { title: "收货地址", to: { name: "Address" }, icon: "location-o" },
        { title: "安全中心", to: { name: "Secure" }, icon: "bulb-o" },
      ],
      isLogin: false,
      userInfo: {},
      maxSize: 1 * 1024 * 1024,
    };
  },

  created() {
    this.getUserInfo();
  },

  methods: {
    //跳转到登录页面
    goLogin() {
      this.$router.push({ name: "Login" });
    },

    //查询用户信息
    getUserInfo() {
      //获取token字符串
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "GET",
        url: "/findMy",
        params: {
          appkey: this.appkey,
          tokenString,
        },
      })
        .then((result) => {
          this.$toast.clear();

          if (result.data.code == "A001") {
            if (result.data.result.length > 0) {
              this.isLogin = true;
              this.userInfo = result.data.result[0];
            }
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    uploadAva(file) {
      //获取token字符串
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }

      //获取文件类型
      let type = file.file.type.split("/")[1]; //切割images/type
      let imgTypes = ["png", "gif", "jpg", "jpeg"];
      if (imgTypes.indexOf(type) === -1) {
        this.$notify({
          message: "图片类型只支持" + imgTypes.join(","),
          color: "#fff",
          background: "#0C34BA",
        });

        return;
      }

      //大小
      if (this.maxSize < file.file.size) {
        this.$notify({
          message: "上传文件大小不能超过" + this.maxSize / 1024 + "KB",
          color: "#fff",
          background: "#0C34BA",
        });
        return;
      }

      //

      //获取base64
      let base64 = file.content.replace(/data:image\/[A-Za-z]+;base64,/, "");

      //参数序列化
      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        imgType: type,
        serverBase64Img: base64,
      });

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "POST",
        url: "/updateAvatar",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          if (result.data.code == "H001") {
            this.userInfo.userImg = result.data.userImg;
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
    //上传背景
    upload(file) {
      //获取token字符串
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        return;
      }

      //获取文件类型
      let type = file.file.type.split("/")[1]; //切割images/type
      let imgTypes = ["png", "gif", "jpg", "jpeg"];
      if (imgTypes.indexOf(type) === -1) {
        this.$notify({
          message: "图片类型只支持" + imgTypes.join(","),
          color: "#fff",
          background: "#0C34BA",
        });

        return;
      }

      //大小
      if (this.maxSize < file.file.size) {
        this.$notify({
          message: "上传文件大小不能超过" + this.maxSize / 1024 + "KB",
          color: "#fff",
          background: "#0C34BA",
        });
        return;
      }

      //

      //获取base64
      let base64 = file.content.replace(/data:image\/[A-Za-z]+;base64,/, "");

      //参数序列化
      let data = utils.queryString({
        appkey: this.appkey,
        tokenString,
        imgType: type,
        serverBase64Img: base64,
      });

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      this.axios({
        method: "POST",
        url: "/updateUserBg",
        data,
      })
        .then((result) => {
          this.$toast.clear();

          if (result.data.code == "I001") {
            this.userInfo.userBg = result.data.userBg;
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },

    //退出登录
    LogOut() {
      let tokenString = localStorage.getItem("CSTK");
      if (!tokenString) {
        setTimeout(() => {
          this.$router.push({ name: "Login" });
        }, 1000);
        return;
      } else {
        Dialog.confirm({
          message: "确认退去登录",
        }).then(() => {
          localStorage.removeItem("CSTK");
          this.$router.go(0);
          instance.close();
        });
      }
    },
  },
};
</script>
