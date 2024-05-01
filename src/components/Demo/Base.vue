<script lang="ts" setup>
import { watch } from 'vue';

import { useBase } from '@/library';

const { ww, wh, isMobile, deviceInfo } = useBase();
watch(
    () => ww.value,
    (value) => {
        console.log(value);
    },
);
</script>

<template>
    <div class="cc-border-primary cc-border cc-border-solid">
        <table class="cc-border-collapse">
            <tbody class="cc-divide-y cc-divide-x-0 cc-divide-primary cc-divide-solid">
                <tr class="cc-divide-y-0 cc-divide-x cc-divide-primary cc-divide-solid">
                    <th class="cc-px-2 cc-py-2 cc-w-[100px]">window size</th>
                    <td class="cc-px-2 cc-py-2">{{ ww }} x {{ wh }}</td>
                </tr>
                <tr class="cc-divide-y-0 cc-divide-x cc-divide-primary cc-divide-solid">
                    <th class="cc-px-2 cc-py-2">isMobile</th>
                    <td class="cc-px-2 cc-py-2">{{ isMobile }}</td>
                </tr>
                <tr class="cc-divide-y-0 cc-divide-x cc-divide-primary cc-divide-solid">
                    <th class="cc-px-2 cc-py-2">deviceInfo</th>
                    <td class="cc-px-2 cc-py-2">{{ deviceInfo }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style lang="scss" scoped></style>
