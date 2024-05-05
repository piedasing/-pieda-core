<script setup lang="ts">
import Loading from '@/components/Demo/Loading.vue'
import '@/assets/scss/_loading.scss';
</script>

# v-loading

<Loading></Loading>

---

::: code-group

```md [Loading.vue]
<script setup>
    import { ref } from 'vue';

    const isLoading = ref(false);
</script>

<!-- 布林 -->
<div v-loading="isLoading">...</div>
<!-- 物件 -->
<div
    v-loading="{
        show: isLoading,
        isFullPage: false,
        loader: {
            type: 'spinner',
            color: '#0096ff',
            size: 50,
        },
        overlay: {
            color: 'rgba(255, 255, 255, 0.8)'
        }
    }"
>
    ...
</div>
```

:::
