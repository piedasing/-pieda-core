<script setup lang="ts">
import { ref, onMounted } from 'vue';

import * as Demo from '@/components/Demo';

import { useNotify, useAjax } from '@/library';

const $notify = useNotify();
const $ajax = useAjax();

const isLiffLoaded = ref(false);

const initApp = () => {
    const inputAlert = $notify.custom('inputAlert', {
        iconColor: '#999',
        input: 'tel',
    });
    inputAlert.fire({ title: 'title', message: 'message', variant: 'info', iconColor: '#0096ff' });

    const accessToken = 'TEST_TOKEN';
    // 設定 axios
    $ajax.init({
        baseURL: '',
        proxyPath: '/proxy-api',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    isLiffLoaded.value = true;
};

onMounted(() => {
    initApp();
});
</script>

<template>
    <div class="">
        <Demo.Base></Demo.Base>
        <hr />
        <Demo.Notify></Demo.Notify>
        <hr />
        <Demo.Ajax></Demo.Ajax>
        <hr />
        <Demo.Loader></Demo.Loader>
        <hr />
        <Demo.Form></Demo.Form>
    </div>
</template>

<style lang="scss" scoped></style>
@/library
