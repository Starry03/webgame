<template>
  <div style="color: aliceblue" class="flex flex-row flex-space-between" id="game-header">
    <Map />
    <StatusBar
      :health="player?.health"
      :max-health="player?.maxHealth"
    />
  </div>
  <canvas ref="canvasRef" id="canvas" :width="window_width" :height="window_height / 1.5"></canvas>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import { Mage } from '@/internal/Mage'
import { Samurai } from '@/internal/Samurai'
import { Thief } from '@/internal/Thief'
import { prefixed } from '@/internal/cryptoutils'
import { GameHandlder } from '@/internal/GameHandler'
import { Storage_e, type Character } from '@/internal/types'
import Map from '@/components/Map.vue'
import StatusBar from '@/components/StatusBar.vue'

const window_width = ref(window.innerWidth)
const window_height = ref(window.innerHeight)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const gameHandler = ref<GameHandlder | null>()
let player

const handle_resize = () => {
  window_width.value = window.innerWidth
  window_height.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', handle_resize)
  const character = localStorage.getItem(prefixed(Storage_e.SELECTED_CHARACTER))
  const characterObject: Character = JSON.parse(character || '{}')

  const canvas = canvasRef.value
  if (!canvas) {
    console.error('canvas null')
    return
  }
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    console.error('ctx null')
    return
  }
  switch (characterObject.name) {
    case 'wizard':
      player = reactive(new Mage(canvas, ctx, characterObject.speed, characterObject.health))
      break
    case 'warrior':
      player = reactive (new Samurai(canvas, ctx, characterObject.speed, characterObject.health))
      break
    case 'thief':
      player = reactive(new Thief(canvas, ctx, characterObject.speed, characterObject.health))
      break
    default:
      console.error('Invalid character type')
  }
  if (!player.value) {
    console.error('Player is null')
    return
  }
  window.addEventListener('keydown', (event) => {

  })
  gameHandler.value = new GameHandlder(player.value, canvas, ctx)
  gameHandler.value.gameLoop(performance.now())
})

onUnmounted(() => {
  window.removeEventListener('resize', handle_resize)
})
</script>
