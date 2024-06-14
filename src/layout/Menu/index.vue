<template>
  <el-menu
    active-text-color="#ffd04b"
    :background-color="variables.menuBg"
    class="el-menu-vertical-demo"
    default-active="/welcome"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    router
    unique-opened
    :collapse="!$store.getters.siderType"
  >
    <el-menu-item index="/welcome">
      <el-icon><icon-menu /></el-icon>
      <span>{{$t('menus.welcome')}}</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <el-icon><setting /></el-icon>
      <span>{{$t('menus.user')}}</span>
    </el-menu-item>
    <el-menu-item>
      <a href="https://www.myhuiban.com/" target="_blank" style="color: inherit; text-decoration: none;">
      <el-icon><Share /></el-icon>
      <span>External Link</span>
      </a>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import variables from '@/styles/variables.module.scss'

import {
Document,
Menu as IconMenu,
Location,
Setting,
Share
} from '@element-plus/icons-vue'

//const defaultActive = ref(sessionStorage.getItem('path') || '/users')
//const savePath = (path) => {
//  sessionStorage.setItem('path', `/${path}`)
// }
</script>

<style lang="scss" scoped>
</style>

