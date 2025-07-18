<template>
    <div class="master flex flex-center">
        <button class="button button-secondary button-home" @click="goHome">home</button>
        <div class="container flex flex-center flex-row gap-big">
            <img src="/assets/images/disegno.webp" alt="Logo" class="logo flex-grow" />
            <div id="cnt" class="flex flex-center flex-column gap-big flex-grow">
                <h2>Awakening in the Dark Tower</h2>
                <form class="flex flex-center flex-column gap-mid" @submit.prevent="login">
                    <input
                        class="in1"
                        id="username"
                        type="text"
                        placeholder="Username"
                        v-model="username"
                    />
                    <input
                        class="in2"
                        id="password"
                        type="password"
                        placeholder="Password"
                        v-model="password"
                    />
                    <div v-if="!isLogging" class="w-full flex flex-center flex-column gap-small">
                        <div class="bot flex-fit flex flex-space-between gap-mid">
                            <button
                                class="button-primary btn-regist flex-grow"
                                type="submit"
                                @click="register"
                            >
                                SIGN UP
                            </button>
                            <button
                                class="button-primary btn-login flex-grow"
                                type="submit"
                                @click="login"
                            >
                                SIGN IN
                            </button>
                        </div>
                        <button
                            class="button button-secondary button-tertiary"
                            @click="delete_account"
                        >
                            Delete account
                        </button>
                    </div>
                    <Loader v-else />
                    <p v-if="login_error !== null" class="font-small">
                        {{ (login_error as Error).message }}
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { RSAUtils, AESUtils, prefixed, SessionUtils } from '@/internal/cryptoutils'
import { AuthService } from '@/internal/apiService'
import type { Token, Session } from '@/internal/cryptoutils'
import Loader from '@/components/Loader.vue'
import type { User } from '@/internal/types'

const isLogging = ref<boolean>(false)
const username = ref<string>('')
const password = ref<string>('')
const login_error = ref<Error | null>(null)
const router = useRouter()

async function goHome() {
    try {
        AESUtils.read()
        router.push('/')
    } catch (e) {
        window.alert('non sei loggato')
    }
}

async function main_req(path: string): Promise<{ session: Session; token: Token }> {
    const f = await AuthService.login(path, username.value, password.value)
    if (f.status === 409) throw new Error('User already exists')
    if (f.status === 404) throw new Error("User doesn't exist")
    if (f.status !== 200) throw new Error('Unauthorized')
    try {
        const res = await f.json()
        return (await JSON.parse(res)) as { session: Session; token: Token }
    } catch (err) {
        if (path == import.meta.env.VITE_DELETE_PATH && (err as Error).message.startsWith('JSON'))
            return { session: {} as Session, token: {} as Token }
        throw err
    }
}

async function process_session(req: { session: Session; token: Token }) {
    const token: Token = req.token
    const session: Session = req.session
    token.access_token = RSAUtils.decrypt(token.access_token)
    session.sym_key = RSAUtils.decrypt(session.sym_key)
    AESUtils.save(session, token)
    isLogging.value = false
    SessionUtils.saveUser({ username: username.value } as User)
    await router.push('/')
}

async function login() {
    isLogging.value = true
    login_error.value = null
    try {
        const req = await main_req(import.meta.env.VITE_LOGIN_PATH)
        await process_session(req)
    } catch (error) {
        isLogging.value = false
        login_error.value = error as Error
        console.error(error)
    }
}

async function register() {
    isLogging.value = true
    login_error.value = null
    try {
        const req = await main_req(import.meta.env.VITE_REGISTER_PATH)
        await process_session(req)
    } catch (error) {
        isLogging.value = false
        login_error.value = error as Error
        console.error(error)
    }
}

async function delete_account() {
    isLogging.value = true
    login_error.value = null
    try {
        await main_req(import.meta.env.VITE_DELETE_PATH ?? '')
        window.alert('user deleted')
    } catch (error) {
        console.error(error)
        login_error.value = error as Error
        isLogging.value = false
        window.alert('user not deleted')
    }
}
</script>

<style scoped>
.master {
    background: blueviolet linear-gradient(135deg, #8a0576, #120446);
    height: 100svh;
    width: 100svw;
}

p {
    color: white;
    font-weight: 200;
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
        0 0 1px rgb(255, 255, 255),
        0 0 20px rgb(255, 255, 255);
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
    transform: scale(1.1);
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
