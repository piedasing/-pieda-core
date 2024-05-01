<script setup lang="ts">
import { ref } from 'vue';

const data = [
    {
        loader: 'core-loader-ellipsis',
        sizes: ['20px', '40px', '60px'],
    },
    {
        loader: 'core-loader-spinner',
        sizes: ['20px', '40px', '60px'],
    },
    {
        loader: 'core-loader-ring',
        sizes: ['20px', '40px', '60px'],
    },
    {
        loader: 'core-loader-grid',
        sizes: ['20px', '40px', '60px'],
    },
    {
        loader: 'core-loader-hourglass',
        sizes: ['20px', '40px', '60px'],
    },
];

const color = ref('#0096ff');
</script>

<template>
    <input type="color" v-model="color" />
    <div class="cc-flex cc-flex-wrap cc-gap-4">
        <template v-for="item in data">
            <div class="cc-flex-none cc-mb-4">
                <template v-for="size in item.sizes">
                    <component
                        :is="item.loader"
                        :size="size"
                        :color="color"
                        class="cc-border-2 cc-border-dotted cc-border-primary/30 cc-mx-1"
                    ></component>
                </template>
            </div>
        </template>
    </div>
    <!--  -->
    <div class="cc-flex cc-flex-wrap cc-gap-4">
        <template v-for="item in data">
            <button
                class="cc-bg-white cc-border-2 cc-border-solid cc-rounded-[24px] cc-px-8 cc-py-2"
                :style="{ color, 'border-color': color }"
            >
                按鈕的文字
                <component :is="item.loader" :color="color" :size="16"></component>
            </button>
        </template>
    </div>
</template>

<style lang="scss" scoped></style>
