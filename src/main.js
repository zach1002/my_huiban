import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import i18n from '@/i18n'
import SvgIcon from '@/icons'

createApp(App).use(ElementPlus).use(store).use(router).use(i18n).mount('#app')
const debounce = (fn, delay) => {
    let timer
     return (...args) => {
       if (timer) {
         clearTimeout(timer)
       }
       timer = setTimeout(() => {
         fn(...args)
       }, delay)
     }
  }
    
  const _ResizeObserver = window.ResizeObserver;
  window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
     constructor(callback) {
       callback = debounce(callback, 200);
       super(callback);
     }
  }
