import './style/index.css'
import { createApp } from 'vue'
import App from './App.vue'

import { createWebHashHistory, createRouter } from 'vue-router'
import Settings from './pages/settings/Settings.vue'
import Game from './pages/game/Game.vue'
import Menu from './pages/menu/Menu.vue'
import Shop from './pages/shop/Shop.vue'
import Tutorial from './pages/tutorial/Tutorial.vue'
import LoginView from './pages/auth/LoginView.vue'

const routes = [
  { path: '/', component: Menu },
  { path: '/settings', component: Settings },
  { path: '/game', component: Game },
  { path: '/shop', component: Shop },
  { path: '/login', component: LoginView },
  { path: '/tutorial', component: Tutorial },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
