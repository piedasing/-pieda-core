<script setup>
import Loader from '@/components/Demo/Loader.vue'
</script>

# Loaders

::: info 一開始掛載 plugins 的時候，可帶入元件的前綴名稱，以防與專案元件命名重複

::: code-group

```js [main.js] {2}
app.use(createCore, {
    prefix: 'core',
});
```

:::

---

<Loader></Loader>

---

::: code-group

```md [Ellipsis]
<template>
    <core-loader-ellipsis
        :size="'40px'"
        :color="'#0096ff'"
    ></core-loader-ellipsis>
</template>
```

```md [Grid]
<template>
    <core-loader-grid
        :size="'40px'"
        :color="'#0096ff'"
    ></core-loader-grid>
</template>
```

```md [Hourglass]
<template>
    <core-loader-hourglass
        :size="'40px'"
        :color="'#0096ff'"
    ></core-loader-hourglass>
</template>
```

```md [Ring]
<template>
    <core-loader-ring
        :size="'40px'"
        :color="'#0096ff'"
    ></core-loader-ring>
</template>
```

```md [Spinner]
<template>
    <core-loader-spinner
        :size="'40px'"
        :color="'#0096ff'"
    ></core-loader-spinner>
</template>
```

:::
