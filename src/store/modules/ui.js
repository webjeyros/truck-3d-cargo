const state = {
  sideMenuOpen: false,
  bottomSheetOpen: false,
  notification: {
    show: false,
    message: '',
    color: 'info',
    timeout: 4000
  },
  loading: {
    projects: false,
    cargo: false,
    calculations: false
  },
  theme: 'light'
}

const mutations = {
  SET_SIDE_MENU(state, open) {
    state.sideMenuOpen = open
  },
  
  SET_BOTTOM_SHEET(state, open) {
    state.bottomSheetOpen = open
  },
  
  SHOW_NOTIFICATION(state, { message, color = 'info', timeout = 4000 }) {
    state.notification = {
      show: true,
      message,
      color,
      timeout
    }
  },
  
  HIDE_NOTIFICATION(state) {
    state.notification.show = false
  },
  
  SET_LOADING(state, { type, loading }) {
    state.loading[type] = loading
  },
  
  SET_THEME(state, theme) {
    state.theme = theme
  }
}

const actions = {
  toggleSideMenu({ commit, state }) {
    commit('SET_SIDE_MENU', !state.sideMenuOpen)
  },
  
  showNotification({ commit }, payload) {
    commit('SHOW_NOTIFICATION', payload)
  },
  
  setLoading({ commit }, payload) {
    commit('SET_LOADING', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}