<template>
  <canvas ref="canvasRef" id="canvas" :width="window_width" :height="window_height / 1.5"></canvas>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Mage } from '@/internal/Mage'
import { Samurai } from '@/internal/Samurai'
import { Thief } from '@/internal/Thief'
import { prefixed } from '@/internal/cryptoutils'
import { GameHandlder } from '@/internal/GameHandler'
import type { Character } from '@/internal/types'

const window_width = ref(window.innerWidth)
const window_height = ref(window.innerHeight)
const player = ref<Mage | Samurai | Thief | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const gameHandler = ref<GameHandlder | null>()

const handle_resize = () => {
  window_width.value = window.innerWidth
  window_height.value = window.innerHeight
}

onMounted(() => {
  window.addEventListener('resize', handle_resize)
  const character = localStorage.getItem(prefixed('character'))
  const characterObject: Character = JSON.parse(character || '{}')

  const canvas = canvasRef.value
  if (!canvas) {
    console.error('canvas null')
    return
  }
  const ctx = canvas.getContext('2d')
  switch (characterObject.name) {
    case 'wizard':
      player.value = new Mage(canvasRef.value, ctx)
      break
    case 'warrior':
      player.value = new Samurai(canvasRef.value, ctx)
      break
    case 'thief':
      player.value = new Thief(canvasRef.value, ctx)
      break
    default:
      console.error('Invalid character type')
  }
  if (!player.value) {
    console.error('Player is null')
    return
  }
  gameHandler.value = new GameHandlder(player.value)
  gameHandler.value.gameLoop()
})

onUnmounted(() => {
  window.removeEventListener('resize', handle_resize)
})
</script>
