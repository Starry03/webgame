<script setup lang="ts">
import ProgressBar from './ProgressBar.vue';
import { ref, computed, watch } from 'vue';

defineProps({
  health: Number,
  maxHealth: Number,
  mana: Number,
  maxMana: Number,
  level: Number,
  exp: Number,
  canAttack: Boolean,
});


const cooldownQ = ref(0); // Cooldown per l'attacco Q
const cooldownR = ref(0); // Cooldown per l'attacco R
const maxCooldownQ = 3; // Cooldown massimo per Q in secondi
const maxCooldownR = 5; // Cooldown massimo per R in secondi

// Funzione per avviare il cooldown
function startCooldown(ability: 'Q' | 'R') {
  if (ability === 'Q' && cooldownQ.value === 0) {
    cooldownQ.value = maxCooldownQ;
    const interval = setInterval(() => {
      cooldownQ.value -= 0.1;
      if (cooldownQ.value <= 0) clearInterval(interval);
    }, 100);
  } else if (ability === 'R' && cooldownR.value === 0) {
    cooldownR.value = maxCooldownR;
    const interval = setInterval(() => {
      cooldownR.value -= 0.1;
      if (cooldownR.value <= 0) clearInterval(interval);
    }, 100);
  }
}

watch([cooldownQ, cooldownR], ([newQ, newR]) => {
  console.log('Cooldown Q:', newQ);
  console.log('Cooldown R:', newR);
});

// Percentuali per le barre di progresso
const healthPercentage = /*computed(() => (health / maxHealth) * */ 100;//);
const manaPercentage = /*computed(() => (mana / maxMana) * */100;//);


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
        <div class="cooldown-circle" :style="{ '--progress': (cooldownQ / maxCooldownQ) * 100 + '%' }"></div>
        <span>Q</span>
      </div>

      <!-- Cooldown R -->
      <div class="cooldown-container">
        <div class="cooldown-circle" :style="{ '--progress': (cooldownR / maxCooldownR) * 100 + '%' }"></div>
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
<!--
<template>
  <div class="flex flex-row gap-mid">
    <ProgressBar :progress="health" />
  </div>
</template>

-->

