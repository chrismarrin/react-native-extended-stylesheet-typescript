/**
 * Variables
 */
declare const _default: {
    isVar: typeof isVar;
    calc: typeof calc;
    extract: typeof extract;
    get: typeof get;
};
export default _default;
/**
 * Is string equals to another variable: '$varName'
 * @param {String} str
 */
declare function isVar(str: any): boolean;
/**
 * Replace var with value from vars arr.
 * @param {String} str variable name with $, e.g. '$color'
 * @param {Array<Object>} varsArr array of variable sets to search into.
 */
declare function calc(str: any, varsArr: any): any;
/**
 * Extract variables from mixed object
 * @param {Object} obj
 * @returns {null|Object}
 */
declare function extract(obj: any): any;
/**
 * Return variable value using provided array of variable sets
 * @param {String} name variable with $, e.g. '$myVar'
 * @param {Array} varsArr array of variable sets
 */
declare function get(name: any, varsArr: any): any;
