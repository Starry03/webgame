<script setup lang="ts">
import type { Thief } from '@/internal/Thief';
import ProgressBar from './ProgressBar.vue';
import { ref, computed, watch } from 'vue';
import type { Samurai } from '@/internal/Samurai';
import type { Mage } from '@/internal/Mage';

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
  level: Number,
  cooldownQ: Number,
  cooldownR: Number,
});

// Percentuali per le barre di progresso
const healthPercentage = computed(() => (props.health / props.maxHealth) * 100 || 0);
const manaPercentage = computed(() => (props.mana / props.maxMana) * 100 || 0);


</script>

<template>
  <div class="status-bar flex flex-col gap-mid">
    <!-- Barra della vita -->
    <div class="flex items-center gap-small">
      <span>HP:</span>
      <ProgressBar :progress="healthPercentage" color="red" />
      <span>{{ health }}/{{ maxHealth }}</span>
    </div>

    <!-- Barra del mana -->
    <div class="flex items-center gap-small">
      <span>Mana:</span>
      <ProgressBar :progress="manaPercentage" color="blue" />
      <span>{{ mana }}/{{ maxMana }}</span>
    </div>

    <!-- Livello del personaggio -->
    <div class="flex items-center gap-small">
      <span>Level:</span>
      <span>{{ level }}</span>
    </div>

    <!-- Cooldown per Q e R -->
    <div class="flex items-center gap-large">
      <!-- Cooldown Q -->
      <div class="cooldown-container">
        <div class="cooldown-circle" :style="{ '--progress': cooldownQ?.toFixed(1) /*/ Player.arguments.maxCooldownQ.toFixed(1)) * 100 + '%'*/ }"></div>
        <span>Q</span>
      </div>

      <!-- Cooldown R -->
      <div class="cooldown-container">
        <div class="cooldown-circle" :style="{ '--progress': cooldownR?.toFixed(1) /*/ Player.arguments.maxCooldownR.toFixed(1)) * 100 + '%'*/ }"></div>
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
</style>

