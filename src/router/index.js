/* eslint-disable vue/multi-word-component-names */
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: '',
    component: () => import('../layout'),
    redirect: '/welcome',
    children: [
      {
        path: 'welcome',
        name: '欢迎',
        component: () => import('@/views/welcome/index.vue')
      },
      {
        path: 'user',
        name: '个人中心',
        component: () => import('@/views/user/index.vue')
      },
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
