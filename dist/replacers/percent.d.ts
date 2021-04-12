/**
 * Calculation of percent strings
 */
declare const _default: {
    isPercent: typeof isPercent;
    calc: typeof calc;
};
export default _default;
/**
 * Is string contains percent
 * @param {String} str
 * @returns {boolean}
 */
declare function isPercent(str: any): boolean;
/**
 * Calc percent to pixels
 * @param {String} str
 * @param {String} prop
 * @returns {number}
 */
declare function calc(str: any, prop: any): number;
