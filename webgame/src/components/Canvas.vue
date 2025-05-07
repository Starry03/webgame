<template>
  <div style="color: aliceblue" class="flex flex-column flex-space-between" id="game-header">
    <Map />
    <StatusBar
      v-if="player"
      :health="player.value.health"
      :max-health="player.value.maxHealth"
      :mana="player.value.mana"
      :max-mana="player.value.maxMana"
      :level="player.value.level"
      :cooldownQ="cooldownQ"
      :cooldownR="cooldownR"
    />
    <canvas ref="canvasRef" id="canvas" :width="window_width" :height="window_height / 1.5" />
  </div>
</template>

<script lang="ts" setup>
import { cooldownQ, cooldownR } from '@/internal/Player'
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
const player = ref<any>(null)

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

  console.log('Inizializzazione del player...')
  console.log('Personaggio selezionato:', characterObject)

  switch (characterObject.name) {
    case 'wizard':
      player.value = reactive(
        new Mage(canvas, ctx, characterObject.speed, characterObject.health, characterObject.mana),
      )
      break
    case 'warrior':
      player.value = reactive(
        new Samurai(
          canvas,
          ctx,
          characterObject.speed,
          characterObject.health,
          characterObject.mana,
        ),
      )
      break
    case 'thief':
      player.value = reactive(
        new Thief(canvas, ctx, characterObject.speed, characterObject.health, characterObject.mana),
      )
      break
    default:
      console.error('Invalid character type')
  }

  console.log('Player inizializzato:', player.value)

  if (!player.value) {
    console.error('Player is null')
    return
  }
  gameHandler.value = new GameHandlder(player.value, canvas, ctx)
  gameHandler.value.gameLoop(performance.now())
})

onUnmounted(() => {
  window.removeEventListener('resize', handle_resize)
})
</script>
