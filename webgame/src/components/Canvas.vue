<template>
    <div class="container flex flex-space-between flex-row" id="game-header">
        <div id="player-status" class="status">
            <StatusBar
                v-if="mappedPlayer"
                :health="mappedPlayer.health"
                :maxHealth="mappedPlayer.maxHealth"
                :mana="mappedPlayer.mana"
                :maxMana="mappedPlayer.maxMana"
                :level="mappedPlayer.level"
                :cooldownQ="mappedPlayer.cooldownQ"
                :cooldownR="mappedPlayer.cooldownR"
                :maxCooldownQ="mappedPlayer.maxCooldownQ"
                :maxCooldownR="mappedPlayer.maxCooldownR"
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
            <span class="vs-text">VS</span>
        </div>

        <div id="boss-status" class="status" v-if="mappedBoss">
            <pre>{{ mappedBoss }}</pre>
            <BossStatusBar
                v-if="mappedBoss"
                :health="mappedBoss.health"
                :maxHealth="mappedBoss.maxHealth"
                :mana="mappedBoss.mana"
                :maxMana="mappedBoss.maxMana"
                :cooldownQ="typeof mappedBoss.cooldownQ === 'object' ? mappedBoss.cooldownQ : ref(mappedBoss.cooldownQ)"
                :cooldownR="typeof mappedBoss.cooldownR === 'object' ? mappedBoss.cooldownR : ref(mappedBoss.cooldownR)"
                :maxCooldownQ="mappedBoss.maxCooldownQ"
                :maxCooldownR="mappedBoss.maxCooldownR"
            />
        </div>
    </div>
    <div class="canvas-wrapper">
        <canvas ref="canvasRef" id="canvas" :width="800" :height="416" />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, reactive, computed, shallowRef, triggerRef, type Reactive } from 'vue'
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
const gameHandler = shallowRef<GameHandler | null>(null)
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
        level: player.value.exp,
        cooldownQ: player_value.cooldowns.get(AnimationType.ATTACK_2),
        maxCooldownQ: player_value.maxCooldownQ,
        cooldownR: player_value.cooldowns.get(AnimationType.SPECIAL),
        maxCooldownR: player_value.maxCooldownR,
        interactionMessage: player_value.interactionMessage,
    }
})

const mappedBoss = computed(() => {
    const boss = gameHandler.value?.boss.value
    if (!isBossRoom.value || !boss) return null

    return {
        health: boss.health,
        maxHealth: boss.maxHealth,
        mana: boss.mana,
        maxMana: boss.maxMana,
        level: boss.exp,
        cooldownQ: boss.cooldowns.get(AnimationType.ATTACK_2) ?? 0,
        maxCooldownQ: boss.maxCooldownQ,
        cooldownR: boss.cooldowns.get(AnimationType.SPECIAL) ?? 0,
        maxCooldownR: boss.maxCooldownR,
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
    await gameHandler.value.initialize()
    gameHandler.value.boss.value && triggerRef(gameHandler.value.boss)
    triggerRef(gameHandler)
    gameHandler.value.gameLoop(performance.now())
})

onUnmounted(() => {})
</script>

<style scoped>
#game-header {
    display: flex;
    justify-content: center;
    align-items: stretch;
    width: 100%;
    gap: 2vw;
    padding: 10px;
    background-color: #222;
    border-bottom: 2px solid #444;
    margin: 0 auto;
}


.status {
    flex: 1 1 0;
    min-width: 0;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.status-bar,
.boss-status-bar {
    font-size: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    min-width: 0;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
    word-break: break-word;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.boss-status-bar {
    justify-self: flex-end;
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
    #game-header {
        max-width: 99vw;   
        width: 100vw;
        margin: 0 auto;
        padding: 5px;
    }

    .canvas-wrapper, #canvas {
        max-width: 99vw;
    }
}


@media (max-width: 768px) and (height <= 500px) {
    #game-header {
        flex-direction: row;
        align-items: center;
        max-width: 99vw;
        gap: 1vw;
        padding: 4px 0;
    }

    .player-status,
    .boss-status {
        font-size: 0.9em;
    }

}

@media (max-width: 900px), (max-height: 500px) {
    .canvas-wrapper {
        max-height: 60vh;
    }

    .status-col{
        max-width: 48vw;;
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
        flex-direction: row !important;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: nowrap;
        width: 100vw;
        padding: 5px;
        background-color: #222;
        border-bottom: 2px solid #444;
    }

    #player-status, #boss-status {
        width: 100vw;
        max-width: 200vw;
        display: flex;
        flex: 0 1 35vw;
        flex-direction: column;
        gap: 5px;
    }

    .vs {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 10vw;
        min-width: 50px;
        max-width: 80px;
        flex: 0 1 10vw;
        padding: 0;
        margin: 0;
    }

    .vs-text {
        font-size: 1.1rem;
        padding: 0 0.2em;
        white-space: nowrap;
    }

    .status-bar,
    .boss-status-bar {
        font-size: 10px !important;
        padding: 4px !important;
        min-width: 0;
        max-width: 100%;
    }

    .bars-and-cooldowns {
        flex-direction: row !important;
        gap: 0.3rem !important;
    }

    .bar-container {
        gap: 4px !important;
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
}
.vs {
    flex: 0 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.vs-text {
    font-family: 'Press Start 2P', cursive;
    font-size: 0.8rem;
    color: gold;
    text-shadow: 0 0 8px #fff, 0 0 16px #f93200;
    animation: vs-scale 1s infinite alternate;
    padding: 0 0.5em;
    border: none;
    white-space: nowrap;
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
