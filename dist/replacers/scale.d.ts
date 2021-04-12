/**
 * Scale property if needed
 */
declare const _default: {
    isScalable: typeof isScalable;
    calc: typeof calc;
};
export default _default;
/**
 * Is value & property scalable
 * @param {*} value
 * @param {String} prop
 * @returns {Boolean}
 */
declare function isScalable(value: any, prop: any): boolean;
/**
 * Performs scaling
 * @param {Number} value
 * @param {Number} scaleFactor
 * @returns {number}
 */
declare function calc(value: any, scaleFactor: any): number;
