import { reactive, watch } from 'vue';

import { Validator } from './Form';
import { TConfigs } from './Form/_types';

const flattenNestedObject = (obj: { [x: string]: any }, parentKey = '') => {
    let result: { [x: string]: any } = {};

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let newKey = parentKey ? `${parentKey}.${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null) {
                Object.assign(result, flattenNestedObject(obj[key], newKey));
            } else {
                result[newKey] = obj[key];
            }
        }
    }

    return result;
};

const getValueFromNestedPath = (obj: { [x: string]: any }, path: string, skipKey = 'formData') => {
    const keys = path.split('.');
    let result = obj;
    for (let key of keys) {
        if (key === skipKey) {
            continue;
        }
        if (!result || !result.hasOwnProperty(key)) {
            return '';
        }
        result = result[key];
    }
    return result;
};

export function useForm(data: Custom.AnyObj, { rules, configs }: TConfigs) {
    const formData = reactive({ ...data });
    const validateRules = rules(Validator);
    const errors: { [x: string]: any } = reactive({});

    const log = (...logTxt: any) => {
        const isDebug = configs?.debug || false;
        if (!isDebug) {
            return;
        }
        console.log(logTxt);
    };

    const handleValidate = async (fieldName: string = '') => {
        log(fieldName);

        const formElement =
            configs?.formElement instanceof HTMLElement
                ? configs.formElement
                : document.querySelector(configs?.formElement || 'form');
        log(formElement);

        const fields = Object.keys(validateRules).filter((key) => {
            return fieldName === '' || fieldName === key;
        });
        log(fields);
        for (let i = 0; i < fields.length; i++) {
            const fieldName = fields[i];
            const fieldElements = formElement?.querySelectorAll(`[name="${fieldName}"]`);

            const rule = validateRules[fieldName];
            const value = getValueFromNestedPath(formData, fieldName);
            const { messages } = await rule(value);
            errors[fieldName] = messages || [];

            fieldElements?.forEach((fieldElement) => {
                if (messages.length > 0) {
                    fieldElement?.classList.add('is-invalid');
                    return;
                }
                fieldElement?.classList.remove('is-invalid');
            });
        }
        log(errors);

        if (fieldName) {
            return errors[fieldName].length === 0 ? true : false;
        }

        return Object.keys(errors).every((fieldName) => {
            return errors[fieldName].length === 0 ? true : false;
        });
    };

    const scrollToInvalidElement = () => {
        const scrollContainer =
            configs?.scrollContainer instanceof HTMLElement
                ? configs.scrollContainer
                : document.querySelector(configs?.scrollContainer || 'html');
        const errorElements =
            configs?.errorElement instanceof NodeList
                ? configs.errorElement
                : document.querySelectorAll(configs?.errorElement || '.invalid-feedback');
        const errorElement = Array.from(errorElements).find((el) => {
            return el.textContent && el.textContent.length > 0 ? true : false;
        });

        if (!errorElement) {
            return;
        }
        if (!(errorElement instanceof HTMLElement)) {
            return;
        }

        const shakeDuration =
            typeof configs?.shakeDuration !== 'undefined' ? configs.shakeDuration : 800;
        if (shakeDuration > 0) {
            errorElement.classList.add('cc-animate-shake');
            setTimeout(() => {
                errorElement.classList.remove('cc-animate-shake');
            }, shakeDuration || 800);
        }

        scrollContainer?.scrollTo({
            top: errorElement.offsetTop - 200,
            behavior: 'smooth',
        });
    };

    const mode = configs?.mode || 'immediately';
    if (mode === 'immediately') {
        Object.keys(validateRules).forEach((fieldName) => {
            log(fieldName, getValueFromNestedPath(formData, fieldName));
            watch(
                () => getValueFromNestedPath(formData, fieldName),
                () => handleValidate(fieldName),
                { deep: true },
            );
        });
    }

    return {
        formData,
        $validate: async (fieldName?: string) => {
            const result = await handleValidate(fieldName);

            const focusInvalid =
                typeof configs?.focusInvalid !== 'undefined' ? configs.focusInvalid : true;
            if (!result && focusInvalid) {
                scrollToInvalidElement();
            }

            return result;
        },
        $errors: errors,
        $hasError: (fieldName: string) => {
            return errors?.[fieldName]?.length > 0 ? true : false;
        },
        $firstError: (fieldName: string) => {
            return errors?.[fieldName]?.[0] || null;
        },
    };
}
