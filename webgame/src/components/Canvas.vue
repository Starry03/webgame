<template>
  <div style="color: aliceblue" class="flex flex-row flex-space-between" id="game-header">
    <Map />
    <StatusBar
      :can-attack="player?.canAttack"
      :health="player?.health"
      :max-health="player?.maxHealth"
    />
  </div>
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
import Map from '@/components/Map.vue'
import StatusBar from '@/components/StatusBar.vue'

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
  const character = localStorage.getItem(prefixed('selectedCharacter'))
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
      player.value = new Mage(canvas, ctx, characterObject.speed, characterObject.health)
      break
    case 'warrior':
      player.value = new Samurai(canvas, ctx, characterObject.speed, characterObject.health)
      break
    case 'thief':
      player.value = new Thief(canvas, ctx, characterObject.speed, characterObject.health)
      break
    default:
      console.error('Invalid character type')
  }
  if (!player.value) {
    console.error('Player is null')
    return
  }
  window.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
      player.value.health = Math.random() * 100
    }
  })
  gameHandler.value = new GameHandlder(player.value, canvas, ctx)
  gameHandler.value.gameLoop(performance.now())
})

onUnmounted(() => {
  window.removeEventListener('resize', handle_resize)
})
</script>
