import Vue from 'vue/dist/vue.esm.js'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    set_token (state, token) {
      state.token = token
      sessionStorage.token = token
      console.log('sessionStorage', sessionStorage)
    },
    del_token (state) {
      state.token = ''
      sessionStorage.removeItem('token')
    }
  }
})
