import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) //把 store 绑到Vue.prototype

const store = new Vuex.Store({
  state: { // data
    count:0
  },
  mutations:{
    increment(state,n:number){// methods
      state.count += n
    }
  }
})
export default store