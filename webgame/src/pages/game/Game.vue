<template>
  <audio controls style="display: none" id="music" autoplay loop>
    <source src="/assets/audio/Trust_In_Your_Perseverance.wav" type="audio/mpeg" />
  </audio>
  <div class="master flex flex-column flex-align gap-big">
    <div class="flex flex-row flex-center gap-big">
      <button class="button button-secondary button-home" @click="goHome">Home</button>
      <h1>Awakening in the Dark Tower</h1>
      <button class="button button-secondary button-mute" @click="toggleMute">🔊</button>
    </div>
    <div class="flex flex-column">
      <StatusBar :health="80" :maxHealth="100" :mana="50" :maxMana="100" :level="5" :canAttack="true" />
      <Canvas />
    </div>
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

@media (max-height: 600px) {
  .button-mute {
    width: fit-content;
    height: fit-content;
  }
}

@media (orientation: portrait) {
  h1 {
    text-align: center;
    width: 69%;
  }

  .button-mute {
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: 0;
    left: 85svw;
  }
}
@media (orientation: landscape) {
  h1 {
    text-align: center;
    width: 69%;
  }

  .button-mute {
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: 0;
    left: 85svw;
  }
}

.master {
  background: url('/assets/images/sfondo3.gif');
  background-size: cover;
  height: 100vh;
}


h1 {
  font-size: var(--font-big);
  text-shadow:
    0 0 10px red,
    0 0 20px red;
  padding-top: 4%;
  padding-bottom: 2%;
}

.button-home {
  position: absolute;
  top: 30px;
  left: 20px;
  font-size: var(--font-big);
}

.button-mute {
  position: absolute;
  top: 30px;
  right: 20px;
  font-size: var(--font-big);
}

.button-home:hover,
.button-mute:hover {
  transform: scale(1.1);
  text-shadow:
    0 0 10px black,
    0 0 20px black;
}
</style>
