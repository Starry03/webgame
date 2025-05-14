<script setup lang="ts">
import type { Samurai } from '@/internal/Samurai';
import type { Mage } from '@/internal/Mage';
import type { Thief } from '@/internal/Thief';
import ProgressBar from './ProgressBar.vue';
import { computed, defineProps } from 'vue';

const props = defineProps({
  hp: {
    type: Number,
    required: true,
    default: 100,
  },
  maxHealth: {
    type: Number,
    required: true,
    default: 100,
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
  cooldownE: {
    type: Number,
    default: 0,
  },
  cooldownQ: {
    type: Number,
    default: 0,
  },
  cooldownR: {
    type: Number,
    default: 0,
  }
});

// Percentuali per le barre di progresso
const healthPercentage = computed(() => {
  const percentage = (props.hp / props.maxHealth) * 100 || 0;
  return isNaN(percentage) || percentage < 0 ? 0 : percentage;
});
const manaPercentage = computed(() => {
  const percentage = (props.mana / props.maxMana) * 100 || 0;
  return isNaN(percentage) || percentage < 0 ? 0 : percentage;
});

console.log('Props ricevute:', props);
console.log('Health Percentage:', healthPercentage.value);
console.log('Mana Percentage:', manaPercentage.value);

</script>

<template>
  <div class="status-bar flex flex-col gap-mid">
    <!-- Barra della vita -->
    <div class="flex items-center gap-small">
      <span>HP:</span>
      <ProgressBar :progress="healthPercentage" color="red" />
      <span>{{ props.hp }}/{{ props.maxHealth }}</span>
    </div>

    <!-- Barra del mana -->
    <div class="flex items-center gap-small">
      <span>Mana:</span>
      <ProgressBar :progress="manaPercentage" color="blue" />
      <span>{{ props.mana }}/{{ props.maxMana }}</span>
    </div>

    <!-- Livello del personaggio -->
    <div class="flex items-center gap-small">
      <span>Level:</span>
      <span>{{ props.level }}</span>
    </div>

    <!-- Cooldown per Q e R -->
    <div class="flex items-center gap-large">
      <!-- Cooldown E -->
      <div class="cooldown-container">
        <div class="cooldown-circle" :style="{ '--progress': (props.cooldownE / 0.5) * 100 + '%' }"></div>
        <span>E</span>
      </div>
      
      <!-- Cooldown Q -->
      <div class="cooldown-container">
        <div class="cooldown-circle" :style="{ '--progress': (props.cooldownQ / 2.5) * 100 + '%' }"></div>
        <span>Q</span>
      </div>

      <!-- Cooldown R -->
      <div class="cooldown-container">
        <div class="cooldown-circle" :style="{ '--progress': (props.cooldownR / 7) * 100 + '%' }"></div>
        <span>R</span>
      </div>
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

.cooldown-container {
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cooldown-circle {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    rgba(255, 255, 255, 0.5) var(--progress, 0),
    transparent 0
  );
  border: 2px solid rgba(255, 255, 255, 0.2);
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

