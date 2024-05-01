<script setup lang="ts">
import { computed } from 'vue';

const emits = defineEmits(['update:value']);

const props = withDefaults(
    defineProps<{
        value: string;
        options: { label: string; value: string }[];
    }>(),
    {
        value: '',
        options: () => [],
    },
);

const activeItem = computed(() => {
    return props.options.find((item) => item.value === props.value);
});

const onChangeTab = (value: string) => {
    emits('update:value', value);
};
</script>

<template>
    <div class="tab">
        <div class="tab__items">
            <template v-for="item in props.options">
                <div
                    class="tab__item"
                    :class="{ active: item.value === props.value }"
                    @click="onChangeTab(item.value)"
                >
                    {{ item.label }}
                </div>
            </template>
        </div>
        <div class="tab__panels">
            <slot :activeItem="activeItem"></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.tab {
    display: flex;
    border: 1px solid #252b33;
    .tab__items {
        flex: none;
        width: 120px;
        border-right: 1px solid #252b33;
        .tab__item {
            padding: 0.5rem 1rem;
            border-bottom: 1px solid #252b33;
            &:last-child {
                border-bottom: 0;
            }
            &.active {
                background-color: #0096ff;
                color: #fff;
            }
        }
    }
    .tab__panels {
        padding: 0.35rem 0.5rem;
    }
}
</style>
