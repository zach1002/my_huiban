import { listPartern, listAll, getPaperNum } from '@/api/paper'
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
  // user login
  listPartern ({ commit }, searchInfo) {
    const {
      name,
      pageNum,
      pageSize
    } = searchInfo
    return new Promise((resolve, reject) => {
      listPartern({
        name,
        pageNum,
        pageSize
      }).then(response => {

        const { data } = response
        const code = data.code // 业务状态码

        if (code !== 2000) {
          const msg = data.message + ', ' + data.detail
          reject(msg)
          return
        }

        commit('SET_TABLE_DATA', data.data)
        console.log(store.getters.tableData)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get paper info
  listAll ({
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

  getPaperNum ({commit}) {
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
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
