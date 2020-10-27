<template>
  <div class="menu">
    <div class="menu-search">
      <van-search placeholder="请输入商品名称" shape="round" @focus="goSearch"/>
    </div>
    <div class="menu-box">
      <div class="menu-list clearfix">
        <div
          :ref="'menu' + index"
          class="menu-list-item fl"
          v-for="(item, index) in typeData"
          :key="index"
          @click="toggleType(item)"
        >
          <div class="menu-content">
            <div class="img-box">
              <img
                class="auto-img"
                :src="item.isActive ? item.activeIcon : item.icon"
                alt=""
              />
            </div>
            <div class="text" :class="{ active: item.isActive }">
              {{ item.typeDesc }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="menu-product">
      <van-skeleton :row="6" :loading="isLoading">
        <div
          class="product-list"
          :class="{ 'not-first': index > 0 }"
          v-for="(item, index) in products"
          :key="index"
          @click="viewProductInfo(item.pid)"
        >
          <div class="pro-box">
            <div class="pro-img">
              <img class="auto-img" :src="item.smallImg" alt="" />
            </div>
            <div class="pro-info">
              <div class="pro-text fl">
                <div class="ch-name">{{ item.name }}</div>
                <div class="en-name">{{ item.enname }}</div>
                <div class="pro-price">￥{{ item.price }}</div>
              </div>
              <div class="buyNow fr">立即购买</div>
            </div>
          </div>
        </div>
      </van-skeleton>
    </div>
  </div>
</template>

<script>
import "../../assets/less/menu.less";
export default {
  //组件名称
  name: "Menu",
  data() {
    return {
      width: 0,
      typeData: [],
      products: [],

      //是否显示骨架屏
      isLoading: true,
    };
  },

  created() {
    
    //获取商品类型数据
    this.getTypeData();
  },

  methods: {

    //点击搜索进入搜索页面
    goSearch(){
      this.$router.push({name:'Search'})
    },
       

    //获取商品类型数据
    getTypeData() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/type",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        params: {
          appkey: this.appkey,
        },
      })
        .then((result) => {
          this.$toast.clear();
          
          if (result.data.code == 400) {
            let iconData = [
              {
                type: "latte",
                icon: require("../../assets/imgs/natie.png"),
                activeIcon: require("../../assets/imgs/innatie.png"),
              },
              {
                type: "coffee",
                icon: require("../../assets/imgs/coffee.png"),
                activeIcon: require("../../assets/imgs/incoffee.png"),
              },
              {
                type: "rena_ice",
                icon: require("../../assets/imgs/ruinabing.png"),
                activeIcon: require("../../assets/imgs/inruinabing.png"),
              },
            ];

            result.data.result.map((v) => {
              for (let i = 0; i < iconData.length; i++) {
                if (v.type == iconData[i].type) {
                  v.icon = iconData[i].icon;
                  v.activeIcon = iconData[i].activeIcon;
                  v.isActive = false;
                  break;
                }
              }
            });

            result.data.result.unshift({
              type: "isHot",
              typeDesc: "推荐",
              icon: require("../../assets/imgs/hot.png"),
              activeIcon: require("../../assets/imgs/inhot.png"),

              isActive: true,
            });

            this.typeData = result.data.result;

            //根据商品类型获取商品数据
            this.getProductsByType(this.typeData[0]);

            // this.$nextTick(() => {
            //   let width = this.$refs.menu0[0].clientWidth;
            //   // 

            //   this.width = this.typeData.length * width;
            // });
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },

    //切换商品类型
    toggleType(item) {
      if (item.isActive) {
        return;
      }

      this.isLoading = true;

      for (let i = 0; i < this.typeData.length; i++) {
        if (this.typeData[i].isActive) {
          this.typeData[i].isActive = false;
          break;
        }
      }

      item.isActive = true;

      //根据商品类型获取商品数据
      this.getProductsByType(item);
    },

    //根据商品类型获取商品数据
    getProductsByType(item) {
      this.products = [];
      // 

      //如果存在缓存数据,则在缓存获取商品数据,不发起请求
      let data = sessionStorage.getItem(item.type);
      if (data) {
        this.isLoading = false;
        
        this.products = JSON.parse(data);

        return;
      }

      

      let params = {
        key: "type",
        value: item.type,
        appkey: this.appkey,
      };

      if (item.type == "isHot") {
        params.key = "isHot";
        params.value = 1;
      }

      

      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "GET",
        url: "/typeProducts",
        //如果get请求，参数需要放在params, 如果是post请求,参数需要放在data
        params,
      })
        .then((result) => {
          this.$toast.clear();
          
          if (result.data.code == 500) {
            this.isLoading = false;

            this.products = result.data.result;

            //将商品数据缓存
            sessionStorage.setItem(item.type, JSON.stringify(this.products));
          }
        })
        .catch((err) => {
          this.$toast.clear();
          
        });
    },
        viewProductInfo(pid) {
        this.$router.push({name: 'Detail', query: {pid}});
      }
  },
};
</script>
