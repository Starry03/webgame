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
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { prefixed } from '@/internal/cryptoutils'
import { useRouter } from 'vue-router'
import ClassComponent from '@/components/ClassComponent.vue'
import { GameService } from '@/internal/apiService'
import type { Character } from '@/internal/types'

const router = useRouter()

const characters = ref<Character[]>([])
const selectedCharacter = ref<Character | null>(null)

const fetchCharacters = async () => {
  try {
    const response = await GameService.classes()
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`)
    }
    const data: Character[] = await response.json()
    characters.value = data
  } catch (error) {
    console.error('Errore nel recupero dei personaggi:', error)
  }
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
  padding: 1rem;
  font-family: 'Press Start 2P', cursive;
}

#container-title {
  font-size: 1.8rem;
  font-weight: bold;
}

.character-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
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
  cursor: pointer;
  border-radius: 5px;
  padding: 10px;
  width: 150px;
  background-color: red;
}

#start-game-button:hover {
  background-color: black;
}
</style>
