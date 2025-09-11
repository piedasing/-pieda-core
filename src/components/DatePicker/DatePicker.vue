<script setup lang="ts">
import { ref } from 'vue';
import dayjs from 'dayjs';

import DateView from './DateView.vue';
import MonthView from './MonthView.vue';

type TMode = 'date' | 'datetime' | 'time';
type TViewMode = 'year' | 'month' | 'day';
type TEnumViewMode = {
    [x: string]: TViewMode;
};

const props = withDefaults(
    defineProps<{
        modelValue: string;
        mode?: TMode;
        viewMode?: TViewMode;
        range?: boolean;
    }>(),
    {
        modelValue: '',
        mode: 'date',
        viewMode: 'day',
        range: false,
    },
);

const ENUM_VIEW_MODE: TEnumViewMode = Object.freeze({
    YEAR: 'year',
    MONTH: 'month',
    DAY: 'day',
});

const showPicker = ref(false);
const view = ref(props.viewMode);

const year = ref(dayjs().year());
const month = ref(dayjs().month() + 1);
const date = ref(dayjs().date());

const onTogglePicker = () => {
    showPicker.value = !showPicker.value;

    if (showPicker.value) {
        setValues();
    }
};

const setValues = () => {
    const dateObj = dayjs(props.modelValue);
    if (dateObj.isValid()) {
        year.value = dateObj.year();
        month.value = dateObj.month() + 1;
        date.value = dateObj.date();
        return;
    }
    year.value = dayjs().year();
    month.value = dayjs().month() + 1;
    date.value = dayjs().date();
};

const onSwitchView = (value: TViewMode) => {
    view.value = value;
    console.log(value);
};

const onMonthPicked = () => {
    view.value = ENUM_VIEW_MODE.DAY;
};
</script>

<template>
    <div class="datepicker">
        <slot name="toggler" v-bind="{ show: showPicker, onToggle: onTogglePicker }"></slot>
        <transition name="fade">
            <div class="datepicker__picker" v-show="showPicker">
                <template v-if="view === ENUM_VIEW_MODE.DAY">
                    <DateView
                        v-model:year="year"
                        v-model:month="month"
                        v-model:date="date"
                        @switch:view="onSwitchView(ENUM_VIEW_MODE.MONTH)"
                    ></DateView>
                </template>
                <template v-else-if="view === ENUM_VIEW_MODE.MONTH">
                    <MonthView
                        v-model:year="year"
                        v-model:month="month"
                        @switch:view="onSwitchView(ENUM_VIEW_MODE.YEAR)"
                        @pick="onMonthPicked"
                    ></MonthView>
                </template>
                <template v-else-if="view === ENUM_VIEW_MODE.YEAR"> 123 </template>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
.datepicker {
    position: relative;
}
.datepicker__picker {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    background-color: #fff;
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
