/**
 * Style
 */
export default class {
    private source;
    private varsArr;
    private processedSource;
    private extractedVars;
    private extractedProps;
    private calculatedVars;
    private calculatedProps;
    /**
     * Constructor
     * @param {Object} source plain object style with variables
     * @param {Array} [varsArr] array of vars objects
     */
    constructor(source: any, varsArr?: any[]);
    /**
     * Calculates style
     * @returns {Object}
     */
    calc(): {
        calculatedVars: any;
        calculatedProps: any;
    };
    processSource(): void;
    calcVars(): void;
    calcProps(): void;
    tryOutline(): void;
}
