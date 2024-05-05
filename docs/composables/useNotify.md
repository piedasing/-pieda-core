<script setup>
import Notify from '@/components/Demo/Notify.vue'
</script>

# useNotify

::: code-group

```md [App.vue]
<script setup>
import { useNotify } from '@pieda/core';

const $notify = useNotify();

$notify.setGlobalConfigs({
    iconColor: '#0096FF',
    confirmButtonColor: '#F1341C',
    allowOutsideClick: true,
    allowEscapeKey: false,
});
</script>
```

```js [alert]
$notify.alert({
    title: '系統通知',
    message: '訊息內容',
    variant: 'success',
});
```

```js [confirm]{5}
$notify.alert({
    title: '系統通知',
    message: '訊息內容',
    variant: 'question',
    confirm: true,
});
```

```js [toast]
$notify.toast({
    title: '訊息內容',
    variant: 'success',
});
```

:::

<Notify></Notify>
