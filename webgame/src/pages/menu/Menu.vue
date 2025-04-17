<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <audio controls style="display: none" id="music" autoplay loop>
    <source src="/assets/audio/Song_of_Heart.mp3" type="audio/mpeg" />
  </audio>
  <div id="wrapper" class="flex flex-center" style="">
    <div class="flex flex-column flex-center gap-big">
      <button class="button button-secondary button-mute" @click="toggleMute">
        {{ mute_icon }}
      </button>
      <h1>Awakening in the Dark Tower</h1>
      <div class="flex flex-column flex-center gap-small">
        <button class="button button-secondary b-play" @click="redirectGameButton">Play</button>
        <!--⚙️-->
        <button class="button button-secondary b-settings" @click="$router.push('/settings')">
          Settings
        </button>
        <button
          v-if="!SessionUtils.isLogged()"
          class="button button-secondary b-shop"
          @click="$router.push('/login')"
        >
          Login
        </button>
        <button v-else class="button button-secondary button-logout" @click="logout">Logout</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { SessionUtils, prefixed } from '@/internal/cryptoutils'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'

const router = useRouter()
const mute_icon = ref('🔊')

function logout() {
  SessionUtils.logout()
  router.push('/login')
}

function toggleMute() {
  mute_icon.value = mute_icon.value === '🔊' ? '🔇' : '🔊'
  const audio = document.getElementById('music')
  if (audio) {
    audio.muted = !audio.muted
  }
}

function redirectGameButton() {
  if (!SessionUtils.isLogged()) {
    router.push('/login')
    return
  }
  const character = localStorage.getItem(prefixed('selectedCharacter'))
  if (character == null) {
    router.push('/selection')
    return
  }
  router.push('/game')
}

function playAudio() {
  let audio = document.getElementById('music')
  audio?.play().catch((error) => console.log('Riproduzione bloccata:', error))
}

onMounted(() => {
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
    left: 75svw;
  }
}

#wrapper {
  background: url('assets/images/sfondo3.gif');
  background-size: cover;
  height: 100svh;
  width: 100svw;
}

@keyframes liquido {
  0% {
    filter: blur(0px);
    transform: scale(1);
  }

  30% {
    transform: scale(1.1);
    filter: blur(2px);
    text-shadow:
      0 0 10px black,
      0 0 20px darkred;
    color: red;
  }

  60% {
    filter: blur(1px);
    transform: scale(0.95);
  }

  100% {
    filter: blur(0px);
  }
}

h1 {
  text-shadow:
    0 0 10px black,
    0 0 20px black;
  color: darkred;
  transition: 0.1s;
  animation: liquido 4s ease-in-out infinite alternate;
}

.button-mute {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 2rem;
}

.b-play:hover {
  transform: scale(1.2);
  text-shadow:
    0 0 10px blue,
    0 0 20px blue;
}

.b-settings:hover {
  transform: scale(1.1);
  text-shadow:
    0 0 10px darkviolet,
    0 0 20px darkviolet;
}

.button-logout:hover,
.button-mute:hover {
  transform: scale(1.1);
  text-shadow:
    0 0 10px black,
    0 0 20px black;
}
</style>
