"use strict";
/**
 * Calculation of percent strings
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const { width, height } = react_native_1.Dimensions.get('window');
const V_PROPS = ['height', 'top', 'bottom', 'vertical'];
const H_PROPS = ['width', 'left', 'right', 'horizontal'];
const SUFFIX = '%';
const invalidPropMsg = [
    `Name of variable or property with percent value should contain `,
    `(${V_PROPS.concat(H_PROPS).join()}) to define base for percent calculation`,
].join('');
exports.default = {
    isPercent,
    calc,
};
/**
 * Is string contains percent
 * @param {String} str
 * @returns {boolean}
 */
function isPercent(str) {
    return str.charAt(str.length - 1) === SUFFIX;
}
/**
 * Calc percent to pixels
 * @param {String} str
 * @param {String} prop
 * @returns {number}
 */
function calc(str, prop) {
    let percent = parseInt(str.substring(0, str.length - 1), 10);
    let base = isVertical(prop) ? height : width;
    return (base * percent) / 100;
}
function isVertical(prop) {
    prop = prop.toLowerCase();
    if (V_PROPS.some((p) => prop.indexOf(p) >= 0)) {
        return true;
    }
    if (H_PROPS.some((p) => prop.indexOf(p) >= 0)) {
        return false;
    }
    throw new Error(invalidPropMsg);
}
