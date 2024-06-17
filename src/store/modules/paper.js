import { listPartern, listAll, getPaperNum, getJournalNum, getConferenceNum } from '@/api/paper'
import store from '..'

const getDefaultState = () => {
  return {
    tableData: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },

  SET_TABLE_DATA: (state, tableData) => {
    state.tableData = tableData
  }

}

const actions = {
  // search
  listPartern({ commit }, searchInfo) {
    const name = searchInfo
    return new Promise((resolve, reject) => {
      listPartern({
        name: name
      }).then(response => {
        // alert('success')
        const { data } = response
        const code = data.code // 业务状态码

        if (code !== 2000) {
          const msg = data.message + ', ' + data.detail
          reject(msg)
          return
        }
        resolve(data.data)
      }).catch(error => {
        // alert('error')
        reject(error)
      })
    })
  },

  // get paper info
  listAll({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      listAll().then(response => {
        const { data } = response
        const code = data.code
        console.log(code)
        if (!data) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return reject('Verification failed, please Login again.')
        }

        const arr = Array.from(data.data)
        console.log(arr)
        commit('SET_TABLE_DATA', arr)
        console.log(store.getters.tableData)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getPaperNum({ commit }) {
    return new Promise((resolve, reject) => {
      getPaperNum().then(response => {
        const { data } = response
        const code = data.code
        const paperNum = data.data
        if (code !== 2000) {
          const msg = data.message + ', ' + data.detail
          reject(msg)
          return
        }
        resolve(paperNum)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getJournalNum({ commit }) {
    return new Promise((resolve, reject) => {
      getJournalNum().then(response => {
        const { data } = response
        const code = data.code
        const paperNum = data.data
        if (code !== 2000) {
          const msg = data.message + ', ' + data.detail
          reject(msg)
          return
        }
        resolve(paperNum)
      }).catch(error => {
        reject(error)
      })
    })
  },

  getConferenceNum({ commit }) {
    return new Promise((resolve, reject) => {
      getConferenceNum().then(response => {
        const { data } = response
        const code = data.code
        const paperNum = data.data
        if (code !== 2000) {
          const msg = data.message + ', ' + data.detail
          reject(msg)
          return
        }
        resolve(paperNum)
      }).catch(error => {
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
