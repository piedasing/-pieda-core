<script setup lang="ts">
import { computed, ref } from 'vue';
import dayjs from 'dayjs';

import PickerLayout from './Layout.vue';

const emits = defineEmits(['update:modelValue', 'pick', 'switch:view']);

const props = withDefaults(
    defineProps<{
        modelValue: string;
    }>(),
    {
        modelValue: dayjs().format('YYYY-MM-DD'),
    },
);

const year = ref(dayjs(props.modelValue).year());
const month = ref(dayjs(props.modelValue).month() + 1);

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
                isToday: date.isSame(dayjs().format('YYYY-MM-DD')),
                isThisMonth: date.isSame(props.modelValue, 'month'),
            });
        }
    }

    return result;
});

const isPicked = (value: string) => {
    return value === dayjs(props.modelValue).format('YYYY-MM-DD');
};

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

const onReset = () => {
    const value = dayjs().format('YYYY-MM-DD');
    emits('update:modelValue', value);
};

const onPick = (value: string) => {
    emits('update:modelValue', value);
    emits('pick', value);
};
</script>

<template>
    <PickerLayout
        :resetButtonText="'今天'"
        @prev="onSwitchMonth(-1)"
        @next="onSwitchMonth(1)"
        @reset="onReset"
    >
        <template v-slot:headerText>
            <div
                class="cc-cursor-pointer cc-inline-block hover:cc-bg-gray-200 hover:cc-rounded"
                @click="onSwitchView"
            >
                {{ `${year}年${month}月` }}
            </div>
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
                                'is-this-month': day.isThisMonth,
                                active: isPicked(day.value),
                            }"
                            @click="onPick(day.value)"
                        >
                            {{ day.label }}
                        </div>
                    </template>
                </div>
            </template>
        </template>
    </PickerLayout>
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
    user-select: none;
    margin-bottom: var(--gap-size);
    &:last-child {
        margin-bottom: 0;
    }
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
        color: #252b33;
    }
}

.days {
    .day {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.04);
        color: #999;
        &.is-this-month {
            background-color: rgba(0, 0, 0, 0.08);
            color: #252b33;
        }
        &.is-today {
            color: #e4523f;
            &.active {
                background: #e4523f;
                color: #fff;
            }
        }
        &.active {
            background: #0096ff;
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
