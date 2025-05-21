<script setup lang="ts">
import ProgressBar from './ProgressBar.vue'
import { computed, defineProps, onMounted, onUnmounted, ref, type Ref } from 'vue'
import Filler from './Filler.vue'
import { Storage_e } from '@/internal/types'

const props = defineProps({
    hp: {
        type: Number,
        required: true,
        default: 1000,
    },
    maxHealth: {
        type: Number,
        required: true,
        default: 1000,
    },
    mana: {
        type: Number,
        required: true,
        default: 100,
    },
    maxMana: {
        type: Number,
        required: true,
        default: 100,
    },
    level: {
        type: Number,
        default: 1,
    },
    cooldownQ: {
        type: Object as () => Ref<number>,
        required: true,
        default: 0,
    },
    maxCooldownQ: {
        type: Number,
        required: true,
    },
    cooldownR: {
        type: Object as () => Ref<number>,
        required: true,
        default: 0,
    },
    maxCooldownR: {
        type: Number,
        required: true,
    },
})

function formatTime(seconds: number): string {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}

const playTime = ref(0)
let intervalId: number | undefined

onMounted(() => {
    const start = Date.now()
    intervalId = window.setInterval(() => {
        playTime.value = Math.floor((Date.now() - start) / 1000)
    }, 1000)
})

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId)
})


const healthPercentage = computed(() => {
    const percentage = (props.hp / props.maxHealth) * 100 || 0
    return isNaN(percentage) || percentage < 0 ? 0 : percentage
})
const manaPercentage = computed(() => {
    const percentage = (props.mana / props.maxMana) * 100 || 0
    return isNaN(percentage) || percentage < 0 ? 0 : percentage
})

const storedUser = localStorage.getItem(Storage_e.USER)
const username = storedUser ? JSON.parse(storedUser)?.username ?? 'Player' : 'Player'
</script>

<template>
    <div class="status-bar flex flex-col gap-mid">
        <div class="player-header">
            <span class="player-name">{{ username }}</span>
            <span class="player-level">Level: {{ props.level }}</span>
            <span class="player-time">Time: {{ formatTime(playTime) }}</span>
        </div>
        <div class="bars-and-cooldowns">
            <div class="bars">
                <div class="bar-container flex items-center gap-small">
                    <span>HP:</span>
                    <ProgressBar :progress="healthPercentage" color="crimson" />
                    <span class="hp-value">{{ props.hp }}/{{ props.maxHealth }}</span>
                </div>
                <div class="bar-container flex items-center gap-small">
                    <span>MP:</span>
                    <ProgressBar :progress="manaPercentage" color="cyan" class="mana-bar" />
                    <span class="mp-value">{{ props.mana }}/{{ props.maxMana }}</span>
                </div>
            </div>
            <div class="cooldown-container">
                <Filler :text="'Q'" :percentage="props.cooldownQ" :max="props.maxCooldownQ"/>
                <Filler :text="'R'" :percentage="props.cooldownR" :max="props.maxCooldownR"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

.status-bar {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: #333;
    border-radius: 8px;
    color: white;
    font-size: 14px;
    height: 100%;
    max-width: 600px;
}

.player-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 0.5rem;
    justify-content: space-between;
}

.player-name {
    color: orange;
}

.player-time{
    margin-left: auto;
    color: #8ff;
}

.bars-and-cooldowns {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    gap: 1rem;
}

span{
    font-family: 'Press Start 2P', cursive;
    font-size: var(--font-small);
}

.hp-value,
.mp-value {
    font-size: 0.5rem;
    color: #ccc;
}

.bars {
    flex: 3 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.bar-container {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
}

.progress-bar {
    flex: 1 1 0;
    min-width: 0;
    max-width: 100%;
}

.mana-bar {
    width: 40%;
    max-width: 50%;
}

.cooldown-container {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    align-items: center;
    justify-content: flex-end;
    min-width: 0;
    width: auto;
    padding-right: 4px;
}

@media (max-width: 768px) {
    .status-bar {
        font-size: 12px;
        max-width: 100vw;
        padding: 5px;
    }
    .bars-and-cooldowns {
        flex-direction: column;
        gap: 1rem;
    }
    .cooldown-container {
        flex-direction: row;
        gap: 1rem;
        align-items: center;
        justify-content: flex-start;
    }
    .player-header {
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;
    }
}

@media (max-width: 768px) {
    #canvas {
        width: 80%;
        height: auto;
    }

    .status-bar {
        font-size: 14px;
    }
}

@media (orientation: landscape) and (max-height: 500px) {
    .status-bar {
        font-size: 10px;
        width: 50%;
        height: 100%
    }
    .bar-container {
        gap: 5px;
    }
    .cooldown-container {
        width: 30%;
        height: 90%;
    }
    .cooldown-bar {
        width: 50%;
        height: 150%;
    }

    #canvas {
        width: 100%;
        height: 100%;
    }

}
</style>
