<script setup>
import * as Demo from '@/components/Demo/'
</script>

# useBase

---

用於獲得使用者裝置資訊

<br>
<Demo.Base></Demo.Base>

::: code-group

```md [Base.vue]
<script setup>
import { useBase } from '@pieda/core';

const { ww, wh, isMobile, deviceInfo } = useBase();
</script>
```

:::
