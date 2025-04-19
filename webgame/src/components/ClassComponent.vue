<<<<<<< HEAD
<<<<<<< HEAD
=======
<script setup>
const props = defineProps({
  character: Object,
  selected_character_id: Number,
  onSelect: Function,
})

const getCardClass = () => {
  if (props.selected_character_id == props.character.name) {
    return 'character-card selected'
  } else {
    return 'character-card'
  }
}
</script>
>>>>>>> main

=======
>>>>>>> 74ce90c000d6efc6f8b13b2d85fa5516a93ccc21
<template>
  <div :class="getCardClass()" @click="handleClick">
    <!-- Placeholder per l'icona -->
    <div class="character-icon">
      <img :src="getCharacterIcon(character.name)" :alt="`${character.name} icon`" />
    </div>
    <h2 class="character-name">{{ character.name }}</h2>
    <p><strong>Speed:</strong> {{ character.speed }}</p>
    <p><strong>Attack:</strong> {{ character.attack }}</p>
    <p><strong>Defence:</strong> {{ character.defence }}</p>
    <p><strong>Mana:</strong> {{ character.mana }}</p>
    <p><strong>Hp:</strong> {{ character.hp }}</p>
  </div>
</template>
<script setup>

	const props = defineProps({
	character: Object,
	selected_character_id: Number,
	onSelect: Function,
	})

	const getCardClass = () => {
		if (props.selected_character_id == props.character.id) {
			return 'character-card selected';
		} 
		else {
			return 'character-card';
		}
	}

	const handleClick = () => {
		if (props.onSelect) {
			props.onSelect(props.character)
		}
	}
	

	const getCharacterIcon = (name) => {
	try {
		if (name === "warrior") {
			return new URL('@/assets/images/warrior_icon.jpg', import.meta.url).href
		} 
		else if (name === "wizard") {
			return new URL('@/assets/images/wizard_icon.jpg', import.meta.url).href
		}
		else if (name === "thief") {
			return new URL('@/assets/images/thief_icon.jpg', import.meta.url).href
		} 
		else {
			return new URL('@/assets/images/default_icon.jpg', import.meta.url).href
		}
	} 
	catch (e) {
		console.error('Errore nel caricamento dell\'icona:', e)
		return new URL('@/assets/images/default_icon.jpg', import.meta.url).href
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
  		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.character-card:hover {
		box-shadow: 0 0 10px red;
		transform: scale(1.05);  
	}

	.character-icon img {
		width: 80px;
		height: 80px;
		object-fit: contain;
		margin-bottom: 1rem;
	}

</style>
