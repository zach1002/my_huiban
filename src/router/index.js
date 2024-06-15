/* eslint-disable vue/multi-word-component-names */
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register')
  },
  {
    path: '/',
    name: '/',
    component: () => import('../layout'),
    redirect: '/welcome',
    children: [
      {
        path: 'welcome',
        name: 'welcome',
        component: () => import('@/views/welcome/index.vue')
      },
      {
        path: 'user',
        name: 'user',
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
