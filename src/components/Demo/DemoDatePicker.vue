<script setup lang="ts">
import { ref } from 'vue';

import DatePicker from '@/components/DatePicker/DatePicker.vue';

const datetime = ref('2025-08-01 08:00:00');
const datetimeRange = ref({
    start: '2024-01-01 08:00:00',
    end: '2024-01-01 08:00:00',
});
</script>

<template>
    <div class="cc-mb-4">
        <DatePicker v-model="datetime" :mode="'datetime'">
            <template v-slot:toggler="{ show, onToggle }">
                <button @click="onToggle">{{ show ? '隱藏' : '顯示' }}</button>
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
