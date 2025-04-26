<template>
  <div :class="getCardClass()" @click="handleClick">
    <div class="character-icon">
      <img :src="getCharacterIcon(character.name)" :alt="`${character.name} icon`" />
    </div>
    <h2 class="character-name">{{ character.name }}</h2>
    <section class="character-stats">
      <div class="stat">
        <strong>Speed:</strong>
        <span>{{ character.speed }}</span>
      </div>
      <div class="stat">
        <strong>Attack:</strong>
        <span>{{ character.attack }}</span>
      </div>
      <div class="stat">
        <strong>Defence:</strong>
        <span>{{ character.defence }}</span>
      </div>
      <div class="stat">
        <strong>Mana:</strong>
        <span>{{ character.mana }}</span>
      </div>
      <div class="stat">
        <strong>Hp:</strong>
        <span>{{ character.hp }}</span>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  character: Object,
  selected_character_id: Number,
  onSelect: Function,
});

const selectedCardId = ref(null);  // Variabile per memorizzare la card selezionata

const getCardClass = () => {
  let baseClass = 'character-card';
  let selected = '';

  if (selectedCardId.value === props.character.id) {
    selected = 'selected'; 
  }

  let hover = '';
  if (props.character.name === 'warrior') {
    hover = 'hover-warrior';
  } else if (props.character.name === 'wizard') {
    hover = 'hover-wizard';
  } else if (props.character.name === 'thief') {
    hover = 'hover-thief';
  } else {
    hover = 'hover-default';
  }

  return `${baseClass} ${hover} ${selected}`.trim();  // Restituisci le classi combinate
};

const handleClick = () => {
  if (selectedCardId.value === props.character.id) {
    selectedCardId.value = null;  // Deseleziona la card se è già selezionata
  } 
  else {
    selectedCardId.value = props.character.id;  // Seleziona la card
  }

  if (props.onSelect) {
    props.onSelect(props.character);
  }
};

const getCharacterIcon = (name) => {
  try {
    if (name === 'warrior') {
      return '/assets/images/warrior_icon.png';
    } else if (name === 'wizard') {
      return '/assets/images/wizard_icon.png';
    } else if (name === 'thief') {
      return '/assets/images/thief_icon.png';
    } else {
      return '/assets/images/default_icon.jpg';  // personaggio non trovato
    }
  } catch (e) {
    console.error('Errore nel caricamento dell\'icona:', e);
    return '/assets/images/default_icon.jpg';
  }
};
</script>

<style scoped>
.character-card {
  border: 2px solid transparent;
  background-color: white;
  transition: border-color 0.3s ease, background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.character-card.hover-warrior:hover {
  border-color: red; 
}

.character-card.hover-wizard:hover {
  border-color: yellow;  
}

.character-card.hover-thief:hover {
  border-color: blue; 
}

.character-card.selected.hover-warrior {
  border-color: red;
  background-color: lightgrey;
  transform: scale(1.05);
}

.character-card.selected.hover-wizard {
  border-color: yellow;
  background-color: lightgrey;
  transform: scale(1.05);
}

.character-card.selected.hover-thief {
  border-color: blue;
  background-color: lightgrey;
  transform: scale(1.05);
}

.character-icon img {
  width: 12vh;
  height: 12vh;
  object-fit: contain;
  margin-bottom: 0.5rem;
}

.character-stats {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  align-items: flex-start;
  width: 100%;
}

.stat {
  display: flex;
  justify-content: space-between;
  margin: 0.25rem 0;
  width: 100%;
  font-size: 0.9em;
}

.stat strong {
  flex-basis: 30%;
  text-align: left;
}

.stat span {
  flex-grow: 1;
  text-align: right;
}
</style>
