import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        musicToken: localStorage.getItem('musicToken'),
        uid: localStorage.getItem('uid'),
        
        songid: '',
        storesongList: [],
    },

    mutations: {
        changeSongid(state, id) {
            state.songid = id
        },
        changeSongList(state, sl) {
            state.storesongList = sl
        },
    }

})