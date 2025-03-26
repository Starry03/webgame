<template>
  <link
    href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
    rel="stylesheet"
  />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <audio controls style="display: none" id="music" autoplay loop>
    <source src="../../style/Song_of_Heart.mp3" type="audio/mpeg" />
  </audio>
  <div class="flex flex-column flex-center gap-big">
    <button class="button button-logout" @click="logout">Logout</button>
    <button class="button button-mute" @click="toggleMute">🔊</button>

    <h1>Awakening in the Dark Tower</h1>
    <br />
    <button class="button button-primary b-play" @click="$router.push('/game')">Play</button>
    <button class="button button-secondary b-tutorial" @click="$router.push('/tutorial')">
      Tutorial
    </button>

    <button class="button button-secondary b-shop" @click="$router.push('/login')">Login</button>
    <!--
     <button class="button button-secondary b-shop" @click="$router.push('/shop')">Shop</button>-->
    <button class="button button-secondary b-settings" @click="$router.push('/settings')">
      Settings
    </button>
  </div>
</template>
<script setup>

function logout() {
  console.log('Logout eseguito');
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

function onMounted() {
  function playAudio() {
    let audio = document.getElementById('music')
    audio.play().catch((error) => console.log('Riproduzione bloccata:', error))
  }
  document.addEventListener('mousemove', playAudio)
}
</script>
<style scoped>
div {
  background: url('../../style/sfondo3.gif');
  background-size: cover;
  display: flex;
  height: 100vh;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

button,
h1 {
  font-family: 'Press Start 2P', cursive;
}

.button-primary,
.button-secondary {
  border: none;
  background-color: transparent;
  color: white;
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
  font-size: 2rem;
  text-shadow:
    0 0 10px black,
    0 0 20px black;
  color: darkred;
  transition: 0.1s;
  animation: liquido 4s ease-in-out infinite alternate;
}

.b-settings,
.b-tutorial {
  margin-left: -50px;
  font-display: flex;
}

.b-play:hover {
  transform: scale(1.2);
  text-shadow:
    0 0 10px blue,
    0 0 20px blue;
}

.b-tutorial:hover {
  transform: scale(1.1);
  text-shadow:
    0 0 10px lightgreen,
    0 0 20px lightgreen;
}

.b-shop:hover {
  transform: scale(1.1);
  text-shadow:
    0 0 10px yellow,
    0 0 20px yellow;
}

.b-settings:hover {
  transform: scale(1.1);
  text-shadow:
    0 0 10px darkviolet,
    0 0 20px darkviolet;
}

.button-logout {
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

.button-logout:hover,
.button-mute:hover {
  transform: scale(1.1);
  text-shadow:
    0 0 10px black,
    0 0 20px black;
}
</style>
