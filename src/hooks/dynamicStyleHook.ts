import { useEffect, useState } from 'react';
import { EStyleSheet, NamedStyles } from '../EStyleSheet';

type AnyObject<T = {}> = T & { [key: string]: any };
type NamedAny<T = {}> = NamedStyles<T> | NamedStyles<any>;

// type DynamicStylesHook<T extends NamedAny<T> = {}> = ( computeStylesMethod: () => T ) => T;

export function useDynamicStyles<T extends NamedAny<T>>(
    computeStylesMethod: () => T
): T {
    const [styles, setStyles] = useState<T>(computeStylesMethod());

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
