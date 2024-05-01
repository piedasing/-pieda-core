export const useApi = ({ $ajax }: any) => ({
    getList: () => {
        return $ajax.get('/list', {
            customInterceptors: {
                success: (response: any, defaultInterceptors: any) => {
                    if (response.data === 'test') {
                        return [null, { msg: 'test' }];
                    }
                    return defaultInterceptors.success(response);
                },
                failure: (error: any, defaultInterceptors: any) => {
                    return [new Error('test error'), null];
                },
            },
        });
    },
    postEditData: (payload: any) => {
        return $ajax.post('/data/edit', payload);
    },
});
