import './style/index.css'
import { createApp } from 'vue'
import App from './App.vue'

import { createWebHashHistory, createRouter } from 'vue-router'
import Settings from './pages/settings/Settings.vue'
import Game from './pages/game/Game.vue'
import Menu from './pages/menu/Menu.vue'
import Shop from './pages/shop/Shop.vue'
import chooseCharacter from './pages/game/scelta_personaggio/chooseCharacter.vue'
import LoginView from './pages/auth/LoginView.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
  { path: '/', component: Menu },
  { path: '/settings', component: Settings },
  { path: '/game', component: Game },
  /*{ path: '/shop', component: Shop },*/
  { path: '/login', component: LoginView },
  { path: '/choose', component: chooseCharacter },
  { path: '/:catchAll(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
