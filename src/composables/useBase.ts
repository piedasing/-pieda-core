import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import deviceInfo from 'mobile-device-detect';

export const useBase = () => {
    const ww = ref(1920);
    const wh = ref(1080);

    const onResize = () => {
        ww.value = window.innerWidth;
        wh.value = window.innerHeight;
    };

    onMounted(() => {
        onResize();
        window.addEventListener('resize', onResize);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', onResize);
    });

    return {
        ww,
        wh,
        isMobile: computed(() => {
            return deviceInfo?.isMobile || ww.value < 1024 ? true : false;
        }),
        deviceInfo,
    };
};
