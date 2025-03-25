<template>
	<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
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

<script setup lang="ts">
import { ref } from 'vue'
import { RequestWrapper, RSAUtils } from '@/internal/cryptoutils'
import type { Token, Session } from '@/internal/cryptoutils'

const username = ref('')
const password = ref('')

async function login() {
	try {
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
		)

		if (req.status !== 200) {
			console.log('Errore login')
			return
		}
		let res = await req.json();
		res = JSON.parse(res);

		const token: Token = res.token;
		const session: Session = res.session;
		token.access_token = await RSAUtils.decrypt(token.access_token);
		session.sym_key = await RSAUtils.decrypt(session.sym_key);

		localStorage.setItem('token', JSON.stringify(token));
		localStorage.setItem('session', JSON.stringify(session));

	} catch (error) {
		console.log(error)
	}
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
