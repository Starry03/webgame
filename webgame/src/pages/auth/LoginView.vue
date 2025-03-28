<template>
	<meta name="viewport" content="width=device-height, initial-scale=1.0" />
  <div class="master">
    <button class="button button-home" @click="$router.push('/')">🏠Home</button>      

      <div class="container flex flex-center gap-big">
        <img src="../../style/disegno.webp" alt="Logo" class="logo">
        
        <div>
          <h2>Awakening in the Dark Tower</h2>
          <div class="forma">
            <form>
              <input class="in1" id="username" type="text" placeholder="Username" v-model="username">
              <input class="in2" id="password" type="password" placeholder="Password" v-model="password">
              
              <div class="bot flex flex-center gap-big">
                <button class="btn-regist" type="submit">SIGN UP</button>
                <button class="btn-login" type="submit" @click="login">SIGN IN</button>
              </div>
              
            </form>
          </div>
        </div>
        
      </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RequestWrapper, RSAUtils, prefixed, AESUtils } from '@/internal/cryptoutils'
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
			console.log('Errore login');
			return
		}
		let res = await req.json();
		res = JSON.parse(res);

		const token: Token = res.token;
		const session: Session = res.session;
		token.access_token = await RSAUtils.decrypt(token.access_token);
		session.sym_key = await RSAUtils.decrypt(session.sym_key);
		AESUtils.save(session, token);

	} catch (error) {
		console.log(error)
	}
}
</script>

<style scoped>

  @media (orientation: portrait) {
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: black;
      color: white;
      text-align: center;
      font-size: var(--font-biggest);
    }

    body::before {
      content: "Ruota il dispositivo in orizzontale per continuare";
    }
  }

  .master{
    background: linear-gradient(135deg, #8a0576, #120446);
    background-color: blueviolet;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container{
    background: #0e0e1a;
    width: 320px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
  }

  @media (max-height: 600px) {
    .container {
      flex-direction: row;
    }
  }

  .logo{
    width: 100%;
    margin-bottom: 15px;
  }

  h2{
      justify-content: center;
      margin-bottom: 20px;
      width: 100%;
      text-shadow: 0 0 10px red, 0 0 20px red;
  }

  .btn-login, .btn-regist{
    background: linear-gradient(135deg, #8a0576, #120446);
    background-color: blueviolet;
    color: black;
    text-shadow: 0 0 1px red, 0 0 20px red;
    padding: 10px;
    border: none;
    font-size: var(--font-small);
    border-radius: 5px;
    cursor: pointer;
  }

  .btn-login:hover, .btn-regist:hover{
    transform: scale(1.1);
  }

  input{
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    font-size: 16px;
  }

  .bot{
    width: 100%;
  }

  .button-home{
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 1rem;
    background-color: rgb(148, 20, 60);
  }
  
  .button-home:hover{
    transform: scale(1.1);
    text-shadow: 0 0 10px black, 0 0 20px black;
  }

</style>
