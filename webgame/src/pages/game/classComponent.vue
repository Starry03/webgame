<script setup>
    const props = defineProps({
        character: Object,
        selected_character_id: Number,
        onSelect: Function
    })

    const getCardClass = () => {
        if (props.selected_character_id == props.character.id) {
            return 'character-card selected'
        }
        else {
            return 'character-card'
        }
    }
</script>

<template>
    <div :class="getCardClass()" @click="() => onSelect(character)">
        <h2 class="character-name">{{ character.name }}</h2>
        <p><strong>Speed:</strong> {{ character.speed }}</p>
        <p><strong>Attack:</strong> {{ character.attack }}</p>
        <p><strong>Defence:</strong> {{ character.defence }}</p>
        <p><strong>Mana:</strong> {{ character.mana }}</p>
        <p><strong>Hp:</strong> {{ character.hp }}</p>
    </div>
</template>