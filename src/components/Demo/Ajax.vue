<script setup lang="ts">
import { useNotify, useAjax } from '@/library';
import { useApi } from '@/api/useApi';

const $ajax = useAjax();
const $api = useApi({ $ajax });
const $notify = useNotify();

const fetchSuccess = async () => {
    $ajax.setLoading(true);
    const [error, res] = await $api.getTest();
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

const fetchError = async () => {
    $ajax.setLoading(true);
    const [error, res] = await $api.postTest({ id: 0 });
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
        message: res?.msg,
        variant: 'success',
    });
};
</script>

<template>
    <button @click="fetchSuccess">fetchSuccess</button>
    <button @click="fetchError">Fetch Error</button>
</template>

<style lang="scss" scoped>
button {
    background-color: #0096ff;
    color: #fff;
    margin-right: 1rem;
    padding: 0.25rem 1rem;
    border-radius: 4px;
}
</style>
