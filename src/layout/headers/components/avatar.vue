<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="40" :src="squareUrl" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-if="isLogin" @click="logout">退出</el-dropdown-item>
        <el-dropdown-item v-else @click="login">登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'
import { ElMessage } from 'element-plus'


const router = useRouter()
const store = useStore()
const isLogin = computed(() => store.getters['isLogin']);

// 根据isLogin的状态切换squareUrl的值
const squareUrl = computed(() => {
  return isLogin.value
    ? store.getters['avatar']
    : `https://github.com/identicons/chucklu.png`;
});

const logout = () => {
  ElMessage.success({ message: '注销成功', duration: 1000 });
          setTimeout(() => {
            store.commit('user/SET_IS_LOGIN', false)
            router.push('/welcome')
          }, 1000);
}

const login = () => {
  router.push('/login')
}

</script>

<style lang="scss" scoped>
::v-deep .el-dropdown-menu__item {
  white-space: nowrap;
}
</style>
