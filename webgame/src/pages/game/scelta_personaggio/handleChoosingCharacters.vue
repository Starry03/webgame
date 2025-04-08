<template>
    <section class="container">
        <h1 id="container-title">Choose your character</h1>
        <div class="character-grid">
            <ClassComponent v-for="character in characters"
                            :key="character.id"
                            :character="character"
                            :selected_character_id="selectedCharacter?.id"
                            :onSelect="selectCharacter"/>

        </div>
        <div v-if="selectedCharacter">
            <h2>Description of {{ selectedCharacter.name }} </h2>
            <textarea :value="selectedCharacter.description"></textarea>
            <button @click="startGame(character)" :disabled="!selectCharacter">Start Game</button>
        </div>
    </section>
</template>

<script setup>
    import {ref, onMounted} from 'vue';
    import ClassComponent from './ClassComponent.vue';
    
    const characters = ref([]);
    const selectedCharacter = ref(null);

    const fetchCharacters = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/game/data/classes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`)
            }

            const data = await response.json();
            characters.value = data;
        }
        catch(error) {
            console.error('Errore nel recupero dei personaggi:', error)
        }
    }
    
    const selectCharacter = (char) => {
        selectedCharacter.value = char
    }

    const startGame = (character) => {
        if (character.value) {
            localStorage.setItem('selectedCharacter',character.name);
            console.log('Personaggio salvato:', character.name);
            console.log("Avvio del gioco...");

        }
    }

    onMounted(fetchCharacters);
</script>

<style scoped>

</style>