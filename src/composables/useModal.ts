import { createApp, ref, Ref, h } from 'vue';

import BaseModal from '@/components/BaseModal.vue';

export type TUseModal = {
    styles?: {
        modal?: Partial<CSSRule | { [x: string]: string }>;
        overlay?: Partial<CSSRule | { [x: string]: string }>;
        dialog?: Partial<CSSRule | { [x: string]: string }>;
        header?: Partial<CSSRule | { [x: string]: string }>;
        body?: Partial<CSSRule | { [x: string]: string }>;
        footer?: Partial<CSSRule | { [x: string]: string }>;
    };
    classes?: {
        modal?: string;
        overlay?: string;
        dialog?: string;
        header?: string;
        body?: string;
        footer?: string;
    };
    zIndex?: number;
    overlay?: { show?: boolean; clickable?: boolean } | boolean;
    showCloseBtn?: boolean;
    component: any;
    props: { [x: string]: any };
};

const show: Ref<boolean> = ref(false);
const modalName: Ref<string> = ref('');

export const useModal = ({
    zIndex,
    styles,
    classes,
    overlay,
    showCloseBtn,
    component,
    props,
}: TUseModal) => {
    let $container = document.querySelector('.v-modal-container');
    if (!$container) {
        $container = document.createElement('div');
        $container.classList.add('v-modal-container');
        document.body.appendChild($container);
    }

    modalName.value = component.__name;
    const modalApp = createApp({
        setup() {
            return () =>
                h(
                    BaseModal,
                    {
                        key: `modal__${modalName.value}`,
                        name: `modal__${modalName.value}`,
                        zIndex,
                        classes,
                        styles,
                        overlay,
                        showCloseBtn,
                        show: show.value,
                        'onUpdate:show': (val: boolean) => {
                            show.value = val;
                        },
                        onClose: () => {
                            props.onClose?.();
                        },
                    },
                    {
                        default: () => h(component, props),
                    },
                );
        },
    });
    modalApp.mount($container);

    return {
        show,
        open: () => {
            show.value = true;
        },
        close: () => {
            show.value = false;
        },
    };
};
