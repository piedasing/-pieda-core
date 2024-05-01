import { createApp } from 'vue';
import vClickOutside from 'click-outside-vue3';
import { SweetAlertOptions } from 'sweetalert2';

import { createNotify } from '@/composables';

import * as Loaders from '@/components/Loaders';

import { vLoading } from '@/directives/loading';

export type TConfigs = {
    prefix?: string;
    notify?: Partial<SweetAlertOptions> | undefined;
};

export default (app: ReturnType<typeof createApp>, configs?: TConfigs) => {
    app.use(vClickOutside);

    app.directive('loading', vLoading);

    if (configs) {
        const { prefix = 'core' } = configs;
        for (const [key, component] of Object.entries(Loaders)) {
            const componentName = [prefix, 'loader', key]
                .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1))
                .join('');
            app.component(componentName, component);
        }

        const { notify = undefined } = configs;
        createNotify({ ...notify });
    }
};
