(function(e){function n(n){for(var a,c,o=n[0],i=n[1],f=n[2],h=0,d=[];h<o.length;h++)c=o[h],Object.prototype.hasOwnProperty.call(u,c)&&u[c]&&d.push(u[c][0]),u[c]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);s&&s(n);while(d.length)d.shift()();return r.push.apply(r,f||[]),t()}function t(){for(var e,n=0;n<r.length;n++){for(var t=r[n],a=!0,c=1;c<t.length;c++){var o=t[c];0!==u[o]&&(a=!1)}a&&(r.splice(n--,1),e=i(i.s=t[0]))}return e}var a={},c={app:0},u={app:0},r=[];function o(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-00ed6a6c":"6e80291d","chunk-09200c5a":"9bc64d74","chunk-161a2462":"8de86d32","chunk-2731020d":"a0b3ec3c","chunk-2e7b3d9b":"9fb30cd1","chunk-3010b999":"90b28377","chunk-4044a5ac":"8e9b5d7f","chunk-46351c38":"3c4e6298","chunk-63794ad6":"1982e6fb","chunk-664fe55a":"1aa99938","chunk-693bb9b2":"1d867cb2","chunk-795a61bf":"7d156084","chunk-b1ac7e7a":"1a9c48f3","chunk-e39eac3a":"0f27f786","chunk-f7e8d510":"1013731b","chunk-fbc5ea88":"c1763ba3"}[e]+".js"}function i(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-00ed6a6c":1,"chunk-09200c5a":1,"chunk-161a2462":1,"chunk-2e7b3d9b":1,"chunk-3010b999":1,"chunk-4044a5ac":1,"chunk-46351c38":1,"chunk-63794ad6":1,"chunk-664fe55a":1,"chunk-693bb9b2":1,"chunk-795a61bf":1,"chunk-b1ac7e7a":1,"chunk-e39eac3a":1,"chunk-f7e8d510":1,"chunk-fbc5ea88":1};c[e]?n.push(c[e]):0!==c[e]&&t[e]&&n.push(c[e]=new Promise((function(n,t){for(var a="css/"+({}[e]||e)+"."+{"chunk-00ed6a6c":"e8f244c2","chunk-09200c5a":"91201d90","chunk-161a2462":"64733a9a","chunk-2731020d":"31d6cfe0","chunk-2e7b3d9b":"7e7ad228","chunk-3010b999":"88b5ee3e","chunk-4044a5ac":"a9a36512","chunk-46351c38":"b20c4a1f","chunk-63794ad6":"eb1c7cfb","chunk-664fe55a":"d3f23cf3","chunk-693bb9b2":"2a1c90a2","chunk-795a61bf":"434c0bb7","chunk-b1ac7e7a":"1f419c87","chunk-e39eac3a":"de487e55","chunk-f7e8d510":"6a4c0711","chunk-fbc5ea88":"8853211c"}[e]+".css",u=i.p+a,r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var f=r[o],h=f.getAttribute("data-href")||f.getAttribute("href");if("stylesheet"===f.rel&&(h===a||h===u))return n()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){f=d[o],h=f.getAttribute("data-href");if(h===a||h===u)return n()}var s=document.createElement("link");s.rel="stylesheet",s.type="text/css",s.onload=n,s.onerror=function(n){var a=n&&n.target&&n.target.src||u,r=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");r.code="CSS_CHUNK_LOAD_FAILED",r.request=a,delete c[e],s.parentNode.removeChild(s),t(r)},s.href=u;var l=document.getElementsByTagName("head")[0];l.appendChild(s)})).then((function(){c[e]=0})));var a=u[e];if(0!==a)if(a)n.push(a[2]);else{var r=new Promise((function(n,t){a=u[e]=[n,t]}));n.push(a[2]=r);var f,h=document.createElement("script");h.charset="utf-8",h.timeout=120,i.nc&&h.setAttribute("nonce",i.nc),h.src=o(e);var d=new Error;f=function(n){h.onerror=h.onload=null,clearTimeout(s);var t=u[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),c=n&&n.target&&n.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+c+")",d.name="ChunkLoadError",d.type=a,d.request=c,t[1](d)}u[e]=void 0}};var s=setTimeout((function(){f({type:"timeout",target:h})}),12e4);h.onerror=h.onload=f,document.head.appendChild(h)}return Promise.all(n)},i.m=e,i.c=a,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)i.d(t,a,function(n){return e[n]}.bind(null,a));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="",i.oe=function(e){throw console.error(e),e};var f=window["webpackJsonp"]=window["webpackJsonp"]||[],h=f.push.bind(f);f.push=n,f=f.slice();for(var d=0;d<f.length;d++)n(f[d]);var s=h;r.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},2395:function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);t("4de4"),t("fb6a"),t("d3b7"),t("4d63"),t("ac1f"),t("25f0"),t("5319"),t("ead7");var a=t("2496"),c=(t("285a"),t("d336")),u=(t("48cc"),t("c364")),r=(t("f820"),t("4959")),o=(t("ef80"),t("ae53")),i=(t("0fd0"),t("fd40")),f=(t("4fbc"),t("ca00")),h=(t("53c9"),t("fad5")),d=(t("a6ac"),t("8bbd")),s=(t("1428"),t("b1f2")),l=(t("5c57"),t("3975")),b=(t("c64f"),t("c614")),p=(t("748b"),t("0860")),k=(t("23b9"),t("8571")),m=(t("5ad1"),t("8eb0")),g=(t("0299"),t("5344")),v=(t("1630"),t("cc15")),y=(t("7276"),t("b39d")),w=(t("6176"),t("871e")),S=(t("6abf"),t("f22a")),j=(t("041f"),t("04ed")),x=(t("541c"),t("0c54")),O=(t("ca8b"),t("d0d3")),E=(t("05a0"),t("3dea")),P=(t("4387"),t("f8c9")),A=(t("3fa3"),t("24df")),C=(t("158f"),t("f047")),_=(t("f0ab"),t("4f4a")),M=(t("21a5"),t("063f")),T=(t("9e1a"),t("b026")),L=(t("4fbe"),t("424a")),N=(t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("2b0e")),$=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("transition",{attrs:{name:e.transition}},[t("router-view",{staticClass:"view"})],1)],1)},B=[],D={name:"app",data:function(){return{transition:"slide-left"}},watch:{$route:function(e,n){var t=this.$router.back;this.transition=t?"slide-right":"slide-left",this.$router.back=!1}}},F=D,H=(t("7c55"),t("2877")),R=Object(H["a"])(F,$,B,!1,null,null,null),U=R.exports,q=t("8c4f"),J=[{path:"/login",name:"Login",component:function(){return t.e("chunk-795a61bf").then(t.bind(null,"a55b"))}},{path:"/main",name:"Main",redirect:{name:"Home"},component:function(){return t.e("chunk-2731020d").then(t.bind(null,"cd56"))},children:[{path:"home",name:"Home",component:function(){return t.e("chunk-09200c5a").then(t.bind(null,"b288"))}},{path:"menu",name:"Menu",component:function(){return t.e("chunk-e39eac3a").then(t.bind(null,"0f38"))}},{path:"my",name:"My",component:function(){return t.e("chunk-693bb9b2").then(t.bind(null,"3837"))}},{path:"shopbag",name:"Shopbag",component:function(){return t.e("chunk-63794ad6").then(t.bind(null,"6707"))}}]},{path:"/detail",name:"Detail",component:function(){return t.e("chunk-00ed6a6c").then(t.bind(null,"c84b"))}},{path:"/pay",name:"Pay",component:function(){return t.e("chunk-2e7b3d9b").then(t.bind(null,"76a1"))}},{path:"/newAddress",name:"NewAddress",component:function(){return t.e("chunk-3010b999").then(t.bind(null,"5f65"))}},{path:"/address",name:"Address",component:function(){return t.e("chunk-fbc5ea88").then(t.bind(null,"a821"))}},{path:"/account",name:"Account",component:function(){return t.e("chunk-4044a5ac").then(t.bind(null,"77be"))}},{path:"/order",name:"Order",component:function(){return t.e("chunk-f7e8d510").then(t.bind(null,"cf2a"))}},{path:"/like",name:"Like",component:function(){return t.e("chunk-161a2462").then(t.bind(null,"7c2a"))}},{path:"/secure",name:"Secure",component:function(){return t.e("chunk-664fe55a").then(t.bind(null,"305b"))}},{path:"/forgot",name:"Forgot",component:function(){return t.e("chunk-46351c38").then(t.bind(null,"0fdf"))}},{path:"/search",name:"Search",component:function(){return t.e("chunk-b1ac7e7a").then(t.bind(null,"2d3b"))}},{path:"*",redirect:{name:"Home"}}];N["a"].use(q["a"]),q["a"].prototype.back=!1,q["a"].prototype.goBack=function(){this.back=!0,this.go(-1)};var V=new q["a"]({routes:J}),G=V,I=t("82ae"),K=t.n(I),Q=t("e7aa"),W=t.n(Q);t("44ce");N["a"].config.productionTip=!1,K.a.defaults.headers.post["Content-Type"]="application/x-www-form-urlencoded;charset=utf-8",N["a"].use(c["a"]).use(u["a"]).use(r["a"]).use(o["a"]).use(i["a"]).use(f["a"]).use(h["a"]).use(d["a"]).use(s["a"]).use(l["a"]).use(b["a"]).use(p["a"]).use(k["a"]).use(m["a"]).use(g["a"]).use(v["a"]).use(y["a"]).use(w["a"]).use(S["a"]).use(j["a"]).use(x["a"]).use(O["a"]).use(E["a"]).use(P["a"]).use(A["a"]).use(C["a"]).use(_["a"]).use(M["a"]).use(T["a"]).use(L["a"]),N["a"].use(a["a"]),N["a"].use(W.a,K.a),K.a.defaults.baseURL="http://www.kangliuyong.com:10002",N["a"].prototype.appkey="U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",N["a"].filter("formatDate",(function(e,n){var t=new Date(e),a=t.getFullYear();if(/(y+)/.test(n)){var c=RegExp.$1;n=n.replace(c,a.toString().slice(4-c.length))}var u={M:t.getMonth()+1,d:t.getDate(),h:t.getHours(),m:t.getMinutes(),s:t.getSeconds()};for(var r in u){var o=new RegExp("(".concat(r,"+)"));if(o.test(n)){var i=RegExp.$1,f=u[r]>=10?u[r]:2==i.length?"0"+u[r]:u[r];n=n.replace(i,f)}}return n})),new N["a"]({router:G,render:function(e){return e(U)}}).$mount("#app")},"7c55":function(e,n,t){"use strict";var a=t("2395"),c=t.n(a);c.a}});
//# sourceMappingURL=app.a90d5e9f.js.map