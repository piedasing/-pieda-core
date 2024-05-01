import { ref, Ref } from 'vue';
import Swal, { SweetAlertOptions, SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

namespace NNotify {
    export type TToast = {
        title: string;
        variant?: SweetAlertIcon | '';
        timer?: number | undefined;
        timerProgressBar?: boolean | undefined;
        closeable?: boolean | undefined;
    } & SweetAlertOptions;

    export type TAlert = {
        title?: string;
        message: string;
        variant?: SweetAlertIcon | undefined;
        confirm?: boolean;
    } & SweetAlertOptions;
}

const getIcon = (variant?: string): SweetAlertIcon | undefined => {
    if (!variant) {
        return undefined;
    }
    const variants: { [x: string]: SweetAlertIcon } = {
        success: 'success',
        info: 'info',
        warning: 'warning',
        question: 'question',
        error: 'error',
    };
    return variants?.[variant] || undefined;
};

const getIconColor = (variant?: string): string | undefined => {
    if (!variant) {
        return undefined;
    }
    const variants: { [x: string]: string } = {
        success: '#a5dc86',
        info: '#3fc3ee',
        warning: '#f8bb86',
        question: '#87adbd',
        error: '#f27474',
    };
    return variants?.[variant] || undefined;
};

const defaultConfigs: Ref<Partial<SweetAlertOptions>> = ref({
    title: '系統通知',
    confirmButtonColor: '#7066E0',
    denyButtonColor: '#DC3741',
    cancelButtonColor: '#6E7881',
    confirmButtonText: 'OK',
    denyButtonText: 'Deny',
    cancelButtonText: 'Cancel',
    allowOutsideClick: false,
    allowEscapeKey: false,
});

const setGlobalConfigs = (configs?: Partial<SweetAlertOptions>) => {
    if (!configs) {
        return;
    }
    defaultConfigs.value = {
        ...defaultConfigs.value,
        ...configs,
    };
};

export const createNotify = (configs?: Partial<SweetAlertOptions>) => {
    setGlobalConfigs(configs);
};

export const useNotify = () => {
    return {
        setGlobalConfigs,
        fire(configs: Partial<SweetAlertOptions>): Promise<SweetAlertResult<any>> {
            return Swal.fire({
                ...defaultConfigs.value,
                ...configs,
                title:
                    typeof configs.title !== 'undefined'
                        ? configs.title
                        : defaultConfigs.value.title,
            });
        },
        toast({
            title = '',
            variant = '',
            timer = 2000,
            timerProgressBar = true,
            closeable = true,
            ...configs
        }: NNotify.TToast): Promise<SweetAlertResult<any>> {
            const SwalTemplate = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                showCloseButton: closeable,
                timer,
                timerProgressBar,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer);
                    toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
                willClose: (toast) => {
                    toast.removeEventListener('mouseenter', Swal.stopTimer);
                    toast.removeEventListener('mouseleave', Swal.resumeTimer);
                },
                ...configs,
            });

            return SwalTemplate.fire({
                title,
                icon: getIcon(variant),
                iconColor: configs.iconColor || getIconColor(variant) || undefined,
            });
        },
        alert({
            title = undefined,
            message = '',
            variant = undefined,
            confirm = false,
            ...configs
        }: NNotify.TAlert): Promise<SweetAlertResult<any>> {
            const SwalTemplate = Swal.mixin({
                ...defaultConfigs.value,
                showConfirmButton: true,
                showCancelButton: confirm ? true : false,
                showCloseButton: true,
                confirmButtonText: '確認',
                cancelButtonText: '取消',
                ...configs,
            });
            return SwalTemplate.fire({
                title: typeof title !== 'undefined' ? title : defaultConfigs.value.title,
                html: message?.replace(/\n/g, '<br>') || message,
                icon: getIcon(variant),
                iconColor: configs.iconColor || getIconColor(variant),
            });
        },
    };
};
