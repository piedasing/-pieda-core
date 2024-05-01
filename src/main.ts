import { createApp } from 'vue';

import '@/assets/scss/styles.scss';

import App from './App.vue';
import plugins from '@/plugins';

const app = createApp(App);
app.use(plugins, {
    prefix: 'core',
    notify: {
        confirmButtonColor: '#0096ff',
        allowOutsideClick: true,
    },
});
app.mount('#app');
