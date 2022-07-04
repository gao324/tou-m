import Vue from 'vue'
import Vuex from 'vuex'
import {getItem, setItem } from '@/util/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:getItem('TOKEN_USER')
  },
  getters: {
  },
  mutations: {
    setUser(state,user){
      state.user = user
      setItem('TOKEN_USER',state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
