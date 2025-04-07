<template>
    <section class="container">
        <h1 id="container-title">Choose your character</h1>
        <div id="characters-box" v-for="character in characters" :key="character.id" @click="selectCharacter"(character) :class="getCardClass" >

        </div>
    </section>
</template>

<script setup>

</script>

<style scoped>

</style>