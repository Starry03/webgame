<script setup>
import StatsComponent from '@/components/StatsComponent.vue'
import { onMounted, ref } from 'vue'

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
</style>
