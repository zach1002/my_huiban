<template>
  <div class="sidebar-head" v-if="$store.getters.siderType===true">
    <img src="@/assets/images/th.png" alt="logo" class="sidebar-logo">
    <h1 class="sidebar-title">假会伴 </h1>
  </div>

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
      <span> External Link</span>
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
.sidebar-title {
      display: inline-block;
      margin: 0;
      color: #ed6c10;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }

.sidebar-logo {
  width: 32px;
  height: 32px;
  vertical-align: middle;
  margin-right: 12px;
}

.sidebar-head {
  width: 50%; /* 或者固定宽度，如 300px */
  margin-left: auto;
  margin-right: auto;
}
</style>

