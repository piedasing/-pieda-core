<script setup>
[object Promise]</script>

<template>
    <DatePicker v-model:value="formData.birthday" :placeholder="'請選擇'" :endDate="yearAdult">
        <template v-slot="{ inputValue, togglePopover }">
            <div
                class="datepicker flex-center absolute left-0 top-0 h-full w-full opacity-0"
                @click="togglePopover()"
            >
                <input
                    class="datepicker__input flex-none"
                    :value="inputValue"
                    :placeholder="'請選擇'"
                    readonly
                />
                <button class="datepicker__toggler flex-auto" type="button">
                    <i class="fas fa-calendar-alt"></i>
                </button>
            </div>
        </template>
    </DatePicker>
</template>

<style lang="scss" scoped>
</style>
