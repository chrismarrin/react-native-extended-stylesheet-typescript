import { useEffect, useState } from 'react';
import { EStyleSheet } from '../EStyleSheet';
import { NamedStyles } from '../types';

// type DynamicStylesHook<T extends NamedAny<T> = {}> = ( computeStylesMethod: () => T ) => T;

export function useDynamicStyles<T extends NamedStyles<T>>(
    computeStylesMethod: () => T | NamedStyles<T>
): NamedStyles<T> {
    const [styles, setStyles] = useState<NamedStyles<T>>(computeStylesMethod());

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
