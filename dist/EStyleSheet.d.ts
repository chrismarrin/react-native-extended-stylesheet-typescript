/**
 * Extended StyleSheet API
 */
import { StyleProp, StyleSheet } from 'react-native';
import { CreateReturnType, NamedStyles, PrimitiveType, RawGlobalVars } from './types';
export declare class EStyleSheet {
    static instance: EStyleSheet;
    private child;
    private built;
    private sheets;
    private globalVars;
    private listeners;
    hairlineWidth: number;
    absoluteFill: import("react-native").RegisteredStyle<StyleSheet.AbsoluteFillStyle>;
    absoluteFillObject: number;
    /**
     * Constructor
     */
    constructor();
    /**
     * Creates stylesheet that will be calculated after build
     * @param {Object} obj
     * @returns {Object}
     */
    create<T extends NamedStyles<T>>(styles: T | NamedStyles<T>): CreateReturnType<T>;
    /**
     * Builds all created stylesheets with passed variables
     * @param {Object} [rawGlobalVars]
     */
    build<T extends RawGlobalVars<T>>(rawGlobalVars?: T | RawGlobalVars<T>): void;
    /**
     * Calculates particular value. For some values you need to pass prop (e.g. percent)
     * @param {*} expr
     * @param {String} [prop]
     * @returns {*}
     */
    value(expr: string, prop?: string): PrimitiveType;
    /**
     * Subscribe to event. Currently only 'build' event is supported.
     * @param {String} event
     * @param {Function} listener
     */
    subscribe(event: string, listener: () => void): void;
    /**
     * Unsubscribe from event. Currently only 'build' event is supported.
     * @param {String} event
     * @param {Function} listener
     */
    unsubscribe(event: string, listener: () => void): void;
    setStyleAttributePreprocessor(property: string, process: (nextProp: unknown) => unknown): void;
    flatten<T>(style?: StyleProp<T>): T extends (infer U)[] ? U : T;
    /**
     * Clears all cached styles.
     */
    clearCache(): void;
    _calcGlobalVars(rawGlobalVars: any): void;
    _calcSheets(): void;
    _callListeners(event: any): void;
    _checkGlobalVars(rawGlobalVars: any): void;
    _assertSubscriptionParams(event: any, listener: any): void;
}
