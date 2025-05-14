<template>
    <div style="color: aliceblue" class="flex flex-column flex-space-between" id="game-header">
        <StatusBar
            v-if="mappedPlayer"
            :hp="mappedPlayer.hp"
            :max-health="mappedPlayer.maxHealth"
            :mana="mappedPlayer.mana"
            :max-mana="mappedPlayer.maxMana"
            :level="mappedPlayer.level"
            :cooldownQ="mappedPlayer.cooldownQ"
            :cooldownR="mappedPlayer.cooldownR"
			:max-cooldown-q="mappedPlayer.maxCooldownQ"
			:max-cooldown-r="mappedPlayer.maxCooldownR"
        />
        <canvas ref="canvasRef" id="canvas" :width="window_width" :height="window_height / 1.5" />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, reactive, computed, type Reactive, type Ref } from 'vue'
import { Mage } from '@/internal/Mage'
import { Samurai } from '@/internal/Samurai'
import { Thief } from '@/internal/Thief'
import { prefixed } from '@/internal/cryptoutils'
import { GameHandlder } from '@/internal/GameHandler'
import { AnimationType, Storage_e, type Character } from '@/internal/types'
import StatusBar from '@/components/StatusBar.vue'
import type { Entity } from '@/internal/Player'

const window_width = ref(window.innerWidth)
const window_height = ref(window.innerHeight)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasHeight = ref(600) // Define a default height for the canvas
const gameHandler = ref<GameHandlder | null>()
const player = ref<any>(null)

const handle_resize = () => {
    window_width.value = window.innerWidth
    window_height.value = window.innerHeight
}

const mappedPlayer = computed(() => {
    if (!player.value) return null

    const player_value: Reactive<Entity> = player.value

    return {
        hp: player.value.hp,
        maxHealth: player.value.hp,
        mana: player.value.mana,
        maxMana: player.value.mana,
        level: 1,
        cooldownQ: player_value.cooldowns.get(AnimationType.ATTACK_2),
        maxCooldownQ: player_value.maxCooldownQ,
        cooldownR: player_value.cooldowns.get(AnimationType.SPECIAL),
        maxCooldownR: player_value.maxCooldownR,
    }
})

console.log('Dati mappati per StatusBar:', mappedPlayer.value)

onMounted(() => {
    window.addEventListener('resize', handle_resize)
    const character = localStorage.getItem(prefixed(Storage_e.SELECTED_CHARACTER))
    const characterObject: Character = JSON.parse(character || '{}')

    if (
        !characterObject ||
        typeof characterObject.name !== 'string' ||
        typeof characterObject.speed !== 'number' ||
        typeof characterObject.hp !== 'number' ||
        typeof characterObject.mana !== 'number'
    ) {
        console.error('Dati del personaggio non validi:', characterObject)
        return
    }

    const canvas = canvasRef.value
    if (!canvas) {
        console.error('canvas null')
        return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) {
        console.error('ctx null')
        return
    }

    console.log('Inizializzazione del player...')
    console.log('Personaggio selezionato:', characterObject)

    switch (characterObject.name) {
        case 'wizard':
            console.log('Creazione del Mage...')
            player.value = reactive(
                new Mage(
                    canvas,
                    ctx,
                    characterObject.speed,
                    characterObject.hp,
                    characterObject.mana,
                ),
            )
            break
        case 'warrior':
            console.log('Creazione del Samurai...')
            player.value = reactive(
                new Samurai(
                    canvas,
                    ctx,
                    characterObject.speed,
                    characterObject.hp,
                    characterObject.mana,
                ),
            )
            break
        case 'thief':
            console.log('Creazione del Thief...')
            player.value = reactive(
                new Thief(
                    canvas,
                    ctx,
                    characterObject.speed,
                    characterObject.hp,
                    characterObject.mana,
                ),
            )
            break
        default:
            console.error('Invalid character type: ', characterObject.name)
    }

    console.log('Player inizializzato:', player.value)

    if (!player.value) {
        console.error('Player is null')
        return
    }
    gameHandler.value = new GameHandlder(player.value, canvas, ctx)
    gameHandler.value.gameLoop(performance.now())
})

onUnmounted(() => {
    window.removeEventListener('resize', handle_resize)
})
</script>
