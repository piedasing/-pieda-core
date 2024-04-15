import { ref } from 'vue';
import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';

declare namespace NAjax {
    export type TInitData = {
        baseURL: string;
        proxyPath?: string;
        headers?: {
            [x: string]: string;
        };
        interceptors?: {
            success?: (response: AxiosResponse) => [];
            failure?: (error: any) => [];
        };
    };
}

const axiosInstance = ref({} as AxiosInstance);
const isLoading = ref(false);

export const useAjax = () => {
    return {
        isLoading,
        setLoading(show = false) {
            isLoading.value = show || false;
        },
        //
        init({ baseURL, proxyPath, headers, interceptors }: NAjax.TInitData) {
            axiosInstance.value = axios.create({
                baseURL: proxyPath && proxyPath.length > 0 ? proxyPath : baseURL,
                headers,
            });

            axiosInstance.value.interceptors.response.use(
                (response) => {
                    if (interceptors?.success && typeof interceptors.success === 'function') {
                        return interceptors.success(response) as any;
                    }

                    const success = response.data?.success || false;
                    if (
                        (typeof success === 'boolean' && !success) ||
                        (typeof success === 'string' && success !== 'true')
                    ) {
                        const err: any = new Error(response.data?.msg || '發生錯誤，請稍候再試');
                        err.code = response.data?.code || 400;
                        return [err, null] as any;
                    }

                    return [null, response.data?.data] as any;
                },
                (error) => {
                    if (interceptors?.failure && typeof interceptors.failure === 'function') {
                        return interceptors.failure(error) as any;
                    }
                    const err: any = new Error(error.message || '發生錯誤，請稍候再試');
                    err.code = 400;
                    return [err, null] as any;
                },
            );
        },
        setAuth(accessToken: string, authHeaderName = 'Authorization') {
            const instance = axiosInstance.value;
            instance.defaults.headers.common[authHeaderName] = accessToken;
        },
        //
        get(url = '', options?: AxiosRequestConfig) {
            const instance = axiosInstance.value;
            return instance.get(url, options) as Promise<[any, any]>;
        },
        post(url = '', options?: AxiosRequestConfig) {
            const instance = axiosInstance.value;
            return instance.post(url, options) as Promise<[any, any]>;
        },
        put(url = '', options?: AxiosRequestConfig) {
            const instance = axiosInstance.value;
            return instance.put(url, options) as Promise<[any, any]>;
        },
        delete(url = '', options?: AxiosRequestConfig) {
            const instance = axiosInstance.value;
            return instance.delete(url, options) as Promise<[any, any]>;
        },
        patch(url = '', options?: AxiosRequestConfig) {
            const instance = axiosInstance.value;
            return instance.patch(url, options) as Promise<[any, any]>;
        },
    };
};
