import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import i18n from '@/i18n'

createApp(App).use(ElementPlus).use(store).use(router).use(i18n).mount('#app')
