<script setup lang="ts">
import { ref } from 'vue';

import { vLoading } from '@/directives/loading';

const isLoading = ref(false);

const toggleLoading = () => {
    isLoading.value = !isLoading.value;
};
</script>

<template>
    <div class="demo__loading">
        <button class="" @click="toggleLoading">切換讀取狀態</button>
        <!--  -->
        <div class="box">
            <div class="box__item" v-loading="isLoading">
                <div class="box__item__inner">
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
                class="box__item"
                v-loading="{
                    show: isLoading,
                    isFullPage: false,
                    loader: { size: 80, color: '#fff', type: 'ellipsis' },
                    overlay: { color: 'rgba(0,0,0,0.5)' },
                }"
            >
                <div class="box__item__inner">
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

<style lang="scss" scoped>
.demo__loading {
    padding-top: 1rem;
    padding-bottom: 1rem;
}
button {
    background-color: #0096ff;
    color: #fff;
    padding: 0.25rem 1rem;
    border-radius: 4px;
}
.box {
    display: flex;
    gap: 8px;
    padding-top: 1rem;
    padding-bottom: 1rem;
}
.box__item {
    flex: 1;
    height: 200px;
}
.box__item__inner {
    height: 100%;
    overflow-y: auto;
    padding-left: 24px;
    padding-right: 24px;
}
</style>
