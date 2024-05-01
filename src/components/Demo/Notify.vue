<script setup lang="ts">
import { useNotify } from '@/library';

const $notify = useNotify();

const onTestToast = () => {
    $notify.toast({
        title: '通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知通知',
        variant: 'success',
    });
};

const onTestAlert = () => {
    $notify.alert({
        title: '',
        message: '測試',
        variant: 'error',
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
    <button class="cc-px-6 cc-py-3" @click="onTestToast">toast</button>
    <button class="cc-px-6 cc-py-3" @click="onTestAlert">alert</button>
    <button class="cc-px-6 cc-py-3" @click="onTestConfirm">confirm</button>
</template>

<style lang="scss" scoped></style>
