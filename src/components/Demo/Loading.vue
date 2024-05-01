<script setup lang="ts">
import { ref } from 'vue';

const isLoading = ref(false);

const toggleLoading = () => {
    isLoading.value = !isLoading.value;
};
</script>

<template>
    <div class="demo-loading cc-py-4">
        <buttion
            class="cc-bg-primary cc-text-white cc-border-none cc-rounded-[24px] cc-px-6 cc-py-2 cc-cursor-pointer"
            @click="toggleLoading"
        >
            切換讀取狀態
        </buttion>

        <div class="cc-flex cc-gap-x-2 cc-py-4">
            <div class="cc-flex-1 cc-h-[200px]" v-loading="isLoading">
                <div class="cc-h-full cc-overflow-y-auto cc-px-6">
                    <template v-for="i in 10">
                        <div :data-key="i">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quasi
                            maxime ullam id molestiae non reprehenderit delectus, quas, atque nisi
                            laudantium dolores quam ea? Perferendis inventore cum accusamus et
                            animi!
                        </div>
                    </template>
                </div>
            </div>
            <div
                class="cc-flex-1 cc-h-[200px]"
                v-loading="{
                    show: isLoading,
                    isFullPage: false,
                    loader: { size: 80, color: '#fff', type: 'ellipsis' },
                    overlay: { color: 'rgba(0,0,0,0.5)' },
                }"
            >
                <div class="cc-h-full cc-overflow-y-auto cc-px-6">
                    <template v-for="i in 10">
                        <div :data-key="i">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quasi
                            maxime ullam id molestiae non reprehenderit delectus, quas, atque nisi
                            laudantium dolores quam ea? Perferendis inventore cum accusamus et
                            animi!
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
