<script setup lang="ts">
import ProgressBar from './ProgressBar.vue'
import { computed, defineProps, type Ref } from 'vue'
import Filler from './Filler.vue'

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

const healthPercentage = computed(() => {
    const percentage = (props.hp / props.maxHealth) * 100 || 0
    return isNaN(percentage) || percentage < 0 ? 0 : percentage
})
const manaPercentage = computed(() => {
    const percentage = (props.mana / props.maxMana) * 100 || 0
    return isNaN(percentage) || percentage < 0 ? 0 : percentage
})
</script>

<template>
    <div class="status-bar flex flex-col gap-mid">
        <div class="player-name">
            <span>Player Name</span> 


        </div>
        <div class="bar-container flex items-center gap-small">
            <span>HP:</span>
            <ProgressBar :progress="healthPercentage" color="crimson" />
            <span>{{ props.hp }}/{{ props.maxHealth }}</span>
        </div>
        <div class="bar-container flex items-center gap-small">
            <span>Mana:</span>
            <ProgressBar :progress="manaPercentage" color="cyan" class="mana-bar" />
            <span>{{ props.mana }}/{{ props.maxMana }}</span>
        </div>
        <div class="flex items-center gap-small">
            <span>Level:</span>
            <span>{{ props.level }}</span>
        </div>
        <div class="cooldown-container flex items-center gap-large">
            <div class="cooldown-bar">
                <Filler :text="'Q'" :percentage="props.cooldownQ" :max="props.maxCooldownQ"/>
            </div>
            <div class="cooldown-bar">
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
}

.bar-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.mana-bar {
    width: 50%;
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
