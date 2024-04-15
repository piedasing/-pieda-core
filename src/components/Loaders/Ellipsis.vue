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
        class="loader__ellipsis"
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
.loader__ellipsis {
    display: inline-block;
    vertical-align: middle;
    position: relative;
    width: 1em;
    height: 1em;
    font-size: var(--loader-size);
    > div {
        position: absolute;
        top: 40%;
        width: 20%;
        height: 20%;
        border-radius: 50%;
        background: var(--loader-color);
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
        &:nth-child(1) {
            left: 0;
            animation: lds-ellipsis1 0.6s infinite;
        }
        &:nth-child(2) {
            left: 0;
            animation: lds-ellipsis2 0.6s infinite;
        }
        &:nth-child(3) {
            left: 40%;
            animation: lds-ellipsis2 0.6s infinite;
        }
        &:nth-child(4) {
            right: 0;
            animation: lds-ellipsis3 0.6s infinite;
        }
    }
}
@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}
@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(200%, 0);
    }
}
</style>
