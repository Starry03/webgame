<script setup lang="ts">
import type { Ref } from 'vue';

const props = defineProps({
    percentage: {
        type: Object as () => Ref<number>,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    max: {
        type: Number,
        required: true,
    },
})
</script>

<template>
    <div class="cooldown-container">
        <div class="cooldown-circle" :style="{ '--progress': percentage.value / max * 100 + '%' }"></div>
        <span>{{ text }} {{ percentage.value / max * 100  }}</span>
    </div>
</template>

<style scoped>
.cooldown-container {
    position: relative;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.cooldown-circle {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: conic-gradient(rgba(255, 255, 255, 0.5) var(--progress, 0), transparent 0);
    border: 2px solid rgba(255, 255, 255, 0.2);
}
</style>
