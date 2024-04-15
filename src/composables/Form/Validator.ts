import * as utils from './_utils';
import { templates } from './_templates';

export default class Validator {
    value: unknown;

    messages: string[] = [];

    constructor(value: any) {
        this.value = value;
    }

    public static value = (value: any) => {
        return new Validator(value);
    };

    public reset = () => {
        this.messages = [];
    };

    public required = (message?: string) => {
        if (utils.isEmpty(this.value)) {
            this.messages.push(message || templates.required);
        }
        return this;
    };

    public float = (message?: string) => {
        if (
            !utils.isEmpty(this.value) &&
            !/^([-+])?([0-9]+(\.[0-9]+)?|Infinity)$/.test(String(this.value))
        ) {
            this.messages.push(message || templates.float);
        }
        return this;
    };

    public integer = (message?: string) => {
        if (!utils.isEmpty(this.value) && !/^([-+])?([0-9]+|Infinity)$/.test(String(this.value))) {
            this.messages.push(message || templates.integer);
        }
        return this;
    };

    public lessThan = (bound: number, message?: string) => {
        if (!utils.isEmpty(this.value)) {
            var number = parseFloat(String(this.value));
            if (utils.isNaN(number)) {
                this.messages.push(message || templates.number);
            } else if (number >= bound) {
                this.messages.push(message || utils.format(templates.lessThan, bound));
            }
        }
        return this;
    };

    public lessThanOrEqualTo = (bound: number, message?: string) => {
        if (!utils.isEmpty(this.value)) {
            var number = parseFloat(String(this.value));
            if (utils.isNaN(number)) {
                this.messages.push(message || templates.number);
            } else if (number > bound) {
                this.messages.push(message || utils.format(templates.lessThanOrEqualTo, bound));
            }
        }
        return this;
    };

    public greaterThan = (bound: number, message?: string) => {
        if (!utils.isEmpty(this.value)) {
            var number = parseFloat(String(this.value));
            if (utils.isNaN(number)) {
                this.messages.push(message || templates.number);
            } else if (number <= bound) {
                this.messages.push(message || utils.format(templates.greaterThan, bound));
            }
        }
        return this;
    };

    public greaterThanOrEqualTo = (bound: number, message?: string) => {
        if (!utils.isEmpty(this.value)) {
            var number = parseFloat(String(this.value));
            if (utils.isNaN(number)) {
                this.messages.push(message || templates.number);
            } else if (number < bound) {
                this.messages.push(message || utils.format(templates.greaterThanOrEqualTo, bound));
            }
        }
        return this;
    };

    public between = (lowBound: number, highBound: number, message?: string) => {
        if (!utils.isEmpty(this.value)) {
            var number = parseFloat(String(this.value));
            if (utils.isNaN(number)) {
                this.messages.push(message || templates.number);
            } else if (number < lowBound || number > highBound) {
                this.messages.push(message || utils.format(templates.between, lowBound, highBound));
            }
        }
        return this;
    };

    public size = (size: number, message?: string) => {
        if (
            !utils.isEmpty(this.value) &&
            utils.isArray(this.value) &&
            String(this.value).length !== size
        ) {
            this.messages.push(message || utils.format(templates.size, size));
        }
        return this;
    };

    public length = (length: number, message?: string) => {
        if (!utils.isEmpty(this.value) && String(this.value).length !== length) {
            this.messages.push(message || utils.format(templates.length, length));
        }
        return this;
    };

    public minLength = (length: number, message?: string) => {
        if (!utils.isEmpty(this.value) && String(this.value).length < length) {
            this.messages.push(message || utils.format(templates.minLength, length));
        }
        return this;
    };

    public maxLength = (length: number, message?: string) => {
        if (!utils.isEmpty(this.value) && String(this.value).length > length) {
            this.messages.push(message || utils.format(templates.maxLength, length));
        }
        return this;
    };

    public lengthBetween = (minLength: number, maxLength: number, message?: string) => {
        if (!utils.isEmpty(this.value)) {
            var string = String(this.value);
            if (string.length < minLength || string.length > maxLength) {
                this.messages.push(
                    message || utils.format(templates.lengthBetween, minLength, maxLength),
                );
            }
        }
        return this;
    };

    public in = (options: [], message?: string) => {
        if (!utils.isEmpty(this.value) && options.indexOf(this.value as never) < 0) {
            this.messages.push(
                message || utils.format(templates.in, templates.optionCombiner(options)),
            );
        }
        return this;
    };

    public notIn = (options: [], message?: string) => {
        if (!utils.isEmpty(this.value) && options.indexOf(this.value as never) >= 0) {
            this.messages.push(
                message || utils.format(templates.notIn, templates.optionCombiner(options)),
            );
        }
        return this;
    };

    public match = (valueToCompare: string, message?: string) => {
        if (!utils.isEmpty(this.value) && this.value !== valueToCompare) {
            this.messages.push(message || templates.match);
        }
        return this;
    };

    public regex = (regex: string | RegExp, message?: string) => {
        if (!utils.isEmpty(this.value)) {
            if (utils.isString(regex)) {
                regex = new RegExp(regex);
            }
            if (!(regex as RegExp).test(this.value as string)) {
                this.messages.push(message || templates.regex);
            }
        }
        return this;
    };

    public digit = (message?: string) => {
        return this.regex(/^\d*$/, message || templates.digit);
    };

    public email = (message?: string) => {
        return this.regex(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message || templates.email,
        );
    };

    public url = (message?: string) => {
        return this.regex(
            /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
            message || templates.url,
        );
    };

    public tel = (message?: string) => {
        return this.regex(/^(\d{2,3}-?)?\d{3,4}-?\d{4}(#\d{1,})?$/, message || templates.tel);
    };

    public mobile = (message?: string) => {
        return this.regex(/^[09]{2}[0-9]{8}$/, message || templates.mobile);
    };
}
