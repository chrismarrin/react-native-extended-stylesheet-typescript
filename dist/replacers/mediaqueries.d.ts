/**
 * Media queries
 * Supported values:
 * - (type) ios, android
 * - height, min-height, max-height
 * - width, min-width, max-width
 * - orientation
 * - aspect-ratio
 */
declare const _default: {
    isMediaQuery: typeof isMediaQuery;
    process: typeof process;
};
export default _default;
/**
 * Is string is media query
 * @param {String} str
 */
declare function isMediaQuery(str: any): boolean;
/**
 * Process and apply media queries in object
 * @param {Object} obj
 * @returns {null|Object}
 */
declare function process(obj: any): {};
