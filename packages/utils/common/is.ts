import {
  EMAIL_REGEX,
  ID_CARD_REGEX,
  PHONE_REGEX,
  TEL_REGEX
} from './constants';

export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object');
};

export function isNumber(val: unknown): val is number {
  return typeof val === 'number';
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (
    is(val, 'Promise') &&
    isObject(val) &&
    isFunction(val.then) &&
    isFunction(val.catch)
  );
}

export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function';

export function isBoolean(val: unknown): val is boolean {
  return typeof val === 'boolean';
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp');
}

export function isEmptyObject(obj: object) {
  for (const _ in obj) {
    return false;
  }
  return true;
}

export function is(data: any, type: string) {
  return Object.prototype.toString.call(data) === `[object ${type}]`;
}

export function isArray(data: any) {
  return is(data, 'Array');
}

export function isUndefined(data: any) {
  return data === undefined;
}

export function isNull(data: any) {
  return data === null;
}

export function isEmpty(data: any) {
  return data === undefined || data === null;
}

export function isEmptyArray(data: any) {
  return !isArray(data) || data.length === 0;
}

export function isLikeFalse(data: any) {
  return !data;
}

/**
 * @author Zhou
 * @description 判读是否为外链
 * @param path
 * @returns {boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @author Zhou
 * @description 校验密码是否小于6位
 * @param str
 * @returns {boolean}
 */
export function isPassword(str: string | any[]) {
  return str.length >= 6;
}

/**
 * @author Zhou
 * @description 判断是否是名称
 * @param value
 * @returns {boolean}
 */
export function isName(value: string) {
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
  return reg.test(value);
}

/**
 * @author Zhou
 * @description 判断是否为IP
 * @param ip
 * @returns {boolean}
 */
export function isIP(ip: string) {
  const reg =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return reg.test(ip);
}

/**
 * @author Zhou
 * @description 判断是否是传统网站
 * @param url
 * @returns {boolean}
 */
export function isUrl(url: string) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @author Zhou
 * @description 判断是否是小写字母
 * @param str
 * @returns {boolean}
 */
export function isLowerCase(str: string) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @author Zhou
 * @description 判断是否是大写字母
 * @param str
 * @returns {boolean}
 */
export function isUpperCase(str: string) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @author Zhou
 * @description 判断是否是大写字母开头
 * @param str
 * @returns {boolean}
 */
export function isAlphabets(str: string) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @author Zhou
 * @description 判断是否是端口号
 * @param str
 * @returns {boolean}
 */
export function isPort(str: string) {
  const reg =
    /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
  return reg.test(str);
}

/**
 * @author Zhou
 * @description 判断是否是手机号
 * @param str
 * @returns {boolean}
 */
export function isPhone(str: string) {
  return PHONE_REGEX.test(str);
}

/**
 * @author Zhou
 * @description 判断是否是身份证号(第二代)
 * @param str
 * @returns {boolean}
 */
export function isIdCard(str: string) {
  return ID_CARD_REGEX.test(str);
}

/**
 * @author Zhou
 * @description 判断是否是邮箱
 * @param str
 * @returns {boolean}
 */
export function isEmail(str: string) {
  return EMAIL_REGEX.test(str);
}

/**
 * @author Zhou
 * @description 判断是否中文
 * @param str
 * @returns {boolean}
 */
export function isChina(str: string) {
  const reg = /^[\u4E00-\u9FA5]{2,4}$/;
  return reg.test(str);
}

/**
 * @author Zhou
 * @description 判断是否为空
 * @param str
 * @returns {boolean}
 */
export function isBlank(str: string | null) {
  return (
    str === null ||
    false ||
    str === '' ||
    str.trim() === '' ||
    str.toLocaleLowerCase().trim() === 'null'
  );
}

/**
 * @author Zhou
 * @description 判断是否为固话
 * @param str
 * @returns {boolean}
 */
export function isTel(str: string) {
  return TEL_REGEX.test(str);
}

/**
 * @author Zhou
 * @description 判断是否为数字且最多两位小数
 * @param str
 * @returns {boolean}
 */
export function isNum(str: string) {
  const reg = /^\d+(\.\d{1,2})?$/;
  return reg.test(str);
}
