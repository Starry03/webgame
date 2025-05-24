<script setup>
import {reactive, onMounted} from 'vue'
import ViewStats from '../pages/game/stats/ViewStats.vue'
import {getTime, getHealthPercentage, getManaPercentage} from '@/components/StatusBar.vue'
import {GameHandler} from '@/internal/GameHandler'
import {Player} from '@/internal/player'

const player = new Player(canvas, ctx, 0,0,0,0,0, '', new Vector2(0,0), new Vector2(0,0))
const gameHandler = new GameHandler(player, canvas, ctx)

const stats = reactive({
    timeTaken: 0,
    usedEnhancement: 0,
    defeatedEnemies: 0,
    healthPercentage: 0,
    manaPercentage: 0,
    level: 1,
})

onMounted(() => {
    stats.timeTaken = getTime()
    stats.usedEnhancement = 0;
    stats.defeatedEnemies = 0;
    stats.healthPercentage = getHealthPercentage();
    stats.manaPercentage = getManaPercentage();
    stats.level = gameHandler.getCurrentLevel()
})
</script>

<template>
    <ViewStats :stats="stats" />
</template>
