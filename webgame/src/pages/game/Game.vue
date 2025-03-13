<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Map from "../../components/Map.vue";
import HealthBar from "../../components/Healthbar.vue";
const window_width = ref(window.innerWidth);
const window_height = ref(window.innerHeight);

const handle_resize = () => {
    window_width.value = window.innerWidth;
    window_height.value = window.innerHeight;
}

onMounted(() => {
    window.addEventListener('resize', handle_resize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handle_resize);
});

</script>
<template>
    <div class="flex flex-column">
        <div class="flex flex-row flex-space-between" id="game-header">
            <Map />
            <HealthBar />
        </div>
        <canvas id="canvas" :width="window_width" :height="window_height/1.5"></canvas>
    </div>
</template>

