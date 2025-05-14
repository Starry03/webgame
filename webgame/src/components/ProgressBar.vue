<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  progress: {
    type: Number,
    required: true,
  },
})
</script>
<template>
  <div class="progress-bar">
    <div class="progress" :style="{ width: `${progress}%` }"></div>
  </div>
</template>

<style scoped>
.progress-bar {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}
.progress {
  height: 20px;
  background-color: #76c7c0;
  transition: width 0.3s ease;
}
</style>
