"use strict";
/**
 * Style
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vars_1 = require("./replacers/vars");
const mediaqueries_1 = require("./replacers/mediaqueries");
const value_1 = require("./value");
const utils_1 = require("./utils");
class default_1 {
    /**
     * Constructor
     * @param {Object} source plain object style with variables
     * @param {Array} [varsArr] array of vars objects
     */
    constructor(source, varsArr = []) {
        this.source = source;
        this.varsArr = varsArr;
        this.processedSource = null;
        this.extractedVars = null;
        this.extractedProps = null;
        this.calculatedVars = null;
        this.calculatedProps = null;
    }
    /**
     * Calculates style
     * @returns {Object}
     */
    calc() {
        this.processSource();
        this.calcVars();
        this.calcProps();
        this.tryOutline();
        return {
            calculatedVars: this.calculatedVars,
            calculatedProps: this.calculatedProps,
        };
    }
    processSource() {
        this.processedSource = mediaqueries_1.default.process(this.source);
    }
    calcVars() {
        this.extractedVars = vars_1.default.extract(this.processedSource);
        if (this.extractedVars) {
            const varsArrForVars = [this.extractedVars].concat(this.varsArr);
            this.calculatedVars = calcPlainObject(this.extractedVars, varsArrForVars);
            this.varsArr = [this.calculatedVars].concat(this.varsArr);
        }
    }
    calcProps() {
        this.extractedProps = utils_1.default.excludeKeys(this.processedSource, this.extractedVars);
        this.calculatedProps = calcPlainObject(this.extractedProps, this.varsArr);
    }
    tryOutline() {
        let outline = vars_1.default.get('$outline', this.varsArr);
        if (outline) {
            this.calculatedProps.borderWidth =
                typeof outline === 'number' ? outline : 1;
            this.calculatedProps.borderColor = getRandomColor();
        }
    }
}
exports.default = default_1;
/**
 * Calculates values in plain object
 *
 * @param {Object} obj
 * @param {Array} varsArr
 * @returns {Object}
 */
function calcPlainObject(obj, varsArr) {
    return Object.keys(obj).reduce((res, prop) => {
        res[prop] = calcStyleValue(prop, obj[prop], varsArr);
        return res;
    }, {});
}
/**
 * Calculates single value
 * @param {String} prop
 * @param {*} value
 * @param {Array} varsArr
 */
function calcStyleValue(prop, value, varsArr) {
    if (value && typeof value === 'object') {
        return Array.isArray(value)
            ? value.map((obj) => calcPlainObject(obj, varsArr))
            : calcPlainObject(value, varsArr);
    }
    else {
        return new value_1.default(value, prop, varsArr).calc();
    }
}
/**
 * Returns random color (needed for outline)
 * @returns {String}
 */
function getRandomColor() {
    let colors = ['black', 'red', 'green', 'blue'];
    let index = Math.round(Math.random() * (colors.length - 1));
    return colors[index];
}
