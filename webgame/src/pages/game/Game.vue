<template>
    <audio controls style="display: none" id="music" autoplay loop>
        <source src="/assets/audio/Trust_In_Your_Perseverance.wav" type="audio/mpeg" />
    </audio>
    <div class="master flex flex-column flex-align gap-big">
        <div class="flex flex-row flex-center header-bar flex-space-between gap-big">
            <button class="button button-secondary button-home" @click="goHome">Home</button>
            <h1 v-if="!isMobile" class="title">Awakening in the Dark Tower</h1>
            <button class="button button-secondary button-mute" @click="toggleMute">🔊</button>
        </div>
        <div v-if="isReady" class="flex flex-column flex-fit">
            <StatusBar
                :health="80"
                :maxHealth="100"
                :mana="50"
                :maxMana="100"
                :level="5"
                :canAttack="true"
            />
            <Canvas />
        </div>
        <button v-else class="button button-primary" :onclick="handleFullscreen">
            LOCK
        </button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Canvas from '@/components/Canvas.vue'
import { useRouter } from 'vue-router'
import { prefixed } from '@/internal/cryptoutils'
import { Storage_e } from '@/internal/types'

const router = useRouter()
const isReady = ref(false)

async function handleFullscreen() {
    try {
        await document.documentElement.requestFullscreen({
            navigationUI: 'hide',
        } as FullscreenOptions)
        await screen.orientation.lock('portrait')
    } catch (error) {
        console.error(error)
    }
    isReady.value = true
}

function playAudio() {
    const audio = document.getElementById('music')
    audio?.play().catch((error: any) => console.log('Riproduzione bloccata:', error))
}

function toggleMute() {
    const audio = document.getElementById('music')
    if (audio.muted) {
        audio.muted = false
        event.target.innerText = '🔊'
    } else {
        audio.muted = true
        event.target.innerText = '🔇'
    }
}


const isMobile = ref(false)

function checkMobile() {
    isMobile.value = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent)
    console.log('isMobile:', isMobile.value)
}

onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
})

function goHome() {
    localStorage.removeItem(prefixed(Storage_e.SELECTED_CHARACTER))
    router.push('/')
}

onMounted(async () => {
    document.addEventListener('mousemove', playAudio)
})

onUnmounted(async () => {
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
        font-size: var(--font-medium);
    }

    .button-mute {
        width: fit-content;
        height: fit-content;
        font-size: var(--font-small);
    }

    .button-home {
        text-size-adjust: var(--font-small);
    }
}
@media (orientation: landscape) {
    h1 {
        text-align: center;
        width: 69%;
    }

    .button-home {
        text-size-adjust: var(--font-small);
    }

    .button-mute {
        width: fit-content;
        height: fit-content;
    }
}

.master {
    background: url('/assets/images/sfondo3.gif');
    background-size: cover;
    height: 100vh;
}

.title {
    font-size: var(--font-big);
    text-shadow:
        0 0 10px black,
        0 0 20px black;
    color: darkred;
}

.header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem 1.5rem;
    position: relative;
    min-height: 48px;
    z-index: 10;
    background: transparent;
}

.button-home {
    font-size: var(--font-medium);
    align-self: flex-start;
}

.button-mute {
    font-size: var(--font-big);
    align-self: flex-end;
}

.button-home:hover,
.button-mute:hover {
    transform: scale(1.1);
    text-shadow:
        0 0 10px black,
        0 0 20px black;
}
</style>
