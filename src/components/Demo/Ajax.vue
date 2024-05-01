<script setup lang="ts">
import { useNotify, useAjax } from '@/library';
import { useApi } from '@/api/useApi';

const $ajax = useAjax();
const $api = useApi({ $ajax });
const $notify = useNotify();

const sleep = (delay = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    });
};

const onTest = async () => {
    $ajax.setLoading(true);
    const [error, res] = await $api.getList();
    await sleep(1000);
    $ajax.setLoading(false);
    if (error) {
        $notify.alert({
            title: '系統訊息',
            message: error.message,
            variant: 'error',
        });
        return;
    }
    $notify.alert({
        title: '系統訊息',
        message: res.msg,
        variant: 'success',
    });
};
</script>

<template>
    <button class="cc-px-6 cc-py-3" @click="onTest">ajax</button>
</template>

<style lang="scss" scoped></style>
