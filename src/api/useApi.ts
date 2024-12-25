export const useApi = ({ $ajax }: any) => ({
    getTest: () => {
        return $ajax.get('/test', {
            customInterceptors: {
                success: (response: any, defaultInterceptors: any) => {
                    return [null, { msg: 'test' }];
                },
                failure: (error: any, defaultInterceptors: any) => {
                    return [new Error('test error'), null];
                },
            },
        });
    },
    postTest: (payload: any) => {
        return $ajax.post('/test', payload, {
            customInterceptors: {
                success: (response: any, defaultInterceptors: any) => {
                    console.log(response);
                    return [null, { msg: 'test 2' }];
                },
                failure: (error: any, defaultInterceptors: any) => {
                    console.log(error);
                    return [new Error('test error'), null];
                },
            },
        });
    },
});
