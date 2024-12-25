<script setup>
import * as Demo from '@/components/Demo/'
</script>

# useNotify

---

### Example

<br>
<Demo.Notify></Demo.Notify>

---

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

```js [toast]
$notify.toast({
    title: '訊息內容',
    variant: 'success',
});
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

```js [custom]
const result = await $notify.custom({
    render: (h) => {
        return h('div', null, [
            h(
                'p',
                { class: 'cc-mb-0' },
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, veniam. Sunt, consequuntur? Assumenda, sed laboriosam autem mollitia fugit, non officiis harum maiores architecto voluptatum asperiores dolor quas quos eum doloribus.',
            ),
            h('a', { href: 'https://www.google.com' }, 'link'),
            h(
                'button',
                {
                    onClick: () => {
                        console.log('clicked!!!');
                    },
                },
                '按鈕',
            ),
        ]);
    },
    customClass: {
        popup: 'cc-bg-[#0096ff] cc-text-white cc-rounded-md cc-w-[1024px]',
        htmlContainer: 'cc-py-10',
    },
});

console.log(result);
```

:::

關於 Notify 可調整細項請參考：<https://sweetalert2.github.io/#configuration>
