<script setup></script>
<template>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <div class="flex flex-column flex-center gap-big">
    <h1>Adventuring in the Tower</h1>
    <button class="button button-primary b-play" @click="$router.push('/game')">Play</button>
    <button class="button button-secondary b-tutorial" @click="$router.push('/shop')">Tutorial</button>
    <button class="button button-secondary b-shop" @click="$router.push('/shop')">Shop</button>
    <button class="button button-secondary b-settings" @click="$router.push('/settings')">Settings</button>
  </div>
</template>
/*modifiche stile */
<style scoped>
    div{
        background: url('../../style/sfondo3.gif');
        background-size: cover;
        display: flex;
        height: 100vh;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }   
    button, h1{
        font-family: 'Press Start 2P', cursive;
    }
    h1{
        font-size: 2rem;
        text-shadow: 0 0 10px cyan, 0 0 20px cyan;
    }
    .b-tutorial, .b-settings{
        font-size: 0.68rem;
        font-display: flex;
    }
    .b-play:hover {
        transform: scale(1.2);
        text-shadow: 0 0 10px rgb(147, 0, 0), 0 0 20px red;
    }
    .b-tutorial:hover {
        transform: scale(1.1);
        text-shadow: 0 0 10px lightgreen, 0 0 20px lightgreen;
    }
    .b-shop:hover {
        transform: scale(1.1);
        text-shadow: 0 0 10px yellow, 0 0 20px yellow;
    }
    .b-settings:hover {
        transform: scale(1.1);
        text-shadow: 0 0 10px darkviolet, 0 0 20px darkviolet;
    }
</style>
