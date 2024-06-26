import { defineConfig } from 'vitepress';
import path from 'path';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/-pieda-core/',
    title: '@pieda/core',
    description: '@pieda/core docs',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Home', link: '/' },
            // { text: 'Examples', link: '/examples' },
        ],

        sidebar: [
            {
                text: 'Getting Started',
                items: [{ text: 'Introduction', link: '/guide/quick-start' }],
            },
            {
                text: 'Components',
                items: [{ text: 'Loaders', link: '/components/loaders' }],
            },
            {
                text: 'Composables',
                items: [
                    { text: 'useBase', link: '/composables/useBase' },
                    { text: 'useNotify', link: '/composables/useNotify' },
                    { text: 'useAjax', link: '/composables/useAjax' },
                    { text: 'useForm', link: '/composables/useForm' },
                    { text: 'useModal', link: '/composables/useModal' },
                    { text: 'useDatePicker', link: '/composables/useDatePicker' },
                ],
            },
            {
                text: 'Directives',
                items: [{ text: 'v-loading', link: '/directives/loading' }],
            },
        ],

        socialLinks: [{ icon: 'github', link: 'https://github.com/piedasing/-pieda-core' }],
    },
    markdown: {
        lineNumbers: true,
    },
    vite: {
        resolve: {
            alias: [
                {
                    find: /\@\//,
                    replacement: path.join(__dirname, '../../src/'),
                },
            ],
        },
    },
});
