<script setup>
import Modal from '@/components/Demo/Modal.vue';
</script>

# useModal

---

<Modal></Modal>

---

::: info 一開始掛載 plugins 的時候，可帶入元件的前綴名稱，以防與專案元件命名重複

::: code-group

```js [main.js] {2}
app.use(createCore, {
    prefix: 'core',
});
```

:::

---

::: code-group

```md [Modal.vue]
<template>
    <!-- 使用具名 slot -->
    <core-base-modal v-model:show="showModal" :showCloseBtn="true">
        <template v-slot:modal-header>modal header</template>
        <template v-slot:modal-body>modal body</template>
        <template v-slot:modal-footer>modal footer</template>
    </core-base-modal>
    <!-- 使用預設 slot 搭配自訂元件 -->
    <core-base-modal v-model:show="modal.show" :showCloseBtn="false">
        <Modals.SampleModal
            :title="'Modal'"
            @confirm="modal.onConfirm"
            @cancel="modal.onCancel"
            @close="modal.onClose"
        ></Modals.SampleModal>
    </core-base-modal>
</template>
```

```md [Other.vue]
<script setup>
    const $modal = useModal({
    styles: {
        modal: {
            '--bm-overlay-color': 'rgba(120,120,120,0.8)',
            '--bm-close-btn-size': '36px',
        },
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

const onToggle = () => {
    $modal.open();
};
</script>

<template>
    <button @click="onToggle">開啟 modal</button>
</template>
```

:::
