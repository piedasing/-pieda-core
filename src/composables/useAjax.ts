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
            success?: (response: AxiosResponse, interceptors?: typeof defaultInterceptors) => [];
            failure?: (error: any, interceptors?: typeof defaultInterceptors) => [];
        };
    };

    export type TAjaxResponse = AxiosResponse & {
        config: {
            customInterceptors?: {
                success?: (
                    response: AxiosResponse,
                    interceptors?: typeof defaultInterceptors,
                ) => {};
                failure?: (error: any, interceptors?: typeof defaultInterceptors) => {};
            };
        };
    };
}

const axiosInstance = ref({} as AxiosInstance);
const isLoading = ref(false);

const defaultInterceptors = {
    success: (response: NAjax.TAjaxResponse) => {
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
    failure: (error: any) => {
        const err: any = new Error(error.message || '發生錯誤，請稍候再試');
        err.code = 400;
        return [err, null] as any;
    },
};

export const useAjax = () => {
    const instance = axiosInstance.value;

    const setCommonHeaders = (headers: { [x: string]: string }) => {
        Object.keys(headers).forEach((key) => {
            instance.defaults.headers.common[key] = headers[key];
        });
    };

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
                (response: NAjax.TAjaxResponse) => {
                    const { customInterceptors } = response.config;
                    if (customInterceptors?.success) {
                        return customInterceptors.success?.(response, defaultInterceptors) as any;
                    }
                    if (interceptors?.success && typeof interceptors.success === 'function') {
                        return interceptors.success(response, defaultInterceptors) as any;
                    }
                    defaultInterceptors.success(response);
                },
                (error: any) => {
                    const { customInterceptors } = error.config;
                    if (customInterceptors?.failure) {
                        return customInterceptors.failure?.(error, defaultInterceptors) as any;
                    }
                    if (interceptors?.failure && typeof interceptors.failure === 'function') {
                        return interceptors.failure(error, defaultInterceptors) as any;
                    }
                    defaultInterceptors.failure(error);
                },
            );
        },
        setCommonHeaders,
        setAuth(accessToken: string, headerName = 'Authorization') {
            setCommonHeaders({
                [headerName]: accessToken,
            });
        },
        //
        get(url = '', options?: AxiosRequestConfig) {
            return instance.get(url, options) as Promise<[any, any]>;
        },
        post(url = '', data: any, options?: AxiosRequestConfig) {
            return instance.post(url, data, options) as Promise<[any, any]>;
        },
        put(url = '', data: any, options?: AxiosRequestConfig) {
            return instance.put(url, data, options) as Promise<[any, any]>;
        },
        patch(url = '', data: any, options?: AxiosRequestConfig) {
            return instance.patch(url, data, options) as Promise<[any, any]>;
        },
        delete(url = '', options?: AxiosRequestConfig) {
            return instance.delete(url, options) as Promise<[any, any]>;
        },
    };
};
