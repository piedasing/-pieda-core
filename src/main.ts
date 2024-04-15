import { createApp } from 'vue';

import '@/assets/scss/styles.scss';

import App from './App.vue';
import plugins from '@/plugins';

createApp(App).use(plugins).mount('#app');
