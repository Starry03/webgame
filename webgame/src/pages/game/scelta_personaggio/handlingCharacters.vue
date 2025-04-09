
<template>
    <section id="handling-characters">
        <div v-if="characters.length > 0">
            <ul>
                <li v-for="(character, index) in characters" key = "character.id">
                    {{character.name}}
                    <button @click="removeCharacter(index)">Rimuovi</button>
                </li>
            </ul>
        </div>
        <p v-else>Nessun personaggio disponibile</p>
        <form @submit.prevent="addCharacter">
            <input v-model="newCharacterName" placeholder="Nome del personaggio" required />
            <input v-model="newCharacterDescription" placeholder="Descrizione del personaggio" />
            <button type="submit">Aggiungi Personaggio</button>
        </form>
    </section>
</template>
  
<script setup>
    import {ref} from 'vue';

    const newCharacterName = ref("");
    const newCharacterDescription = ref("");
    const characters = ref([]);

    const addCharacter = () => {
        if (newCharacterName.value) {
            const newCharacter = {
                id: Date.now(),
                name: newCharacterName.value,
                description:  newCharacterDescription.value
            };
            characters.value.push(newCharacter)
            newCharacterName = "";
            newCharacterDescription = "";
        }
    }

    const removeCharacter = (index) => {
        characters.value.splice(index,1);
    };
</script>
  
<style scoped>
    #handling-characters {
        background-color: white;
        display: flex;
        border-radius: 10px;
        padding: 20px;
        gap: 30px;
        flex-direction: column;
    }

    form {
        margin-top: 20px;
    }
    input {
        padding: 5px;
        font-size: 1rem;
    }
    button {
        padding: 5px 10px;
        margin-left: 10px;
        font-size: 1rem;
    }
    ul {
        list-style-type: none;
    }

    li {
        margin-bottom: 10px;
    }
</style>
  