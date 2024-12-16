<script setup lang="ts">
import { computed } from 'vue';
import dayjs from 'dayjs';
import { DatePicker as VDatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';

const emits = defineEmits(['update:value']);

type TValue = string | Date | { start: Date | string; end: Date | string };

const props = withDefaults(
    defineProps<{
        placeholder?: string;
        value: TValue;
        startDate?: string;
        endDate?: string;
        mode?: 'date' | 'dateTime' | 'time' | 'dateRange' | 'dateTimeRange';
        showMonthRows?: number;
        is24hr?: boolean;
        timeAccuracy?: 1 | 2 | 3 | 4; // 1: hours, 2: minutes, 3: seconds, 4: milliseconds
        color?: string;
    }>(),
    {
        placeholder: '',
        value: '',
        startDate: '',
        endDate: '',
        mode: 'date',
        showMonthRows: 1,
        is24hr: true,
        timeAccuracy: 3,
        color: 'blue',
    },
);

const mode = computed(() => {
    if (props.mode === 'dateRange') {
        return 'date';
    }
    if (props.mode === 'dateTimeRange') {
        return 'dateTime';
    }
    return props.mode;
});

const isRange = computed(() => {
    return ['dateRange', 'dateTimeRange'].includes(props.mode);
});

const format = computed(() => {
    if (['time', 'dateTime'].indexOf(mode.value) > -1) {
        return 'YYYY/MM/DD HH:mm:ss';
    }
    return 'YYYY/MM/DD';
});

const formattedValue = (inputValue: Date | string) => {
    return inputValue && dayjs(inputValue).isValid() ? dayjs(inputValue).format(format.value) : '';
};

const onChanged = (evt: TValue) => {
    if (!evt) {
        onUpdate('');
        return;
    }
    if (typeof evt === 'object' && !(evt instanceof Date)) {
        onUpdate({
            start: formattedValue(evt.start),
            end: formattedValue(evt.end),
        });
        return;
    }
    if (!dayjs(evt).isValid()) {
        onUpdate('');
        return;
    }
    onUpdate(formattedValue(evt));
};

const onUpdate = (value: TValue) => {
    emits('update:value', value);
};

const toDate = (value: TValue) => {
    if (typeof value === 'object' && !(value instanceof Date)) {
        return {
            start: dayjs(value.start).toDate(),
            end: dayjs(value.end).toDate(),
        };
    }
    return value ? dayjs(value).toDate() : undefined;
};
</script>

<template>
    <v-date-picker
        :modelValue="toDate(props.value) || ''"
        :attributes="[
            {
                key: 'today',
                highlight: { color: 'red', fillMode: 'light' },
                dates: new Date(),
            },
        ]"
        :min-date="toDate(props.startDate)"
        :max-date="toDate(props.endDate)"
        :mode="mode"
        :rows="props.showMonthRows"
        :color="props.color"
        :is24hr="props.is24hr"
        :time-accuracy="props.timeAccuracy"
        :is-range="isRange"
        :popover="{
            visibility: 'click',
            autoHide: false,
            placement: 'bottom-start',
            showDelay: 0,
            hideDelay: 110,
        }"
        :update-on-input="false"
        @update:modelValue="onChanged"
    >
        <template v-slot="{ inputValue, togglePopover, inputEvents }">
            <slot v-bind="{ inputValue, togglePopover, inputEvents }"></slot>
        </template>
    </v-date-picker>
</template>

<style lang="scss" scoped></style>
