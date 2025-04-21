<template>
  <div :class="getCardClass()" @click="handleClick">
    <!-- Placeholder per l'icona -->
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

	const props = defineProps({
	character: Object,
	selected_character_id: Number,
	onSelect: Function,
	})

	const getCardClass = () => {
		let baseClass = 'character-card';
    let selected = '';
    if (props.selected_character_id === props.character.id) {
      selected = 'selected';
    }
    let hover = '';
    if (props.character.name == "warrior") {
      hover = 'hover-warrior';
    }
    else if (props.character.name == "wizard") {
      hover = 'hover-wizard';
    }
    else if (props.character.name == "thief") {
      hover = 'hover-thief';
    }
    else {
      hover = 'hover-default';
    }
    return `${baseClass} ${hover} ${selected}`.trim()
	}

	const handleClick = () => {
		if (props.onSelect) {
			props.onSelect(props.character)
		}
	}
	
	const getCharacterIcon = (name) => {
    try {
      if (name === "warrior") {
        return "/assets/images/warrior_icon.png";
      } else if (name === "wizard") {
        return "/assets/images/wizard_icon.png";
      } else if (name === "thief") {
        return "/assets/images/thief_icon.png";
      } else {
        return "/assets/images/default_icon.jpg"; // personaggio non riconosciuto
      }
    } catch (e) {
      console.error("Errore nel caricamento dell'icona:", e);
      return "/assets/images/default_icon.jpg"; 
    }
  }

</script>

<style scoped>
	.character-card {
		border: 2px solid black;
		border-radius: 10px;
		padding: 1rem;
		background-color: lightgrey;
		transition: transform 0.2s, box-shadow 0.2s, border-color 0.3s ease;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.character-card.hover-warrior:hover {
    box-shadow: 0 0 10px 3px red;
  }
  .character-card.hover-wizard:hover {
    box-shadow: 0 0 10px 3px yellow;
  }
  .character-card.hover-thief:hover {
    box-shadow: 0 0 10px 3px blue;
  }
  .character-card.hover-default:hover {
    box-shadow: 0 0 10px 3px black;
  }

	.character-icon img {
		width: 80px;
		height: 80px;
		object-fit: contain;
		margin-bottom: 1rem;
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
    margin: 0.5rem 0;
    width: 100%;
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
