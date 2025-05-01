<template>
  <audio controls style="display: none" id="music" autoplay loop>
    <source src="/assets/audio/Trust_In_Your_Perseverance.wav" type="audio/mpeg" />
  </audio>
  <div class="master flex flex-column flex-align gap-big">
    <div class="flex flex-row flex-center gap-big">
      <button class="button button-home" @click="goHome">🏠Home</button>
      <h1>Adventuring in the Tower</h1>
      <button class="button button-mute" @click="toggleMute">🔊</button>
    </div>
    <Canvas v-if="isReady" />
    <button v-else class="button button-primary" @click="handleFullscreen">lock</button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Canvas from '@/components/Canvas.vue'
import { useRouter } from 'vue-router'
import { prefixed } from '@/internal/cryptoutils'
import { Storage_e } from '@/internal/types'

const router = useRouter()
const isReady = ref(false)

async function handleFullscreen() {
  try {
    await document.documentElement.requestFullscreen()
    await screen.orientation.lock('portrait')
    isReady.value = true
  } catch (error) {
    console.error(error)
    isReady.value = true
  }
}

function playAudio() {
  let audio = document.getElementById('music')
  audio?.play().catch((error) => console.log('Riproduzione bloccata:', error))
}

function toggleMute() {
  let audio = document.getElementById('music')
  if (audio.muted) {
    audio.muted = false
    event.target.innerText = '🔊'
  } else {
    audio.muted = true
    event.target.innerText = '🔇'
  }
}

function goHome() {
  localStorage.removeItem(prefixed(Storage_e.SELECTED_CHARACTER))
  router.push('/')
}

onMounted(async () => {
  document.addEventListener('mousemove', playAudio)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', playAudio)
})
</script>

<style scoped>
.master {
  background: url('/assets/images/sfondo3.gif');
  background-size: cover;
  height: 100vh;
}

button,
h1 {
  font-family: 'Press Start 2P', cursive;
}

h1 {
  font-size: 2rem;
  text-shadow:
    0 0 10px red,
    0 0 20px red;
  padding-top: 2%;
  padding-bottom: 2%;
}

.button-home {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 1rem;
  background-color: rgb(148, 20, 60);
}

.button-mute {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 1.5rem;
  background-color: rgb(148, 20, 60);
}

.button-home:hover,
.button-mute:hover {
  transform: scale(1.1);
  text-shadow:
    0 0 10px black,
    0 0 20px black;
}
</style>
