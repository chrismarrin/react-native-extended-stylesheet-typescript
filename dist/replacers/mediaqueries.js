"use strict";
/**
 * Media queries
 * Supported values:
 * - (type) ios, android
 * - height, min-height, max-height
 * - width, min-width, max-width
 * - orientation
 * - aspect-ratio
 */
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const css_mediaquery_1 = require("css-mediaquery");
const utils_1 = require("../utils");
const PREFIX = '@media';
exports.default = {
    isMediaQuery,
    process,
};
/**
 * Is string is media query
 * @param {String} str
 */
function isMediaQuery(str) {
    return typeof str === 'string' && str.indexOf(PREFIX) === 0;
}
/**
 * Process and apply media queries in object
 * @param {Object} obj
 * @returns {null|Object}
 */
function process(obj) {
    const mqKeys = [];
    // copy non-media-query stuff
    const res = Object.keys(obj).reduce((res, key) => {
        if (!isMediaQuery(key)) {
            res[key] = obj[key];
        }
        else {
            mqKeys.push(key);
        }
        return res;
    }, {});
    // apply media query stuff
    if (mqKeys.length) {
        const matchObject = getMatchObject();
        mqKeys.forEach((key) => {
            const mqStr = key.replace(PREFIX, '');
            const isMatch = css_mediaquery_1.match(mqStr, matchObject);
            if (isMatch) {
                merge(res, obj[key]);
            }
        });
    }
    return res;
}
/**
 * Returns object to match media query
 * @returns {Object}
 */
function getMatchObject() {
    const win = react_native_1.Dimensions.get('window');
    const { isRTL } = react_native_1.I18nManager;
    return {
        width: win.width,
        height: win.height,
        orientation: win.width > win.height ? 'landscape' : 'portrait',
        'aspect-ratio': win.width / win.height,
        type: react_native_1.Platform.OS,
        direction: isRTL ? 'rtl' : 'ltr',
    };
}
/**
 * Merge media query obj into parent obj
 * @param {Object} obj
 * @param {Object} mqObj
 */
function merge(obj, mqObj) {
    Object.keys(mqObj).forEach((key) => {
        if (utils_1.default.isObject(obj[key]) && utils_1.default.isObject(mqObj[key])) {
            Object.assign(obj[key], mqObj[key]);
        }
        else {
            obj[key] = mqObj[key];
        }
    });
}
