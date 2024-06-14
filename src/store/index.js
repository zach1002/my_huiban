import { createStore } from 'vuex'
import app from './modules/app'
<<<<<<< HEAD
import getters from './getters'
export default createStore({
  modules: {
    app
=======
import user from './modules/user'
import getters from './getters'
export default createStore({
  modules: {
    app,
    user,
>>>>>>> beb9a33dcfd7cfd4c416daf386568369c7d96930
  },
  getters
})
