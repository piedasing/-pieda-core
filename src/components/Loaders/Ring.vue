<script lang="ts" setup>
const props = defineProps({
    color: {
        type: String,
        default: '#0096ff',
    },
    size: {
        type: [String, Number],
        defualt: '25px',
    },
});
</script>

<template>
    <div
        class="loader__ring"
        :style="{
            '--loader-color': props.color,
            '--loader-size': typeof props.size === 'string' ? props.size : `${props.size}px`,
        }"
    >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<style lang="scss" scoped>
.loader__ring {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    width: 1em;
    height: 1em;
    font-size: var(--loader-size);
    > div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        border: calc(var(--loader-size) * 0.1) solid var(--loader-color);
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: var(--loader-color) transparent transparent transparent;
        &:nth-child(1) {
            animation-delay: -0.45s;
        }
        &:nth-child(2) {
            animation-delay: -0.3s;
        }
        &:nth-child(3) {
            animation-delay: -0.15s;
        }
    }
}
@keyframes lds-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
