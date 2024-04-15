import { Validator } from '.';

export type TConfigs = {
    rules: (validator: typeof Validator) => {
        [x: string]: (value: any) => Validator;
    };
    configs?: {
        debug?: boolean;
        mode?: 'immediately' | 'manual';
        scrollContainer?: string | HTMLElement;
        focusInvalid?: boolean;
        formElement?: string | HTMLElement;
        errorElement?: string | NodeList;
        shakeDuration?: number;
    };
};
