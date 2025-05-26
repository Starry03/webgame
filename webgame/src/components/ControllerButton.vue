<script setup>
const props = defineProps({
    text: {
        type: String,
        required: true,
    },
    press: {
        type: Function,
        require: true,
    },
    release: {
        type: Function,
        require: true,
    },
})

</script>

<template>
    <button
        class="button-primary rounded-full"
        :style="{
            width: '48px',
            height: '48px',
            fontSize: 'var(--font-mid)',
        }"
        @touchstart="props.press()"
        @touchend="props.release()"
    >
        {{ text }}
    </button>
</template>
