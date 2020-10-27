<template>
  <div class="login">
    <div class="login-box">
      <van-nav-bar right-text="关闭" @click-right="goHome">
        <template #left>
          <div class="left-text">
            <div class="logo"></div>
            <div class="logo-title">Coffee</div>
          </div>
        </template>

        <template #right>
          <div><van-icon name="weapp-nav" /></div>
        </template>
      </van-nav-bar>

      <div class="login-form">
        <div class="title">欢迎回来!</div>
        <div class="en-title">Please login to your accounts</div>

        <!--登录界面-->
        <div>
          <van-form>
            <div class="password-registered">
              <van-field
                name="手机号码"
                label="手机号码"
                placeholder="请输入手机号码"
                v-model="useLoginInfo.phone"
                autocomplete="off"
              />
              <van-field
                v-model="useLoginInfo.password"
                :type="isPassword ? 'password' : 'text'"
                name="密码"
                label="密码"
                placeholder="请输入密码"
                :right-icon="isPassword ? 'closed-eye' : 'eye-o'"
                @click-right-icon="viewPassword()"
              />
            </div>

            <div class="clearfix forgot">
              <span class="fr" @click="goPage('Forgot')">忘记密码?</span>
            </div>

            <div style="margin: 16px;">
              <van-button
                @click="login"
                round
                block
                type="info"
                native-type="submit"
                class="login-btn"
              >
                登&nbsp;&nbsp;&nbsp;录
              </van-button>

              <!-- 注册按钮 -->
              <van-button
                round
                block
                class="registered-btn login-btn"
                @click="openRegister"
                >注册</van-button
              >
            </div>
          </van-form>
        </div>
      </div>
    </div>

    <!-- 注册登录弹出 -->
    <van-popup
      v-model="isRegister"
      position="bottom"
      :style="{ height: '60%' }"
      round
      closeable
    >
      <div class="popup-item">
        <div class="register-text">注册</div>
        <van-form>
          <div>
            <van-field
              name="手机号"
              label="手机号"
              placeholder="请输入11位手机号"
              v-model="useRegisterInfo.phone"
            />
            <van-field
              label="昵称"
              placeholder="1-10位昵称"
              v-model="useRegisterInfo.nickName"
            />
            <van-field
              v-model="useRegisterInfo.password"
              :type="isPassword ? 'password' : 'text'"
              name="密码"
              label="密码"
              placeholder="6~16位密码"
              :right-icon="isPassword ? 'closed-eye' : 'eye-o'"
              @click-right-icon="viewPassword()"
            />
          </div>

          <div style="margin: 16px;">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              @click="register"
            >
              注&nbsp;&nbsp;&nbsp;册
            </van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
import "../assets/less/login.less";
import { validForm } from "../assets/js/validForm";
import { utils } from "../assets/js/utils";
export default {
  data() {
    return {
      useLoginInfo: {
        phone: "",
        password: "",
      },

      useRegisterInfo: {
        phone: "",
        nickName: "",
        password: "",
      },
      show: false,
      isPassword: true,
      isRegister: false,
    };
  },
  methods: {
    
     goPage(name) {
      this.$router.push({name});
    },
    //跳转到首页
    goHome() {
      // this.$router.push({name:'home'})
      this.$router.push({ name: "Home" });

    },

    //查看密码切换
    viewPassword() {
     
      this.isPassword = !this.isPassword;
    },

    //弹出注册框
    openRegister() {
      this.isRegister = true;
    },

    //注册
    register() {
      //用户注册信息
      let userInfo = this.useRegisterInfo;
      
      let o = {
        phone: {
          value: userInfo.phone,
          reg: /^1[3-9]\d{9}$/,
          errorMsg: "手机号格式不正确",
        },
        nickName: {
          value: userInfo.nickName,
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
          errorMsg: "昵称格式不正确",
        },
        password: {
          value: userInfo.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: "密码格式不正确",
        },
      };

      
      if (!validForm.valid(o)) {
        //验证不通过
        return;
      }

      this.$toast.loading({
        message: "加载中...",
        //防止穿透
        forbidClick: true,

        //显示时间, 如果时间为0，则不会自动关闭
        duration: 0,

        loadingType: "spinner",
      });

      //拷贝一份,不影响原始数据
      let info = Object.assign({}, userInfo);
      
      
      info.appkey = this.appkey;
      

      //序列化参数
      let data = utils.queryString(info);
      
      this.axios({
        method: "POST",
        url: "/register",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          
          //如果注册成功
          if (result.data.code == 100) {
            this.isRegister = false;
            //注册成功是清空注册表单的数据
            for (let key in userInfo) {
              userInfo[key] = "";
            }
          } else {
            //如果注册失败,则提示
            this.$notify({
              type: "warning",
              message: result.data.msg,
            });
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    //登录
    login() {
      let userInfo = this.useLoginInfo;
      
      let o = {
        phone: {
          value: userInfo.phone,
          reg: /^1[3-9]\d{9}$/,
          errorMsg: "手机号格式不正确",
        },
        password: {
          value: userInfo.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: "密码格式不正确",
        },
      };

      if (!validForm.valid(o)) {
        return;
      }

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });

      let info = Object.assign({}, userInfo);
      info.appkey = this.appkey;
      let data = utils.queryString(info);

      this.axios({
        method: "POST",
        url: "/login",
        data,
      })
        .then((result) => {
          this.$toast.clear();
          
          if (result.data.code == 200) {
            localStorage.setItem("CSTK", result.data.token);
            this.$router.push({ name: "Home" });
          } else {
            this.$notify({
              type: "warning",
              message: result.data.msg,
            });
          }
        })
        .catch((err) => {
          this.$toast.clear();
        });
    },
  },
};
</script>
