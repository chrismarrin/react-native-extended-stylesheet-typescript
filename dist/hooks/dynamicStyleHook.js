import { useEffect, useState } from 'react';
import { EStyleSheet } from '../EStyleSheet';
// type DynamicStylesHook<T extends NamedAny<T> = {}> = ( computeStylesMethod: () => T ) => T;
export function useDynamicStyles(computeStylesMethod) {
    const [styles, setStyles] = useState(computeStylesMethod());
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
