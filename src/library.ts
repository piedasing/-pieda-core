import { createApp } from 'vue';

import plugins from '@/plugins/index.js';

export default {
    install(app: ReturnType<typeof createApp>) {
        app.use(plugins);
    },
};

export { useBase, useAjax, useForm, useNotify, createNotify } from './composables';
