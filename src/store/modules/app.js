import storage from 'utils/storage'

const state = {
  siderbar: {
    opened: storage.get('siderbarStatus') ? !!+storage.get('siderbarStatus') : true
  }
}

const mutations = {
  TOGGLE_SIDERBAR: (state) => {
    state.siderbar.opened = !state.siderbar.opened
    if (state.siderbar.opened) {
      storage.set('siderbarStatus', 1)
    } else {
      storage.set('siderbarStatus', 0)
    }
  }
}

const actions = {
  toggleSiderBar({ commit }) {
    commit('TOGGLE_SIDERBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations: mutations,
  actions
}