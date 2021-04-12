/**
 * Calculates particular value
 */
export default class Value {
    private value;
    private outValue;
    private prop;
    private varsArr;
    private stack;
    private isOperation;
    /**
     * Constructor
     *
     * @param {*} value
     * @param {String} prop property for which valye is calculated
     * @param {Array} varsArr array of objects with vars
     * @param {Object} [options]
     * @param {Array} [options.stack] stack of calls when resolving variable
     * @param {Boolean} [options.isOperation] is value calculated inside operation
     */
    constructor(value: any, prop: any, varsArr?: any[], options?: any);
    /**
     * Calculates value:
     * execute function, resolve var refs, convert string of (rem, percent) to pixels
     */
    calc(): any;
    /**
     * Calculates string
     * Here we do not calc direct percent values as they supported natively since RN 43 (#32).
     * But keep calculating percent for operands when value defined as operation.
     */
    calcString(): void;
    /**
     * Applies array of calculations to value. Stops on the first calculation that returns not null.
     * @param {Array} actions
     * @param {String} str
     */
    tryActions(actions: any, str: any): any;
    tryCalcOperation(str: any): number;
    calcOperandValue(str: any): any;
    tryCalcVar(str: any): any;
    /**
     * Tries calc percent
     */
    tryCalcPercent(str: any): number;
    /**
     * Tries calc rem
     */
    tryCalcRem(str: any): number;
    /**
     * Tries calc float value from string
     */
    tryCalcFloat(str: any): number;
    /**
     * Is it final calculation (not recursion)
     */
    isFinal(): boolean;
    /**
     * Just proxies value when no processing needed
     */
    proxyValue(): void;
    applyScale(): void;
}
