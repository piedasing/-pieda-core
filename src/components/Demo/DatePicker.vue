<script setup lang="ts">
import { ref } from 'vue';

import DatePicker from '@/components/DatePicker.vue';

const value = ref('2024-01-01');
const selectedColor = ref('pink');
</script>

<template>
    <DatePicker :value="value"  :color="selectedColor" :placeholder="'請選擇日期'">
        <template v-slot="{ inputValue, togglePopover }">
            <div class="box">
                <input class="date__input" type="text" :value="inputValue" readonly>
                <button @click="togglePopover">
                <img class="icon" src="../../assets/calendar.png">
                </button>
            </div>
        </template>
    </DatePicker>
</template>

<style lang="scss" scoped>

.box{
    width: 100%;
    max-width: 400px;
    border: 1px solid #242424;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    .icon{
        width: 16px;
    }
}

</style>
