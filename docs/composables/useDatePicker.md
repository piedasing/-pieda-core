<script setup>
import DatePicker from '@/components/Demo/DatePicker.vue';
</script>

# useDatePicker

---

### Example

日期選擇器

date:
<DatePicker></DatePicker>

datetime:
<DatePicker :mode="'datetime'" :color="'purple'"></DatePicker>

time:
<DatePicker :mode="'time'" :color="'gray'"></DatePicker>

---

::: code-group

```md [DatePicker.vue]
<script setup lang="ts">
import { ref } from 'vue';
import { useDatePicker } from '@pieda/core';

const { DatePicker } = useDatePicker();

const value = ref('2024-01-01');
const selectedColor = ref('pink');
</script>

<template>
    <DatePicker :value="value"  :color="selectedColor">
        <template v-slot="{ inputValue, togglePopover }">
            <div class="box">
                <input class="date__input" type="text" :value="inputValue" readonly>
                <button @click="togglePopover">
                <img class="icon" src="../../assets/calendar.png">
                </button>
            </div>
        </template>
    </DatePicker>
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
