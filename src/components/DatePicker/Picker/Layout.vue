<script setup lang="ts">
const emits = defineEmits(['prev', 'next', 'reset', 'switch:view']);

const props = withDefaults(
    defineProps<{
        showResetButton?: boolean;
        resetButtonText?: string;
        switchViewButtonText?: string;
    }>(),
    {
        showResetButton: true,
        resetBtnText: '重設',
        switchViewButtonText: '',
    },
);

const onPrev = () => {
    emits('prev');
};

const onNext = () => {
    emits('next');
};

const onReset = () => {
    emits('reset');
};

const onSwitchView = () => {
    emits('switch:view');
};
</script>

<template>
    <div class="datepicker__layout">
        <div class="datepicker__layout__header">
            <div class="cc-flex-auto">
                <button
                    class="btn__switch__view"
                    type="button"
                    v-show="props.switchViewButtonText"
                    @click="onSwitchView"
                >
                    {{ props.switchViewButtonText }}
                </button>
            </div>
            <div class="cc-flex-none cc-flex">
                <button class="btn__reset" type="button" @click="onReset">
                    {{ props.resetButtonText }}
                </button>
                <button class="btn__prev" type="button" @click="onPrev">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path
                            d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z"
                        />
                    </svg>
                </button>
                <button class="btn__next" type="button" @click="onNext">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path
                            d="M439.1 297.4C451.6 309.9 451.6 330.2 439.1 342.7L279.1 502.7C266.6 515.2 246.3 515.2 233.8 502.7C221.3 490.2 221.3 469.9 233.8 457.4L371.2 320L233.9 182.6C221.4 170.1 221.4 149.8 233.9 137.3C246.4 124.8 266.7 124.8 279.2 137.3L439.2 297.3z"
                        />
                    </svg>
                </button>
            </div>
        </div>
        <div class="datepicker__layout__body">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.datepicker__layout__header {
    --btn-size: 28px;
    --day-size: 48px;
    --gap-size: 4px;

    display: flex;
    align-items: center;
    column-gap: var(--gap-size);

    .btn__switch__view {
        cursor: pointer;
        display: inline-block;
        padding: 2px 8px;
        border-radius: 6px;
        border: none;
        outline: none;
        background-color: #eee;
        color: #252b33;
        &:hover {
            background-color: #0096ff;
            color: #fff;
        }
    }
    .btn__reset {
        border-radius: 4px;
        border: none;
        outline: none;
        background-color: #f1341c;
        color: #fff;
        padding: 2px 8px;
        cursor: pointer;
        &:hover {
            background-color: darken(#f1341c, 10%);
            color: #fff;
        }
    }
    .btn__prev,
    .btn__next {
        flex: none;
        width: var(--btn-size);
        height: var(--btn-size);
        text-align: center;
        padding: var(--gap-size);
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        background-color: transparent;
        border: 0;
        outline: 0;
        svg {
            width: 90%;
        }
        &:hover {
            background-color: #999;
            svg {
                fill: #fff;
            }
        }
    }
    .datepicker__layout__header__text {
        flex: auto;
        text-align: left;
        padding: 0 var(--gap-size);
    }
}
</style>
