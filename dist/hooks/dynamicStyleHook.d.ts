import { NamedStyles } from '../types';
export declare function useDynamicStyles<T extends NamedStyles<T>>(computeStylesMethod: () => T | NamedStyles<T>): NamedStyles<T>;
