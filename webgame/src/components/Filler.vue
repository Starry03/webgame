<script setup lang="ts">
import type { Ref } from 'vue';

const props = defineProps({
    percentage: {
        type: Object as () => Ref<number>,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    max: {
        type: Number,
        required: true,
    },
})
</script>

<template>
    <div class="cooldown-container">
        <div class="cooldown-circle" :style="{ '--progress': percentage.value / max * 100 + '%' }">
            <span>{{ text }}</span>
        </div>
    </div>
</template>

<style scoped>
.cooldown-container {
  display: flex;
  flex-direction: row;      
  gap: 1rem;
  align-items: center;
  justify-content: flex-end;
  min-width: 120px;         
}

/* Filler.vue */
.cooldown-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cooldown-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  background: conic-gradient(
    rgba(255,255,255,0.5) var(--progress, 0),
    transparent var(--progress, 0)
  );
  margin-bottom: 4px;
  box-sizing: border-box;
}

.cooldown-circle span {
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  width: 100%;
  line-height: 1;
  z-index: 1;
  user-select: none;
}
</style>
