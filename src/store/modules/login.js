import storage from 'utils/storage'

const state = {
  Authorization: storage.getToken() || '',
  userInfo: storage.get('userInfo') || {}
}

const mutations = {
  TO_LOGIN: (state, payload) => {
    storage.setToken(payload.Authorization)
    state.Authorization = payload.Authorization
  }
}

const actions = {}

export default {
  // namespaced: true,
  state,
  mutations: mutations,
  actions
}