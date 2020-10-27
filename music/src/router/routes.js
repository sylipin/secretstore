export const routes = [
    {
        //登录
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta:{keepAlive:true}
    },

    {
        //主页
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },

    {
        //歌单
        path: '/songSheet',
        name: 'SongSheet',
        component: () => import('../views/SongSheet.vue'),
    },
    {
        //搜索
        path: '/search',
        name: 'Search',
        component: () => import('../views/Search.vue'),
    },
    {
        //搜索详情 
        path: '/searchDetail',
        name: 'SearchDetail',
        component: () => import('../views/SearchDetail.vue'),
        
    },
    {
        //歌手详情 
        path: '/songer',
        name: 'Songer',
        component: () => import('../views/Songer.vue'),
    },
    {
        //我的个人资料
        path: '/my',
        name: 'My',
        component: () => import('../views/My.vue'),
    },
    {
        //我的关注
        path: '/concern',
        name: 'Concern',
        component: () => import('../views/Concern.vue'),
    },
    {
        //我的粉丝
        path: '/fan',
        name: 'Fan',
        component: () => import('../views/Fan.vue'),
    },
    {
        //我的粉丝
        path: '/mycolletion',
        name: 'Mycolletion',
        component: () => import('../views/Mycolletion.vue'),
    },
    {
        //每日推荐
        path: '/dailyRecommend',
        name: 'DailyRecommend',
        component: () => import('../views/DailyRecommend.vue'),
    },
    {
        //我喜欢的音乐
        path: '/myLikeMusic',
        name: 'MyLikeMusic',
        component: () => import('../views/MyLikeMusic.vue'),
    },
    {
        //我的歌单
        path: '/mySongSheet',
        name: 'MySongSheet',
        component: () => import('../views/MySongSheet.vue'),
    },
]