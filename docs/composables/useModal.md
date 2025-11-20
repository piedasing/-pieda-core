<script setup>
import * as Demo from '@/components/Demo/';
</script>

# useModal

---

### Example

<br>
<ClientOnly>
    <Demo.Modal></Demo.Modal>
</ClientOnly>

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

```md [DynamicModal.vue]
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

## Style

```md
<script setup>
const $modal = useModal({
    styles: {
        modal: {
            '--bm-overlay-color': 'rgba(120,120,120,0.8)',
            '--bm-close-btn-size': '36px',
        },
    },
})
</script>
```

#### Overlay

| 參數               | 說明         | 預設值(皆為字串)   |
| :----------------- | :----------- | :----------------- |
| --bm-overlay-color | 黑底背景顏色 | rgba(0, 0, 0, 0.5) |

#### Dialog

| 參數                   | 說明     | 預設值(皆為字串) |
| :--------------------- | :------- | :--------------- |
| --bm-dialog-bgc        | 背景顏色 | #fff             |
| --bm-dialog-width      | 寬度     | 600px            |
| --bm-dialog-max-width  | 最大寬度 | 90vw             |
| --bm-dialog-height     | 高度     | 900px            |
| --bm-dialog-max-height | 最大高度 | 85vh             |
| --bm-dialog-radius     | 圓角     | 8px              |

#### CloseBtn

| 參數                  | 說明      | 預設值(皆為字串)             |
| :-------------------- | :-------- | :--------------------------- |
| --bm-close-btn-size   | 尺寸大小  | 40px                         |
| --bm-close-btn-radius | 圓角      | 100%                         |
| --bm-close-btn-color  | icon 顏色 | #999                         |
| --bm-close-btn-bgc    | 背景顏色  | #fff                         |
| --bm-close-btn-shadow | 按鈕陰影  | 0 0 2px 0 rgba(0, 0, 0, 0.4) |

## Class

可直接寫 class 新增樣式 (以下範例使用前綴為 "cc-" tailwind)

```md
<script setup>
const $modal = useModal({
    classes: {
        dialog: 'cc-bg-[#f00] cc-divide-y cc-divide-x-0 cc-divide-gray-400 cc-divide-solid',
        header: 'cc-p-4 cc-text-center',
        body: 'cc-p-4',
        footer: 'cc-p-4 cc-text-right',
    },
});
</script>
```
