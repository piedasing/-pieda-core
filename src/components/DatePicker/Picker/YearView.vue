<script setup lang="ts">
import { ref, computed } from 'vue';
import dayjs from 'dayjs';

import PickerLayout from './Layout.vue';

const emits = defineEmits(['update:modelValue', 'pick']);

const props = withDefaults(
    defineProps<{
        modelValue: string;
    }>(),
    {
        modelValue: dayjs().format('YYYY-MM-DD'),
    },
);

const size = 9;
const year = ref(dayjs(props.modelValue).year());

const years = computed(() => {
    return Array.from({ length: size }, (_, i) => {
        const val = year.value - 4 + i;
        return {
            label: `${val}年`,
            value: val,
        };
    });
});

const isPicked = (value: number) => {
    return value === dayjs(props.modelValue).year();
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
    emits('update:modelValue', `${value}-01-01`);
    emits('pick', `${value}-01-01`);
};
</script>

<template>
    <PickerLayout
        :resetButtonText="'今年'"
        @prev="onSwitchYear(-size)"
        @next="onSwitchYear(size)"
        @reset="onReset"
    >
        <template v-slot:default>
            <div class="years">
                <template v-for="item in years">
                    <div
                        class="year"
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
.years {
    --cell-size: 60px;
    --gap-size: 4px;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: var(--gap-size);
    row-gap: var(--gap-size);
    padding-top: 0.25rem;
    .year {
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
