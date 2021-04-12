"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDynamicStyles = void 0;
const react_1 = require("react");
const EStyleSheet_1 = require("../EStyleSheet");
// type DynamicStylesHook<T extends NamedAny<T> = {}> = ( computeStylesMethod: () => T ) => T;
function useDynamicStyles(computeStylesMethod) {
    const [styles, setStyles] = react_1.useState(computeStylesMethod());
    const styleChangeCallback = () => {
        setStyles(computeStylesMethod());
    };
    react_1.useEffect(() => {
        EStyleSheet_1.EStyleSheet.instance.subscribe('build', styleChangeCallback);
        return () => {
            EStyleSheet_1.EStyleSheet.instance.unsubscribe('build', styleChangeCallback);
        };
    }, []);
    return styles;
}
exports.useDynamicStyles = useDynamicStyles;
