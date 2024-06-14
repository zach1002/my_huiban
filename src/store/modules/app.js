import router from '@/router'

export default {
  namespaced: true,
  state: () => ({
    siderType: true,
    lang: localStorage.getItem('lang') || 'zh'
  }),
  mutations: {
    changeSiderType(state) {
      state.siderType = !state.siderType
    },
    changLang (state, lang) {
      state.lang = lang
    }
  }
}
