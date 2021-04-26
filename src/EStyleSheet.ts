/**
 * Extended StyleSheet API
 */

import { StyleProp, StyleSheet } from 'react-native';
import Sheet from './sheet';
import Style from './style';
import Value from './value';
import vars from './replacers/vars';
import mq from './replacers/mediaqueries';
import { CreateReturnType, NamedStyles, RawGlobalVars } from './types';

const BUILD_EVENT = 'build';



export class EStyleSheet {
    static instance: EStyleSheet = null;
    private built: boolean;
    private sheets: Sheet[];
    private globalVars = null;
    private listeners = {};
    public hairlineWidth = StyleSheet.hairlineWidth;
    public absoluteFill = StyleSheet.absoluteFill;
    public absoluteFillObject = StyleSheet.hairlineWidth;
    /**
     * Constructor
     */
    constructor() {
        EStyleSheet.instance = this;
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

    create<T extends NamedStyles<T>>(
        styles: T | NamedStyles<T>
    ): CreateReturnType<T> {
        const sheet = new Sheet(styles);
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
    build<T extends RawGlobalVars<T>>(rawGlobalVars?: T | RawGlobalVars<T>): void {
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
    value(expr: string, prop?: string): any {
        const varsArr = this.globalVars ? [this.globalVars] : [];
        return new Value(expr, prop, varsArr).calc();
    }

    child(styles, styleName, index, count): any {

        const addStyle = (result, styles, styleName, condition) => {
            if (styles[styleName] && condition) {
                result.push(styles[styleName]);
            }
        }
        
        const isNumber = (value) => {
            return typeof value === 'number';
        }
        
        if (!isNumber(index) || !isNumber(count)) {
            return styles[styleName];
        }
    
        const result = [styles[styleName]];
    
        addStyle(result, styles, styleName + ':first-child', index === 0);
        addStyle(
            result,
            styles,
            styleName + ':nth-child-even',
            index < count && index % 2 === 0
        );
        addStyle(
            result,
            styles,
            styleName + ':nth-child-odd',
            index < count && index % 2 === 1
        );
        addStyle(result, styles, styleName + ':last-child', index === count - 1);
    
        return result.length > 1 ? result : result[0];
    }
    /**
     * Subscribe to event. Currently only 'build' event is supported.
     * @param {String} event
     * @param {Function} listener
     */
    subscribe(event: string, listener: () => void): void {
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
    unsubscribe(event: string, listener: () => void): void {
        this._assertSubscriptionParams(event, listener);
        if (this.listeners[BUILD_EVENT]) {
            this.listeners[BUILD_EVENT] = this.listeners[BUILD_EVENT].filter(
                (item) => item !== listener
            );
        }
    }

    setStyleAttributePreprocessor( property: string, process: ( nextProp: unknown ) => unknown ): void {
        StyleSheet.setStyleAttributePreprocessor( property, process );
    }

    flatten<T>(style?: StyleProp<T>): T extends (infer U)[] ? U : T {
        return StyleSheet.flatten(style);
    }
    
    /**
     * Clears all cached styles.
     */
    clearCache(): void {
        this.sheets.forEach((sheet) => sheet.clearCache());
    }

    // todo: move global vars stuff to separate module
    _calcGlobalVars(rawGlobalVars): void {
        if (rawGlobalVars) {
            this._checkGlobalVars(rawGlobalVars);
            // $theme is system variable used for caching
            rawGlobalVars.$theme = rawGlobalVars.$theme || 'default';
            this.globalVars = new Style(rawGlobalVars, [
                rawGlobalVars,
            ]).calc().calculatedVars;
        }
    }

    _calcSheets(): void {
        this.sheets.forEach((sheet) => sheet.calc(this.globalVars));
    }

    _callListeners(event): void {
        if (Array.isArray(this.listeners[event])) {
            this.listeners[event].forEach((listener) => listener());
        }
    }

    _checkGlobalVars(rawGlobalVars): void {
        Object.keys(rawGlobalVars).forEach((key) => {
            if (!vars.isVar(key) && !mq.isMediaQuery(key)) {
                throw new Error(
                    `EStyleSheet.build() params should contain global variables (start with $) ` +
                        `or media queries (start with @media). Got '${key}'.`
                );
            }
        });
    }

    _assertSubscriptionParams(event, listener): void {
        if (event !== BUILD_EVENT) {
            throw new Error(
                `Only '${BUILD_EVENT}' event is currently supported.`
            );
        }
        if (typeof listener !== 'function') {
            throw new Error('Listener should be a function.');
        }
    }
}
