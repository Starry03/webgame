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
    font-size: 1.5rem;
    font-family: 'Press Start 2P', cursive;
}

h1 {
    font-weight: bold;
    color: white;
    font-size: 1rem;
    font-family: 'Press Start 2P', cursive;
}

p {
    display: inline-block;
}

.item-stats {
    margin-bottom: 3rem;
}

#health-percentage {
    color: crimson;
    cursor: not-allowed;
}

#mana-percentage {
    color: cyan;
    cursor: not-allowed;
}

#level {
    color: green;
    cursor: not-allowed;
}

@media (orientation: landscape) {
    .item-stats {
        margin-bottom: 1rem;
    }
}
</style>
