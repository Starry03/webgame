<template>
  <audio controls style="display: none" id="music" autoplay loop>
    <source src="../../style/Trust_In_Your_Perseverance.wav" type="audio/mpeg" />
  </audio>
  <div class="master">
    <div class="flex flex-row flex-column flex-center gap-big">
      <button class="button button-home" @click="$router.push('/')">🏠Home</button>
      <h1>Adventuring in the Tower</h1>
      <button class="button button-mute" @click="toggleMute">🔊</button>
    </div>
    <div class="flex flex-column">
      <div style="color: aliceblue" class="flex flex-row flex-space-between" id="game-header">
        <Map />
        <HealthBar />
      </div>
      <canvas id="canvas" :width="window_width" :height="window_height / 1.5"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Map from '../../components/Map.vue'
import HealthBar from '../../components/Healthbar.vue'
const window_width = ref(window.innerWidth)
const window_height = ref(window.innerHeight)

const handle_resize = () => {
  window_width.value = window.innerWidth
  window_height.value = window.innerHeight
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

onMounted(() => {
  window.addEventListener('resize', handle_resize)
  document.addEventListener('mousemove', playAudio)
})

onUnmounted(() => {
  window.removeEventListener('resize', handle_resize)
  document.removeEventListener('mousemove', playAudio)
})
/*
    // mostrare il popup
    const confirmExit = () => {
      showConfirmDialog.value = true
    }
    
    // tornare alla home
    const goToHome = () => {
      showConfirmDialog.value = false
      window.location.href = "/menu"
    }
    
    // chiudere il popup
    const closeDialog = () => {
      showConfirmDialog.value = false
    }
    */
</script>

<style scoped>
.master {
  background: url('../../style/sfondo3.gif');
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
