<template>
  <v-app-bar
    app
    color="primary"
    dark
    elevation="2"
    height="64"
  >
    <!-- Кнопка меню -->
    <v-app-bar-nav-icon 
      @click="toggleSideMenu"
      class="d-flex d-md-none"
    />
    
    <!-- Логотип -->
    <v-toolbar-title class="text-h5 font-weight-bold">
      <v-icon class="mr-2">mdi-truck-fast</v-icon>
      JetLoader
    </v-toolbar-title>
    
    <v-spacer />
    
    <!-- Индикатор текущего проекта -->
    <v-chip
      v-if="currentProject"
      color="white"
      text-color="primary"
      class="mr-4"
      small
    >
      <v-icon left small>mdi-file-document</v-icon>
      {{ currentProject.name }}
    </v-chip>
    
    <!-- Правая часть -->
    <div class="d-flex align-center">
      <!-- Селектор языка -->
      <v-btn
        icon
        @click="showLanguageMenu = !showLanguageMenu"
      >
        <v-icon>mdi-translate</v-icon>
      </v-btn>
      
      <!-- Настройки -->
      <v-btn
        icon
        @click="$router.push('/settings')"
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      
      <!-- Профиль -->
      <v-btn
        icon
        @click="showProfileMenu = !showProfileMenu"
      >
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </div>
    
    <!-- Прогресс-бар -->
    <template v-slot:extension>
      <v-progress-linear
        v-if="isLoading"
        indeterminate
        color="white"
        height="2"
      />
    </template>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TopBar',
  data() {
    return {
      showLanguageMenu: false,
      showProfileMenu: false
    }
  },
  computed: {
    ...mapState('projects', ['currentProject']),
    ...mapState(['isLoading'])
  },
  methods: {
    ...mapActions('ui', ['toggleSideMenu'])
  }
}
</script>