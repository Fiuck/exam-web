import storage from 'utils/storage'
import { login, logout, info } from 'api/login'

const state = {
  token: storage.getToken() || '',
  username: '',
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
  },
  // 获取用户信息
  GetInfo({ commit }) {
    return new Promise((resolve, reject) => {
      info().then(res => {
        const user = res.data.user
        // TODO 头像为空时设置一个默认头像地址
        const avatar = user.avatar || ""
        if (res.data.roles && res.data.roles.length > 0) {
          commit('SET_ROLES', res.data.roles)
          commit('SET_PERMISSION', res.data.perms)
        } else {
          commit('SET_ROLES', ['ROLE_DEFAULT'])
        }
        commit('SET_NAME', user.username)
        commit('SET_AVATAR', avatar)
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  },
  // 登出
  LogOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout().then(res => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMISSION')
        commit('SET_AVATAR', '')
        commit('SET_NAME', '')
        storage.removeToken()
        resolve()
      }).catch((e) => {
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