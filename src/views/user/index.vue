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
                  <subscribed ref="subscribedComponent"/>
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
import Subscribed from './components/Subscribed'

export default {
  name: 'Profile',
  components: { UserCard, Account, Subscribed },
  data() {
    return {
      activeTab: 'account',
    }
  },
  methods: {
    handleTabClick(tab) {
      if(tab.props.name === 'Subscribed') {
        // this.$refs.subscribedComponent.update()
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
