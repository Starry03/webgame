<script setup>
import { onMounted, reactive, ref } from 'vue'
import {GameHandler} from '@/internal/GameHandler'
import {Player} from '@/internal/player'
import {Vector2} from '@/internal/types.ts'
import { setInterval } from 'node:timers'
import ViewStats from '@/pages/game/stats/ViewStats.vue'

const canvasRef = ref(null)
const ctxRef = ref(null)

let player
let gameHandler

const stats = reactive({
    timeTaken: 0,
    usedEnhancement: 0,
    defeatedEnemies: 0,
    healthPercentage: 0,
    manaPercentage: 0,
    level: 1,
})

onMounted(() => {

    const gameHandler = loadGameState()
    if (gameHandler) {
        stats.timeTaken = gameHandler.getTimeTaken()
        stats.usedEnhancement = gameHandler.getUsedEnhancement()
        stats.defeatedEnemies = gameHandler.getDefeatedEnemies()
        stats.healthPercentage = 0
        stats.manaPercentage = 0
        stats.level = gameHandler.getCurrentLevel()
    }
})
</script>

<template>
    <ViewStats :stats="stats" />
</template>
