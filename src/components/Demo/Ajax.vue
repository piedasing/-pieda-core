<script setup lang="ts">
import { useNotify, useAjax } from '@/library';

const $ajax = useAjax();
const $notify = useNotify();

const onTest = async () => {
    const [error, res] = await $ajax.get('/test');
    if (error) {
        $notify.alert({
            title: '系統訊息',
            message: error?.message || '發生錯誤',
            variant: 'error',
        });
        return;
    }
    $notify.alert({
        title: '系統訊息',
        message: res,
        variant: 'success',
    });
};
</script>

<template>
    <button class="cc-px-6 cc-py-3" @click="onTest">ajax</button>
</template>

<style lang="scss" scoped></style>
@/library
