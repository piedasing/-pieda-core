<script setup lang="ts">
const emits = defineEmits(['confirm', 'cancel', 'close']);

const props = withDefaults(
    defineProps<{
        title: string;
    }>(),
    {
        title: '',
    },
);

const onConfirm = () => {
    emits('confirm');
};

const onCancel = () => {
    emits('cancel');
};

const onClose = () => {
    emits('close');
};
</script>

<template>
    <div class="sample__modal__dialog">
        {{ props.title }} <br />
        <button @click="onConfirm">confirm</button>
        <button @click="onCancel">cancel</button>
        <button class="btn__close" @click="onClose">&times;</button>
    </div>
</template>

<style lang="scss" scoped>
.sample__modal__dialog {
    width: 50vw;
    height: 50vh;
    border-radius: 8px;
    background-color: #fff;
    padding: 1rem;
    position: relative;
    .btn__close {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        width: 36px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        color: #000;
        background-color: #fff;
        border: 1px solid #000;
        font-size: 2rem;
        cursor: pointer;
    }
}
</style>
