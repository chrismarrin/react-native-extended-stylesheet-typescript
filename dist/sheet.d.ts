export default class {
    private source;
    private result;
    private cache;
    private nativeSheet;
    private globalVars;
    private localVars;
    private allVars;
    private processedSource;
    /**
     * Constructor
     * @param {Object} source
     */
    constructor(source: any);
    /**
     * Calculates sheet and update result
     * @param {Object} globalVars
     */
    calc(globalVars: any): any;
    processMediaQueries(): void;
    calcVars(): void;
    calcStyles(): void;
    calcStyle(key: any, styleProps: any): void;
    calcNative(): void;
    getResult(): any;
    clearResult(): void;
    hasCache(): any;
    applyCache(): void;
    storeCache(): void;
    clearCache(): void;
    getCacheKey(): any;
}
