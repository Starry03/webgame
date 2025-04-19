<template>
  <section class="container">
    <h1 id="container-title">Choose your character</h1>
    <div class="character-grid">
      <ClassComponent
        v-for="character in characters"
        :key="character.name"
        :character="character"
        :selected_character_id="selectedCharacter?.name"
        :onSelect="() => selectCharacter(character)"
      />
    </div>
    <div class="character-description-block" v-if="selectedCharacter">
      <h2 id="character-description-header">Description of {{ selectedCharacter.name }}</h2>
      <textarea class="character-description" :value="selectedCharacter.description"></textarea>
      <button
        id="start-game-button"
        @click="() => startGame(selectedCharacter)"
        :disabled="!selectCharacter"
      >
        Start Game
      </button> <!-- @click="..." viene effettuato il controllo se selectedCharacter è null -->
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ClassComponent from '@/components/ClassComponent.vue'
import { prefixed } from '@/internal/cryptoutils.js'
import { useRouter } from 'vue-router'
import { GameService } from '@/internal/apiService.js'

const router = useRouter()

const characters = ref([])
const selectedCharacter = ref(null);
import ClassComponent from '@/components/ClassComponent.vue'
import { prefixed } from '@/internal/cryptoutils'
import { useRouter } from 'vue-router'
import { GameService } from '@/internal/apiService'

const router = useRouter()
const characters = ref([]);
const selectedCharacter = ref<Character | null>(null)
<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> 74ce90c000d6efc6f8b13b2d85fa5516a93ccc21

const fetchCharacters = async () => {
  try {
    const response = await GameService.classes()
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`)
    }
    const data = await response.json()
    characters.value = data
  } catch (error) {
    console.error('Errore nel recupero dei personaggi:', error)
  }
}

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 74ce90c000d6efc6f8b13b2d85fa5516a93ccc21
const selectCharacter = (character) => {
  selectedCharacter.value = character
}

const startGame = (character) => {
  if (character) {
    localStorage.setItem(prefixed(character.name), JSON.stringify(character))
    console.log('Saved character:', character.name)
    console.log('Starting game...')
    router.push('/game')
  }
const selectCharacter = (character: Character | null) => {
  selectedCharacter.value = character
}

const startGame = (character: Character | null) => {
  if (!character) return
  localStorage.setItem(prefixed('character'), JSON.stringify(character))
  router.push('/game')
}

onMounted(() => fetchCharacters())
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    font-family: 'Press Start 2P', cursive;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-image: url('@/assets/images/sfondo1.gif');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }

  #container-title {
    font-size: 1.8rem;
    font-weight: bold;
    text-align: center;
    text-shadow: 2px 2px 0 black;
    margin-bottom: 3rem;
  }

  .character-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 2rem;
    border: 2px;
    border-color: black;
    justify-items: center;
    width: 100%;
    margin-bottom: 5rem;
  }

  .character-description-block {
    display: flex;
    background: fixed;
    padding: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  #character-description-header {
    font-size: 1.5rem;
    font-weight: 400;
  }

  .character-description {
    width: 100%;
    height: 70px;
    padding: 0.5rem;
    outline: none;
    border: 2px solid black;
    border-radius: 8px;
    resize: none;
  }

  #start-game-button {
    margin-top: 1rem;
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

  
</style>
