<script setup>
import { onMounted, reactive, ref } from 'vue'
import { GameHandler } from '@/internal/GameHandler'
import { Player } from '@/internal/player'
import { Vector2 } from '@/internal/types.ts'
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

const updateStats = () => {
    const storedStats = JSON.parse(sessionStorage.getItem('gameStats') || {})
    console.log('extraction complete!')
    stats.timeTaken = storedStats.timeTaken || 0
    stats.usedEnhancement = storedStats.usedEnhancement || 0
    stats.defeatedEnemies = storedStats.defeatedEnemies || 0
    stats.healthPercentage = storedStats.healthPercentage || 0
    stats.manaPercentage = storedStats.manaPercentage || 0
    stats.level = storedStats.level || 0
}

onMounted(() => {
    updateStats()

    defineExpose({
        refreshState: updateStats
    })
})
</script>

<template>
    <section id="level-stats">
        <h1>Game Stats</h1>
        <div class="item-stats">
            <h2>Time taken</h2>
            <p>{{ stats.timeTaken }}</p>
        </div>
        <div class="item-stats">
            <h2>Level</h2>
            <p>{{ stats.level }}</p>
        </div>
        <div class="item-stats">
            <h2>Used Enhancements</h2>
            <p>{{ stats.usedEnhancement }}</p>
        </div>
        <div class="item-stats">
            <h2>Defeated enemies</h2>
            <p>{{ stats.defeatedEnemies }}</p>
        </div>
        <div class="item-stats">
            <h2>Health</h2>
            <p>{{ stats.healthPercentage }}</p>
        </div>
        <div class="item-stats">
            <h2>Mana</h2>
            <p>{{ stats.manaPercentage }}</p>
        </div>
    </section>
</template>
