<template>
  <audio controls style="display: none" id="music" autoplay loop>
    <source src="../../../public/assets/audio/Trust_In_Your_Perseverance.wav" type="audio/mpeg" />
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
      <Canvas />
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Canvas from '@/components/Canvas.vue'
import Map from '@/components/Map.vue'
import HealthBar from '@/components/Healthbar.vue'

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
  document.addEventListener('mousemove', playAudio)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', playAudio)
})
</script>

<style scoped>
.master {
  background: url('/webgame/public/assets/images/sfondo3.gif');
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
