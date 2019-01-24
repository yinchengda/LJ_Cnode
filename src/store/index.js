import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    accesstoken: "",
    user: '',
    weidu: ''

  },
  mutations: {
    //用户信息
    getUserName(state, use) {
      state.user = use
    },
    getToken(state, token) {
      state.accesstoken = token
    },
    //未读消息
    getMessage(state, num) {
      state.weidu = num
    }
  },
  actions: {

  },
  getters: {
    user: (state) => {
      state.user
    }
  }
})

export default store
