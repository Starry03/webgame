<script setup>
import StatsComponent from '@/components/StatsComponent.vue'
import { onMounted, ref } from 'vue'
import {updateStats} from '@/components/StatsComponent.vue'
const stats = ref([])

onMounted(() => updateStats())

</script>

<template>
    <section id="view-game-stats">
        <h1>Game Stats</h1>
        <StatsComponent />
    </section>
</template>

<style scoped>
#view-game-stats {
    background-color: black;
    color: white;
    padding: 30px;
    border-radius: 10px;
    width: 80%;
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
}

h2 {
    font-size: 1.5em;
    margin-bottom: 20px;
}

h1 {
    font-weight: bold;
    color: white;
    font-size: 1.2em;
}

label {
    font-weight: bold;
    color: white;
    font-size: 1.2em;
}

h1,
p {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
}

button,
h1 {
    font-family: 'Press Start 2P', cursive;
}

.item-stats {
    margin-bottom: 15px;
}

button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: lightgreen;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1em;
}

button:hover {
    background-color: darkgreen;
}

body {
    background-color: white;
    color: black;
    font-family: 'Times New Roman', Times, serif;
    font-weight: normal;
    margin: 20px;
    padding: 20px;
    display: flex;
    position: relative;
    text-align: center;
    justify-content: center;
    height: 100vh;
}
#esp:disabled {
    background-color: lightgreen;
    cursor: not-allowed;
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
