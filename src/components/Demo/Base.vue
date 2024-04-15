<script lang="ts" setup>
import { watch } from 'vue';

import { useBase } from '@/library';

const { ww, wh } = useBase();

watch(
    () => ww.value,
    (value) => {
        console.log(value);
    },
);
</script>

<template>
    <div>{{ ww }}x{{ wh }}</div>
</template>

<style lang="scss" scoped></style>
@/library
