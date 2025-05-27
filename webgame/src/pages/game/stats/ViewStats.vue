<script setup lang="ts">
import StatsComponent from '@/components/StatsComponent.vue'
import { onMounted, ref } from 'vue'
import { prefixed, RequestWrapper } from '@/internal/cryptoutils.ts'
import { buildEndpoint } from '@/internal/apiService.ts'
import { Storage_e, type Stats } from '@/internal/types'
import {useRouter} from 'vue-router'

const stats = ref({} as Stats)
const router = useRouter()

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

const backToHome = () => {
    router.push("/")
}

onMounted(() => fetchStats())
</script>

<template>
    <section id="view-game-stats">
        <h1>Game Stats</h1>
        <StatsComponent :stats="stats" />
        <button id="back-to-home-button" @click="backToHome">HOME</button>
    </section>
</template>

<style scoped>
#view-game-stats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: white;
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#back-to-home-button {
    background-color: red;
    color: white;
    font-weight: bold;
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

#back-to-home-button:hover {
    transform: scale(1.1);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.3);
}


@media (orientation: portrait) {
    #view-game-stats {
        padding: 5rem 5rem;
    }
}

@media (orientation: landscape) {
    #view-game-stats {
        padding: 1rem 1rem;
    }
}
</style>
