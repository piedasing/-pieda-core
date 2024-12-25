import { defineConfig } from 'vitepress';
import path from 'path';

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: '/-pieda-core/',
    title: '@pieda/core',
    description: '@pieda/core docs',
    head: [
        [
            'script',
            {
                src: 'https://www.googletagmanager.com/gtag/js?id=G-JZRD6WQ6YL',
            },
        ],
        [
            'script',
            {},
            `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-JZRD6WQ6YL');
            `,
        ],
    ],
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
                items: [
                    { text: 'Loaders', link: '/components/loaders' },
                    { text: 'DatePicker', link: '/components/datePicker' },
                ],
            },
            {
                text: 'Composables',
                items: [
                    { text: 'useBase', link: '/composables/useBase' },
                    { text: 'useNotify', link: '/composables/useNotify' },
                    { text: 'useAjax', link: '/composables/useAjax' },
                    { text: 'useForm', link: '/composables/useForm' },
                    { text: 'useModal', link: '/composables/useModal' },
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
