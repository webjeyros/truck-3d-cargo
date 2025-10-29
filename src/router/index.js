import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// Ленивая загрузка компонентов
const Home = () => import('@/views/Home.vue')
const CargoSelection = () => import('@/views/CargoSelection.vue')
const VehicleSelection = () => import('@/views/VehicleSelection.vue')
const Scene3D = () => import('@/views/Scene3D.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Проекты',
      icon: 'mdi-file-document-outline',
      showInNavigation: true,
      requiresProject: false
    }
  },
  {
    path: '/cargo',
    name: 'CargoSelection',
    component: CargoSelection,
    meta: {
      title: 'Выбор груза',
      icon: 'mdi-package-variant',
      showInNavigation: true,
      requiresProject: true
    }
  },
  {
    path: '/load',
    name: 'VehicleSelection', 
    component: VehicleSelection,
    meta: {
      title: 'Выбор транспорта',
      icon: 'mdi-truck',
      showInNavigation: true,
      requiresProject: true
    }
  },
  {
    path: '/scene',
    name: 'Scene3D',
    component: Scene3D,
    meta: {
      title: 'Расчет загрузки',
      icon: 'mdi-calculator',
      showInNavigation: true,
      requiresProject: true
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'hash', // Используем hash mode для совместимости с GitHub Pages
  base: process.env.BASE_URL,
  routes
})

// Охранник маршрутов
router.beforeEach((to, from, next) => {
  // Проверяем, требуется ли проект для данного маршрута
  if (to.meta.requiresProject) {
    const currentProject = store.state.projects.currentProject
    if (!currentProject) {
      // Перенаправляем на главную страницу для выбора проекта
      store.commit('ui/showNotification', {
        message: 'Выберите или создайте проект',
        color: 'warning'
      })
      next('/')
      return
    }
  }
  
  // Обновляем заголовок страницы
  if (to.meta.title) {
    document.title = `${to.meta.title} - JetLoader`
  }
  
  next()
})

export default router