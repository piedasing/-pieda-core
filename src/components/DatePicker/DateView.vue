<script setup lang="ts">
import { computed, ref } from 'vue';
import dayjs from 'dayjs';

import DatePickerLayout from './DatePickerLayout.vue';

const emits = defineEmits(['update:modelValue', 'switch:view']);

const props = withDefaults(
    defineProps<{
        year: number;
        month: number;
        date: number;
    }>(),
    {
        year: dayjs().year(),
        month: dayjs().month() + 1,
        date: dayjs().date(),
    },
);

const today = dayjs().format('YYYY-MM-DD');

const year = ref(props.year);
const month = ref(props.month);
const date = ref(props.date);

const weekdays = ['日', '一', '二', '三', '四', '五', '六'];

const firstDayOfMonth = computed(() => {
    return dayjs(`${year.value}-${month.value}-01`).startOf('month').day();
});

const firstDateOfPicker = computed(() => {
    return dayjs(`${year.value}-${month.value}-01`)
        .subtract(firstDayOfMonth.value, 'day')
        .format('YYYY-MM-DD');
});

const days = computed(() => {
    const result: any = [];
    for (let i = 0; i < 6; i++) {
        if (!result[i]) {
            result[i] = [];
        }
        for (let j = 0; j < 7; j++) {
            const date = dayjs(firstDateOfPicker.value).add(i * 7 + j, 'day');
            result[i].push({
                label: date.format('D'),
                value: date.format('YYYY-MM-DD'),
                isToday: date.isSame(today),
                isPast: date.isBefore(today),
                isFuture: date.isAfter(today),
                isThisMonth: date.isSame(today, 'month'),
            });
        }
    }

    return result;
});

const onSwitchView = () => {
    emits('switch:view');
};

const onSwitchMonth = (value: number) => {
    month.value += value;
    if (month.value > 12) {
        year.value += 1;
        month.value = 1;
        return;
    }
    if (month.value <= 1) {
        year.value -= 1;
        month.value = 12;
    }
};

const onPick = (value: string) => {
    emits('update:modelValue', value);
};
</script>

<template>
    <DatePickerLayout
        @prev="onSwitchMonth(-1)"
        @next="onSwitchMonth(1)"
        @switch:view="onSwitchView"
    >
        <template v-slot:headerText>
            {{ `${year}年${month}月` }}
        </template>
        <template v-slot:default>
            <div class="weekday">
                <template v-for="weekday in weekdays">
                    <div class="day">{{ weekday }}</div>
                </template>
            </div>
            <template v-for="item in days">
                <div class="days">
                    <template v-for="day in item">
                        <div
                            class="day"
                            :class="{
                                'is-today': day.isToday,
                                'is-past': day.isPast,
                                'is-future': day.isFuture,
                                'is-this-month': day.isThisMonth,
                            }"
                            @click="onPick(day.value)"
                        >
                            {{ day.label }}
                        </div>
                    </template>
                </div>
            </template>
        </template>
    </DatePickerLayout>
</template>

<style lang="scss" scoped>
.weekday,
.days {
    --btn-size: 32px;
    --day-size: 32px;
    --gap-size: 4px;

    display: flex;
    column-gap: var(--gap-size);
    row-gap: var(--gap-size);
    .day {
        flex: none;
        width: var(--day-size);
        height: var(--day-size);
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        text-align: center;
        aspect-ratio: 1 / 1;
        border-radius: 100%;
        cursor: pointer;
        color: #252b33;
        &.is-past,
        &.is-future {
            color: #999;
        }
        &.is-this-month {
            color: #252b33;
        }
        &.is-today {
            background: #f1341c;
            color: #fff;
        }
        &:hover {
            background: #0096ff;
            color: #fff;
        }
        &.disabled {
            color: #999;
            pointer-events: none;
        }
    }
}
</style>
