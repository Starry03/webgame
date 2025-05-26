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
            <p id="time-taken">{{ stats.timeTaken }}</p>
        </div>
        <div class="item-stats">
            <h2>Level</h2>
            <p id="level">{{ stats.level }}</p>
        </div>
        <div class="item-stats">
            <h2>Used Enhancements</h2>
            <p id="used-enhancement">{{ stats.usedEnhancement }}</p>
        </div>
        <div class="item-stats">
            <h2>Defeated enemies</h2>
            <p id="defeated-enemies">{{ stats.defeatedEnemies }}</p>
        </div>
        <div class="item-stats">
            <h2>Health</h2>
            <p id="health-percentage">{{ stats.healthPercentage }}</p>
        </div>
        <div class="item-stats">
            <h2>Mana</h2>
            <p id="mana-percentage">{{ stats.manaPercentage }}</p>
        </div>
    </section>
</template>

<style scoped>
h2 {
    font-size: 1.5em;
    margin-bottom: 20px;
    font-family: 'Press Start 2P', cursive;
}

h1 {
    font-weight: bold;
    color: white;
    font-size: 1.2em;
    font-family: 'Press Start 2P', cursive;
}

label {
    font-weight: bold;
    color: white;
    font-size: 1.2em;
}

p {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
}


.item-stats {
    margin-bottom: 15px;
}

#health-percentage:disabled {
    background-color: crimson;
    cursor: not-allowed;
}

#mana-percentage:disabled {
    background-color: cyan;
    cursor: not-allowed;
}
</style>
