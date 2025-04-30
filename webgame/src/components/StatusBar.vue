<script setup lang="ts">
import ProgressBar from './ProgressBar.vue';
import {ref} from 'vue';

defineProps({
  health: Number,
  maxHealth: Number,
  mana: Number,
  level: Number,
  exp: Number,
})

</script>
<template>
  <div class="flex flex-row gap-mid">
    <ProgressBar :progress="health" />
  </div>
</template>
