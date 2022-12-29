<template>
    <div>About</div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            msg: 'About Page',
        };
    },
    test: 'hi',
    created() {
        console.log(this.$data.msg);
    },
};
</script>
