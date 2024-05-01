import { createApp, h } from 'vue';

import * as Loaders from '@/components/Loaders';

type TLoaderType = 'ellipsis' | 'spinner' | 'ring' | 'grid' | 'hourglass';

type TLoader = {
    color: string;
    size: number | string;
    type: TLoaderType;
};

type TOverlay = {
    color: string;
};

type TConfigs = {
    show: boolean;
    isFullPage: boolean;
    loader: TLoader;
    overlay: TOverlay;
};

type TBinding = {
    value: boolean | TConfigs;
};

const getConfigs = (value: boolean | TConfigs) => {
    let configs: TConfigs = {
        show: false,
        isFullPage: false,
        loader: {
            type: 'spinner',
            color: '#0096ff',
            size: 50,
        },
        overlay: {
            color: 'rgba(255, 255, 255, 0.8)',
        },
    };
    if (typeof value === 'boolean') {
        configs.show = value || false;
        return configs;
    }
    if (value?.show) {
        configs.show = value.show || false;
    }
    if (value?.isFullPage) {
        configs.isFullPage = value.isFullPage || false;
    }
    if (value?.overlay?.color) {
        configs.overlay.color = value.overlay.color;
    }
    if (value?.loader?.type) {
        configs.loader.type = value.loader.type;
    }
    if (value?.loader?.color) {
        configs.loader.color = value.loader.color;
    }
    if (value?.loader?.size) {
        configs.loader.size = value.loader.size;
    }
    return configs;
};

const getLoaderByType = (type: TLoaderType) => {
    const loaderName = type.charAt(0).toUpperCase() + type.slice(1);
    return (Loaders as Custom.AnyObj)?.[loaderName] || Loaders.Spinner;
};

const checkPosition = (el: HTMLElement): boolean => {
    const style = window.getComputedStyle(el);
    return style.getPropertyValue('position') !== 'static';
};

const toggleLoadingState = (el: HTMLElement, binding: TBinding) => {
    const { value } = binding;
    const { show, isFullPage, loader, overlay } = getConfigs(value);

    const container = el.querySelector('.v-loading-container');
    if (container) {
        el.removeChild(container);
    }

    if (show) {
        const tempApp = createApp({
            render: () =>
                h(getLoaderByType(loader.type as TLoaderType), {
                    size: loader.size,
                    color: loader.color,
                }),
        });
        const hasPosition = checkPosition(el);
        if (!hasPosition) {
            el.style.position = 'relative';
        }
        const container = document.createElement('div');
        container.classList.add('v-loading-container');
        if (isFullPage) {
            container.classList.add('is-full-page');
        }
        container.style['backgroundColor'] = overlay.color;
        tempApp.mount(container);
        el.appendChild(container);
    }
};

export const vLoading = {
    mounted(el: HTMLElement, binding: TBinding) {
        toggleLoadingState(el, binding);
    },
    updated(el: HTMLElement, binding: TBinding) {
        toggleLoadingState(el, binding);
    },
};
