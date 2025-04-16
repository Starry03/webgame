<template>
  <section class="container">
    <h1 id="container-title">Choose your character</h1>
    <div class="character-grid">
      <ClassComponent
        v-for="character in characters"
        :key="character.id"
        :character="character"
        :selected_character_id="selectedCharacter?.id"
        :onSelect="selectCharacter(character.name)"
      />
    </div>
    <div class="character-description-block" v-if="selectedCharacter">
      <h2 id="character-description-header">Description of {{ selectedCharacter.name }}</h2>
      <textarea class="character-description" :value="selectedCharacter.description" readonly></textarea>
      <button id="start-game-button" @click="startGame(selectedCharacter)" :disabled="!selectCharacter">
        Start Game
      </button>
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
const selectedCharacter = ref(null)

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

const selectCharacter = (char) => {
  selectedCharacter.value = char
}

const startGame = (character) => {
  if (character.value) {
    localStorage.setItem(prefixed(character.name))
    console.log('Saved character:', character.name)
    console.log('Starting game...')
    router.push('/game')
  }
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
  }

  #container-title {
    font-size: 1.8rem;
    font-weight: bold;
    text-align: center;
    text-shadow: 2px 2px 0 #000;
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
    margin-bottom: 3rem;
  }

  .character-description-block {
    display: flex;
    background: fixed;
    padding: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: white;
  }

  #character-description-header {
    font-size: 1.5rem;
    font-weight: 400;
  }

  .character-description {
    width: 100%;
    padding: 0.5rem;
    outline: auto;
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
