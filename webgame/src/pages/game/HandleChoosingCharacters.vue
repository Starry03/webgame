<template xmlns="http://www.w3.org/1999/html">
    <section class="select-container">
        <button class="button button-secondary button-home" @click="backToHome"> Home </button>
        <h1 id="container-title">Choose your character</h1>
        <div class="character-grid">
            <ClassComponent
                v-for="(character, index) in characters"
                :key="character.id"
                :character="character"
                :selected="selectedCards[index]"
                :onSelect="() => selectCharacter(index)"
            />
        </div>
        <div class="character-description-block" v-if="selectedCharacter">
            <h2 id="character-description-header">Description of {{ selectedCharacter.name }}</h2>
            <textarea
                class="character-description"
                :value="selectedCharacter.description"
                readonly
            ></textarea>
            <button
                id="start-game-button"
                @click="startGame(selectedCharacter)"
                :disabled="!selectedCharacter"
            >
                Start Game
            </button>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ClassComponent from '@/components/ClassComponent.vue'
import { prefixed } from '@/internal/cryptoutils.js'
import { useRouter } from 'vue-router'
import { GameService } from '@/internal/apiService.js'
import { Storage_e } from '@/internal/types'
import type { Character } from '@/internal/types'

const router = useRouter()

const characters = ref([])
const selectedCharacter = ref(null)

// Variabili per tenere traccia delle selezioni delle card
const selectedCards = ref([false, false, false])

const fetchCharacters = async () => {
    try {
        const response = await GameService.classes()
        if (!response.ok) {
            throw new Error(`Errore HTTP: ${response.status}`)
        }
        const data: Array<Character> = await response.json()
        // save all available characters in localStorage (playable and enemies)
        localStorage.setItem(prefixed(Storage_e.CHARACTERS), JSON.stringify(data))
        characters.value = data.filter((character: Character) => character.playable)
    } catch (error) {
        console.error('Errore nel recupero dei personaggi:', error)
    }
}

const selectCharacter = (index) => {
    selectedCards.value = [false, false, false] //reset totale delle card

    selectedCards.value[index] = true //seleziona la card cliccata

    selectedCharacter.value = characters.value[index] //imposta il personaggio selezionato
}

const startGame = (character) => {
    if (character) {
        localStorage.setItem(prefixed(Storage_e.SELECTED_CHARACTER), JSON.stringify(character))
        router.push('/game')
    }
}

const backToHome = () => {
    router.push('/')
}

onMounted(() => fetchCharacters())
</script>

<style scoped>
body {
    overflow-x: hidden;
}

.select-container {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    font-family: 'Press Start 2P', cursive;
    align-items: center;
    justify-content: flex-start;
    gap: 1.5rem;
    height: 100vh;
    background-image: url('/assets/images/sfondo1.gif');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    overflow: hidden;
}

#container-title {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    text-shadow: 2px 2px 0 black;
    margin-bottom: 1rem;
}

.character-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0.25rem;
    border: 2px;
    border-color: black;
    justify-items: center;
    flex: 1;
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
}

.character-description-block {
    display: flex;
    background: fixed;
    padding: 0.5rem 1rem 0 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    max-height: 30vh;
    overflow: auto;
    margin-top: 0rem;
}

#character-description-header {
    font-size: 1rem;
    font-weight: 400;
}

.character-description {
    width: 60rem;
    height: 6rem;
    padding: 0.5rem;
    outline: none;
    border: 2px solid black;
    border-radius: 8px;
    resize: none;
    font-family: 'Press Start 2P', cursive;
    font-weight: 200;
}

#start-game-button {
    margin-top: 0.5rem;
    cursor: pointer;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    width: 150px;
    background-color: red;
    font-size: 1rem;
    transition: all 0.2s ease-in-out;
}

#start-game-button:hover {
    background-color: #000;
    color: red;
}

.button-home {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
}

.button-home:hover {
    transform: scale(1.1);
    text-shadow:
        0 0 10px black,
        0 0 20px black;
}

@media screen and (orientation: landscape) {
    .select-container {
        padding: 1rem;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }

    #container-title {
        font-size: 1.2rem;
    }

    .character-grid {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 1rem;
        align-items: center;
    }

    .character-description-block {
        min-height: 30vh;
        max-height: 35vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0.5rem;
    }

    .character-description {
        height: 4rem;
        font-size: 0.75rem;
    }

    #start-game-button {
        padding: 0.5rem;
        font-size: 0.9rem;
        width: 120px;
    }

    .button-home {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
    }
}

@media screen and (orientation: portrait) {
    .select-container {
        padding: 1rem;
        height: 100vh;
    }

    #container-title {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        text-align: center;
    }

    .character-grid {
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
        overflow-y: auto;
    }

    .character-description-block {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1rem;
        min-height: 32vh;
        max-height: 35vh;
        overflow-y: auto;
    }

    .character-description {
        width: 97%;
        height: 6rem;
    }

    #start-game-button {
        width: 120px;
        padding: 0.5rem;
        font-size: 1rem;
    }

    .button-home {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        font-size: var(--font-small);
    }
}
</style>
