<script setup lang="ts">
import { onMounted } from 'vue';

import { useNotify } from '@/library';

const $notify = useNotify();

const onTestToast = () => {
    $notify.toast({
        title: '系統通知',
        variant: 'success',
    });
};

const onTestAlert = () => {
    $notify.alert({
        title: '系統通知',
        message: '測試',
        variant: 'error',
    });
};

const onTestDialog = () => {
    $notify.alert({
        title: '系統通知',
        message: '測試',
        variant: 'error',
        showCancelButton: true,
    });
};

onMounted(() => {
    $notify.custom('testDialog', {});
});
</script>

<template>
    <button class="cc-px-6 cc-py-3" @click="onTestToast">toast</button>
    <button class="cc-px-6 cc-py-3" @click="onTestAlert">alert</button>
    <button class="cc-px-6 cc-py-3" @click="onTestDialog">dialog</button>
</template>

<style lang="scss" scoped></style>
