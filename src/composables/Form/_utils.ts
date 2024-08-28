import deepEqual from 'deep-equal';

export const format = function (template: string, ...arg: any) {
    var args = Array.prototype.slice.call(arguments, 1);
    return template.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};

export const isArray = function (arg: unknown) {
    if (typeof Array.isArray === 'function') {
        return Array.isArray(arg);
    }

    return Object.prototype.toString.call(arg) === '[object Array]';
};

export const isEmpty = function (value: unknown) {
    if (isArray(value)) {
        return !(value as []).length || false;
    } else if (value === undefined || value === null) {
        return true;
    } else {
        return !String(value).trim().length;
    }
};

export const isEqual = function (o1: unknown, o2: unknown) {
    return deepEqual(o1, o2);
};

export const isFunction = function (arg: unknown) {
    return typeof arg === 'function';
};

export const isNaN = function (arg: unknown) {
    return /^\s*$/.test(arg as string) || Number.isNaN(arg);
};

export const isNull = function (arg: unknown) {
    return arg === null;
};

export const isString = function (arg: unknown) {
    return typeof arg === 'string' || arg instanceof String;
};

export const isUndefined = function (arg: unknown) {
    return typeof arg === 'undefined';
};

export const omit = function omit(obj: Custom.AnyObj, key: string) {
    var result: Custom.AnyObj = {};

    for (var name in obj) {
        if (name !== key) {
            result[name] = obj[name];
        }
    }

    return result;
};
