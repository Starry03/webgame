<template>
  <canvas id="canvas" :width="window_width" :height="window_height / 1.5"></canvas>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
const props = defineProps({})

const window_width = ref(window.innerWidth)
const window_height = ref(window.innerHeight)

const handle_resize = () => {
  window_width.value = window.innerWidth
  window_height.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', handle_resize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handle_resize)
})
</script>
