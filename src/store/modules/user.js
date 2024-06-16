import { login, logout, getInfo, profileUpdate, getUserNum, subscribeMeeting, unsubscribeMeeting } from '@/api/user'
import { getsubscribedMeetings, searchUser, register, listAll, deleteUser} from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    isLogin: false,
    userInfo: {
      name: '你好',
      avatar: 'https://github.com/identicons/chucklu.png?w=500&h=500',
      email: 'nihao@test.com',
      phone: '1234567890',
      role: 1
    }
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },

  SET_IS_LOGIN: (state, isLogin) => {
    state.isLogin = isLogin
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
}

const getUserInfo = (user) => {
  return {
    id: user.userId,
    name: user.userName,
    avatar: user.avatarUrl,
    email: user.email,
    phone: user.phone,
    role: user.permission
  }
}


const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userAccount: username, userPassword: password }).then(response => {

        const { data } = response
        const code = data.code // 业务状态码
        const user = data.data // 用户信息

        if (code !== 2000) {
          const msg = data.message + ', ' + data.detail
          reject(msg)
          return
        }

        commit('SET_IS_LOGIN', true)
        localStorage.setItem('isLogged', 'true');
        const userInfo = getUserInfo(user)
        commit('SET_USER_INFO', userInfo)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  //register
  register({ commit }, userInfo) {
    const { username, password, checkpassword } = userInfo
    return new Promise((resolve, reject) => {
      register({ userAccount: username, userPassword: password, checkPassword: checkpassword}).then(response => {
        const { data } = response
        const code = data.code // 业务状态码
        const user = data.data // 用户信息
        
        if (code !== 2000) {
          const msg = data.code + ', ' + data.message + ', ' + data.detail
          reject(msg)
          return
        }
        resolve()
      }).catch(error => {
        alert(username)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        const code = data.code // 业务状态码
        const user = data.data // 用户信息

        if (code !== 2000) {
          return reject(data.message)
        }

        const userInfo = getUserInfo(user)
        commit('SET_USER_INFO', userInfo)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(response => {
        // removeToken() // must remove  token  first
        // resetRouter()
        localStorage.setItem('isLogged', 'false');
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // profile update
  profileUpdate({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      profileUpdate({
        userName: userInfo.name,
        avatarUrl: userInfo.avatar,
        phone: userInfo.phone,
        email: userInfo.email
      }).then(response => {

        const { data } = response
        const code = data.code // 业务状态码
        const user = data.data // 用户信息

        if (code !== 2000) {
          const msg = data.message + ', ' + data.detail
          reject(msg)
          return
        }

        const userInfo = getUserInfo(user)
        commit('SET_USER_INFO', userInfo)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getUserNum({ commit }) {
    return new Promise((resolve, reject) => {
      getUserNum().then(response => {
        const { data } = response
        const code = data.code // 业务状态码
        const userNum = data.data // 用户信息

        if (code !== 2000) {
          const msg = data.message + ', ' + data.detail
          reject(msg)
          return
        }

        resolve(userNum)
      }).catch(error => {
        reject(error)
      })
    })
  },


  getsubscribedMeetings({ commit }) {
    // alert('getsubscribedMeetings')
    return new Promise((resolve, reject) => {
      getsubscribedMeetings().then(response => {
        const { data } = response
        const code = data.code // 业务状态码
        const subscribedMeetings = data.data // 用户信息

        if (code !== 2000) {
          const msg = data.message + ', ' + data.detail
          reject(msg)
          return
        }
        resolve(subscribedMeetings)
      }).catch(error => {
        reject(error)
      })
    })
  },


  subscribeMeeting({ commit }, meetingId) {
    return new Promise((resolve, reject) => {
      subscribeMeeting(meetingId).then(response => {
        const { data } = response
        const code = data.code // 业务状态码
        if (code !== 2000) {
          const msg = data.message + ', ' + data.detail
          reject(msg)
          return
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  unsubscribeMeeting({ commit }, meetingId) {
    return new Promise((resolve, reject) => {
      unsubscribeMeeting(meetingId).then(response => {
        const { data } = response
        const code = data.code // 业务状态码
        if (code !== 2000) {
          const msg = data.message + ', ' + data.detail
          reject(msg)
          return
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  searchUser({ commit }, userName) {
    return new Promise((resolve, reject) => {
      searchUser(userName).then(response => {
        const { data } = response
        const code = data.code // 业务状态码
        if (code !== 2000) {
          const msg = data.message + ', ' + data.detail 
          reject(msg)
          return
        }
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  listAll({ commit }) {
    return new Promise((resolve, reject) => {
      listAll().then(response => {
        const { data } = response
        const code = data.code // 业务状态码
        if (code !== 2000) {
          const msg = data.message + ', ' + data.detail 
          reject(msg)
          return
        }
        resolve(data.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  deleteUser({ commit }, userId) {
    return new Promise((resolve, reject) => {
      deleteUser(userId).then(response => {
        const { data } = response
        const code = data.code // 业务状态码
        if (code !== 2000) {
          const msg = data.message + ', ' + data.detail
          reject(msg)
          return
        }
        resolve()
      }).catch(error => {
        // alert(`error-${userId}`)
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

