<template>
    <Navigation />
    <slot />
</template>

<script lang="ts" setup>
import Navigation from 'components/navigation/Main.vue';
</script>

<style>
body {
    margin: 0;
    font-family: sans-serif;
}
* {
    box-sizing: border-box;
}
</style>
