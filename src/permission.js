import router from './router'
import store from './store'


router.beforeEach(async(to, from, next) => {
    const isLogin = store.getters['isLogin'];
    if (!isLogin) {
        // 如果 Vuex 中没有登录状态，尝试从 localStorage 恢复
        const isLogged = localStorage.getItem('isLogged');
        if (isLogged === 'true') {
            // 恢复登录状态到 Vuex
            store.commit('user/SET_IS_LOGIN', true);
            store.dispatch('user/getInfo').then(() => {
                alert('getInfo success')
            }).catch((error)=>{alert(error)});
        }
    }
    next()
})
