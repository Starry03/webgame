<script setup lang="ts">
import StatsComponent from '@/components/StatsComponent.vue'
import { onMounted, ref } from 'vue'
import { prefixed, RequestWrapper } from '@/internal/cryptoutils.ts'
import { buildEndpoint } from '@/internal/apiService.ts'
import { Storage_e, type Stats } from '@/internal/types'

const stats = ref({} as Stats)

const fetchStats = async () => {
    try {
        const statsData: string | null = localStorage.getItem(prefixed(Storage_e.STATS))
        if (!statsData) return
        const response = await RequestWrapper.cryptedFetch(buildEndpoint('/game/data/set_score'), {
            method: 'POST',
            headers: { accept: 'application/json' },
            body: statsData,
        })
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`)
        }
        stats.value = JSON.parse(statsData) as Stats
    } catch (error) {
        console.error('errore nel fetch delle statistiche', error)
    }
}

onMounted(() => fetchStats())
</script>

<template>
    <section id="view-game-stats">
        <h1>Game Stats</h1>
        <StatsComponent :stats="stats" />
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
