<script>
export default {
    name: 'Menu',
}
</script>
<template>
    <div class="flex flex-column flex-center gap-big">
        <button class="button button-primary" @click="$router.push('/game')">
            Play
        </button>
        <button class="button button-secondary" @click="$router.push('/shop')">
            Shop
        </button>
        <button class="button button-secondary" @click="$router.push('/settings')">
            Settings
        </button>
    </div>
</template>

<style scoped></style>