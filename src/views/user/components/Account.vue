<template>
  <el-form>
    <el-form-item :label="$t('user.name')">
      <el-input v-model.trim="name" />
    </el-form-item>
    <el-form-item :label="$t('user.email')">
      <el-input v-model.trim="email" />
    </el-form-item>
    <el-form-item :label="$t('user.phone')">
      <el-input v-model.trim="phone" />
    </el-form-item>
    <el-form-item :label="$t('user.avatar')">
      <el-input v-model.trim="avatar" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">{{$t('user.update')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
        name: null,
        email: null,
        phone: null,
        avatar: null,
        subscribed: []
    }
  },
  methods: {
    submit() {
      if (!this.name && !this.email && !this.phone && !this.avatar) {
        this.$message({
          message: 'Please fill in the information',
          type: 'error',
          duration: 1000
        })
        return
      }

      const userInfo = this.$store.getters['userInfo']
      userInfo.name = this.name || userInfo.name
      userInfo.email = this.email || userInfo.email
      userInfo.phone = this.phone || userInfo.phone
      userInfo.avatar = this.avatar || userInfo.avatar

      this.$store.dispatch('user/profileUpdate', userInfo).then(() => {
        this.$message({
          message: 'User information has been updated successfully',
          type: 'success',
          duration: 5 * 1000
        })
      }).catch((msg) => {
        this.$message({
          message: msg,
          type: 'error',
          duration: 1000
        })
        })
      }
  },

}
</script>
