import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import basicSsl from '@vitejs/plugin-basic-ssl';
import path from 'path';
import postcssImport from 'postcss-import';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '127.0.0.1',
        port: 8001,
    },
    resolve: {
        alias: [
            {
                find: /\@\//,
                replacement: path.join(__dirname, './src/'),
            },
        ],
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import '@/assets/scss/utils/_variables.scss';
                    @import '@/assets/scss/utils/_mixins.scss';
                `,
            },
        },
        postcss: {
            plugins: [postcssImport, autoprefixer, tailwindcss],
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/library.ts'),
            name: '@pieda/core',
            fileName: (format, entry) => `core.${entry}.${format}.js`,
            formats: ['es'],
        },
        rollupOptions: {
            external: ['vue', 'sweetalert2', 'pinia', 'axios'],
            output: {
                format: 'umd',
                name: 'CoderLibrary',
                globals: {
                    vue: 'Vue',
                    sweetalert2: 'Swal',
                    pinia: 'pinia',
                    axios: 'axios',
                },
            },
        },
    },
    plugins: [basicSsl(), vue()],
});
