<script setup lang="ts">
import { type Stats } from '@/internal/types'

const props = defineProps({
    stats: {
        type: Object as () => Stats,
        required: true,
    },
})
</script>

<template>
    <section id="level-stats">
        <div class="item-stats">
            <h2>Time taken</h2>
            <p id="time-taken">{{ props.stats.timeTaken }}</p>
        </div>
        <div class="item-stats">
            <h2>Level</h2>
            <p id="level">{{ props.stats.level }}</p>
        </div>
        <div class="item-stats">
            <h2>Used Enhancements</h2>
            <p id="used-enhancement">{{ props.stats.usedEnhancements }}</p>
        </div>
        <div class="item-stats">
            <h2>Defeated enemies</h2>
            <p id="defeated-enemies">{{ props.stats.defeatedEnemies }}</p>
        </div>
        <div class="item-stats">
            <h2>Health</h2>
            <p id="health-percentage">{{ props.stats.health }}</p>
        </div>
        <div class="item-stats">
            <h2>Mana</h2>
            <p id="mana-percentage">{{ props.stats.mana }}</p>
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
