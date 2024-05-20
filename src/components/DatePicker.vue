<script setup lang="ts">
import dayjs from 'dayjs';
import { DatePicker as VDatePicker } from 'v-calendar';
import 'v-calendar/dist/style.css';

const emits = defineEmits(['update:value']);

type TValue =
    | string
    | Date
    | { start: Date | string, end: Date | string };

const props = withDefaults(
    defineProps<{
        placeholder?: string;
        value: TValue;
        startDate?: string;
        endDate?: string;
        mode?: string;
        color?: string;
    }>(),
    {
        placeholder: '',
        value: '',
        startDate: '',
        endDate: '',
        color: 'blue',
        mode: 'date',
    },
);

const onChanged = (evt: TValue) => {
    if (typeof evt === 'object' && !(evt instanceof Date)) {
        onUpdate({
            start: dayjs(evt.start).format('YYYY/MM/DD'),
            end: dayjs(evt.end).format('YYYY/MM/DD'),
        });
        return;
    }
    if (!evt || !dayjs(evt).isValid()) {
        onUpdate('');
        return;
    }
    onUpdate(dayjs(evt).format('YYYY/MM/DD'));
};

const onUpdate = (value: TValue) => {
    emits('update:value', value);
};

const toDate = (value: TValue) => {
    if (typeof value === 'object' && !(value instanceof Date)) {
        return {
            start:  dayjs(value.start).toDate(),
            end: dayjs(value.end).toDate(),
        }
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
        :mode="props.mode"
        :color="props.color"
        @update:modelValue="onChanged"
    >
        <template v-slot="{ inputValue, togglePopover }">
            <slot v-bind="{ inputValue, togglePopover }"></slot>
        </template>
    </v-date-picker>
</template>

<style lang="scss" scoped></style>
