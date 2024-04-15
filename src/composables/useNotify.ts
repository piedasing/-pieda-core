import { createApp, ref, Ref } from 'vue';
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
        title: string;
        message: string;
        variant?: SweetAlertIcon | '';
    } & SweetAlertOptions;
}

const getIcon = (variant: string): SweetAlertIcon | undefined => {
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

const defaultConfigs: Ref<Partial<SweetAlertOptions>> = ref({
    iconColor: '#7066E0',
    confirmButtonColor: '#7066E0',
    denyButtonColor: '#DC3741',
    cancelButtonColor: '#6E7881',
    confirmButtonText: 'OK',
    denyButtonText: 'Deny',
    cancelButtonText: 'Cancel',
    allowOutsideClick: false,
    allowEscapeKey: false,
});

const dialogs: Ref<{ [x: string]: SweetAlertOptions }> = ref({});

export const createNotify = {
    install(app: ReturnType<typeof createApp>, options?: { [x: string]: any }) {
        if (options?.configs) {
            defaultConfigs.value = {
                ...defaultConfigs.value,
                ...options.configs,
            };
        }
        if (options?.configs) {
            dialogs.value = {
                ...dialogs.value,
                ...options.dialogs,
            };
        }
    },
};

export const useNotify = () => {
    return {
        setGlobalConfigs(configs: Partial<SweetAlertOptions>) {
            defaultConfigs.value = {
                ...defaultConfigs.value,
                ...configs,
            };
        },
        fire(configs: Partial<SweetAlertOptions>): Promise<SweetAlertResult<any>> {
            return Swal.fire({
                ...defaultConfigs.value,
                ...configs,
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
                ...configs,
            });

            return SwalTemplate.fire({
                title,
                icon: getIcon(variant),
            });
        },
        alert({
            title = '',
            message = '',
            variant = '',
            ...configs
        }: NNotify.TAlert): Promise<SweetAlertResult<any>> {
            const SwalTemplate = Swal.mixin({
                ...defaultConfigs.value,
                showConfirmButton: true,
                showCancelButton: false,
                showCloseButton: true,
                confirmButtonText: '確認',
                ...configs,
            });

            return SwalTemplate.fire({
                title,
                html: message?.replace(/\n/g, '<br>') || message,
                icon: getIcon(variant),
            });
        },
        custom(name: string, configs: Partial<SweetAlertOptions>) {
            dialogs.value[name] = Object.assign({}, configs);

            return {
                fire: ({
                    title = '',
                    message = '',
                    variant = '',
                    ...configs
                }: NNotify.TAlert): Promise<SweetAlertResult<any>> => {
                    const dialogConfigs = dialogs.value?.[name];
                    if (!dialogConfigs) {
                        throw new Error(`The dialog named '${name}' is not found.`);
                    }
                    const SwalTemplate = Swal.mixin({
                        ...defaultConfigs.value,
                        ...dialogConfigs,
                        ...configs,
                    });
                    return SwalTemplate.fire({
                        title,
                        html: message?.replace(/\n/g, '<br>') || message,
                        icon: getIcon(variant),
                    });
                },
            };
        },
    };
};
