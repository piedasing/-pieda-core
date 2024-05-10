<script setup>
import Base from '@/components/Demo/Base.vue'
</script>

# useBase
---

用於獲得使用者裝置資訊

<Base></Base>


::: code-group

```md [Base.vue]
<script setup>
import { useBase } from '@pieda/core';

const { ww, wh, isMobile, deviceInfo } = useBase();
</script>
```

:::


