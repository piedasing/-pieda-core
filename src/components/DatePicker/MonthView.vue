<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs';

import DatePickerLayout from './DatePickerLayout.vue';

const emits = defineEmits(['update:year', 'update:month', 'switch:view']);

const props = withDefaults(
    defineProps<{
        year: number;
        month: number;
    }>(),
    {
        year: dayjs().year(),
        month: dayjs().month() + 1,
    },
);

const months = [
    { label: '一月', value: 1 },
    { label: '二月', value: 2 },
    { label: '三月', value: 3 },
    { label: '四月', value: 4 },
    { label: '五月', value: 5 },
    { label: '六月', value: 6 },
    { label: '七月', value: 7 },
    { label: '八月', value: 8 },
    { label: '九月', value: 9 },
    { label: '十月', value: 10 },
    { label: '十一月', value: 11 },
    { label: '十二月', value: 12 },
];

const currentMonth = computed(() => {
    return dayjs().month() + 1;
});

const currentYear = computed(() => {
    return dayjs().year();
});

const isThisMonth = (value: number) => {
    return value === currentMonth.value && props.year === currentYear.value;
};

const onSwitchView = () => {
    emits('switch:view');
};

const onSwitchYear = (value: number) => {
    emits('update:year', props.year + value);
};

const onPick = (value: number) => {
    emits('update:month', value);
};
</script>

<template>
    <DatePickerLayout @prev="onSwitchYear(-1)" @next="onSwitchYear(1)" @switch:view="onSwitchView">
        <template v-slot:headerText>
            {{ `${year}年` }}
        </template>
        <template v-slot:default>
            <div class="months">
                <template v-for="item in months">
                    <div
                        class="month"
                        :class="{ 'is-this-month': isThisMonth(item.value) }"
                        @click="onPick(item.value)"
                    >
                        {{ item.label }}
                    </div>
                </template>
            </div>
        </template>
    </DatePickerLayout>
</template>

<style lang="scss" scoped>
.months {
    --cell-size: 48px;
    --gap-size: 4px;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: var(--gap-size);
    row-gap: var(--gap-size);
    .month {
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--cell-size);
        height: var(--cell-size);
        cursor: pointer;
        border-radius: 4px;
        &.is-this-month {
            background: #0096ff;
            color: #fff;
        }
        &:hover {
            background-color: #999;
            color: #fff;
        }
    }
}
</style>
