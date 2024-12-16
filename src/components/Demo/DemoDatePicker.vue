<script setup lang="ts">
import { ref } from 'vue';

import DatePicker from '@/components/DatePicker.vue';

const datetime = ref('2024-01-01 08:00:00');
const datetimeRange = ref({
    start: '2024-01-01 08:00:00',
    end: '2024-01-01 08:00:00',
});
</script>

<template>
    <div class="cc-mb-4">
        date:
        <DatePicker
            v-model:value="datetime"
            :mode="'date'"
            :color="'pink'"
            :placeholder="'請選擇日期'"
        >
            <template v-slot="{ inputValue, togglePopover }">
                <div class="box">
                    <input type="text" :value="inputValue" />
                    <button @click="togglePopover">
                        <img class="icon" src="../../assets/calendar.png" />
                    </button>
                </div>
            </template>
        </DatePicker>
    </div>
    <div class="cc-mb-4">
        datetime:
        <DatePicker
            v-model:value="datetime"
            :mode="'dateTime'"
            :color="'pink'"
            :placeholder="'請選擇日期'"
        >
            <template v-slot="{ inputValue, togglePopover }">
                <div class="box">
                    <input type="text" :value="inputValue" />
                    <button @click="togglePopover">
                        <img class="icon" src="../../assets/calendar.png" />
                    </button>
                </div>
            </template>
        </DatePicker>
    </div>
    <div class="cc-mb-4">
        time:
        <DatePicker
            v-model:value="datetime"
            :mode="'time'"
            :color="'pink'"
            :placeholder="'請選擇日期'"
        >
            <template v-slot="{ inputValue, togglePopover }">
                <div class="box">
                    <input type="text" :value="inputValue" />
                    <button @click="togglePopover">
                        <img class="icon" src="../../assets/calendar.png" />
                    </button>
                </div>
            </template>
        </DatePicker>
    </div>
    <div class="cc-mb-4">
        datetime range:

        <!-- <v-date-picker v-model.range="datetime" :mode="'dateTime'"></v-date-picker> -->
        <DatePicker
            v-model:value="datetimeRange"
            :mode="'dateTimeRange'"
            :showMonthRows="2"
            :color="'pink'"
            :placeholder="'請選擇日期'"
        >
            <template v-slot="{ inputValue, togglePopover, inputEvents }">
                <div class="box">
                    <input
                        type="text"
                        :value="inputValue.start"
                        v-on="inputEvents.start"
                        @change="() => togglePopover()"
                    />
                    -
                    <input type="text" :value="inputValue.end" v-on="inputEvents.end" />
                    <button @click="() => togglePopover()">
                        <img class="icon" src="../../assets/calendar.png" />
                    </button>
                </div>
            </template>
        </DatePicker>
    </div>
</template>

<style lang="scss" scoped>
.box {
    width: 100%;
    max-width: 400px;
    border: 1px solid #242424;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    .icon {
        width: 16px;
    }
}
</style>
