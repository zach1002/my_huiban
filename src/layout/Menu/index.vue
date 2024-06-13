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
          <el-icon><IconMenu /></el-icon>
          <span>欢迎</span>
        </el-menu-item>

        <el-menu-item index="/user">
          <el-icon><Setting /></el-icon>
          <span>个人中心</span>
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
} from '@element-plus/icons-vue'

//const defaultActive = ref(sessionStorage.getItem('path') || '/users')
//const savePath = (path) => {
//  sessionStorage.setItem('path', `/${path}`)
// }
</script>

<style lang="scss" scoped>
</style>

