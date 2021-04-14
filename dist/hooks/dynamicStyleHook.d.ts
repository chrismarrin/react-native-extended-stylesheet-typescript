import { CreateReturnType } from '../types';
export declare function useDynamicStyles<T extends CreateReturnType<T>>(computeStylesMethod: () => T | CreateReturnType<T>): CreateReturnType<T>;
