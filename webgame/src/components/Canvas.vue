<template>
    <div class="flex flex-space-between" id="game-header">
        <div id="player-status">
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
        </div>

        <div id="boss-status" v-if="isBossRoom">
            <StatusBar
                v-if="mappedBoss"
                :hp="mappedBoss.hp"
                :max-health="mappedBoss.maxHealth"
                :mana="mappedBoss.mana"
                :max-mana="mappedBoss.maxMana"
                :level="mappedBoss.level"
                :cooldownQ="mappedBoss.cooldownQ"
                :cooldownR="mappedBoss.cooldownR"
                :max-cooldown-q="mappedBoss.maxCooldownQ"
                :max-cooldown-r="mappedBoss.maxCooldownR"
            />
        </div>
    </div>
    <div class="canvas-wrapper">
        <canvas ref="canvasRef" id="canvas" :width="800" :height="416" />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, reactive, computed, type Reactive, type Ref } from 'vue'
import { Mage } from '@/internal/Mage'
import { Samurai } from '@/internal/Samurai'
import { Thief } from '@/internal/Thief'
import { prefixed } from '@/internal/cryptoutils'
import { GameHandler } from '@/internal/GameHandler'
import { AnimationType, Storage_e, type Character } from '@/internal/types'
import StatusBar from '@/components/StatusBar.vue'
import type { Entity } from '@/internal/Entity'
import { startGame } from '@/game_func'

onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    startGame(canvas)
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const gameHandler = ref<GameHandler | null>()
const player = ref<any>(null)

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

onMounted(async () => {
    // window.addEventListener('resize', handle_resize)
    const character = localStorage.getItem(prefixed(Storage_e.SELECTED_CHARACTER))
    const characterObject: Character = JSON.parse(character || '{}')

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

    switch (characterObject.name) {
        case 'wizard':
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

    if (!player.value) {
        console.error('Player is null')
        return
    }
    gameHandler.value = new GameHandler(player.value, canvas, ctx)
    gameHandler.value.gameLoop(performance.now())
    gameHandler.value.initialize()
})

onUnmounted(() => {
    // window.removeEventListener('resize', handle_resize)
})

const isBossRoom = ref(false) 
const boss = ref<any>(null)

const mappedBoss = computed(() => {
    if (!boss.value) return null

    return {
        hp: boss.value.hp,
        maxHealth: boss.value.maxHealth,
        mana: boss.value.mana,
        maxMana: boss.value.maxMana,
        level: boss.value.level || 1,
        cooldownQ: boss.value.cooldowns.get(AnimationType.ATTACK_2),
        maxCooldownQ: boss.value.maxCooldownQ,
        cooldownR: boss.value.cooldowns.get(AnimationType.SPECIAL),
        maxCooldownR: boss.value.maxCooldownR,
    }
})

function initializeBoss() {
    boss.value = reactive({
        hp: 1000,
        maxHealth: 1000,
        mana: 800,
        maxMana: 800,
        level: 20,
        cooldowns: new Map([
            [AnimationType.ATTACK_2, 0],
            [AnimationType.SPECIAL, 0],
        ]),
        maxCooldownQ: 5,
        maxCooldownR: 10,
    })
    isBossRoom.value = true
}
</script>

<style scoped>
#game-header {
    display: flex;
    justify-content: flex-start; 
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #222;
    border-bottom: 2px solid #444;
}

#player-status {
    width: 50%; 
    display: flex;
    flex-direction: column;
    gap: 10px; 
}

#boss-status {
    width: 50%; 
    display: flex;
    flex-direction: column;
    gap: 10px; 
    align-items: flex-end; 
}

.canvas-wrapper {
    width: 100%;
    max-width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 70svh; 
    overflow: hidden;
}

#canvas {
    width: 100%;
    height: auto;
    max-width: 800px;
    max-height: 416px;
    aspect-ratio: 800 / 416;
    display: block;
    border: 1px solid #ccc;
    background: #111;
    object-fit: contain;
}

@media (max-width: 900px), (max-height: 500px) {
    .canvas-wrapper {
        max-height: 60vh;
    }
    #canvas {
        width: 100vw;
        height: auto;
        max-width: 100vw;
        max-height: 60vh;
    }
}

@media (max-height: 500px) and (orientation: landscape) {
    #game-header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        padding: 5px;
        background-color: #222;
        border-bottom: 2px solid #444;
    }

    #player-status {
        width: 50%; 
        display: flex;
        flex-direction: column;
        gap: 5px; 
    }

    #boss-status {
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 5px; 
        align-items: flex-end;
    }

    .status-bar {
        padding: 5px; 
        background-color: #333;
        border-radius: 8px;
        color: white;
        font-size: 0.9rem;
    }

    .bar-container {
        display: flex;
        align-items: center;
        gap: 5px; 
    }

    .cooldown-container {
        display: flex;
        gap: 10px;
        justify-content: flex-start;
    }

    .cooldown-bar {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px; 
    }

    .cooldown-circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .cooldown-circle span {
        font-size: 12px;
        font-weight: bold;
        color: white;
    }

    #game-header {
        flex-direction: column; 
        align-items: flex-start;
        gap: 5px; 
    }

    #player-status,#boss-status {
        width: 100%;
    }

    .status-bar {
        padding: 5px; 
        font-size: 0.8rem; 
    }

    .cooldown-circle {
        width: 30px; 
        height: 30px;
    }

    .cooldown-circle span {
        font-size: 10px; 
    }
}
</style>
