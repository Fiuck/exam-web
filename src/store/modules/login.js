import storage from 'utils/storage'
import { login } from 'api/login'

const state = {
  token: storage.getToken() || '',
  username: 'admin',
  avatar: '', // 头像
  roles: [], // 角色
  permissions: [] // 权限
}

const mutations = {
  SET_TOKEN: (state, payload) => {
    state.token = payload
  },
  SET_NAME: (state, payload) => {
    state.username = payload
  },
  SET_AVATAR: (state, payload) => {
    state.avatar = payload
  },
  SET_ROLES: (state, payload) => {
    state.roles = payload
  },
  SET_PERMISSION: (state, payload) => {
    state.permissions = payload
  }
}

const actions = {
  // 登录
  Login({ commit }, loginForm) {
    const username = loginForm.username.trim()
    const password = loginForm.password
    return new Promise((resolve, reject) => {
      login({ username, password }).then(res => {
        storage.setToken(res.data)
        commit('SET_TOKEN', res.data)
        resolve()
      }).catch(e => {
        reject(e)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations: mutations,
  actions
}