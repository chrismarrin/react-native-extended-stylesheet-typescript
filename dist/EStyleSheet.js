"use strict";
/**
 * Extended StyleSheet API
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EStyleSheet = void 0;
const react_native_1 = require("react-native");
const sheet_1 = require("./sheet");
const style_1 = require("./style");
const value_1 = require("./value");
const vars_1 = require("./replacers/vars");
const mediaqueries_1 = require("./replacers/mediaqueries");
const child_1 = require("./child");
const BUILD_EVENT = 'build';
class EStyleSheet {
    /**
     * Constructor
     */
    constructor() {
        this.globalVars = null;
        this.listeners = {};
        this.hairlineWidth = react_native_1.StyleSheet.hairlineWidth;
        this.absoluteFill = react_native_1.StyleSheet.absoluteFill;
        this.absoluteFillObject = react_native_1.StyleSheet.hairlineWidth;
        EStyleSheet.instance = this;
        this.child = child_1.default;
        this.built = false;
        this.sheets = [];
        this.globalVars = null;
        this.listeners = {};
    }
    /**
     * Creates stylesheet that will be calculated after build
     * @param {Object} obj
     * @returns {Object}
     */
    create(styles) {
        const sheet = new sheet_1.default(styles);
        // todo: add options param to allow create dynamic stylesheets that should not be stored
        this.sheets.push(sheet);
        if (this.built) {
            sheet.calc(this.globalVars);
        }
        return sheet.getResult();
    }
    /**
     * Builds all created stylesheets with passed variables
     * @param {Object} [rawGlobalVars]
     */
    build(rawGlobalVars) {
        this.built = true;
        this._calcGlobalVars(rawGlobalVars);
        this._calcSheets();
        this._callListeners(BUILD_EVENT);
    }
    /**
     * Calculates particular value. For some values you need to pass prop (e.g. percent)
     * @param {*} expr
     * @param {String} [prop]
     * @returns {*}
     */
    value(expr, prop) {
        const varsArr = this.globalVars ? [this.globalVars] : [];
        return new value_1.default(expr, prop, varsArr).calc();
    }
    /**
     * Subscribe to event. Currently only 'build' event is supported.
     * @param {String} event
     * @param {Function} listener
     */
    subscribe(event, listener) {
        this._assertSubscriptionParams(event, listener);
        this.listeners[BUILD_EVENT] = this.listeners[BUILD_EVENT] || [];
        this.listeners[BUILD_EVENT].push(listener);
        if (this.built) {
            listener();
        }
    }
    /**
     * Unsubscribe from event. Currently only 'build' event is supported.
     * @param {String} event
     * @param {Function} listener
     */
    unsubscribe(event, listener) {
        this._assertSubscriptionParams(event, listener);
        if (this.listeners[BUILD_EVENT]) {
            this.listeners[BUILD_EVENT] = this.listeners[BUILD_EVENT].filter((item) => item !== listener);
        }
    }
    setStyleAttributePreprocessor(property, process) {
        react_native_1.StyleSheet.setStyleAttributePreprocessor(property, process);
    }
    flatten(style) {
        return react_native_1.StyleSheet.flatten(style);
    }
    /**
     * Clears all cached styles.
     */
    clearCache() {
        this.sheets.forEach((sheet) => sheet.clearCache());
    }
    // todo: move global vars stuff to separate module
    _calcGlobalVars(rawGlobalVars) {
        if (rawGlobalVars) {
            this._checkGlobalVars(rawGlobalVars);
            // $theme is system variable used for caching
            rawGlobalVars.$theme = rawGlobalVars.$theme || 'default';
            this.globalVars = new style_1.default(rawGlobalVars, [
                rawGlobalVars,
            ]).calc().calculatedVars;
        }
    }
    _calcSheets() {
        this.sheets.forEach((sheet) => sheet.calc(this.globalVars));
    }
    _callListeners(event) {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].forEach((listener) => listener());
        }
    }
    _checkGlobalVars(rawGlobalVars) {
        Object.keys(rawGlobalVars).forEach((key) => {
            if (!vars_1.default.isVar(key) && !mediaqueries_1.default.isMediaQuery(key)) {
                throw new Error(`EStyleSheet.build() params should contain global variables (start with $) ` +
                    `or media queries (start with @media). Got '${key}'.`);
            }
        });
    }
    _assertSubscriptionParams(event, listener) {
        if (event !== BUILD_EVENT) {
            throw new Error(`Only '${BUILD_EVENT}' event is currently supported.`);
        }
        if (typeof listener !== 'function') {
            throw new Error('Listener should be a function.');
        }
    }
}
exports.EStyleSheet = EStyleSheet;
EStyleSheet.instance = null;
