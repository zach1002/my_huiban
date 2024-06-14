<template>
  <div class="hamburger-container" @click="toggleClick" id="hamburger">
    <el-icon :size="20" v-if="store.getters.siderType === true">
      <Expand />
    </el-icon>
    <el-icon :size="20" v-else>
      <Fold />
    </el-icon>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { Expand, Fold } from '@element-plus/icons-vue'
const store = useStore()
const toggleClick = () => {
  store.commit('app/changeSiderType')
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  margin-right: 16px;
  box-sizing: border-box;
  cursor: pointer;
}

</style>
