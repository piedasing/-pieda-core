import * as Loaders from '@/components/Loader';

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        LoaderRing: typeof Loaders.Ring;
        LoaderSpinner: typeof Loaders.Spinner;
        LoaderEllipsis: typeof Loaders.Ellipsis;
        LoaderGrid: typeof Loaders.Grid;
        LoaderHourglass: typeof Loaders.Hourglass;
    }
}
