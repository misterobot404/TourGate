import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from "./modules/auth"
import tours from './modules/tours'

export default new Vuex.Store({
    strict: true,
    state: {
        pageLoading: false
    },
    mutations: {
      SET_PAGE_LOADING: (state, pageLoading) => {
          state.pageLoading = pageLoading;
      },
    },
    modules: {
        auth,
        tours
    }
})


