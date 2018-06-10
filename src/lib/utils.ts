export function isUndefined<T>(value: T): boolean {
  return typeof value === "undefined";
}

export function isDefined<T>(value: T): boolean {
  return !isUndefined(value);
}

export function isFunction<T>(value: T): boolean {
  return isDefined(value) && {}.toString.call(value) === "[object Function]";
}

export function isString<T>(value: T): boolean {
  return typeof value === "string";
}

export function isArray<T>(value: T) {
  return Object.prototype.toString.call(value) === "[object Array]";
}

export function isInArray<T>(value: T, array: T[]): boolean {
  return !!~array.indexOf(value);
}
