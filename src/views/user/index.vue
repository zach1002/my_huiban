<template>
  <div class="app-container">
    <div v-if="isLogin">
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab" @tab-click="handleTabClick">

              <el-tab-pane label="Account" name="account">
                <account  />
              </el-tab-pane>

              <el-tab-pane label="Subscribed" name="Subscribed">
                <el-card>
                  <!-- todo -->
                </el-card>
              </el-tab-pane>

            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
    <div v-else>
      <el-alert
        title="You are not logged in"
        description="Please login to view your profile"
        type="warning"
        show-icon
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import UserCard from './components/UserCard'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Account },
  data() {
    return {
      activeTab: 'account',
      subscribed: []
    }
  },
  methods: {
    handleTabClick(tab) {
      if (tab.props.name === 'Subscribed') {
        this.$store.dispatch('user/getsubscribedMeetings').then(res => {
          if (res.length === 0) {
            this.$message.info('You have not subscribed to any meetings')
          }
          this.subscribed = res
          console.log(this.subscribed)
        }).catch(err => {
          this.$message.error(err.message)
        })
      }
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin
    })
  }
}
</script>
