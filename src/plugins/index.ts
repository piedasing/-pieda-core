import { createApp } from 'vue';
import vClickOutside from 'click-outside-vue3';

import * as Loaders from '@/components/Loaders';

import { vLoading } from '@/directives/loading';

export default (app: ReturnType<typeof createApp>, configs: any = {}) => {
    app.use(vClickOutside);

    app.directive('loading', vLoading);

    const { prefix = 'core' } = configs;
    for (const [key, component] of Object.entries(Loaders)) {
        const componentName = [prefix, 'loader', key]
            .map((name: string) => {
                return name.charAt(0).toUpperCase() + name.slice(1);
            })
            .join('');
        app.component(componentName, component);
    }
};
