<template>
    <div>Index</div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            msg: 'Index Page',
        };
    },
    test: 'hi',
    created() {
        console.log(this.$data.msg);
    },
};
</script>
