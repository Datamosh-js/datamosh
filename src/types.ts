function isString(value: any) {
  return typeof value === 'string' || value instanceof String;
}

function isArray(value: any) {
  return Array.isArray(value);
}

function isFunction(value: any) {
  return typeof value === 'function' || value instanceof Function;
}

export { isString, isArray, isFunction };
