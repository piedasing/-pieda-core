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
        class="loader__hourglass"
        :style="{
            '--loader-color': props.color,
            '--loader-size': typeof props.size === 'string' ? props.size : `${props.size}px`,
        }"
    ></div>
</template>

<style lang="scss" scoped>
.loader__hourglass {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    width: 1em;
    height: 1em;
    font-size: var(--loader-size);
    &:after {
        content: ' ';
        display: block;
        border-radius: 50%;
        width: 0;
        height: 0;
        margin: auto;
        box-sizing: border-box;
        border: calc(var(--loader-size) * 0.5) solid var(--loader-color);
        border-color: var(--loader-color) transparent var(--loader-color) transparent;
        animation: lds-hourglass 1.2s infinite;
    }
}
@keyframes lds-hourglass {
    0% {
        transform: rotate(0);
        animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
        transform: rotate(900deg);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
        transform: rotate(1800deg);
    }
}
</style>
