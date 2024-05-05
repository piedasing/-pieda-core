<script setup lang="ts">
import { ref } from 'vue';

import { Ring, Spinner, Ellipsis, Grid, Hourglass } from '@/components/Loaders';

const data = [
    {
        loader: Ellipsis,
        sizes: ['20px', '40px', '60px'],
    },
    {
        loader: Spinner,
        sizes: ['20px', '40px', '60px'],
    },
    {
        loader: Ring,
        sizes: ['20px', '40px', '60px'],
    },
    {
        loader: Grid,
        sizes: ['20px', '40px', '60px'],
    },
    {
        loader: Hourglass,
        sizes: ['20px', '40px', '60px'],
    },
];

const color = ref('#0096ff');
</script>

<template>
    <div class="demo__loader">
        <label class="color__picker">
            選擇顏色
            <input type="color" v-model="color" />
            <span class="">{{ color }}</span>
        </label>
        <div class="box">
            <template v-for="item in data">
                <div class="">
                    <template v-for="size in item.sizes">
                        <component
                            :is="item.loader"
                            :size="size"
                            :color="color"
                            class="box__loader"
                        ></component>
                    </template>
                </div>
            </template>
        </div>
        <!--  -->
        <div class="box">
            <template v-for="item in data">
                <button class="box__btn" :style="{ color, 'border-color': color }">
                    按鈕的文字
                    <component :is="item.loader" :color="color" :size="20"></component>
                </button>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.demo__loader {
    padding: 2rem 1rem;
}
.color__picker {
    display: inline-flex;
    align-items: center;
    input {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
    }
}
.box {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding-top: 1rem;
    .box__loader {
        border: 2px dotted rgba(0, 150, 255, 0.3);
        margin-left: 8px;
    }
    .box__btn {
        background: #fff;
        border-width: 2px;
        border-style: solid;
        border-radius: 24px;
        padding: 8px 32px;
    }
}
</style>
