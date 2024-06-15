<template>
  <el-form>
    <el-form-item label="Name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item label="Phone">
      <el-input v-model.trim="user.phone" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: null,
        email: null,
        phone: null,
      }
    }
  },
  methods: {
    submit() {
      const userInfo = this.$store.getters['userInfo']
      userInfo.name = this.user.name || userInfo.name
      userInfo.email = this.user.email || userInfo.email
      userInfo.phone = this.user.phone || userInfo.phone
      this.$store.commit('user/SET_USER_INFO', userInfo)

      this.$message({
        message: 'User information has been updated successfully',
        type: 'success',
        duration: 5 * 1000
      })
    }
  }
}
</script>
