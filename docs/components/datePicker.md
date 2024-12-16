<script setup>
import { ref } from 'vue';

import DatePicker from '@/components/Demo/DatePicker.vue';

const date = ref('2024-01-01');
const datetime = ref('2024-01-01 08:00:00');
const time = ref('08:00:00');
</script>

# DatePicker

::: info 一開始掛載 plugins 的時候，可帶入元件的前綴名稱，以防與專案元件命名重複

::: code-group

```js [main.js] {2}
app.use(createCore, {
    prefix: 'core',
});
```

:::

---

### Example

日期選擇器

date:
<core-date-picker v-model="date"></core-date-picker>

datetime:
<coder-date-picker v-model="datetime" :mode="'datetime'" :color="'purple'"></coder-date-picker>

time:
<coder-date-picker v-model="time" :mode="'time'" :color="'gray'"></coder-date-picker>

---

::: code-group

```md [DatePicker.vue]
<script setup lang="ts">
import { ref } from 'vue';

const value = ref('2024-01-01');
const selectedColor = ref('pink');
</script>

<template>
    <core-date-picker :value="value"  :color="selectedColor">
        <template v-slot="{ inputValue, togglePopover }">
            <div class="box">
                <input class="date__input" type="text" :value="inputValue" readonly>
                <button @click="togglePopover">
                <img class="icon" src="../../assets/calendar.png">
                </button>
            </div>
        </template>
    </core-date-picker>
</template>
```

:::

### Props

| 參數        | 說明                         | 可代的值                                                           | 預設值(皆為字串) |
| :---------- | :--------------------------- | :----------------------------------------------------------------- | :--------------- |
| placeholder | 提示字                       |                                                                    | " "              |
| value       | 選中的日期                   |                                                                    | " "              |
| startDate   | 設定選擇日期範圍中的開始日期 |                                                                    | " "              |
| endDate     | 設定選擇日期範圍中的結束日期 |                                                                    | " "              |
| color       | 按鈕顏色                     | gray, red, orange, yellow, green, teal, blue, indigo, purple, pink | "blue"           |
| mode        | 日期選擇器類型               | date(選日),dateTime(選日選時),time(選時)                           | "date"           |

以上範例使用套件為：<https://vcalendar.io/>
