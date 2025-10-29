import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import ru from 'vuetify/lib/locale/ru'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { ru },
    current: 'ru'
  },
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        background: '#FAFAFA',
        surface: '#FFFFFF'
      },
      dark: {
        primary: '#2196F3',
        secondary: '#424242',
        accent: '#FF4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        background: '#121212',
        surface: '#1E1E1E'
      }
    }
  },
  icons: {
    iconfont: 'mdi'
  }
})