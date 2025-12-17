<script setup lang="ts">
import { ref } from 'vue';
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

const months = [
    { label: '1月', value: 1 },
    { label: '2月', value: 2 },
    { label: '3月', value: 3 },
    { label: '4月', value: 4 },
    { label: '5月', value: 5 },
    { label: '6月', value: 6 },
    { label: '7月', value: 7 },
    { label: '8月', value: 8 },
    { label: '9月', value: 9 },
    { label: '10月', value: 10 },
    { label: '11月', value: 11 },
    { label: '12月', value: 12 },
];

const year = ref(dayjs(props.modelValue).year());

const isPicked = (value: number) => {
    return (
        value === dayjs(props.modelValue).month() + 1 &&
        year.value === dayjs(props.modelValue).year()
    );
};

const onSwitchView = () => {
    emits('switch:view');
};

const onSwitchYear = (value: number) => {
    year.value += value;
};

const onReset = () => {
    const value = dayjs().format('YYYY-MM-DD');
    year.value = dayjs(value).year();

    emits('update:modelValue', value);
    emits('pick', value);
};

const onPick = (value: number) => {
    emits('update:modelValue', `${year.value}-${value}-01`);
    emits('pick', `${year.value}-${value}-01`);
};
</script>

<template>
    <PickerLayout
        :resetButtonText="'本月'"
        :switchViewButtonText="`${year}年`"
        @prev="onSwitchYear(-1)"
        @next="onSwitchYear(1)"
        @switch:view="onSwitchView"
        @reset="onReset"
    >
        <template v-slot:default>
            <div class="months">
                <template v-for="item in months">
                    <div
                        class="month"
                        :class="{ active: isPicked(item.value) }"
                        @click="onPick(item.value)"
                    >
                        {{ item.label }}
                    </div>
                </template>
            </div>
        </template>
    </PickerLayout>
</template>

<style lang="scss" scoped>
.months {
    --cell-size: 48px;
    --gap-size: 4px;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: var(--gap-size);
    row-gap: var(--gap-size);
    padding-top: 0.25rem;
    .month {
        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--cell-size);
        cursor: pointer;
        border-radius: 4px;
        padding: 4px;
        &:hover {
            background-color: #0096ff;
            color: #fff;
        }
        &.active {
            background-color: #0096ff;
            color: #fff;
            &:hover {
                background-color: darken(#0096ff, 10%);
            }
        }
    }
}
</style>
