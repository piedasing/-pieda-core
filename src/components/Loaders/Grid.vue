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
        class="loader__grid"
        :style="{
            '--loader-color': props.color,
            '--loader-size': typeof props.size === 'string' ? props.size : `${props.size}px`,
        }"
    >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<style lang="scss" scoped>
.loader__grid {
    display: inline-grid;
    vertical-align: middle;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    width: 1em;
    height: 1em;
    font-size: var(--loader-size);
    > div {
        width: 60%;
        height: 60%;
        margin: auto;
        border-radius: 100%;
        background: var(--loader-color);
        animation: lds-grid 1.2s linear infinite;
        &:nth-child(1) {
            animation-delay: 0s;
        }
        &:nth-child(2) {
            animation-delay: -0.4s;
        }
        &:nth-child(3) {
            animation-delay: -0.8s;
        }
        &:nth-child(4) {
            animation-delay: -0.4s;
        }
        &:nth-child(5) {
            animation-delay: -0.8s;
        }
        &:nth-child(6) {
            animation-delay: -1.2s;
        }
        &:nth-child(7) {
            animation-delay: -0.8s;
        }
        &:nth-child(8) {
            animation-delay: -1.2s;
        }
        &:nth-child(9) {
            animation-delay: -1.6s;
        }
    }
}
@keyframes lds-grid {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}
</style>
