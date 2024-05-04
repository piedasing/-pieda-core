<script setup lang="ts">
import { computed, useSlots } from 'vue';

const emits = defineEmits(['update:show', 'close']);

const props = withDefaults(
    defineProps<{
        name?: string;
        show: boolean;
        zIndex?: number;
        overlay?: { show?: boolean; clickable?: boolean } | boolean;
        showCloseBtn?: boolean;
        classes?: {
            modal?: string;
            overlay?: string;
            dialog?: string;
            header?: string;
            body?: string;
            footer?: string;
        };
        styles?: {
            modal?: Partial<CSSRule | { [x: string]: string }>;
            overlay?: Partial<CSSRule | { [x: string]: string }>;
            dialog?: Partial<CSSRule | { [x: string]: string }>;
            header?: Partial<CSSRule | { [x: string]: string }>;
            body?: Partial<CSSRule | { [x: string]: string }>;
            footer?: Partial<CSSRule | { [x: string]: string }>;
        };
    }>(),
    {
        show: false,
        zIndex: 1050,
        overlay: () => ({
            show: true,
            clickable: false,
        }),
        showCloseBtn: false,
    },
);

const slots = useSlots();

const overlay = computed(() => {
    if (typeof props.overlay === 'boolean') {
        return {
            show: true,
            clickable: false,
        };
    }

    const { show = true, clickable = false } = props.overlay;
    return {
        show,
        clickable,
    };
});

const onOverlayClicked = () => {
    const { clickable } = overlay.value;
    if (!clickable) {
        return;
    }
    onClosed();
};

const onClosed = () => {
    emits('update:show', false);
    emits('close', false);
};
</script>

<template>
    <transition name="baseModal" appear mode="out-in">
        <div
            :name="props.name"
            v-if="props.show"
            class="base__modal"
            :class="props.classes?.modal"
            :style="{ zIndex: props.zIndex, ...props.styles?.modal }"
        >
            <div
                v-if="overlay.show"
                class="base__modal__overlay"
                :class="props.classes?.overlay"
                :style="{
                    ...props.styles?.overlay,
                }"
                @click.prevent.stop="onOverlayClicked"
            ></div>
            <template v-if="slots['default']">
                <div class="base__modal__dialog__custom">
                    <slot name="default"></slot>
                    <div
                        v-if="props.showCloseBtn"
                        class="base__modal__close__btn"
                        @click="onClosed"
                    >
                        &times;
                    </div>
                </div>
            </template>
            <template v-else>
                <div
                    class="base__modal__dialog"
                    :class="props.classes?.dialog"
                    :style="{ ...props.styles?.dialog }"
                >
                    <div
                        class="base__modal__header"
                        :class="props.classes?.header"
                        :style="{ ...props.styles?.header }"
                    >
                        <slot name="modal-header"></slot>
                    </div>
                    <div
                        class="base__modal__body"
                        :class="props.classes?.body"
                        :style="{ ...props.styles?.body }"
                    >
                        <slot name="modal-body"></slot>
                    </div>
                    <div
                        class="base__modal__footer"
                        :class="props.classes?.footer"
                        :style="{ ...props.styles?.footer }"
                    >
                        <slot name="modal-footer"></slot>
                    </div>
                    <div
                        v-if="props.showCloseBtn"
                        class="base__modal__close__btn"
                        @click="onClosed"
                    >
                        &times;
                    </div>
                </div>
            </template>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.baseModal {
    &-enter-active,
    &-leave-active {
        transition: all 0.3s ease;
    }

    &-enter-from,
    &-leave-to {
        opacity: 0;
        transform: translateY(-10px);
    }
}

.base__modal {
    // overlay
    --bm-overlay-color: rgba(0, 0, 0, 0.5);
    // dialog
    --bm-dialog-bgc: #fff;
    --bm-dialog-width: 600px;
    --bm-dialog-max-width: 90vw;
    --bm-dialog-height: 900px;
    --bm-dialog-max-height: 85vh;
    --bm-dialog-radius: 8px;
    // close-btn
    --bm-close-btn-size: 40px;
    --bm-close-btn-radius: 100%;
    --bm-close-btn-color: #999;
    --bm-close-btn-bgc: #fff;
    --bm-close-btn-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.4);

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .base__modal__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--bm-overlay-color);
    }
    .base__modal__dialog,
    .base__modal__dialog__custom {
        position: relative;
    }
    .base__modal__dialog__custom {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .base__modal__dialog {
        display: flex;
        flex-direction: column;
        background-color: var(--bm-dialog-bgc);
        width: var(--bm-dialog-width);
        max-width: var(--bm-dialog-max-width);
        height: var(--bm-dialog-height);
        max-height: var(--bm-dialog-max-height);
        border-radius: var(--bm-dialog-radius);
    }
    .base__modal__header {
        flex: none;
    }
    .base__modal__body {
        flex: auto;
        overflow-y: auto;
        overflow-x: hidden;
        border-top: 1px solid #999;
        border-bottom: 1px solid #999;
    }
    .base__modal__footer {
        flex: none;
    }
    .base__modal__close__btn {
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        width: var(--bm-close-btn-size);
        height: var(--bm-close-btn-size);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: var(--bm-close-btn-radius);
        background-color: var(--bm-close-btn-bgc);
        color: var(--bm-close-btn-color);
        font-size: 2rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        box-shadow: var(--bm-close-btn-shadow);
        &:hover {
            color: #f1341c;
        }
    }
}
</style>
