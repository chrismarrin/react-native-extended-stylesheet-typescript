"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const style_1 = require("./style");
const utils_1 = require("./utils");
const vars_1 = require("./replacers/vars");
const mediaqueries_1 = require("./replacers/mediaqueries");
class default_1 {
    /**
     * Constructor
     * @param {Object} source
     */
    constructor(source) {
        this.source = source;
        this.result = {};
        this.cache = new Map(); // cache result for each theme
        this.nativeSheet = {};
        this.globalVars = null;
        this.localVars = null;
        this.allVars = null;
        this.processedSource = null;
    }
    /**
     * Calculates sheet and update result
     * @param {Object} globalVars
     */
    calc(globalVars) {
        this.globalVars = globalVars;
        this.clearResult();
        if (this.hasCache()) {
            this.applyCache();
        }
        else {
            this.processMediaQueries();
            this.calcVars();
            this.calcStyles();
            this.calcNative();
            this.storeCache();
        }
        return this.getResult();
    }
    processMediaQueries() {
        this.processedSource = mediaqueries_1.default.process(this.source);
    }
    calcVars() {
        const rawLocalVars = vars_1.default.extract(this.processedSource);
        if (rawLocalVars) {
            this.localVars = new style_1.default(rawLocalVars, [
                rawLocalVars,
                this.globalVars,
            ]).calc().calculatedVars;
            Object.assign(this.result, this.localVars);
        }
        else {
            this.localVars = null;
        }
        this.allVars = [this.localVars, this.globalVars].filter(Boolean);
    }
    calcStyles() {
        const extractedStyles = utils_1.default.excludeKeys(this.processedSource, this.localVars);
        Object.keys(extractedStyles).forEach((key) => {
            let styles = extractedStyles[key];
            if (typeof styles === 'function') {
                styles = styles();
            }
            if (styles && typeof styles === 'object') {
                this.calcStyle(key, styles);
            }
            else {
                // copy primitive values to result as-is
                this.result[key] = styles;
            }
        });
    }
    calcStyle(key, styleProps) {
        const style = new style_1.default(styleProps, this.allVars);
        const { calculatedProps, calculatedVars } = style.calc();
        const merged = Object.assign({}, calculatedVars, calculatedProps);
        if (key.charAt(0) === '_') {
            this.result[key] = merged;
        }
        else {
            this.result['_' + key] = merged;
            this.nativeSheet[key] = calculatedProps;
        }
    }
    calcNative() {
        if (Object.keys(this.nativeSheet).length) {
            const rnStyleSheet = react_native_1.StyleSheet.create(this.nativeSheet);
            Object.assign(this.result, rnStyleSheet);
        }
    }
    getResult() {
        return this.result;
    }
    clearResult() {
        Object.keys(this.result).forEach((key) => delete this.result[key]);
    }
    hasCache() {
        const key = this.getCacheKey();
        return key && this.cache.has(key);
    }
    applyCache() {
        const cachedResult = this.cache.get(this.getCacheKey());
        Object.assign(this.result, cachedResult);
    }
    storeCache() {
        const key = this.getCacheKey();
        if (key) {
            this.cache.set(key, Object.assign({}, this.result));
        }
    }
    clearCache() {
        this.cache.clear();
    }
    getCacheKey() {
        return this.globalVars && this.globalVars.$theme;
    }
}
exports.default = default_1;
