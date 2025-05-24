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
onMounted(() => {
    console.debug(props)

})

onUnmounted(() => {})


const healthPercentage = computed(() => {
    const percentage = (props.health / props.maxHealth) * 100 || 0
    return isNaN(percentage) || percentage < 0 ? 0 : percentage
})
const manaPercentage = computed(() => {
    const percentage = (props.mana / props.maxMana) * 100 || 0
    return isNaN(percentage) || percentage < 0 ? 0 : percentage
})

const storedUser = localStorage.getItem('')
const bossName = 
</script>

<template>
    <div class="boss-status-bar flex flex-col gap-mid">
        <div class="boss-header">
            <span class="boss-name">BOSS: {{ props.bossName }}</span>
            <span class="boss-level">Lv. {{ props.level }}</span>
        </div>
        <div class="bars-and-cooldowns">
            <div class="cooldown-container">
                <Filler :text="'Q'" :percentage="props.cooldownQ" :max="props.maxCooldownQ"/>
                <Filler :text="'R'" :percentage="props.cooldownR" :max="props.maxCooldownR"/>
            </div>
            <div class="bars">
                <div class="bar-container flex items-center gap-small">
                    <span class="hp-value">{{ props.health }}/{{ props.maxHealth }}</span>
                    <ProgressBar :progress="healthPercentage" color="violet" class="boss-hp-bar"/>
                    <span>:HP</span>
                </div>
                <div class="bar-container flex items-center gap-small">
                    <span class="mp-value">{{ Math.floor(props.mana) }}/{{ props.maxMana }}</span>
                    <ProgressBar :progress="manaPercentage" color="blue" class="boss-mana-bar" />
                    <span>:MP</span>
                </div>
            </div>            
        </div>
    </div>
</template>

<style scoped>
.boss-status-bar {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: #333;
    /*background: linear-gradient(90deg, #3a0d0d 60%, #6e1e1e 100%);
    /*border: 3px solid gold;*/
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    /*box-shadow: 0 0 24px 4px #b3000088, 0 0 8px 2px gold;*/
    height: 100%;
    max-width: 500px;
    /*animation: boss-bar-glow 2s infinite alternate;*/
}
/*
@keyframes boss-bar-glow {
    from { box-shadow: 0 0 24px 4px #b3000088, 0 0 8px 2px gold; }
    to   { box-shadow: 0 0 36px 8px #ff333388, 0 0 16px 4px gold; }
}*/

.boss-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    letter-spacing: 2px;
    text-shadow: 0 0 10px black, 0 0 20px black;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

span{
    font-family: 'Press Start 2P', cursive;
}

.boss-name {
    color: gold;
    font-size: var(--font-small);
    /*text-shadow: 0 0 8px #fff, 0 0 16px #b30000;*/
}

.boss-level {
    color: #f93200;
    margin-left: 1.5rem;
    /*text-shadow: 0 0 6px #fff;*/
}

.bars-and-cooldowns {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: 100%;
    gap: 1rem;
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

.boss-hp-bar {
    box-shadow: 0 0 8px 2px #ff0000aa;
}

.boss-mana-bar {
    width: 40%;
    max-width: 500px;
    box-shadow: 0 0 8px 2px #ffd700aa;
}

.hp-value,
.mp-value {
    font-size: 0.5rem;
    color: /*#ffd700*/ #ccc;
}

.cooldown-container {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
    align-items: center;
    justify-content: flex-start;
    min-width: 0;
    width: auto;
    padding-right: 4px;
}

span{
    font-family: 'Press Start 2P', cursive;
    font-size: var(--font-small);
}

/*@media (max-width: 768px) {
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
}*/

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
