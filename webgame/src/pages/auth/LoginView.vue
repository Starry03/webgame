<script setup>
</script>

<template>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
  <div class="master">
    <button class="button button-home" @click="$router.push('/')">🏠Home</button>
      <h2 class="text-2xl font-semibold mb-4">Awakening in the Dark Tower</h2>

      <form @submit.prevent="login">
        <div>
          <label for="username" class="block text-sm font-medium">Username</label>
          <input v-model="username" id="username" type="text">
        </div>

        <div>
          <label for="password" class="block text-sm font-medium">Password</label>
          <input v-model="password" id="password" type="password">
        </div>

        <button type="submit">SIGN IN</button>
      </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");

const login = () => {
  console.log("Logging in with:", username.value, password.value);
};
</script>

<style scoped>
  .master{
    background-color: blueviolet;
    background-size: cover;
    height: 100vh;
  }


  h2{
      font-family: 'Press Start 2P', cursive;
      justify-content: center;
  }
</style>