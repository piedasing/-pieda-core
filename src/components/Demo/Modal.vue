<script setup lang="ts">
import { reactive, ref } from 'vue';

import { useModal, useNotify } from '@/library';

import BaseModal from '@/components/BaseModal.vue';
import * as Modals from '@/components/Modals';

const $notify = useNotify();

const showModal = ref(false);

const modal = reactive({
    show: false,
    onClose: async () => {
        modal.show = false;
    },
    onConfirm: async () => {
        const { isConfirmed } = await $notify.alert({
            title: '系統通知',
            message: '確定要繼續嗎?',
            variant: 'question',
            confirm: true,
        });
        if (isConfirmed) {
            modal.show = false;
        }
    },
    onCancel: async () => {
        const { isConfirmed } = await $notify.alert({
            title: '系統通知',
            message: '確定取消嗎?',
            variant: 'question',
            confirm: true,
        });
        if (isConfirmed) {
            modal.show = false;
        }
    },
});

const $modal = useModal({
    styles: {
        modal: {
            '--bm-overlay-color': 'rgba(120,120,120,0.8)',
            '--bm-close-btn-size': '36px',
        },
    },
    classes: {
        dialog: 'cc-bg-[#f00] cc-divide-y cc-divide-x-0 cc-divide-gray-400 cc-divide-solid',
        header: 'cc-p-4 cc-text-center',
        body: 'cc-p-4',
        footer: 'cc-p-4 cc-text-right',
    },
    zIndex: 1000,
    overlay: {
        show: true,
        clickable: true,
    },
    showCloseBtn: false,
    component: Modals.SampleModal,
    props: {
        title: 'Dynamic Modal',
        onClose: async () => {
            $modal.close();
        },
        onConfirm: async () => {
            const { isConfirmed } = await $notify.alert({
                title: '系統通知',
                message: '確定要繼續嗎?',
                variant: 'question',
                confirm: true,
            });
            if (isConfirmed) {
                $modal.close();
            }
        },
        onCancel: async () => {
            const { isConfirmed } = await $notify.alert({
                title: '系統通知',
                message: '確定取消嗎?',
                variant: 'question',
                confirm: true,
            });
            if (isConfirmed) {
                $modal.close();
            }
        },
    },
});

const onToggleModal1 = () => {
    showModal.value = !showModal.value;
};

const onToggleModal2 = () => {
    modal.show = !modal.show;
};

const onToggleGlobalModal = () => {
    $modal.open();
};
</script>

<template>
    <div class="">
        <button class="" @click="onToggleModal1">modal (具名 slot)</button>
        <button class="" @click="onToggleModal2">modal (預設 slot)</button>
        <button class="" @click="onToggleGlobalModal">modal (js 動態渲染)</button>
    </div>

    <BaseModal v-model:show="showModal" :showCloseBtn="true">
        <template v-slot:modal-header>modal header</template>
        <template v-slot:modal-body>modal body</template>
        <template v-slot:modal-footer>modal footer</template>
    </BaseModal>

    <BaseModal v-model:show="modal.show">
        <Modals.SampleModal
            :title="'Modal'"
            @confirm="modal.onConfirm"
            @cancel="modal.onCancel"
            @close="modal.onClose"
        ></Modals.SampleModal>
    </BaseModal>
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
