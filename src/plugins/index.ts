import { createApp } from 'vue';
import vClickOutside from 'click-outside-vue3';

import * as Loaders from '@/components/Loaders';

export default {
    install(app: ReturnType<typeof createApp>) {
        app.use(vClickOutside);

        app.component('LoaderRing', Loaders.Ring);
        app.component('LoaderSpinner', Loaders.Spinner);
        app.component('LoaderEllipsis', Loaders.Ellipsis);
        app.component('LoaderGrid', Loaders.Grid);
        app.component('LoaderHourglass', Loaders.Hourglass);
    },
};
