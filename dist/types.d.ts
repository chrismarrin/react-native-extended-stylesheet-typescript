export declare type PrimitiveType = string | number;
export declare type RemoveMediaQueries<Q> = Q extends `@media${string}` ? never : Q;
export declare type CreateReturnType<T> = {
    [Key in RemoveMediaQueries<keyof T>]: ViewStyle | TextStyle | ImageStyle;
};
export declare type MediaQueryStyles<T> = {
    [Key in keyof T]: ViewStyle | TextStyle | ImageStyle;
};
export declare type AddFunctionReturnType<T> = {
    [Key in keyof T]: T[Key] | (() => T[Key]);
};
export declare type AddStringToNumberReturns<T> = {
    [Key in keyof T]: T[Key] extends number ? PrimitiveType : T[Key];
};
export declare type GetOnlyNumberReturns<T> = {
    [Key in keyof T]: T[Key] extends number ? PrimitiveType : never;
};
export declare type ExtendedStyleType = ViewStyle | TextStyle | ImageStyle;
export declare type SuperExtendedType = AddFunctionReturnType<ExtendedStyleType>;
export declare type NamedStyles<T> = {
    [P in keyof T]: P extends `@media${string}` ? MediaQueryStyles<T[P]> : P extends `$${string}` ? PrimitiveType : SuperExtendedType;
};
export declare type DollarSignString = `$${string}`;
export declare type RawGlobalVars<T> = {
    [P in keyof T]: P extends `$${string}` ? PrimitiveType : P extends `@media${string}` ? RawGlobalVars<T[P]> : never;
};
declare type PerpectiveTransform = {
    perspective: number;
};
declare type RotateTransform = {
    rotate: string;
};
declare type RotateXTransform = {
    rotateX: string;
};
declare type RotateYTransform = {
    rotateY: string;
};
declare type RotateZTransform = {
    rotateZ: string;
};
declare type ScaleTransform = {
    scale: number;
};
declare type ScaleXTransform = {
    scaleX: number;
};
declare type ScaleYTransform = {
    scaleY: number;
};
declare type TranslateXTransform = {
    translateX: number;
};
declare type TranslateYTransform = {
    translateY: number;
};
declare type SkewXTransform = {
    skewX: string;
};
declare type SkewYTransform = {
    skewY: string;
};
declare type MatrixTransform = {
    matrix: number[];
};
export declare type TransformsStyle = {
    transform?: (PerpectiveTransform | RotateTransform | RotateXTransform | RotateYTransform | RotateZTransform | ScaleTransform | ScaleXTransform | ScaleYTransform | TranslateXTransform | TranslateYTransform | SkewXTransform | SkewYTransform | MatrixTransform)[];
    /**
     * @deprecated Use matrix in transform prop instead.
     */
    transformMatrix?: Array<number>;
    /**
     * @deprecated Use rotate in transform prop instead.
     */
    rotation?: number;
    /**
     * @deprecated Use scaleX in transform prop instead.
     */
    scaleX?: number;
    /**
     * @deprecated Use scaleY in transform prop instead.
     */
    scaleY?: number;
    /**
     * @deprecated Use translateX in transform prop instead.
     */
    translateX?: number;
    /**
     * @deprecated Use translateY in transform prop instead.
     */
    translateY?: number;
};
declare const OpaqueColorValue: unique symbol;
declare type OpaqueColorValue = typeof OpaqueColorValue;
export declare type ColorValue = string | OpaqueColorValue;
export declare type ProcessedColorValue = number | OpaqueColorValue;
export declare type FlexAlignType = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
export declare type ShadowStyleIOS = {
    shadowColor?: ColorValue;
    shadowOffset?: {
        width: number;
        height: number;
    };
    shadowOpacity?: number;
    shadowRadius?: number;
};
export declare type FlexStyle = {
    alignContent?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around';
    alignItems?: FlexAlignType;
    alignSelf?: 'auto' | FlexAlignType;
    aspectRatio?: number | string;
    borderBottomWidth?: number | string;
    borderEndWidth?: number | string;
    borderLeftWidth?: number | string;
    borderRightWidth?: number | string;
    borderStartWidth?: number | string;
    borderTopWidth?: number | string;
    borderWidth?: number | string;
    bottom?: number | string;
    display?: 'none' | 'flex';
    end?: number | string;
    flex?: number | string;
    flexBasis?: number | string;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    flexGrow?: number | string;
    flexShrink?: number | string;
    flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
    height?: number | string;
    justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
    left?: number | string;
    margin?: number | string;
    marginBottom?: number | string;
    marginEnd?: number | string;
    marginHorizontal?: number | string;
    marginLeft?: number | string;
    marginRight?: number | string;
    marginStart?: number | string;
    marginTop?: number | string;
    marginVertical?: number | string;
    maxHeight?: number | string;
    maxWidth?: number | string;
    minHeight?: number | string;
    minWidth?: number | string;
    overflow?: 'visible' | 'hidden' | 'scroll';
    padding?: number | string;
    paddingBottom?: number | string;
    paddingEnd?: number | string;
    paddingHorizontal?: number | string;
    paddingLeft?: number | string;
    paddingRight?: number | string;
    paddingStart?: number | string;
    paddingTop?: number | string;
    paddingVertical?: number | string;
    position?: 'absolute' | 'relative';
    right?: number | string;
    start?: number | string;
    top?: number | string;
    width?: number | string;
    zIndex?: number | string;
    /**
     * @platform ios
     */
    direction?: 'inherit' | 'ltr' | 'rtl';
};
export declare type ImageResizeMode = 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
export declare type ImageStyle = FlexStyle & ShadowStyleIOS & TransformsStyle & {
    resizeMode?: ImageResizeMode;
    backfaceVisibility?: 'visible' | 'hidden';
    borderBottomLeftRadius?: number | string;
    borderBottomRightRadius?: number | string;
    backgroundColor?: ColorValue;
    borderColor?: ColorValue;
    borderWidth?: number | string;
    borderRadius?: number | string;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    overflow?: 'visible' | 'hidden';
    overlayColor?: ColorValue;
    tintColor?: ColorValue;
    opacity?: number | string;
};
export declare type FontVariant = 'small-caps' | 'oldstyle-nums' | 'lining-nums' | 'tabular-nums' | 'proportional-nums';
export declare type TextStyleIOS = ViewStyle & {
    fontVariant?: FontVariant[];
    letterSpacing?: number;
    textDecorationColor?: ColorValue;
    textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed';
    writingDirection?: 'auto' | 'ltr' | 'rtl';
};
export declare type TextStyleAndroid = ViewStyle & {
    textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
    includeFontPadding?: boolean;
};
export declare type TextStyle = TextStyleIOS & TextStyleAndroid & ViewStyle & {
    color?: ColorValue;
    fontFamily?: string;
    fontSize?: number | string;
    fontStyle?: 'normal' | 'italic';
    /**
     * Specifies font weight. The values 'normal' and 'bold' are supported
     * for most fonts. Not all fonts have a variant for each of the numeric
     * values, in that case the closest one is chosen.
     */
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    letterSpacing?: number | string;
    lineHeight?: number | string;
    textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
    textDecorationLine?: 'none' | 'underline' | 'line-through' | 'underline line-through';
    textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed';
    textDecorationColor?: ColorValue;
    textShadowColor?: ColorValue;
    textShadowOffset?: {
        width: number;
        height: number;
    };
    textShadowRadius?: number | string;
    textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase';
    testID?: string;
};
/**
 * @see https://reactnative.dev/docs/view#style
 * @see https://github.com/facebook/react-native/blob/master/Libraries/Components/View/ViewStylePropTypes.js
 */
export declare type ViewStyle = FlexStyle & ShadowStyleIOS & TransformsStyle & {
    backfaceVisibility?: 'visible' | 'hidden';
    backgroundColor?: ColorValue;
    borderBottomColor?: ColorValue;
    borderBottomEndRadius?: number | string;
    borderBottomLeftRadius?: number | string;
    borderBottomRightRadius?: number | string;
    borderBottomStartRadius?: number | string;
    borderBottomWidth?: number | string;
    borderColor?: ColorValue;
    borderEndColor?: ColorValue;
    borderLeftColor?: ColorValue;
    borderLeftWidth?: number | string;
    borderRadius?: number | string;
    borderRightColor?: ColorValue;
    borderRightWidth?: number | string;
    borderStartColor?: ColorValue;
    borderStyle?: 'solid' | 'dotted' | 'dashed';
    borderTopColor?: ColorValue;
    borderTopEndRadius?: number | string;
    borderTopLeftRadius?: number | string;
    borderTopRightRadius?: number | string;
    borderTopStartRadius?: number | string;
    borderTopWidth?: number | string;
    borderWidth?: number | string;
    opacity?: number | string;
    testID?: string;
    /**
     * Sets the elevation of a view, using Android's underlying
     * [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation).
     * This adds a drop shadow to the item and affects z-order for overlapping views.
     * Only supported on Android 5.0+, has no effect on earlier versions.
     *
     * @platform android
     */
    elevation?: number;
};
export {};
