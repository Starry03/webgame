<script setup>
    defineProps(['mana','defence','hp','name','attack','speed'])
</script>

<template>
    <h4>{{mana}}</h4>
    <h4>{{defence}}</h4>
    <h4>{{hp}}</h4>
    <h4>{{name}}</h4>
    <h4>{{attack}}</h4>
    <h4>{{speed}}</h4>
</template>