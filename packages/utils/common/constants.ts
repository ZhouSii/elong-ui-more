// 数字正则表达式
export const PATTERN_NUMBER = /^[\d.eE]+$/;
// 整数正则表达式
export const PATTERN_NUMBER_INTEGER = /^[-+]?\d+$/;
// 正整数正则表达式
export const PATTERN_NUMBER_INTEGER_POSITIVE = /^[1-9]\d*$/;
// 正则表达式用于匹配表情符号
export const EMOJI_REGEX = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
// /[\uD800-\uDBFF][\uDC00-\uDFFF]|\u203C|\u2049|#\u20E3|\u00A9|\u00AE|[\u2000-\u3300]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF]|[\u2600-\u26FF]|\u2700-\u27BF/g
// 手机
export const PHONE_REGEX = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
// 身份证
export const ID_CARD_REGEX =
  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
// 邮箱
export const EMAIL_REGEX = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
// 固话
export const TEL_REGEX =
  /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})(-| )?)?([0-9]{7,8})((-| |转)*([0-9]{1,4}))?$/;
