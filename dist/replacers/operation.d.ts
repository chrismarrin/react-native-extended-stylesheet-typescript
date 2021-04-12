/**
 * Detects operation in string
 * Supports: '*', '+', '-'
 */
declare const _default: {
    isOperation: typeof isOperation;
    exec: typeof exec;
};
export default _default;
/**
 * Is operation in string: '0.25 * $abc' => {operator: '*', v1: '0.25', v2: '$abc'}
 * @param {String} str
 */
declare function isOperation(str: any): false | {
    v1: any;
    v2: any;
    operator: string;
};
/**
 * Executes operation
 * @param {Object} opInfo
 */
declare function exec(opInfo: any): number;
