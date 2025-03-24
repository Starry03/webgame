<template>
  <link
    href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
    rel="stylesheet"
  />
  <div class="master">
    <button class="button button-home" @click="$router.push('/')">🏠Home</button>
    <h2 class="text-2xl font-semibold mb-4">Awakening in the Dark Tower</h2>

    <form @submit.prevent="login">
      <div>
        <label for="username" class="block text-sm font-medium">Username</label>
        <input v-model="username" id="username" type="text" />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium">Password</label>
        <input v-model="password" id="password" type="password" />
      </div>

      <button type="submit">SIGN IN</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RequestWrapper, RSAUtils } from '@/internal/cryptoutils'

const username = ref('')
const password = ref('')

async function login() {
  const req = await RequestWrapper.loginFetch(
    'http://127.0.0.1:8000/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    {
      username: username.value,
      password: password.value,
    },
  );

  if (req.status !== 200) {
	console.log('Errore login');
	return;
  }
  const cryptedData = await req.json();
  const decryptedData = await RSAUtils.decrypt(cryptedData);
  console.log(decryptedData);
}
</script>

<style scoped>
.master {
  background-color: blueviolet;
  background-size: cover;
  height: 100vh;
}

h2 {
  font-family: 'Press Start 2P', cursive;
  justify-content: center;
}
</style>
