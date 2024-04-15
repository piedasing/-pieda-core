<script setup lang="ts">
const data = [
    {
        loader: 'LoaderEllipsis',
        sizes: ['40px', '80px', '120px'],
    },
    {
        loader: 'LoaderSpinner',
        sizes: ['40px', '80px', '120px'],
    },
    {
        loader: 'LoaderRing',
        sizes: ['40px', '80px', '120px'],
    },
    {
        loader: 'LoaderGrid',
        sizes: ['40px', '80px', '120px'],
    },
    {
        loader: 'LoaderHourglass',
        sizes: ['40px', '80px', '120px'],
    },
];
</script>

<template>
    <div class="cc-flex cc-flex-wrap cc-gap-4">
        <template v-for="item in data">
            <div class="cc-flex-none cc-mb-4">
                <template v-for="size in item.sizes">
                    <component
                        :is="item.loader"
                        :size="size"
                        class="cc-border-2 cc-border-primary cc-border-solid cc-mx-1"
                    ></component>
                </template>
            </div>
        </template>
    </div>
    <!--  -->
    <div class="cc-flex cc-flex-wrap cc-gap-3">
        <template v-for="item in data">
            <button
                class="cc-text-[20px] cc-bg-primary cc-text-white cc-border-none cc-rounded-[24px] cc-px-6 cc-py-2"
            >
                按鈕的文字
                <component :is="item.loader" :color="'#fff'" :size="20"></component>
            </button>
        </template>
    </div>
</template>

<style lang="scss" scoped></style>
