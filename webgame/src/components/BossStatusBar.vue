<script setup lang="ts">
import ProgressBar from './ProgressBar.vue'
import Filler from './Filler.vue'
import { computed, defineProps, onMounted, onUnmounted, ref, type Ref } from 'vue'

const props = defineProps({
    health: {
        type: Number,
        required: true,
    },
    maxHealth: {
        type: Number,
        required: true,
    },
    mana: {
        type: Number,
        required: true,
    },
    maxMana: {
        type: Number,
        required: true,
    },
    level: {
        type: Number,
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
onMounted(() => {})

onUnmounted(() => {})


const healthPercentage = computed(() => {
    const percentage = (props.health / props.maxHealth) * 100 || 0
    return isNaN(percentage) || percentage < 0 ? 0 : percentage
})
const manaPercentage = computed(() => {
    const percentage = (props.mana / props.maxMana) * 100 || 0
    return isNaN(percentage) || percentage < 0 ? 0 : percentage
})
</script>

<template>
    <div class="boss-status-bar flex flex-col gap-mid">
        <div class="boss-header">
            <span class="boss-name">BOSS: Gorgone Rossa</span>
            <span class="boss-level">Lv. {{ props.level }}</span>
        </div>
        <div class="bars-and-cooldowns">
            <div class="bars">
                <div class="bar-container flex items-center gap-small">
                    <span>HP:</span>
                    <ProgressBar :progress="healthPercentage" color="violet" class="boss-hp-bar"/>
                    <span class="hp-value">{{ props.health }}/{{ props.maxHealth }}</span>
                </div>
                <div class="bar-container flex items-center gap-small">
                    <span>MP:</span>
                    <ProgressBar :progress="manaPercentage" color="blue" class="boss-mana-bar" />
                    <span class="mp-value">{{ Math.floor(props.mana) }}/{{ props.maxMana }}</span>
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
.boss-status-bar {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 18px 24px;
    background: linear-gradient(90deg, #3a0d0d 60%, #6e1e1e 100%);
    border: 3px solid gold;
    border-radius: 14px;
    color: #fff;
    font-size: 1.1rem;
    box-shadow: 0 0 24px 4px #b3000088, 0 0 8px 2px gold;
    max-width: 700px;
    margin: 0 auto;
    animation: boss-bar-glow 2s infinite alternate;
}

@keyframes boss-bar-glow {
    from { box-shadow: 0 0 24px 4px #b3000088, 0 0 8px 2px gold; }
    to   { box-shadow: 0 0 36px 8px #ff333388, 0 0 16px 4px gold; }
}

.boss-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Press Start 2P', cursive;
    font-size: 1.3rem;
    letter-spacing: 2px;
    text-shadow: 0 0 8px #b30000, 0 0 16px #fff;
    margin-bottom: 0.5rem;
}

.boss-name {
    color: gold;
    font-weight: bold;
    text-shadow: 0 0 8px #fff, 0 0 16px #b30000;
}

.boss-level {
    color: #ffb347;
    font-size: 1.1rem;
    margin-left: 1.5rem;
    text-shadow: 0 0 6px #fff;
}

.bars-and-cooldowns {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    gap: 2rem;
}

.bars {
    flex: 3 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.bar-container {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    font-size: 1.1rem;
}

.boss-hp-bar {
    height: 22px;
    border-radius: 8px;
    box-shadow: 0 0 8px 2px #ff0000aa;
}

.boss-mana-bar {
    height: 18px;
    border-radius: 8px;
    box-shadow: 0 0 8px 2px #ffd700aa;
}

.hp-value,
.mp-value {
    font-size: 0.9rem;
    color: #ffd700;
    text-shadow: 0 0 4px #000;
}

.cooldown-container {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: flex-end;
    min-width: 0;
    width: auto;
    padding-right: 4px;
}

span{
    font-family: 'Press Start 2P', cursive;
    font-size: var(--font-small);
}

@media (max-width: 768px) {
    .boss-status-bar {
        font-size: 1rem;
        padding: 8px 6px;
        max-width: 100vw;
    }
    .bars-and-cooldowns {
        flex-direction: column;
        gap: 1rem;
    }
    .boss-header {
        font-size: 1rem;
    }
}

@media (max-width: 600px) {
  .boss-status-bar {
    font-size: 0.9rem;
    padding: 6px 2px;
    max-width: 100vw;
    min-width: 0;
    border-width: 2px;
  }
  .bars-and-cooldowns {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }
  .boss-header {
    flex-direction: column;
    align-items: flex-start;
    font-size: 1rem;
    gap: 0.2rem;
  }
  .bar-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  .cooldown-container {
    justify-content: flex-start;
    gap: 0.5rem;
    padding-right: 0;
  }
  .boss-hp-bar, .boss-mana-bar {
    height: 14px;
    font-size: 0.8rem;
  }
}
</style>
