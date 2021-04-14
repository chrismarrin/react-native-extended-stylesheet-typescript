import { ImageStyle, TextStyle, ViewStyle } from 'react-native';
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
export declare type ExtendStyle<T> = AddFunctionReturnType<AddStringToNumberReturns<T>>;
export declare type OnlyNumberViewStyle = GetOnlyNumberReturns<ViewStyle>;
export declare const onvsTest: OnlyNumberViewStyle;
export declare const evsTest: ExtendedViewStyle;
export declare const creatTest: CreateReturnType<{
    barkley: {
        borderRadius: string;
        backgroundColor: string;
    };
}>;
export declare type ExtendedViewStyle = ExtendStyle<ViewStyle>;
export declare type ExtendedTextStyle = ExtendStyle<TextStyle>;
export declare type ExtendedImageStyle = ExtendStyle<ImageStyle>;
export declare type ExtendedStyleType = ExtendedViewStyle | ExtendedTextStyle | ExtendedImageStyle;
export declare type NamedStyles<T> = {
    [P in keyof T]: P extends `@media${string}` ? MediaQueryStyles<T[P]> : P extends `$${string}` ? PrimitiveType : ExtendedStyleType;
};
export declare type DollarSignString = `$${string}`;
export declare type RawGlobalVars<T> = {
    [P in keyof T]: P extends `$${string}` ? PrimitiveType : P extends `@media${string}` ? RawGlobalVars<T[P]> : never;
};
