import { logger } from 'log-prettier';

/**
 * 初始化 effect 物件
 * @param {number} len - 物件長度
 * @param {string} type - 物件類型
 * @return {object} - 初始化後的 effect 物件
 */
export function initEffect(len, type) {
  return { target: Array(len).fill(false), [type]: 0 };
}

/**
 * 初始化 flag 物件
 * @param {number} len - 物件長度
 * @param {string} type - 物件類型
 * @return {object} - 初始化後的 flag 物件
 */
export function initFlag(len, type) {
  return { target: Array(len).fill(false), global: false, [type]: 0 };
}

/**
 * 從 info 中取得符合 regex 的值
 * @param {string} info - 資訊字串
 * @param {RegExp} regex - 正規表達式
 * @return {string|number} - 符合 regex 的值
 */
export function fetchValFromInfo(info, regex) {
  const m = regex.exec(info);
  if (m !== null) { return m[1]; }
  return 0;
}

/**
 * 將字串轉換為整數
 * @param {string} str - 要轉換的字串
 * @return {number|undefined} - 轉換後的整數，若轉換失敗則為 undefined
 */
export function strToInt(str) {
  const val = Number.parseInt(str, 10);
  // undefined for double question mark chaining
  return Number.isNaN(val) ? undefined : val;
}

/**
 * 將全形數字字串轉換為整數
 * @param {string} str - 要轉換的全形數字字串
 * @return {number} - 轉換後的整數
 */
export function fullWidthNumber2Integer(str) {
  const m = '０１２３４５６７';
  const numStr = str.split('').map((c) => m.indexOf(c)).join('');
  return Number.parseInt(numStr, 10);
}

/**
 * 移除物件中值為 undefined 的屬性
 * @param {object} obj - 要移除 undefined 屬性的物件
 * @return {object} - 移除 undefined 屬性後的物件
 */
export function removeUndefinedProp(obj) {
  return Object.fromEntries(
    // eslint-disable-next-line no-unused-vars
    Object.entries(obj).filter(([_, value]) => !!value),
  );
}

/**
 * 接受三個輸入，如果第一個輸入不是 undefined，則返回第一個輸入，否則返回包含第二和第三輸入的陣列。
 * @param {any} input - 第一個輸入。
 * @param {any} input1 - 第二個輸入。
 * @param {any} input2 - 第三個輸入。
 * @returns {any} - 如果第一個輸入不是 undefined，則返回第一個輸入，否則返回包含第二和第三輸入的陣列。
 */
export function mutualInput(input, input1, input2) {
  return input || [input1, input2];
}

/**
 * 檢查 `info` 是否符合 `regex` 的規則。
 * @param {string} info - 要檢查的字串。
 * @param {RegExp | RegExp[]} regex - 用來檢查 `info` 的正則表達式。
 * @returns {boolean} 如果 `info` 符合 `regex` 的規則，則回傳 `true`；否則回傳 `false`。
 */
export function infoRegexChecker(info, regex) {
  if (Array.isArray(regex)) {
    return regex.every((re) => !re.test(info));
  }

  return regex.test(info);
}

/**
 * Logs debug information to the console.
 * @param {string} name - A string to specifiy where it is
 * @param {Object} obj - An object for debugging
 * @param {boolean} debug - A flag indicating whether to log debug information.
 */
export function logDebug(name, obj, debug = false) {
  if (!debug) return;

  logger.debug(`module name: ${name}`);
  // eslint-disable-next-line no-console
  console.log(obj);
}
