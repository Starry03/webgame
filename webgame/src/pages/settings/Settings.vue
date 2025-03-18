<script setup>
import Header from '../../components/Header.vue'
</script>

<template>
    <br><Header />
    <div class="flex flex-column gap-big">
        <h1>Settings</h1>
    </div>
</template>

<style scoped>
    div{
        /*background-color: black;*/
        background: url('../../style/sfondo_settings.gif');
        background-size: cover;
        display: flex;
        height: 100vh;
        color: cyan;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
</style>