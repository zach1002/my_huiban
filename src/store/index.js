import { createStore } from 'vuex'
import app from './modules/app'
import user from './modules/user'
import paper from './modules/paper'
import getters from './getters'
export default createStore({
  modules: {
    app,
    user,
    paper
  },
  getters
})
