<script setup>
	const props = defineProps({
	character: Object,
	selected_character_id: Number,
	onSelect: Function,
	})

	const getCardClass = () => {
	if (props.selected_character_id == props.character.id) {
		return 'character-card selected'
	} else {
		return 'character-card'
	}
	}

	const getCharacterIcon = (name) => {
		try {
			const fileName = `${name.toLowerCase().replace(/\s/g, '')}_icon.jpg`			/*replace(...) serve per sostituire parti di stringa*/
    		return new URL(`@/assets/images/${fileName}`, import.meta.url).href				/* /\s/ è una regex che indica qualsiasi carattere di spazio bianco*/
  		} catch (e) {																		/* g significa "globale", ossia si effettua la sostituzione a tutti i caratteri trovati, non solo il primo */
    		return new URL('@/assets/images/default_icon.jpg', import.meta.url).href		/* '' indica che li sostituisci con niente, rimuovendoli*/
  		}
	}

</script>

<template>
  <div :class="getCardClass()" @click="() => onSelect(character)">
    <!-- Placeholder per l'icona -->
    <div class="character-icon">
      <img src="getCharacterIcon(character.name)" alt="`${character.name} icon`" />
    </div>
    <h2 class="character-name">{{ character.name }}</h2>
    <p><strong>Speed:</strong> {{ character.speed }}</p>
    <p><strong>Attack:</strong> {{ character.attack }}</p>
    <p><strong>Defence:</strong> {{ character.defence }}</p>
    <p><strong>Mana:</strong> {{ character.mana }}</p>
    <p><strong>Hp:</strong> {{ character.hp }}</p>
  </div>
</template>

<style scoped>
	.character-card {
		border: 2px solid black;
		border-radius: 10px;
		padding: 1rem;
		background-color: lightgrey;
		transition: transform 0.2s, box-shadow 0.2s;
		cursor: pointer;
  		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.character-card.selected {
		border-color: green;
		box-shadow: 0 0 10px green;
		transform: scale(1.05);
	}

	.character-icon img {
		width: 80px;
		height: 80px;
		object-fit: contain;
		margin-bottom: 1rem;
	}

</style>
