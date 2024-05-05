# Installation

```bash
npm install @pieda/core
```

In main.js or main.ts

```js
import { createApp } from 'vue';
import { createCore } from '@pieda/core';
import '@pieda/core/style.css';

import App from './App.vue';

const app = createApp();
app.use(createCore, {
    /**
     * @param {String}
     */
    prefix: 'core',
    /**
     * @param {Partial<SweetAlertOptions>}
     */
    notify: {
        confirmButtonColor: '#0096ff',
    },
});
app.mount(App);
```
