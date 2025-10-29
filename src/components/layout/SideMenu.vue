<template>
  <v-navigation-drawer
    v-model="sideMenuOpen"
    app
    temporary
    width="280"
  >
    <!-- Шапка меню -->
    <v-list-item class="px-4 py-4">
      <v-list-item-avatar>
        <v-icon color="primary" size="32">mdi-truck-fast</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="text-h6 font-weight-bold">
          JetLoader
        </v-list-item-title>
        <v-list-item-subtitle>
          3D Планировщик
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    
    <v-divider />
    
    <!-- Меню -->
    <v-list nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.name"
        :to="item.route"
        :color="item.color || 'primary'"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action v-if="item.badge">
          <v-chip small color="error" text-color="white">
            {{ item.badge }}
          </v-chip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    
    <v-divider class="my-4" />
    
    <!-- Дополнительные пункты -->
    <v-list nav>
      <v-list-item
        v-for="item in additionalItems"
        :key="item.name"
        :to="item.route"
        :color="item.color || 'primary'"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    
    <!-- Техподдержка -->
    <template v-slot:append>
      <div class="pa-4">
        <v-btn
          color="success"
          block
          outlined
          @click="openSupport"
        >
          <v-icon left>mdi-help-circle</v-icon>
          Техподдержка
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SideMenu',
  computed: {
    ...mapState('ui', ['sideMenuOpen']),
    
    menuItems() {
      return [
        {
          name: 'projects',
          title: 'Проекты',
          icon: 'mdi-file-document-outline',
          route: '/'
        },
        {
          name: 'cases',
          title: 'Кейсы',
          icon: 'mdi-briefcase-outline',
          route: '/cases'
        },
        {
          name: 'howto',
          title: 'Как это работает',
          icon: 'mdi-help-circle-outline',
          route: '/howto'
        }
      ]
    },
    
    additionalItems() {
      return [
        {
          name: 'terms',
          title: 'Условия',
          icon: 'mdi-file-document-outline',
          route: '/terms'
        },
        {
          name: 'pricing',
          title: 'Тарифы',
          icon: 'mdi-currency-usd',
          route: '/pricing'
        },
        {
          name: 'payment',
          title: 'Оплата',
          icon: 'mdi-credit-card-outline',
          route: '/payment'
        },
        {
          name: 'profile',
          title: 'Профиль',
          icon: 'mdi-account-outline',
          route: '/profile'
        },
        {
          name: 'settings',
          title: 'Настройки',
          icon: 'mdi-cog-outline',
          route: '/settings'
        }
      ]
    }
  },
  methods: {
    openSupport() {
      // Открытие чата поддержки или email
      window.open('mailto:support@jetloader.com', '_blank')
    }
  }
}
</script>