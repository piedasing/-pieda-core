<script setup>
import dayjs from 'dayjs';

const emits = defineEmits(['update:value']);
import { withDefaults, defineProps } from 'vue';

const props = withDefaults(
    defineProps({
        placeholder: {
            type: String,
            default: '',
        },
        value: {
            type: [Date, String],
            default: '',
        },
        startDate: {
            type: String,
            default: '',
        },
        endDate: {
            type: String,
            default: '',
        },
        mode: {
            type: String,
            default: 'date', // date | dateTime | time
        },
    }),
    {
        placeholder: '',
        value: '',
        startDate: '',
        endDate: '',
        mode: 'date',
    }
);


const onChanged = (evt) => {
    if (!evt || !dayjs(evt).isValid()) {
        onUpdate('');
        return;
    }
    onUpdate(dayjs(evt).format('YYYY/MM/DD'));
};

const onUpdate = (value = '') => {
    emits('update:value', value);
};

const toDate = (value = null) => {
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
        @update:modelValue="onChanged">
        <template v-slot="{ inputValue, togglePopover }">
            <slot v-bind="{ inputValue, togglePopover }"></slot>
        </template>
    </v-date-picker>
</template>

<style lang="scss" scoped></style>
