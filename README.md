# @pieda/core

## 安裝

```bash
npm install @pieda/core
```

## 使用

```js
import { createCore } from '@pieda/core';
import '@pieda/core/style.css';

app.use(
    createCore({
        prefix: 'core',
        notify: {
            confirmButtonColor: '#0096ff',
        },
    }),
);
```

### useBase

```js
import { useBase } from '@pieda/core';

const { ww, wh, isMobile, deviceInfo } = useBase();
```

### 設定 Notify 預設值

```js
import { useNotify } from '@pieda/core';

const $notify = useNotify();

$notify.setGlobalConfigs({
    iconColor: '#0096FF',
    confirmButtonColor: '#F1341C',
    allowOutsideClick: true,
    allowEscapeKey: false,
});
```

### 呼叫 Notify

```js
// alert
$notify.alert({
    title: '系統通知',
    message: '訊息內容',
    variant: 'success',
});

// confirm
$notify.alert({
    title: '系統通知',
    message: '訊息內容',
    variant: 'question',
    confirm: true,
});

// toast
$notify.toast({
    title: '訊息內容',
    variant: 'success',
});
```

### AJAX 初始化

```js
import { useAjax } from '@pieda/core';

const $ajax = useAjax();

$ajax.init({
    baseURL: '<API 網址>',
    /**
     * 開發時的代理網址
     * 非開發環境則不帶，或者帶 null、空字串
     */
    proxyPath: '/proxy-api',
    /**
     * 發送請求的時候，要自動帶的 header
     */
    headers: {
        Authorization: accessToken,
    },
    /**
     * 回應攔截器，可不帶，會預設將回應資料整理成以下格式
     * 成功: [null, response]
     * 失敗: [error, null]
     */
    interceptors: {
        success: (response, defaultInterceptors) => {},
        failure: (response, defaultInterceptors) => {},
    },
});
```

### api.js

```js
export const useApi = ({ $ajax }) => ({
    getList: () => {
        return $ajax.get('/list');
    },
    postEditData: (payload) => {
        return $ajax.post('/data/edit', payload);
    },
});
```

### 表單驗證

```js
import { useForm } from '@pieda/core';

const { formData, $validate, $firstError, $hasError } = useForm(
    {
        name: '',
        baby: {
            name: '',
            pic: '',
        },
    },
    {
        rules: (Validator) => ({
            name(value) {
                return Validator.value(value)
                    .required('此欄必填')
                    .minLength(3, '最少需填寫3個字元');
            },
            'baby.name'(value) {
                return Validator.value(value).required('請輸入寶寶姓名');
            },
        }),
        configs: {
            debug: false,
            /**
             * 網頁要被滾動的元素選擇器，預設為 'html'，也可以帶 document.querySelector('html')
             * @params {String | HTMLElement}
             */
            scrollElement: 'html',
            /**
             * 表單元素選擇器，預設為 'form'，也可以帶 document.querySelector('form')
             * * @params {String | HTMLElement}
             */
            formElement: 'form',
            /**
             * 是否要自動滾動到驗證失敗的欄位，預設 true
             * @params {Boolean}
             */
            focusInvalid: true,
            /**
             * 驗證失敗的表單控件自動加上的 class "名稱" (*** 前面沒有 . ***)，預設為 is-invalid
             * @params {String}
             */
            invalidClass: 'is-invalid',
            /**
             * 錯誤訊息的元素選擇器，預設為 '.invalid-feedback'，也可以帶 document.querySelectorAll('.invalid-feedback')
             * @params {String | NodeList}
             */
            errorElement: '.invalid-feedback',
            /**
             * 滾動至驗證失敗欄位時，賦予該元素搖晃的時間 (毫秒)，預設為 800 ms，如果帶 <= 0 則不會搖晃
             * @params {Number}
             */
            shakeDuration: 800,
        },
    },
);

const onSubmit = async () => {
    const success = await $validate();
    if (!success) {
        return;
    }
    console.log(formData);
};
```

## Loaders

```html
<core-loader-ellipsis :size="'40px'" :color="'#0096ff'"></core-loader-ellipsis>
<core-loader-grid :size="'40px'" :color="'#0096ff'"></core-loader-grid>
<core-loader-hourglass :size="'40px'" :color="'#0096ff'"></core-loader-hourglass>
<core-loader-ring :size="'40px'" :color="'#0096ff'"></core-loader-ring>
<core-loader-spinner :size="'40px'" :color="'#0096ff'"></core-loader-spinner>
```

## v-loading

```html
<script setup>
    import { ref } from 'vue';

    const isLoading = ref(false);
</script>

<!-- 布林 -->
<div v-loading="isLoading">...</div>
<!-- 物件 -->
<div
    v-loading="{
        show: isLoading,
        isFullPage: false,
        loader: {
            type: 'spinner',
            color: '#0096ff',
            size: 50,
        },
        overlay: {
            color: 'rgba(255, 255, 255, 0.8)'
        }
    }"
>
    ...
</div>
```

## useModal

一般元件

```html
<core-base-modal v-model:show="showModal" :showCloseBtn="true">
    <template v-slot:modal-header>modal header</template>
    <template v-slot:modal-body>modal body</template>
    <template v-slot:modal-footer>modal footer</template>
</core-base-modal>

<core-base-modal v-model:show="modal.show">
    <Modals.SampleModal
        :title="'Modal'"
        @confirm="modal.onConfirm"
        @cancel="modal.onCancel"
        @close="modal.onClose"
    ></Modals.SampleModal>
</core-base-modal>
```

動態元件

```js
import { useModal } from '@pieda/core';

import SampleModal from 'path/to/SampleModal.vue';

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
    component: SampleModal,
    props: {
        title: 'Dynamic Modal',
        onClose: async () => {
            console.log('close');
            $modal.close();
        },
        onConfirm: () => {
            console.log('confirm');
            $modal.close();
        },
        onCancel: async () => {
            console.log('cancel');
            $modal.close();
        },
    },
});

$modal.open();
```
