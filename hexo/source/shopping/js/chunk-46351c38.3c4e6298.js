(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-46351c38"],{"0fdf":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"forgot-box"},[n("div",{staticClass:"login-box"},[n("van-nav-bar",{on:{"click-right":function(t){return e.goPage("Home")}},scopedSlots:e._u([{key:"left",fn:function(){return[n("div",{staticClass:"left-text"},[n("div",{staticClass:"logo"},[n("img",{staticClass:"auto-img",attrs:{src:a("ede7"),alt:""}})]),n("div",{staticClass:"logo-title"},[e._v("Luckin Coffee")])])]},proxy:!0},{key:"right",fn:function(){return[n("div",{staticClass:"close-box"},[e._v("先逛一逛")])]},proxy:!0}])}),n("div",{staticClass:"login-form"},[n("div",{staticClass:"title"},[e._v("忘记密码!")]),n("div",{staticClass:"en-title"},[e._v("forgot password!")]),n("div",{staticClass:"login-form-box"},[n("van-form",[n("van-field",{attrs:{label:"手机号",placeholder:"手机号"},model:{value:e.userInfo.phone,callback:function(t){e.$set(e.userInfo,"phone",t)},expression:"userInfo.phone"}}),n("van-field",{attrs:{label:"密码",placeholder:"密码",type:e.isPassword?"password":"text","right-icon":e.isPassword?"closed-eye":"eye-o"},on:{"click-right-icon":e.viewPassword},model:{value:e.userInfo.password,callback:function(t){e.$set(e.userInfo,"password",t)},expression:"userInfo.password"}}),n("van-field",{attrs:{label:"邮箱",placeholder:"邮箱"},model:{value:e.userInfo.email,callback:function(t){e.$set(e.userInfo,"email",t)},expression:"userInfo.email"}}),n("van-field",{attrs:{center:"",clearable:"",label:"邮箱验证码",placeholder:"请输入邮箱验证码"},scopedSlots:e._u([{key:"button",fn:function(){return[n("van-button",{attrs:{size:"small",color:"#0C34BA",disabled:e.isSend},on:{click:e.sendValidCode}},[e._v(e._s(e.text))])]},proxy:!0}]),model:{value:e.userInfo.validCode,callback:function(t){e.$set(e.userInfo,"validCode",t)},expression:"userInfo.validCode"}}),n("div",{staticClass:"clearfix forgot"},[n("span",{staticClass:"fr",on:{click:function(t){return e.goPage("Login")}}},[e._v("已有账号，立即登录")])]),n("div",{staticClass:"login-btn"},[n("van-button",{attrs:{round:"",block:"","native-type":"submit",color:"#0C34BA"},on:{click:e.commit}},[e._v("提 交")])],1)],1)],1)])],1)])},o=[],i=(a("8f46"),a("e3a8")),s=a("2f14"),r={data:function(){return{isPassword:!0,userInfo:{phone:"",password:"",email:"",validCode:""},text:"发送验证码",isSend:!1}},methods:{goPage:function(e){this.$router.push({name:e})},viewPassword:function(){this.isPassword=!this.isPassword},sendValidCode:function(){var e=this,t=5;this.text=t+"s后重新发送",this.isSend=!0;var a=setInterval((function(){0==t?(clearInterval(a),e.isSend=!1,e.text="发送验证码"):(t--,e.text=t+"s后重新发送")}),1e3);this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0,loadingType:"spinner"});var n=s["a"].queryString({email:this.userInfo.email,appkey:this.appkey});this.axios({method:"POST",url:"/emailValidCode",data:n}).then((function(t){e.$toast.clear(),e.$notify({type:"warning",message:t.data.msg})})).catch((function(t){e.$toast.clear()}))},commit:function(){var e=this,t={phone:{value:this.userInfo.phone,reg:/^1[3-9]\d{9}$/,errorMsg:"手机号格式不正确"},password:{value:this.userInfo.password,reg:/^[A-Za-z]\w{5,15}$/,errorMsg:"密码支持字母数字_组合"},email:{value:this.userInfo.email,reg:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,errorMsg:"邮箱格式不正确"},validCode:{value:this.userInfo.validCode,reg:/^\d{6}$/,errorMsg:"验证为6位数字"}};if(i["a"].valid(t)){this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0,loadingType:"spinner"});var a=s["a"].queryString({validCode:this.userInfo.validCode,appkey:this.appkey});this.axios({method:"POST",url:"/checkValidCode",data:a}).then((function(t){e.$toast.clear(),"K001"==t.data.code?e.updatePassword():e.$notify({type:"warning",message:t.data.msg})})).catch((function(t){e.$toast.clear()}))}},updatePassword:function(){var e=this;this.$toast.loading({message:"加载中...",forbidClick:!0,duration:0,loadingType:"spinner"});var t=s["a"].queryString({phone:this.userInfo.phone,password:this.userInfo.password,appkey:this.appkey});this.axios({method:"POST",url:"/retrievePassword",data:t}).then((function(t){e.$toast.clear(),"L001"==t.data.code?e.$router.push({name:"Login"}):e.$toast(t.data.msg)})).catch((function(t){e.$toast.clear()}))}}},c=r,l=a("2877"),u=Object(l["a"])(c,n,o,!1,null,"62ab9407",null);t["default"]=u.exports},"2f14":function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));a("99af"),a("fb6a");var n=a("d4ec"),o=a("bee2"),i=function(){function e(){Object(n["a"])(this,e)}return Object(o["a"])(e,[{key:"queryString",value:function(e){var t="";for(var a in e)t+="".concat(a,"=").concat(e[a],"&");return t.slice(0,-1)}}]),e}(),s=new i},"8f46":function(e,t,a){},"99af":function(e,t,a){"use strict";var n=a("23e7"),o=a("d039"),i=a("e8b5"),s=a("861d"),r=a("7b0b"),c=a("50c4"),l=a("8418"),u=a("65f0"),d=a("1dde"),f=a("b622"),v=a("2d00"),p=f("isConcatSpreadable"),g=9007199254740991,h="Maximum allowed index exceeded",A=v>=51||!o((function(){var e=[];return e[p]=!1,e.concat()[0]!==e})),b=d("concat"),w=function(e){if(!s(e))return!1;var t=e[p];return void 0!==t?!!t:i(e)},C=!A||!b;n({target:"Array",proto:!0,forced:C},{concat:function(e){var t,a,n,o,i,s=r(this),d=u(s,0),f=0;for(t=-1,n=arguments.length;t<n;t++)if(i=-1===t?s:arguments[t],w(i)){if(o=c(i.length),f+o>g)throw TypeError(h);for(a=0;a<o;a++,f++)a in i&&l(d,f,i[a])}else{if(f>=g)throw TypeError(h);l(d,f++,i)}return d.length=f,d}})},bee2:function(e,t,a){"use strict";function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function o(e,t,a){return t&&n(e.prototype,t),a&&n(e,a),e}a.d(t,"a",(function(){return o}))},d4ec:function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}a.d(t,"a",(function(){return n}))},e3a8:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a("d4ec"),o=a("bee2"),i=(a("748b"),a("0860")),s=a("2b0e");s["a"].use(i["a"]);var r=function(){function e(){Object(n["a"])(this,e)}return Object(o["a"])(e,[{key:"valid",value:function(e){for(var t in e)if(!e[t].reg.test(e[t].value))return Object(i["a"])({type:"warning",message:e[t].errorMsg}),!1;return!0}}]),e}(),c=new r},ede7:function(e,t){e.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=chunk-46351c38.3c4e6298.js.map