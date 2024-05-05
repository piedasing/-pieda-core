<script setup>
import Ajax from '@/components/Demo/Ajax.vue';
</script>

# useAjax

::: code-group

```md [App.vue]
<script setup>
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
</script>
```

```js [api/useApi.js]
export const useApi = ({ $ajax }) => ({
    getTest: () => {
        return $ajax.get('/test', {
            customInterceptors: {
                success: (response, defaultInterceptors) => {
                    return [null, { msg: 'test' }];
                },
                failure: (error, defaultInterceptors) => {
                    return [new Error('test error'), null];
                },
            },
        });
    },
    postTest: (payload) => {
        return $ajax.post('/test', payload);
    },
});
```

```md [Component.vue]
<script setup>
import { useNotify, useAjax } from '@pieda/core';
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
```

:::

<Ajax></Ajax>
