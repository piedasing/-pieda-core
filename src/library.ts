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

export { useBase, useAjax, useForm, useNotify, createNotify } from './composables';
