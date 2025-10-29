const state = {
  language: 'ru',
  units: 'mm',
  currency: 'RUB',
  theme: 'light',
  scene3d: {
    showGrid: true,
    showAxes: true,
    enableShadows: true,
    cameraSpeed: 1.0,
    snapToGrid: true
  }
}

const mutations = {
  SET_LANGUAGE(state, language) {
    state.language = language
  },
  
  SET_UNITS(state, units) {
    state.units = units
  },
  
  SET_CURRENCY(state, currency) {
    state.currency = currency
  },
  
  SET_THEME(state, theme) {
    state.theme = theme
  },
  
  SET_SCENE3D_SETTING(state, { key, value }) {
    state.scene3d[key] = value
  }
}

const actions = {
  updateSetting({ commit, dispatch }, { key, value }) {
    commit(`SET_${key.toUpperCase()}`, value)
    dispatch('saveSettings')
  },
  
  updateScene3DSetting({ commit, dispatch }, { key, value }) {
    commit('SET_SCENE3D_SETTING', { key, value })
    dispatch('saveSettings')
  },
  
  saveSettings({ state }) {
    try {
      localStorage.setItem('settings', JSON.stringify(state))
    } catch (error) {
      console.error('Ошибка сохранения настроек:', error)
    }
  },
  
  loadSettings({ commit }) {
    try {
      const savedSettings = localStorage.getItem('settings')
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        Object.keys(settings).forEach(key => {
          if (key === 'scene3d') {
            Object.keys(settings.scene3d).forEach(sceneKey => {
              commit('SET_SCENE3D_SETTING', { key: sceneKey, value: settings.scene3d[sceneKey] })
            })
          } else {
            commit(`SET_${key.toUpperCase()}`, settings[key])
          }
        })
      }
    } catch (error) {
      console.error('Ошибка загрузки настроек:', error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}