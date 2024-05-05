<script setup lang="ts">
import { useNotify } from '@/library';

const $notify = useNotify();

const onTestToast = () => {
    $notify.toast({
        title: '通知訊息',
        variant: 'success',
    });
};

const onTestAlert = () => {
    $notify.alert({
        title: '',
        message: '測試',
        variant: 'success',
    });
};

const onTestConfirm = () => {
    $notify.alert({
        message: '測試',
        variant: 'question',
        confirm: true,
    });
};
</script>

<template>
    <button @click="onTestToast">toast</button>
    <button @click="onTestAlert">alert</button>
    <button @click="onTestConfirm">confirm</button>
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
