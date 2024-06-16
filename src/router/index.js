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
      {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/admin')
      },
      {
        path: '/single/:id', // 注意这里的 `:id` 是参数占位符
        name: 'single',
        // component: SingleComponent // `SingleComponent` 是该路由对应的组件
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
