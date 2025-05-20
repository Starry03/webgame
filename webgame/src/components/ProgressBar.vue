<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  progress: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  }
})
</script>
<template>
  <div class="progress-bar">
    <div class="progress" :style="{ width: `${progress}%`, backgroundColor: color }"></div>
  </div>
</template>

<style scoped>
.progress-bar {
  width: 100%;
  min-width: 60px;
  max-width: 100%;
  background-color: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  flex: 1 1 0;
}
.progress {
  height: 10px;
  background-color: #76c7c0;
  transition: width 0.3s ease;
}
</style>
