import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY='party-user'
export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem(USER_KEY, state.user)
      //window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
