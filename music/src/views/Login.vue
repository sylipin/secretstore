<template>
  <div class="login">
    <img src="../assets/images/logo.png" />
    <h2 class="title">音乐</h2>
    <input
      type="text"
      class="phone-inp login-inp"
      placeholder="手机号码"
      maxlength="11"
      autocomplete="off"
      v-model="useLoginInfo.phone"
    />
    <div class="psd-container">
      <input
        :type="ispassword ? 'password' : 'text'"
        class="login-inp"
        placeholder="密码 "
        maxlength="16"
        autocomplete="off"
        v-model="useLoginInfo.password"
      />
      <van-icon
        :name="ispassword ? 'closed-eye' : 'eye-o'"
        class="psd-eye"
        @click="ispassword = !ispassword"
      />
    </div>
    <button class="login-btn" @click="login">登录</button>
    <button class="to-home-at-once" @click="goHomeAtonce">立即体验</button>
    <p>
      <span class="register-text" @click="showReg">注册</span
      ><span class="forget-pwd" @click="forgetPsd">忘记密码?</span>
    </p>

    <!-- 注册弹出层 -->
    <van-popup
      v-model="regshow"
      round
      position="bottom"
      :style="{ height: '60%' }"
    >
      <!-- 弹出层内容 -->
      <div class="register-container">
        <!-- <h2 class="register-title" @click="getaaa">注册</h2> -->
        <!-- <h2 @click="getvc">获取验证码</h2> -->

        <van-form>
          <van-field
            name="用户名"
            label="用户名"
            placeholder="用户名"
            v-model="useRegisterInfo.nickname"
            autocomplete="off"
          />
          <van-field
            v-model="useRegisterInfo.phone"
            name="手机号码"
            label="手机号码"
            placeholder="手机号码"
            autocomplete="off"
            maxlength="11"
          />
          <van-field
            v-model="useRegisterInfo.password"
            :type="ispassword ? 'password' : 'text'"
            name="密码"
            label="密码"
            placeholder="以字母开头6-16位"
            autocomplete="off"
            maxlength="16"
            :right-icon="ispassword ? 'closed-eye' : 'eye-o'"
            @click-right-icon="ispassword = !ispassword"
          />
          <div class="Verification-code">
            <span class="v-text">验证码</span>
            <input
              style="width:40px"
              class="verifcation-inp"
              placeholder="验证码"
              maxlength="4"
              autocomplete="off"
              v-model="useRegisterInfo.captcha"
            />
            <button
              class="get-verification-code-btn"
              @click="getverificationCode"
              :disabled="!showCountDown"
            >
              {{ showCountDown ? "获取验证码" : `${countDown}后获取` }}
            </button>
          </div>

          <div style="margin: 16px;">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              color="#ff0c46"
              @click="Register"
            >
              注册
            </van-button>
          </div>
        </van-form>
      </div>
    </van-popup>

    <!-- 弹出忘记密码 -->
    <van-popup
      v-model="psdshow"
      round
      position="bottom"
      :style="{ height: '60%' }"
    >
      <!-- 弹出层内容 -->
      <div class="register-container">
        <!-- <h2 class="register-title" @click="getaaa">找回密码</h2> -->
        <!-- <h2 @click="getvc">获取验证码</h2> -->
        <van-form>
          <van-field
            name="用户名"
            label="用户名"
            placeholder="用户名"
            v-model="useRegisterInfo.nickname"
            autocomplete="off"
          />
          <van-field
            v-model="useRegisterInfo.phone"
            name="手机号码"
            label="手机号码"
            placeholder="手机号码"
            autocomplete="off"
            maxlength="11"
          />
          <van-field
            v-model="useRegisterInfo.password"
            :type="ispassword ? 'password' : 'text'"
            name="密码"
            label="密码"
            placeholder="以字母开头6-16位"
            autocomplete="off"
            maxlength="16"
            :right-icon="ispassword ? 'closed-eye' : 'eye-o'"
            @click-right-icon="ispassword = !ispassword"
          />
          <div class="Verification-code">
            <span class="v-text">验证码</span>
            <input
              style="width:40px"
              class="verifcation-inp"
              placeholder="验证码"
              maxlength="4"
              autocomplete="off"
              v-model="useRegisterInfo.captcha"
            />
            <button
              class="get-verification-code-btn"
              @click="getcaptcha"
              :disabled="!showCountDown"
            >
              {{ showCountDown ? "获取验证码" : `${countDown}后获取` }}
            </button>
          </div>
          <div style="margin: 16px;">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              color="#ff0c46"
              @click="forgetPassword"
            >
              确认修改
            </van-button>
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { validForm } from "../assets/js/validForm";

export default {
  data() {
    return {
      useLoginInfo: {
        phone: "",
        password: "",
      },
      useRegisterInfo: {
        nickname: "",
        phone: "",
        password: "",
        captcha: "",
      },
      regshow: false,
      ispassword: true,
      countDown: "",
      showCountDown: true,
      timer: null,
      psdshow: false,
    };
  },

  methods: {
    //弹出注册框
    showReg() {
      this.regshow = true;
    },
    forgetPsd() {
      this.psdshow = true;
    },
    //立即体验
    goHomeAtonce() {
      this.$router.push({ name: "Home" });
    },

    //登录
    login() {
      this.$toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true,
      });
      let useInfo = this.useLoginInfo;
      let o = {
        phone: {
          value: useInfo.phone,
          reg: /^1[3-9]\d{9}$/,
          errorMsg: "手机号格式不正确",
        },

        password: {
          value: useInfo.password,
          reg: /^\w{6,16}$/,
          errorMsg: "密码格式不正确",
        },
      };
      //前端验证用户登录信息
      if (!validForm.valid(o)) {
        this.$toast.clear();
        return;
      } else {
        //拷贝,不影响原始数据
        // let info = Object.assign({}, useInfo);
        // let data = utils.queryString(info);
        this.axios(
          `/login/cellphone?phone=${this.useLoginInfo.phone}&password=${this.useLoginInfo.password}`
        )
          .then((res) => {
            this.$toast.clear();
            if (res.data.code === 502) {
              this.$toast(res.data.msg);
            } else if (res.data.code === 200) {
              let cookie = res.data.cookie;
              let uid = res.data.account.id;
              window.localStorage.setItem("musicToken", cookie);
              window.localStorage.setItem("uid", uid);
              this.$toast("登录成功 ");
              this.$router.replace({ name: "Home" });
            }
          })
          .catch((err) => {
            console.error(err);
            this.$toast.clear();
          });
      }
    },

    //注册
    Register() {
      let useInfo = this.useRegisterInfo;
      let o = {
        nickName: {
          value: useInfo.nickname,
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
          errorMsg: "昵称格式不正确",
        },

        phone: {
          value: useInfo.phone,
          reg: /^1[3-9]\d{9}$/,
          errorMsg: "手机号格式不正确",
        },

        password: {
          value: useInfo.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: "密码格式不正确",
        },
      };

      //前端验证用户注册信息
      if (!validForm.valid(o)) {
        return;
      }

      //验证验证码
      if (this.useRegisterInfo.phone && this.useRegisterInfo.password) {
        this.axios(
          "/cellphone/existence/check?phone=" + this.useRegisterInfo.phone
        ).then((res) => {
          if (res.data.exist === 1 && res.data.code === 200) {
            this.$toast("账号已存在");
            return;
          }
          if (res.data.exist === -1 && res.data.code === 200) {
            //验证验证码
            this.axios(
              `/captcha/verify?phone=${this.useRegisterInfo.phone}&captcha=${this.useRegisterInfo.captcha}`
            ).then((res) => {
              if (res.data.code === 200) {
                this.axios(
                  `/register/cellphone?phone=${this.useRegisterInfo.phone}&password=${this.useRegisterInfo.password}&captcha=${this.useRegisterInfo.captcha}&nickname=${this.useRegisterInfo.nickname}`
                );
              } else {
                this.$toast("验证码错误");
              }
            });
          }
        });
      }
    },

    //注册获取验证码
    getverificationCode() {
      let reg = /^1[3-9]\d{9}$/;
      let phone = this.useRegisterInfo.phone;

      //前端验证手机号码是否正确,避免给后端造成压力
      if (!reg.test(phone)) {
        this.$toast("手机格式不正确");
        return;
      }

      if (this.useRegisterInfo.phone) {
        this.axios(
          "cellphone/existence/check?phone=" + this.useRegisterInfo.phone
        ).then((res) => {
          // 
          if (res.data.exist === 1 && res.data.code === 200) {
            this.$toast("账号已存在");
            return;
          }
          if (res.data.exist === -1 && res.data.code === 200) {
            //验证码倒计时
            const TIME_COUNT = 60;
            if (!this.timer) {
              this.countDown = TIME_COUNT;
              this.showCountDown = false;
              this.timer = setInterval(() => {
                if (this.countDown > 0 && this.countDown <= TIME_COUNT) {
                  this.countDown--;
                } else {
                  this.showCountDown = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
            this.$toast("验证码发送成功");
            //如果账号不存在即发送验证码
            this.axios("/captcha/sent?phone=" + this.useRegisterInfo.phone);
          }
        });
      }
    },

    //忘记密码获取验证码
    getcaptcha() {
      let reg = /^1[3-9]\d{9}$/;
      let phone = this.useRegisterInfo.phone;
      //前端验证手机号码是否正确,避免给后端造成压力
      if (!reg.test(phone)) {
        this.$toast("手机格式不正确");
        return;
      }
      if (this.useRegisterInfo.phone) {
        //验证码倒计时
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.countDown = TIME_COUNT;
          this.showCountDown = false;
          this.timer = setInterval(() => {
            if (this.countDown > 0 && this.countDown <= TIME_COUNT) {
              this.countDown--;
            } else {
              this.showCountDown = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        this.axios("/captcha/sent?phone=" + this.useRegisterInfo.phone).then(
          (res) => {
            if (res.data.code === 200) {
              this.$toast("发送成功");
            }
          }
        );
      }
    },
    //修改密码
    forgetPassword() {
      let useInfo = this.useRegisterInfo;
      let o = {
        nickName: {
          value: useInfo.nickname,
          reg: /^[\w\u4e00-\u9fa5]{1,10}$/,
          errorMsg: "昵称格式不正确",
        },

        phone: {
          value: useInfo.phone,
          reg: /^1[3-9]\d{9}$/,
          errorMsg: "手机号格式不正确",
        },

        password: {
          value: useInfo.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: "密码格式不正确",
        },
      };

      //前端验证用户注册信息
      if (!validForm.valid(o)) {
        return;
      }

      if (this.useRegisterInfo.phone && this.useRegisterInfo.password) {
        //验证验证码
        this.axios(
          `/captcha/verify?phone=${this.useRegisterInfo.phone}&captcha=${this.useRegisterInfo.captcha}`
        ).then((res) => {
          if (res.data.code === 200) {
            // this.$toast.loading({
            //   duration: 0,
            //   message: "加载中...",
            //   forbidClick: true,
            // });
            this.axios(
              `/register/cellphone?phone=${this.useRegisterInfo.phone}&password=${this.useRegisterInfo.password}&captcha=${this.useRegisterInfo.captcha}&nickname=${this.useRegisterInfo.nickname}`
            )
            // .then((res)=>{
            //   
            //   if(res) {
            //     this.$toast('修改成功');;
            //   }
            // this.$router.go(0);
            // });
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  text-align: center;
  padding: 60px 60px;
  background-color: #1c1c1c;
}

img {
  display: block;
  margin: 0 auto;
  width: 64px;
  height: 64px;
  margin-top: 50px;
}

/* input 框获取焦点隐藏placeholder文字提示 */
input {
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }
}

.to-home-at-once {
  width: 100%;
  height: 30px;
  border-radius: 30px;
  margin-top: 20px;
  border: 0;
  background-color: #000000;
  line-height: 30px;
  font-weight: 400;
  font-size: 12px;
  padding: 0;
  color: #fff;
  outline: 0;
}
.title {
  margin-top: 16px;
  color: #fff;
}

.login-inp {
  width: 100%;
  height: 40px;
  text-align: center;
  border-radius: 40px;
  margin-top: 20px;
  border: 0;
  background-color: #0d0d0d;
  line-height: 40px;
  font-size: 12px;
  font-weight: 400;
  padding: 0;
  color: #615f60;
  outline: 0;
}

.phone-inp {
  margin-top: 100px;
}

.login-btn {
  width: 100%;
  height: 40px;
  border-radius: 40px;
  margin-top: 20px;
  border: 0;
  background-color: #ff0c46;
  line-height: 40px;
  font-weight: 700;
  padding: 0;
  color: #fff;
  outline: 0;
}

p {
  width: 100%;
  padding: 12px 8px;
  font-size: 12px;
  color: #615f60;

  .register-text {
    float: left;
  }

  .forget-pwd {
    float: right;
  }
}

.register-container {
  padding: 20px;
  .register-title {
    font-size: 24px;
    font-weight: 700;
    text-align: left;
    margin-bottom: 10px;
  }
}

.Verification-code {
  display: flex;
  text-align: left;
  padding: 10px 16px;
  font-size: inherit;
  color: #646566;

  .v-text {
    display: inline-block;
    margin-right: 12px;
    width: 86.8px;
    height: 24px;
    line-height: 24px;
  }

  .verifcation-inp {
    box-sizing: border-box;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: #323233;
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    flex: 1;
    resize: none;
  }

  .get-verification-code-btn {
    float: right;
    font-size: 12px;
    outline: 0;
    border: 0;
    flex: 1;
    border-radius: 10px;
    width: 40px;
  }
}
.psd-container {
  position: relative;
  .psd-eye {
    position: absolute;
    right: 12px;
    top: 34px;
    color: #646566;
  }
}
</style>
