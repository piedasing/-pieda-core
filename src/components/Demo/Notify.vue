<script setup lang="ts">
import { useNotify } from '@/library';

const $notify = useNotify();

const onTestToast = () => {
    $notify.toast({
        title: '通知訊息',
        variant: 'success',
    });
};

const onTestAlert = () => {
    $notify.alert({
        title: '',
        message: '測試',
        variant: 'success',
    });
};

const onTestConfirm = () => {
    $notify.alert({
        message: '測試',
        variant: 'question',
        confirm: true,
    });
};

const onTestCustom = async () => {
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
        footer: 'footer',
        customClass: {
            popup: 'cc-bg-[#0096ff] cc-text-white cc-rounded-md cc-w-[1024px]',
            htmlContainer: 'cc-py-10',
        },
    });

    console.log(result);
};
</script>

<template>
    <button @click="onTestToast">toast</button>
    <button @click="onTestAlert">alert</button>
    <button @click="onTestConfirm">confirm</button>
    <button @click="onTestCustom">custom</button>
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
