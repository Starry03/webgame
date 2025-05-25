<script setup>
import { onMounted, reactive, ref } from 'vue'
import {GameHandler} from '@/internal/GameHandler'
import {Player} from '@/internal/player'
import {Vector2} from '@/internal/types.ts'
import { setInterval } from 'node:timers'
import ViewStats from '@/pages/game/stats/ViewStats.vue'


const stats = reactive({
    timeTaken: 0,
    usedEnhancement: 0,
    defeatedEnemies: 0,
    healthPercentage: 0,
    manaPercentage: 0,
    level: 1,
})

onMounted(() => {

    const storedStats = JSON.parse(sessionStorage.getItem('gameStats') || {})

    stats.timeTaken = storedStats.timeTaken || 0;
    stats.usedEnhancement = storedStats.usedEnhancement || 0;
    stats.defeatedEnemies = storedStats.defeatedEnemies || 0;
    stats.healthPercentage = storedStats.healthPercentage || 0;
    stats.manaPercentage = storedStats.manaPercentage || 0;
    stats.level = storedStats.level || 0;
})
</script>

<template>
    <ViewStats :stats="stats" />
</template>
