<script setup lang="ts">
import { ref } from 'vue';

import DatePicker from '@/components/DatePicker/DatePicker.vue';

const date = ref('2025-01-01');
const datetime = ref('2025-01-01 08:00:00');
const datetimeRange = ref({
    start: '2025-01-01 08:00:00',
    end: '2025-01-01 08:00:00',
});
</script>

<template>
    <div class="cc-mb-4">
        <DatePicker v-model="date" :mode="'date'" :autoHideMenu="false">
            <template v-slot:default="{ inputValue, isPickerShown, onTogglePicker }">
                <div class="">
                    <input type="text" readonly :value="inputValue" />
                    <button @click="onTogglePicker">{{ isPickerShown ? '隱藏' : '顯示' }}</button>
                </div>
            </template>
        </DatePicker>
    </div>
</template>

<style lang="scss" scoped>
.box {
    width: 100%;
    max-width: 400px;
    border: 1px solid #242424;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    .icon {
        width: 16px;
    }
}
</style>
