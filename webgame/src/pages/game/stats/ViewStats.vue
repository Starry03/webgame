<script setup>
import StatsComponent from '@/components/StatsComponent.vue'
import { onMounted, ref } from 'vue'
import { RequestWrapper } from '@/internal/cryptoutils.ts'
import { buildEndpoint } from '@/internal/apiService.ts'


const stats = ref([])

const fetchStats = async () => {
    try {
        const response = await RequestWrapper.cryptedFetch(buildEndpoint("game/data/set_score", {
            method: "POST",
            headers: {"accept": "application/json"},
            body: JSON.stringify({
                "timeTaken": localStorage.getItem('timeTaken'),
                "level": localStorage.getItem('level'),
                "health": localStorage.getItem('health'),
                "mana": localStorage.getItem('mana'),
                "defeatedEnemies": localStorage.getItem('defeatedEnemies'),
                "usedEnhancements": localStorage.getItem('usedEnhancements'),
            })
        }))
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`)
        }
        stats.value = await response.json()
    }
    catch (error) {
        console.error("errore nel fetch delle statistiche", error)
    }
}

onMounted(() => fetchStats())

</script>

<template>
    <section id="view-game-stats">
        <h1>Game Stats</h1>
        <StatsComponent
        v-for="stat in stats"
        :key:stats.id
        :stat="stat"
        />
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
