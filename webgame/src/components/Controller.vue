<script setup lang="ts">
import { GameHandler } from '@/internal/GameHandler'
import ControllerButton from './ControllerButton.vue'
import StarLayout from './StarLayout.vue'

const props = defineProps({
    handler: {
        type: GameHandler,
        required: true,
    },
})

const keys = [
    { key: 'w', gridPosition: '1 / 2' },
    { key: 'a', gridPosition: '2 / 1' },
    { key: 's', gridPosition: '2 / 2' },
    { key: 'd', gridPosition: '2 / 3' },
]

const attacks = [
    { key: 'q', gridPosition: '1 / 1' },
    { key: 'e', gridPosition: '1 / 2' },
    { key: 'r', gridPosition: '2 / 1' },
    { key: 'c', gridPosition: '2 / 2' },
]
</script>

<template>
    <div
        class="w-full flex flex-row flex-space-between"
        :style="{
            position: 'absolute',
            bottom: '24px',
            left: '0px',
            background: 'none',
            padding: '0 12px',
        }"
    >
        <StarLayout>
            <ControllerButton
                v-for="item in keys"
                :key="item.key"
                :text="item.key.toUpperCase()"
                :press="() => props.handler.addKey(item.key)"
                :release="() => props.handler.removeKey(item.key)"
                :style="{
                    gridArea: item.gridPosition,
                }"
            />
        </StarLayout>

        <StarLayout>
            <ControllerButton
                v-for="item in attacks"
                :key="item.key"
                :text="item.key.toUpperCase()"
                :press="() => props.handler.addKey(item.key)"
                :release="() => props.handler.removeKey(item.key)"
                :style="{
                    gridArea: item.gridPosition,
                }"
            />
        </StarLayout>
    </div>
</template>
