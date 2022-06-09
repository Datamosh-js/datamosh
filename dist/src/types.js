"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = exports.isArray = exports.isString = void 0;
function isString(value) {
    return typeof value === 'string' || value instanceof String;
}
exports.isString = isString;
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;
function isFunction(value) {
    return typeof value === 'function' || value instanceof Function;
}
exports.isFunction = isFunction;
