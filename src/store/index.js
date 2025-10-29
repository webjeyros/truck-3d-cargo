import Vue from 'vue'
import Vuex from 'vuex'

// Импортируем модули
import projects from './modules/projects'
import cargo from './modules/cargo'
import transport from './modules/transport'
import calculations from './modules/calculations'
import ui from './modules/ui'
import settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appVersion: '1.0.0',
    isLoading: false
  },
  
  mutations: {
    SET_LOADING(state, loading) {
      state.isLoading = loading
    }
  },
  
  actions: {
    async initialize({ dispatch }) {
      try {
        await Promise.all([
          dispatch('projects/loadProjects'),
          dispatch('settings/loadSettings'),
          dispatch('transport/loadVehicles')
        ])
      } catch (error) {
        console.error('Ошибка инициализации:', error)
      }
    }
  },
  
  modules: {
    projects,
    cargo,
    transport,
    calculations,
    ui,
    settings
  }
})