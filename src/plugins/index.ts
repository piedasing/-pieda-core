import { createApp } from 'vue';
import vClickOutside from 'click-outside-vue3';
import { SweetAlertOptions } from 'sweetalert2';

import { createNotify } from '@/composables';

import * as Loaders from '@/components/Loaders';
import BaseModal from '@/components/BaseModal.vue';
import DatePicker from '@/components/DatePicker/DatePicker.vue';

import { vLoading } from '@/directives/loading';

export type TConfigs = {
    prefix?: string;
    notify?: Partial<SweetAlertOptions> | undefined;
};

export default (app: ReturnType<typeof createApp>, configs?: TConfigs) => {
    //點擊外部連結
    app.use(vClickOutside);

    // 註冊 loading 指令
    app.directive('loading', vLoading);

    const prefix = configs?.prefix || 'core';
    // 註冊 BaseModal 元件
    app.component(`${prefix}-base-modal`, BaseModal);
    // 註冊 Loaders 元件
    for (const [key, component] of Object.entries(Loaders)) {
        const componentName = [prefix, 'loader', key]
            .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
            .join('');
        app.component(componentName, component);
    }
    //notify 全域設定
    const notifyConfigs = configs?.notify || undefined;
    if (notifyConfigs) {
        app.use(createNotify, { ...notifyConfigs });
    }
    // 註冊 日期選擇器 元件
    app.component(`${prefix}-date-picker`, DatePicker);
};
