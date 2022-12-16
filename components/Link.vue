<template>
    <a :class="{active: pageContext.urlPathname === $attrs.href}">
        <slot />
    </a>
</template>
<style scoped>
a {
    padding: 3px 10px;
    text-decoration: none;
}
a.active {
    background-color: #eee;
}
</style>
<script lang="ts" setup>
import {usePageContext} from 'renderer/usePageContext';
const pageContext = usePageContext();
</script>
