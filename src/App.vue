<script setup lang="ts">
import { ref, onMounted } from 'vue';

import * as Demo from '@/components/Demo';
import Tab from '@/components/Tab.vue';

import { useAjax } from '@/library';

const $ajax = useAjax();

const { isLoading } = $ajax;

const tab = ref('useBase');
const tabItems = [
    { label: 'Loader', value: 'Loader' },
    { label: 'DatePicker', value: 'DatePicker' },
    { label: 'v-loading', value: 'v-loading' },
    { label: 'useBase', value: 'useBase' },
    { label: 'useNotify', value: 'useNotify' },
    { label: 'useAjax', value: 'useAjax' },
    { label: 'useForm', value: 'useForm' },
    { label: 'useModal', value: 'useModal' },
];

const initApp = () => {
    $ajax.init({
        baseURL: '',
        // interceptors: false,
    });
};

onMounted(() => {
    initApp();
});
</script>

<template>
    <div class="" v-loading="isLoading">
        <Tab v-model:value="tab" :options="tabItems">
            <template v-slot:default>
                <template v-if="tab === 'useBase'">
                    <Demo.Base></Demo.Base>
                </template>
                <template v-else-if="tab === 'useNotify'">
                    <Demo.Notify></Demo.Notify>
                </template>
                <template v-else-if="tab === 'useAjax'">
                    <Demo.Ajax></Demo.Ajax>
                </template>
                <template v-else-if="tab === 'useForm'">
                    <Demo.Form></Demo.Form>
                </template>
                <template v-else-if="tab === 'Loader'">
                    <Demo.Loader></Demo.Loader>
                </template>
                <template v-else-if="tab === 'v-loading'">
                    <Demo.Loading></Demo.Loading>
                </template>
                <template v-else-if="tab === 'useModal'">
                    <Demo.Modal></Demo.Modal>
                </template>
                <template v-else-if="tab === 'DatePicker'">
                    <Demo.DemoDatePicker></Demo.DemoDatePicker>
                </template>
            </template>
        </Tab>
    </div>
</template>

<style lang="scss" scoped></style>
