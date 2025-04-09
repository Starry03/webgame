<template>
  <div class="master flex flex-center">
    <button class="button button-secondary button-home" @click="$router.push('/')">home</button>
    <div class="container flex flex-center flex-row gap-big">
      <img src="../../assets/images/disegno.webp" alt="Logo" class="logo flex-grow" />
      <div id="cnt" class="flex flex-center flex-column gap-big flex-grow">
        <h2>Awakening in the Dark Tower</h2>
        <form class="flex flex-center flex-column gap-mid" @submit.prevent="login">
          <input class="in1" id="username" type="text" placeholder="Username" v-model="username" />
          <input
            class="in2"
            id="password"
            type="password"
            placeholder="Password"
            v-model="password"
          />
          <div v-if="!isLogging" class="bot flex flex-space-between gap-mid">
            <button class="button-primary btn-regist flex-grow" type="submit" @click="register">
              SIGN UP
            </button>
            <button class="button-primary btn-login flex-grow" type="submit" @click="login">
              SIGN IN
            </button>
          </div>
        <Loader v-else/>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RequestWrapper, RSAUtils, AESUtils } from '@/internal/cryptoutils'
import type { Token, Session } from '@/internal/cryptoutils'
import Loader from '@/components/Loader.vue'

const isLogging = ref<Boolean>(false)
const username = ref<String>('')
const password = ref<String>('')
const router = useRouter()

async function main_req(path: String): Promise<{ session: Session; token: Token }> {
  const f = await RequestWrapper.loginFetch(
    `http://127.0.0.1:8000/auth/${path}`,
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
  let res = await f.json()
  return (await JSON.parse(res)) as { session: Session; token: Token }
}

async function process_session(req: { session: Session; token: Token }) {
  const token: Token = req.token
  const session: Session = req.session
  token.access_token = await RSAUtils.decrypt(token.access_token)
  session.sym_key = await RSAUtils.decrypt(session.sym_key)
  AESUtils.save(session, token)
  isLogging.value = false
  router.push('/')
}

async function login() {
  isLogging.value = true
  const req = await main_req('login')
  try {
    process_session(req)
  } catch (error) {
    isLogging.value = false
    console.log(error)
  }
}

async function register() {
  isLogging.value = true
  const req = await main_req('register')
  try {
    process_session(req)
  } catch (error) {
    isLogging.value = false
    console.log(error)
  }
}
</script>

<style scoped>
.master {
  background: linear-gradient(135deg, #8a0576, #120446);
  background-color: blueviolet;
  height: 100svh;
  width: 100svw;
}

.container {
  width: 80%;
  height: 80%;
  max-height: 512px;
  max-width: 1024px;
  background: #0e0e1a;
  border-radius: 12px;
}

@media (orientation: portrait) {
  .logo {
    width: 90%;
  }

  .container {
    height: 150%;
  }
}

@media (max-width: 600px) {
  .container {
    flex-direction: column;
    padding: 24px;
    gap: var(--gap-mid);
  }
}

@media (min-width: 700px) {
  #cnt {
    padding-right: var(--gap-big);
  }
}

.logo {
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 12px;
}

h2 {
  text-align: center;
  text-shadow:
    0 0 10px red,
    0 0 20px red;
}

@media (max-height: 400px) {
  h2 {
    display: none;
  }
}

.btn-login,
.btn-regist {
  text-shadow:
    0 0 1px red,
    0 0 20px red;
  padding: 8px;
  font-size: var(--font-small);
  border-radius: 4px;
  cursor: pointer;
}

input {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  font-size: var(--font-small);
}

.button-home {
  position: absolute;
  top: 0px;
  left: 0px;
}

.button-home:hover {
  text-shadow:
    0 0 10px black,
    0 0 20px black;
}

form {
  width: 100%;
  height: 100%;
}

.bot {
  width: 100%;
}
</style>
