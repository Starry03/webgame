<script setup>
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-blue-900">
    <div class="bg-gray-900 p-8 rounded-lg shadow-lg w-80 text-white">
      <div class="flex flex-col items-center">
        <div class="mb-4">
          <svg class="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" stroke-width="2"
            viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 2L2 7l10 5 10-5-10-5zm0 12l10-5M2 7l10 5v10l-10-5V7z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-semibold mb-4">Awakening in the Dark Tower</h2>
      </div>

      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium">Username</label>
          <input v-model="username" id="username" type="text" class="mt-1 block w-full p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium">Password</label>
          <input v-model="password" id="password" type="password" class="mt-1 block w-full p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium">
          SIGN IN
        </button>
      </form>
    </div>
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
  h2{
      font-family: 'Press Start 2P', cursive;
      justify-content: center;
  }
</style>