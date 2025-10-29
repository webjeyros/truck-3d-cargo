<template>
  <v-bottom-navigation
    v-model="activeTab"
    app
    fixed
    color="primary"
    height="64"
  >
    <v-btn
      v-for="item in navigationItems"
      :key="item.name"
      :value="item.route"
      :to="item.route"
      :disabled="item.disabled"
      height="64"
    >
      <span class="text-caption">{{ item.title }}</span>
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BottomNavigation',
  data() {
    return {
      activeTab: this.$route.path
    }
  },
  computed: {
    ...mapState('projects', ['currentProject']),
    
    navigationItems() {
      const requiresProject = !this.currentProject
      
      return [
        {
          name: 'projects',
          title: 'Проекты',
          icon: 'mdi-file-document-outline',
          route: '/',
          disabled: false
        },
        {
          name: 'cargo',
          title: 'Груз',
          icon: 'mdi-package-variant',
          route: '/cargo',
          disabled: requiresProject
        },
        {
          name: 'transport',
          title: 'Транспорт',
          icon: 'mdi-truck',
          route: '/load',
          disabled: requiresProject
        },
        {
          name: 'calculation',
          title: 'Расчет',
          icon: 'mdi-calculator',
          route: '/scene',
          disabled: requiresProject
        }
      ]
    }
  },
  watch: {
    '$route.path'(newPath) {
      this.activeTab = newPath
    }
  }
}
</script>

<style scoped>
.v-btn {
  flex-direction: column;
}

.text-caption {
  font-size: 0.75rem !important;
  line-height: 1rem;
  margin-bottom: 2px;
}
</style>