/**
 * Calculation of REM strings
 */
declare const _default: {
    isRem: typeof isRem;
    calc: typeof calc;
};
export default _default;
/**
 * Is string contains rem
 * @param {String} str
 * @returns {Boolean}
 */
declare function isRem(str: any): boolean;
/**
 * Calculate rem to pixels: '1.2rem' => 1.2 * rem
 * @param {String} str
 * @param {Number} rem
 * @returns {number}
 */
declare function calc(str: any, rem?: number): number;
