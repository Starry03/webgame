import './style/index.css'
import { createApp } from 'vue'
import App from './App.vue'

import { createWebHashHistory, createRouter } from 'vue-router'
import Game from '@/pages/game/Game.vue'
import Menu from '@/pages/menu/Menu.vue'
import HandleChoosingCharacters from '@/pages/game/HandleChoosingCharacters.vue'
import LoginView from '@/pages/auth/LoginView.vue'
import NotFound from '@/pages/NotFound.vue'
import ViewStats from '@/pages/game/stats/ViewStats.vue'

const routes = [
  { path: '/', component: Menu },
  { path: '/game', component: Game },
  { path: '/selection', component: HandleChoosingCharacters },
  { path: '/login', component: LoginView },
  { path: '/stats', component: ViewStats },
  { path: '/:catchAll(.*)*', component: NotFound },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
