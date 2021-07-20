import storage from 'utils/storage'

const state = {
  Authorization: storage.get('Authorization') || '',
  userInfo: storage.get('userInfo') || {}
}

const mutations = {
  TO_LOGIN: (state, payload) => {
    console.log(payload);
    storage.set('Authorization', payload.Authorization)
    state.Authorization = payload.Authorization
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}