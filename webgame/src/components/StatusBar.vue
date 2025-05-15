<script setup lang="ts">
import ProgressBar from './ProgressBar.vue'
import { computed, defineProps, type Ref } from 'vue'
import Filler from './Filler.vue'

const props = defineProps({
    hp: {
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
        <div class="flex items-center gap-small">
            <span>HP:</span>
            <ProgressBar :progress="healthPercentage" color="red" />
            <span>{{ props.hp }}/{{ props.maxHealth }}</span>
        </div>
        <div class="flex items-center gap-small">
            <span>Mana:</span>
            <ProgressBar :progress="manaPercentage" color="blue" />
            <span>{{ props.mana }}/{{ props.maxMana }}</span>
        </div>
        <div class="flex items-center gap-small">
            <span>Level:</span>
            <span>{{ props.level }}</span>
        </div>
        <div class="flex items-center gap-large">
            <Filler :text="'Q'" :percentage="props.cooldownQ" :max="props.maxCooldownQ"/>
            <Filler :text="'R'" :percentage="props.cooldownR" :max="props.maxCooldownR"/>
        </div>
    </div>
</template>

<style scoped>
.status-bar {
    padding: 10px;
    background-color: #222;
    border-radius: 8px;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.cooldown-container span {
    position: absolute;
    font-size: 14px;
    font-weight: bold;
    color: white;
}

#game-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
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
</style>
