<script setup lang="ts">
import ProgressBar from './ProgressBar.vue'
import Filler from './Filler.vue'
import { Storage_e } from '@/internal/types'
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

const bossName = ref('Boss')

onMounted(() => {
    //console.debug(props)
    const chars = localStorage.getItem('aitdt_characters')
    if (chars) {
        try {
            const arr = JSON.parse(chars)
            const bossObj = arr.find((c: any) => c.name === 'gorgone rossa')
            bossName.value = bossObj?.displayName || bossObj?.name || 'Boss'
        } catch (e) {
            bossName.value = 'Boss'
        }
    }
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
</script>

<template>
    <div class="boss-status-bar flex flex-col flex-end gap-mid">
        <div class="boss-header">
            <span class="boss-name">{{ bossName }}</span>
            <span class="boss-level">Lv. 20</span>
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
                <div class="bar-container flex-end flex items-center gap-small">
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
    border-radius: 8px;
    color: #fff;
    font-size: 10px;
    height: 100%;
    width: 100%;
    max-width: 600px;
}

.boss-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 0.5rem;
    font-size: 10px;
    letter-spacing: 2px;
    text-shadow: 0 0 10px black, 0 0 20px black;
    font-weight: bold;
}

span{
    font-family: 'Press Start 2P', cursive;
}

.boss-name {
    color: gold;
}

.boss-level {
    color: #f93200;
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
    justify-content: flex-end;
    gap: 10px;
    width: 100%;
}

.boss-hp-bar {
    width: 100%;
    min-width: 130px;
    max-width: 100%;
    justify-content: flex-end;
}

.boss-mana-bar {
    width: 20%;
    max-width: 40%;
    min-width: 80px;
}

.hp-value,
.mp-value {
    font-size: 0.5rem;
    color: #ccc;    
    display: inline-block;
    min-width: 70px;    
    text-align: right;
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

span{
    font-family: 'Press Start 2P', cursive;
    font-size: var(--font-small);
}

@media (max-width: 768px) {
    .boss-status-bar {
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
    .boss-header {
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

@media (orientation: landscape) and (max-height: 550px) {
    .boss-status-bar {
        font-size: 10px;
        max-width: 100vw;
        padding: 3px 5px;
        overflow: hidden;
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
        width: 45%;
        height: 90%;
    }

}
</style>
