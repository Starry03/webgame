<script setup lang="ts">
import Header from './components/Header.vue'
</script>

<template>
  <div class="app flex flex-column gap-big">
    <Header />
    <router-view />
  </div>
</template>
