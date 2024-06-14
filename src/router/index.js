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
<<<<<<< HEAD
        name: 'welcome',
        component: () => import('@/views/welcome/index.vue')
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/views/users/index.vue')
      }
=======
        name: '欢迎',
        component: () => import('@/views/welcome/index.vue')
      },
      {
        path: 'user',
        name: '个人中心',
        component: () => import('@/views/user/index.vue')
      },
>>>>>>> beb9a33dcfd7cfd4c416daf386568369c7d96930
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
