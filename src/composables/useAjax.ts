import { ref } from 'vue';
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

declare namespace NAjax {
    export type TInitData = {
        baseURL: string;
        proxyPath?: string;
        headers?: THeader;
        interceptors?: TInterceptors | false;
    };

    export type THeader = {
        [x: string]: string;
    };

    export type TInterceptors = {
        success?: (response: AxiosResponse, interceptors?: typeof defaultInterceptors) => [];
        failure?: (error: any, interceptors?: typeof defaultInterceptors) => [];
    };

    export type TRequestConfig = AxiosRequestConfig & {
        customInterceptors?: TInterceptors;
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

const axiosInstance: AxiosInstance = axios.create();
const isLoading = ref(false);

const defaultInterceptors = {
    success: (response: NAjax.TAjaxResponse) => {
        const success = response?.data?.success || false;
        if (
            (typeof success === 'boolean' && !success) ||
            (typeof success === 'string' && success !== 'true')
        ) {
            const err: any = new Error(response?.data?.msg || '發生錯誤，請稍候再試');
            err.code = response?.data?.code || 400;
            return [err, null] as any;
        }

        return [null, response?.data?.data] as any;
    },
    failure: (error: any) => {
        const err: any = new Error(error?.message || '發生錯誤，請稍候再試');
        err.code = 400;
        return [err, null] as any;
    },
};

const setBaseURL = (baseURL: string, proxyPath?: string) => {
    axiosInstance.defaults.baseURL = proxyPath && proxyPath.length > 0 ? proxyPath : baseURL;
};

const setCommonHeaders = (headers: NAjax.THeader) => {
    Object.keys(headers).forEach((key) => {
        axiosInstance.defaults.headers.common[key] = headers[key];
    });
};

let interceptorId = ref(-1);

const setInterceptors = (interceptors?: NAjax.TInterceptors) => {
    if (interceptorId.value > -1) {
        axiosInstance.interceptors.response.eject(interceptorId.value);
    }

    interceptorId.value = axiosInstance.interceptors.response.use(
        (response: NAjax.TAjaxResponse) => {
            if (interceptors?.success && typeof interceptors.success === 'function') {
                return interceptors.success(response, defaultInterceptors) as any;
            }
            return defaultInterceptors.success(response);
        },
        (error: any) => {
            if (interceptors?.failure && typeof interceptors.failure === 'function') {
                return interceptors.failure(error, defaultInterceptors) as any;
            }
            return defaultInterceptors.failure(error);
        },
    );
};

export const useAjax = () => {
    return {
        isLoading,
        setLoading(show = false) {
            isLoading.value = show || false;
        },
        //
        init({ baseURL, proxyPath, headers, interceptors }: NAjax.TInitData) {
            setBaseURL(baseURL, proxyPath);
            if (interceptors !== false) {
                setInterceptors(interceptors || defaultInterceptors);
            }
            if (headers) {
                setCommonHeaders(headers);
            }
        },
        setCommonHeaders,
        setAuth(accessToken: string, headerName = 'Authorization') {
            setCommonHeaders({
                [headerName]: accessToken,
            });
        },
        //
        get(url = '', options?: NAjax.TRequestConfig) {
            setInterceptors(options?.customInterceptors);
            return axiosInstance.get(url, options) as Promise<[any, any]>;
        },
        post(url = '', data: any, options?: NAjax.TRequestConfig) {
            setInterceptors(options?.customInterceptors);
            return axiosInstance.post(url, data, options) as Promise<[any, any]>;
        },
        put(url = '', data: any, options?: NAjax.TRequestConfig) {
            setInterceptors(options?.customInterceptors);
            return axiosInstance.put(url, data, options) as Promise<[any, any]>;
        },
        patch(url = '', data: any, options?: NAjax.TRequestConfig) {
            setInterceptors(options?.customInterceptors);
            return axiosInstance.patch(url, data, options) as Promise<[any, any]>;
        },
        delete(url = '', options?: NAjax.TRequestConfig) {
            setInterceptors(options?.customInterceptors);
            return axiosInstance.delete(url, options) as Promise<[any, any]>;
        },
    };
};
