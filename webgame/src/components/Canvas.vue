<template>
    <div class="flex flex-space-between flex-row" id="game-header">
        <div id="player-status">
            <StatusBar
                v-if="mappedPlayer"
                :health="mappedPlayer.health"
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

        <div
            id="message_zone"
            class="flex-fit font-mid"
            v-if="gameHandler && gameHandler.currentRoom >= 1 && gameHandler.currentRoom <= 4"
        >
            {{ mappedPlayer?.interactionMessage }}
        </div>

        <div v-if="isBossRoom" class="vs">
            <span class="vs-animated">VS</span>
        </div>

        <div id="boss-status" v-if="isBossRoom">
            
            <BossStatusBar
                v-if="gameHandler?.boss"
                :health="gameHandler.boss.health"
                :max-health="gameHandler.boss.maxHealth"
                :mana="gameHandler.boss.mana"
                :max-mana="gameHandler.boss.maxMana"
                :level="gameHandler.boss.level"
                :cooldownQ="gameHandler.boss.cooldowns.get(AnimationType.ATTACK_2)"
                :cooldownR="gameHandler.boss.cooldowns.get(AnimationType.SPECIAL)"
                :max-cooldown-q="gameHandler.boss.maxCooldownQ"
                :max-cooldown-r="gameHandler.boss.maxCooldownR"
            />
        </div>
    </div>
    <div class="canvas-wrapper">
        <canvas ref="canvasRef" id="canvas" :width="800" :height="416" />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, reactive, computed, type Reactive } from 'vue'
import { Mage } from '@/internal/Mage'
import { Samurai } from '@/internal/Samurai'
import { Thief } from '@/internal/Thief'
import { prefixed } from '@/internal/cryptoutils'
import { GameHandler } from '@/internal/GameHandler'
import { AnimationType, Storage_e, type Character } from '@/internal/types'
import StatusBar from '@/components/StatusBar.vue'
import type { Player } from '@/internal/player'
import BossStatusBar from '@/components/BossStatusBar.vue'
import type { Entity } from '@/internal/Entity'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const gameHandler = ref<GameHandler | null>()
const player = ref<Player | null>(null)

const isBossRoom = computed(() => gameHandler.value?.currentRoom === 5)

const mappedPlayer = computed(() => {
    if (!player.value) return null

    const player_value: Reactive<Player> = player.value

    return {
        health: player.value.health,
        maxHealth: player.value.maxHealth,
        mana: player.value.mana,
        maxMana: player.value.maxMana,
        level: player.value.level,
        cooldownQ: player_value.cooldowns.get(AnimationType.ATTACK_2),
        maxCooldownQ: player_value.maxCooldownQ,
        cooldownR: player_value.cooldowns.get(AnimationType.SPECIAL),
        maxCooldownR: player_value.maxCooldownR,
        interactionMessage: player_value.interactionMessage,
    }
})

onMounted(async () => {
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
                    characterObject.attack,
                    characterObject.defence,
                    '',
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
                    characterObject.attack,
                    characterObject.defence,
                    '',
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
                    characterObject.attack,
                    characterObject.defence,
                    '',
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
    gameHandler.value = new GameHandler(player.value as Entity, canvas, ctx)
    gameHandler.value.initialize()
    gameHandler.value.gameLoop(performance.now())
})

onUnmounted(() => {})
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

#message_zone {
    text-align: center;
    color: #fff;
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

    #player-status,
    #boss-status {
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
.vs-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 0 10px 0;
}

.vs-animated {
    font-family: 'Press Start 2P', cursive;
    font-size: 1rem;
    color: gold;
    text-shadow: 0 0 8px #fff, 0 0 16px #f93200;
    animation: vs-scale 1s infinite alternate;
    padding: 0;
    border: none;
    background: none;
    padding-left: 1rem;
    padding-right: 1rem;
    letter-spacing: 0.2em;
    display: inline-block;
}

@keyframes vs-scale {
    0% { transform: scale(1); }
    100% { transform: scale(1.35); }
}
</style>
