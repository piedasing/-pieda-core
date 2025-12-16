<script setup lang="ts">
import { ref, computed, useTemplateRef, onMounted, useModel } from 'vue';
import dayjs from 'dayjs';

import DateView from './Picker/DateView.vue';
import MonthView from './Picker/MonthView.vue';

type TViewMode = 'year' | 'month' | 'day';
type TEnumViewMode = {
    [x: string]: TViewMode;
};

type TFormat = 'YYYY-MM-DD' | 'YYYY/MM/DD' | 'YYYY-MM' | 'YYYY/MM' | 'YYYY';

type TProps = {
    modelValue: string;
    viewMode?: TViewMode;
    range?: boolean;
    format?: TFormat;
    autoHideMenu?: boolean;
};

const emits = defineEmits(['update:modelValue', 'pick']);

const props = withDefaults(defineProps<TProps>(), {
    modelValue: '',
    viewMode: 'day',
    range: false,
    format: 'YYYY-MM-DD',
    autoHideMenu: true,
});

const ENUM_VIEW_MODE: TEnumViewMode = Object.freeze({
    YEAR: 'year',
    MONTH: 'month',
    DAY: 'day',
});

const val = useModel(props, 'modelValue');

const isPickerShown = ref(false);
const view = ref(props.viewMode);
const wrapperRef = useTemplateRef('wrapperRef');
const pickerRef = useTemplateRef('pickerRef');
const pickerStyle: { [x: string]: any } = ref({
    top: '100%',
    bottom: 'unset',
    left: '0',
});

const year = ref(dayjs().year());
const month = ref(dayjs().month() + 1);
const date = ref(dayjs().date());

const formattedValue = computed(() => {
    const dateObj = dayjs(props.modelValue);
    if (!dateObj.isValid()) {
        return '';
    }
    return dateObj.format(props.format);
});

const onTogglePicker = () => {
    isPickerShown.value = !isPickerShown.value;

    if (isPickerShown.value) {
        if (!wrapperRef.value) {
            return;
        }
        const rect = wrapperRef.value.getBoundingClientRect();
        const pickerHeight = pickerRef.value?.clientHeight || 275;
        if (rect.bottom + pickerHeight > window.innerHeight) {
            pickerStyle.value.top = 'unset';
            pickerStyle.value.bottom = '100%';
        } else {
            pickerStyle.value.top = '100%';
            pickerStyle.value.bottom = 'unset';
        }

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
    console.log(value);
    view.value = value;
};

const onMonthPicked = (value: string) => {
    emits('update:modelValue', value);

    view.value = ENUM_VIEW_MODE.DAY;
};

const onDatePicked = (value: string) => {
    emits('update:modelValue', value);
    emits('pick', value);

    if (props.autoHideMenu) {
        isPickerShown.value = false;
    }
};

onMounted(() => {
    setValues();
});
</script>

<template>
    <div class="datepicker" ref="wrapperRef">
        <slot
            name="default"
            v-bind="{ inputValue: formattedValue, isPickerShown, onTogglePicker }"
        ></slot>
        <transition name="fade">
            <div
                class="datepicker__picker"
                ref="pickerRef"
                v-if="isPickerShown"
                :style="pickerStyle"
            >
                <template v-if="view === ENUM_VIEW_MODE.DAY">
                    <DateView
                        v-model="val"
                        @switch:view="onSwitchView(ENUM_VIEW_MODE.MONTH)"
                        @pick="onDatePicked"
                    ></DateView>
                </template>
                <template v-else-if="view === ENUM_VIEW_MODE.MONTH">
                    <MonthView
                        :modelValue="modelValue"
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

.fade {
    &-enter-active,
    &-leave-active {
        transition: opacity 0.2s ease;
    }
    &-enter-from,
    &-leave-to {
        opacity: 0;
    }
}
</style>
