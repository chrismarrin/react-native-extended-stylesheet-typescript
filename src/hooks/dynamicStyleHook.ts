import { useEffect, useState } from 'react';
import { EStyleSheet } from '../EStyleSheet';
import { CreateReturnType } from '../types';

// type DynamicStylesHook<T extends NamedAny<T> = {}> = ( computeStylesMethod: () => T ) => T;

export function useDynamicStyles<T extends CreateReturnType<T>>(
    computeStylesMethod: () => T | CreateReturnType<T>
): CreateReturnType<T> {
    const [styles, setStyles] = useState<CreateReturnType<T>>(computeStylesMethod());

    const styleChangeCallback = () => {
        setStyles(computeStylesMethod());
    };

    useEffect(() => {
        EStyleSheet.instance.subscribe('build', styleChangeCallback);

        return () => {
            EStyleSheet.instance.unsubscribe('build', styleChangeCallback);
        };
    }, []);

    return styles;
}
