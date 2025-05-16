<template>
    <div class="flex  flex-space-between" id="game-header">
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

    <canvas ref="canvasRef" id="canvas" :width="window_width" :height="window_height / 1.5" />
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
import { startGame } from '@/game_func';

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  startGame(canvas);
});

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

const isBossRoom = ref(false); // Cambia a `true` quando il giocatore entra nella stanza del boss
const boss = ref<any>(null);

const mappedBoss = computed(() => {
    if (!boss.value) return null;

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
    };
});

// Inizializza il boss quando il giocatore entra nella stanza del boss
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
    });
    isBossRoom.value = true;
}
</script>

<style scoped>
#game-header {
    display: flex;
    justify-content: flex-start; /* Allinea gli elementi a sinistra */
    align-items: center;
    width: 100%;
    padding: 10px;
    background-color: #222;
    border-bottom: 2px solid #444;
}

#player-status {
    width: 50%; /* Occupa la metà sinistra */
    display: flex;
    flex-direction: column;
    gap: 10px; /* Spaziatura tra le barre */
}

#boss-status {
    width: 50%; /* Occupa la metà destra */
    display: flex;
    flex-direction: column;
    gap: 10px; /* Spaziatura tra le barre */
    align-items: flex-end; /* Allinea le barre del boss a destra */
}

#canvas {
    display: block;
    margin: 0 auto;
    border: 1px solid #ccc;
    width: 99svw;
    height: 60svh;
    
}

@media (max-height: 500px) and (orientation: landscape) {
    #game-header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        padding: 5px; /* Riduce il padding */
        background-color: #222;
        border-bottom: 2px solid #444;
    }

    #player-status {
        width: 50%; /* Occupa la metà sinistra */
        display: flex;
        flex-direction: column;
        gap: 5px; /* Riduce la spaziatura tra le barre */
    }

    #boss-status {
        width: 50%; /* Occupa la metà destra */
        display: flex;
        flex-direction: column;
        gap: 5px; /* Riduce la spaziatura tra le barre */
        align-items: flex-end;
    }

    .status-bar {
        padding: 5px; /* Riduce il padding interno */
        background-color: #333;
        border-radius: 8px;
        color: white;
        font-size: 0.9rem; /* Riduce la dimensione del testo */
    }

    .bar-container {
        display: flex;
        align-items: center;
        gap: 5px; /* Riduce la spaziatura tra gli elementi */
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
        gap: 3px; /* Riduce la spaziatura tra il cerchio e il testo */
    }

    .cooldown-circle {
        width: 40px; /* Riduce la dimensione del cerchio */
        height: 40px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.1);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .cooldown-circle span {
        font-size: 12px; /* Riduce la dimensione del testo */
        font-weight: bold;
        color: white;
    }

    #game-header {
        flex-direction: column; /* Dispone gli elementi in colonna */
        align-items: flex-start;
        gap: 5px; /* Riduce la spaziatura tra gli elementi */
    }

    #player-status,
    #boss-status {
        width: 100%; /* Occupano tutta la larghezza */
    }

    #canvas {
        width: 90svw;
        height: 30svh; /* Riduce ulteriormente l'altezza del canvas */
    }

    .status-bar {
        padding: 5px; /* Riduce il padding interno */
        font-size: 0.8rem; /* Riduce la dimensione del testo */
    }

    .cooldown-circle {
        width: 30px; /* Riduce ulteriormente la dimensione del cerchio */
        height: 30px;
    }

    .cooldown-circle span {
        font-size: 10px; /* Riduce la dimensione del testo */
    }
}

</style>