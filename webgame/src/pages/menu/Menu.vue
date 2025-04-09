<template>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <audio controls style="display: none" id="music" autoplay loop>
    <source src="../../style/Song_of_Heart.mp3" type="audio/mpeg" />
  </audio>
  <div class="flex flex-column flex-center gap-mid">
    <button class="button button-mute" @click="toggleMute">🔊</button>
    <h1>Awakening in the Dark Tower</h1>
    <button class="button button-secondary b-play" @click="redirectGameButton">Play</button>
    <button class="button button-secondary b-shop" @click="$router.push('/login')">Login</button>
    <!--⚙️-->
    <button class="button button-secondary b-settings" @click="$router.push('/settings')">
      Settings
    </button>
    <!----><button class="button button-secondary button-logout" @click="logout">Logout</button>
  </div>
</template>
<script setup>
import { AESUtils, prefixed } from '@/internal/cryptoutils'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

const router = useRouter()

function logout() {
  console.log('Logout eseguito')
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

function redirectGameButton() {
  try {
    AESUtils.read()
  } catch (error) {
    router.push('/login')
  }
  const character = localStorage.getItem(prefixed('selectedCharacter'))
  if (character == null) router.push('/selection')
  router.push('/game')
}

onMounted(() => {
  function playAudio() {
    let audio = document.getElementById('music')
    audio?.play().catch((error) => console.log('Riproduzione bloccata:', error))
  }
  document.addEventListener('mousemove', playAudio)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', playAudio);
})
</script>

<style scoped>
@media (max-height: 600px) {
  h1 {
    font-size: var(--font-mid);
    padding-top: 7%;
  }

  .button {
    font-size: var(--font-small);
  }

  .button-mute {
    width: fit-content;
    height: fit-content;
  }
}

@media (orientation: landscape) {
  h1 {
    margin-bottom: 2%;
  }
}

@media (orientation: portrait) {
  h1 {
    font-size: var(--font-big);
    text-align: center;
    width: 69%;
    display: block;
    margin-bottom: 15%;
  }

  .button-mute {
    width: fit-content;
    height: fit-content;
    position: absolute;
    top: 0;
    left: 75svw;
  }
}

div {
  background: url('../../style/sfondo3.gif');
  background-size: cover;
  display: flex;
  height: 100svh;
  width: 100svw;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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

.button-logout {
  background-color: transparent;
}

.button-mute {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 3rem;
  background-color: transparent;
}

.button-logout:hover,
.button-mute:hover {
  transform: scale(1.1);
  text-shadow:
    0 0 10px black,
    0 0 20px black;
}
</style>
