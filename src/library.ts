import { createApp } from 'vue';

import plugins, { TConfigs } from '@/plugins/index.js';
import '@/assets/scss/styles.scss';

export default {
    install(app: ReturnType<typeof createApp>, configs: Custom.AnyObj) {
        app.use(plugins, {
            prefix: configs.prefix || 'core',
        });
    },
};

export const createCore = (app: ReturnType<typeof createApp>, configs?: TConfigs) => {
    app.use(plugins, configs);
};

export { useBase } from './composables';
export { useAjax } from './composables';
export { useForm } from './composables';
export { useNotify, createNotify } from './composables';
export { useModal } from './composables';
