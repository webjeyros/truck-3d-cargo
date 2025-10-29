<template>
  <v-app>
    <!-- Верхняя навигация -->
    <TopBar />
    
    <!-- Боковое меню -->
    <SideMenu />
    
    <!-- Основной контент -->
    <v-main>
      <v-container fluid class="pa-0 fill-height">
        <router-view />
      </v-container>
    </v-main>
    
    <!-- Нижняя навигация -->
    <BottomNavigation v-if="$vuetify.breakpoint.mobile" />
    
    <!-- Системные уведомления -->
    <v-snackbar
      v-model="notification.show"
      :color="notification.color"
      :timeout="notification.timeout"
      top
      right
    >
      {{ notification.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="hideNotification"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import TopBar from '@/components/layout/TopBar.vue'
import SideMenu from '@/components/layout/SideMenu.vue'
import BottomNavigation from '@/components/layout/BottomNavigation.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    TopBar,
    SideMenu,
    BottomNavigation
  },
  computed: {
    ...mapState('ui', ['notification'])
  },
  methods: {
    ...mapMutations('ui', ['hideNotification'])
  },
  created() {
    // Инициализация приложения
    this.$store.dispatch('projects/loadProjects')
    this.$store.dispatch('settings/loadSettings')
  }
}
</script>

<style>
/* Общие стили приложения */
.fill-height {
  height: 100vh;
}

.no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Прокрутка */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0,0,0,0.5);
}

/* Анимации */
.fade-transition {
  transition: opacity 0.3s ease;
}

.slide-transition {
  transition: transform 0.3s ease;
}
</style>